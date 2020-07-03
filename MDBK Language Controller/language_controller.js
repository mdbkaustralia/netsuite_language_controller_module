/**
 * This module is used whenever a text-string needs to be displayed to a user.
 * It will check for the string in the current langauge XML, then check the fall-back en-au.xml file, then failing that will display the input string.
 * @NApiVersion 2.x
 */
define(['N/runtime','N/file'], function (runtime, file) {
    var exports = {};
    var FALLBACK_LANGUAGE_FILE;
    var LANGUAGE_FILE;

    exports.setLanguage = function(language) {
        if(!FALLBACK_LANGUAGE_FILE) FALLBACK_LANGUAGE_FILE = language;
        LANGUAGE_FILE = language;
    }
    exports.setFallbackLanguage = function(language) {
        FALLBACK_LANGUAGE_FILE = language;
    }
    exports.getLanguage = function() {
        return LANGUAGE_FILE;
    }
    exports.getFallbackLanguage = function() {
        return FALLBACK_LANGUAGE_FILE;
    }

    exports.text = function () {
        var str = '';
        var args = Array.prototype.slice.call(arguments);
        args[0] = getTranslation(args[0]);

        str = formatUnicorn.apply(null,args);
        return str;
    }

    function getTranslation(input,lang) {
        var str = input;

        // TODO: Look up string in XML file
        
        return str;
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