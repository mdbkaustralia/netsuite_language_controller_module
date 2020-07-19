/**
 * MDBK Language Controller Module
 * Copyright (c) 2020 MDBK Australia
 * 
 * Fetches a language specific translation of a string, making multi-lingual SuiteScripts easy!
 * 
 * This module should be placed in the root directory of a SuiteScript project
 * Include the module and then use it whenever you need to display text to a user
 * It will check for the string in the preferred language file, then check the fall-back file, then failing both will display the input string as-is.
 * 
 * For complete list of authors, please refer to https://github.com/mdbkaustralia/netsuite_language_controller_module
 * 
 * MDBK Language Controller Module is distributed under the MIT License.
 * 
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget', 'N/runtime', './language_controller'],
  function (serverWidget, runtime, lang) {
    var exports = {};
    var userObj = runtime.getCurrentUser();

    // Load our fallback language file. This file should always exist and contain every string used in your project.
    // It is used when a string is missing from the language specific translation file.
    lang.setFallbackLanguage('en_US');

    // Load our preferred language file.
    // You could load it from a script parameter or anywhere else.
    // Here, we're using the Employee's NetSuite language preference - which is probably the best option.
    lang.setLanguage(userObj.getPreference({name: "language"}));

    exports.onRequest = function(context) {
      var examplestring_1 = 'Hi {name}. Are you feeling {adjective}?';
      var examplestring_2 = 'Do you like {0} or {1}?';
      var examplestring_3 = 'END_OF_OUR_EXAMPLE_{NAME}';
      var examplestring_4 = 'POLITE_GOODBYE';

      context.response.writeLine({output: '<h1>'+lang.text('Example of MDBK Language Controller')+'</h1>'});

      context.response.writeLine({output: '<br><br>Employee Language Preference:'});
      context.response.writeLine({output: '<br>'+lang.getLanguage()});

      context.response.writeLine({output: '<br><br>Fallback Language:'});
      context.response.writeLine({output: '<br>'+lang.getFallbackLanguage()});

      context.response.writeLine({output: '<br><br>Input: '+examplestring_1});
      context.response.writeLine({output: '<br>Output: '+lang.text(examplestring_1, { name: userObj.name, adjective: 'okay' })});

      context.response.writeLine({output: '<br><br>Input: '+examplestring_2});
      context.response.writeLine({output: '<br>Output: '+lang.text(examplestring_2,'FOOD.APPLES','FOOD.ORANGES')});

      context.response.writeLine({output: '<br><br>Input: '+examplestring_3});
      context.response.writeLine({output: '<br>Output: '+lang.text(examplestring_3,{ name: userObj.name })});

      context.response.writeLine({output: '<br><br>Input: '+examplestring_4});
      context.response.writeLine({output: '<br>Output: '+lang.text(examplestring_4,{ name: userObj.name })});
    }

    return exports;
  });