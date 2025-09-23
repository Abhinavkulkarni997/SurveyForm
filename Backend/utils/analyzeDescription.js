const winkNLP=require('wink-nlp');
const model=require('wink-eng-lite-web-model');
const nlp=winkNLP(model);

// its is the helper to extract item properties
const its=nlp.its;
// obtain "as" reducer helper to reduce a collection
const as =nlp.as;

const text='Hello World ! How are you?';
const doc=nlp.readDoc(text);
console.log(doc.tokens().out(its.type,as.freqTable))
console.log(doc.out());