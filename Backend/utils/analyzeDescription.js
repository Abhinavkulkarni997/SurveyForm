const winkNLP=require('wink-nlp');
const model=require('wink-eng-lite-web-model');
const nlp=winkNLP(model,['sbd','pos']);

// its is the helper to extract item properties
const its=nlp.its;
// obtain "as" reducer helper to reduce a collection
const as =nlp.as;

// const text=`The Godfather premiered on March 15, 1972. It was released on March 24, 1972. It is the first installment in The Godfather trilogy. The story of the movie spans from 1945 to 1955.About 90 percent of the film was shot in New York City. The movie was made on a budget of $7.2 million. And it has a running time of 177 minutes.`;


function analyzeDescription(text=''){
if(!text || !text.trim())
    return { keywords:[],freq:{}}
const doc=nlp.readDoc(text);

const entities=doc.entities().out();


const nounTokens=doc.tokens().filter((t)=>{
    const pos=t.out(its.pos);
    return pos==='PROPN'||pos==='NOUN' || pos==='ADJ';

}).map((t)=>t.out());
// .map((t)=>t.out(its.lemma));

const candidates=[...entities,...nounTokens].map((s)=>(s || '').toLowerCase().trim()).filter(Boolean)

const freq={};
candidates.forEach((k)=>(freq[k]=(freq[k]||0)+1));

const uniqueSorted=[...new Set(candidates)].sort((a,b)=>(freq[b]||0)-(freq[a]||0));
return {keywords:uniqueSorted,freq};


}

module.exports={analyzeDescription};
// console.log(doc.tokens().out(its.type,as.freqTable));
// console.log(doc.out());
// console.log(doc.tokens().out(its.value));
// console.log(doc.tokens().out(its.stopWordFlag));
// console.log(doc.tokens().out(its.pos));
// console.log(doc.tokens().out(its.lemma));
// console.log(doc.sentences().out())
// console.log(doc.entities().out())
// console.log(doc.tokens().out());
// console.log(doc.entities().out(its.type))
// // console.log(doc.sentences().entities().itemAt(1).entities.out())
// console.log(doc.sentences()
// .itemAt(3)
// .tokens()
// .filter((t)=> t.out(its.type)==='word' && !t.out(its.stopWordFlag)))
// console.log(doc.entities().each((e)=>{
//     if(e.out(its.type)==='DATE')
//     console.log(e.out())
// }))
// console.log(doc.entities().each((e)=>{
//     if(e.out(its.type)==='#DATE')
//         console.log(e.parentSentence().out());
// }))
// console.log(doc.out(its.type))




