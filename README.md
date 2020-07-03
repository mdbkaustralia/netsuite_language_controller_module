# MDBK Language Controller Module
Easy to use multi-lingual string module.

## Purpose ##
This module is a work in progress.
It is designed to make designing multi-lingual SuiteScript 2.0 projects easier.
This is achieved by removing hard-coded UI strings from your project and instead calling this custom module to build/translate each required string from a language specific XML file.

#### How to include the module in your `define` ####
```
define(['N/runtime', '/SuiteScripts/MDBK/MDBK Language Controller/language_controller'], function (runtime, lang) {
  ... 
});
```

#### Example Usage ####
There is a working Suitelet included in the project to illustrate usage.
```
lang.setLanguage('en_AU');

lang.text('Do you like {0} or {1}?','apples','oranges');
// Outputs: Do you like apples or oranges?
// Provided that "Do you like {0} or {1}?" is declared as as the same text, or not declared at all

lang.text('Do you like {healthy} or {unhealthy}?',{healthy:'salad',unhealthy:'pizza'});
// Outputs: Do you like salad or pizza?
// Provided that "Do you like {healthy} or {unhealthy}?" is declared as as the same text, or not declared at all

lang.text('POLITE_HELLO',{name:'John'});
// Outputs: Good day to you John
// Provided that POLITE_HELLO is declared as "Good day to you {name}"
```
