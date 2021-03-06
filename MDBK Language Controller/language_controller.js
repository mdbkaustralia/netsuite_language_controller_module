/**
 * MDBK Language Controller Module
 * Copyright (c) 2020 MDBK Australia
 * 
 * Fetches a language specific translation of a string, making multi-lingual SuiteScripts easy!
 * 
 * This module should be placed in the root directory of a SuiteScript project
 * Include the module and then use it whenever you need to display text to a user
 * It will check for the string in the preferred language file, then check the fall-back file, then failing both will display the input string as-is.
 * See included example Suitelet ("mdbk_language_controller_example.js") for usage syntax.
 * 
 * For complete list of authors, please refer to https://github.com/mdbkaustralia/netsuite_language_controller_module
 * 
 * MDBK Language Controller Module is distributed under the MIT License.
 * 
 * @NApiVersion 2.0
 */
define(['N/runtime','N/file'], function (runtime, file) {
    var exports = {};
    var FALLBACK_LANGUAGE_FILE;
    var LANGUAGE_FILE;
    var LANGUAGE_STRINGS = {};
    var FALLBACK_LANGUAGE_STRINGS = {};
    var FIRST_RUN = true;

    exports.setLanguage = function(language) {
        LANGUAGE_FILE = language;      
        LANGUAGE_STRINGS[LANGUAGE_FILE] = {};
    }
    exports.setFallbackLanguage = function(language) {
        FALLBACK_LANGUAGE_FILE = language;
        LANGUAGE_STRINGS[FALLBACK_LANGUAGE_FILE] = {};
    }
    exports.getLanguage = function() {
        return LANGUAGE_FILE;
    }
    exports.getFallbackLanguage = function() {
        return FALLBACK_LANGUAGE_FILE;
    }

    exports.text = function () {
        if(FIRST_RUN) preloadStrings();
        var str = '';
        var args = Array.prototype.slice.call(arguments);
        for(var i=0;i<args.length;i++) {
            args[i] = exports.getTranslation(args[i]);
        }

        str = formatUnicorn.apply(null,args);
        return str;
    }

    exports.json = function() {
        preloadStrings();
        return JSON.stringify(LANGUAGE_STRINGS);
    }

    exports.formField = function(form,serverWidget) {
        var field = form.addField({
            id: 'cust_mdbk_language_strings',
            label: 'MDBK Language Strings',
            type: serverWidget.FieldType.INLINEHTML
        });
        field.defaultValue = '<script>MDBK_Language_Strings='+exports.json()+';</script>';
    }

    exports.addStrings = function(obj) {
        LANGUAGE_STRINGS = obj;
        FIRST_RUN=false;
    }

    var preloadStrings = function() {
        FIRST_RUN = false;
        if(!file) return;
        if(!LANGUAGE_FILE && !FALLBACK_LANGUAGE_FILE) return;

        if(LANGUAGE_FILE) {
            try {
                var language_file_path = './language/'+LANGUAGE_FILE+'.txt';
                var languagefileobj = file.load({id: language_file_path});
                LANGUAGE_STRINGS[LANGUAGE_FILE] = readLanguageFile(languagefileobj);
            } catch(e) {
                log.debug('Failed to load/read language file: '+language_file_path);
             }
        }
        if(FALLBACK_LANGUAGE_FILE && (FALLBACK_LANGUAGE_FILE != LANGUAGE_FILE)) {
            try {
                var language_file_path = './language/'+FALLBACK_LANGUAGE_FILE+'.txt';
                var languagefileobj = file.load({id: language_file_path});
                LANGUAGE_STRINGS[FALLBACK_LANGUAGE_FILE] = readLanguageFile(languagefileobj);
            } catch(e) {
                log.debug('Failed to load/read fallback language file: '+language_file_path);
            }
        }
    }

    var readLanguageFile = function(file) {
        var iterator = file.lines.iterator();
        var firstline = true;
        var delimiter = '=';
        var output = {};
        iterator.each(function (line)
        {
            var lineValues = line.value.split(delimiter);
            if(firstline == true) {
                if(lineValues[0] == 'DELIMITER') {
                    delimiter = lineValues[1];
                    firstline = false;
                    return true;
                } else {
                    firstline = false;
                }
            }

            output[lineValues[0]] = lineValues[1];

            return true;
        });
        return output;
    }

    exports.getTranslation = function(input,lang) {
        if(typeof input == 'object') {
            var obj = {};
            for (var property in input) {
                if (!input.hasOwnProperty(property)) continue;
                obj[property] = exports.getTranslation(input[property],lang);
            }
            return obj;
        }
        var str;

        if(lang && LANGUAGE_STRINGS[lang]) str = LANGUAGE_STRINGS[lang][input];
        if(str) return str;

        if(LANGUAGE_FILE) str = LANGUAGE_STRINGS[LANGUAGE_FILE][input];
        if(str) return str;

        if(FALLBACK_LANGUAGE_FILE) str = LANGUAGE_STRINGS[FALLBACK_LANGUAGE_FILE][input];
        if(str) return str;

        return input;
    }

    // CREDIT "StackOverflow" URL: https://stackoverflow.com/a/18234317
    function formatUnicorn() {
        var str = arguments[0];
        if (arguments.length > 1) {
            var t = typeof arguments[1];
            var key;
            var args
            if(("string" === t || "number" === t)) {
                args = Array.prototype.slice.call(arguments)
                args.shift();
            } else {
                args = arguments[1];
            }
            for (key in args) {
                str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
            }
        }
        return str;
    }

    return exports;
});