var wn = require('../dist/webpack-numbers');

console.log( wn.numToWord(0), wn.wordToNum('zero') );
console.log( wn.numToWord(1), wn.wordToNum('one') );
console.log( wn.numToWord(2), wn.wordToNum('two') );
console.log( wn.numToWord(3), wn.wordToNum('three') );
console.log( wn.numToWord(4), wn.wordToNum('four') );
console.log( wn.numToWord(5), wn.wordToNum('five') );

console.log( wn.wordToNum("Error")===-1 );
console.log( wn.numToWord(11)==='' );
