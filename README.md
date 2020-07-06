# MDBK Language Controller Module
Fetches a language specific translation of a string, making multi-lingual SuiteScripts easy!

## Purpose ##
MDBK Language Controller Module is designed to make creating multi-lingual SuiteScript 2.0 projects easier.
This is achieved by removing hard-coded UI strings from your project and instead calling this custom module to build/translate each required string from a language specific text file.

#### How to include the module in your `define` ####
The module file ("language_controller.js") should be located at the root of your SuiteScript project.
```
define(['N/runtime', './language_controller'], function (runtime, lang) {
  ... 
});
```

#### Language File Format ####
Each "language/translation file" is a plain-text document. By default, the string identifier is separated from the output string by an equals `=` sign.
```
GREET_USER=Hello, {name}
SAY_GOODBYE=See you again soon!
```
If required, the delimiter `=` can be changed on a file-by-file basis by using the following as the *first line* of the file:
```
DELIMITER=<new delimiter string>
```

#### Example Usage ####
There is a working Suitelet included in the project to illustrate usage.
```
lang.setLanguage('en_AU');

lang.text('Do you like {0} or {1}?','apples','oranges');
// Outputs: Do you like apples or oranges?
// Provided that "Do you like {0} or {1}?" is declared as the same text, or not declared at all

lang.text('Do you like {healthy} or {unhealthy}?',{healthy:'salad',unhealthy:'pizza'});
// Outputs: Do you like salad or pizza?
// Provided that "Do you like {healthy} or {unhealthy}?" is declared as the same text, or not declared at all

lang.text('POLITE_HELLO',{name:'John'});
// Outputs: Good day to you John
// Provided that POLITE_HELLO is declared as "Good day to you {name}"
```

#### License ####
MDBK Language Controller Module is licensed under the GNU General Public License version 3.