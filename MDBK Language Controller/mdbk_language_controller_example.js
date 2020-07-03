/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget', 'N/runtime', '/SuiteScripts/MDBK/MDBK Language Controller/language_controller'],
  function (serverWidget, runtime, lang) {
    var exports = {};
    var userObj = runtime.getCurrentUser();
    lang.setFallbackLanguage('en_US'); // This is the language file that will ALWAYS exist and contain ALL strings. It is used whenever the request language is missing the string.
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
      context.response.writeLine({output: '<br>Output: '+lang.text(examplestring_2,'apples','oranges')});

      context.response.writeLine({output: '<br><br>Input: '+examplestring_3});
      context.response.writeLine({output: '<br>Output: '+lang.text(examplestring_3,{ name: userObj.name })});

      context.response.writeLine({output: '<br><br>Input: '+examplestring_4});
      context.response.writeLine({output: '<br>Output: '+lang.text(examplestring_4,{ name: userObj.name })});
    }

    return exports;
  });