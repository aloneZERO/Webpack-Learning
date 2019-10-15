import _ from 'lodash';
import numRef from './ref.json';

export function numToWord(num) {
//   return _.reduce(numRef, (accum, ref) => {
//     return ref.num === num ? ref.word : accum;
//   }, '');
    for (var ref of numRef) {
        if (ref.num === num) return ref.word;
    }
    return '';
};

export function wordToNum(word) {
//   return _.reduce(numRef, (accum, ref) => {
//     return ref.word === word && word.toLowerCase() ? ref.num : accum;
//   }, -1);
    if (typeof word === 'string') {
        word = word.toLowerCase();

        for (var ref of numRef) {
            if (ref.word === word) return ref.num;
        }
    }
    return -1;
};
