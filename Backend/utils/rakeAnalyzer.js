// // const rake=require('node-rake');
// const sw=require('stopword');

// function rakeAnalyzer(text=''){
//     if(!text || text.trim()===""){
//         return{keywords:[]};
//     };
//     console.log('Original text:',text);

//     // normalize text to lowercase and split into words
//     const words=text.toLowerCase().split(/[\s,.;!?()]+/).filter(w=>w.trim().length>0);
//     console.log('Split Words:',words);
//     // mark stopwords
//     const stopwords=new Set(sw.removeStopwords(words).length<words.length ? sw.eng:[]);

//     // const filteredWords=sw.removeStopwords(words);

//     const phrases=[];
//     let currentPhrase=[];

//     for(const word of words){
//         if(sw.removeStopwords([word]).length===0 || word.trim()===''){
//             if(currentPhrase.length>0){
//                 phrases.push(currentPhrase);
//                 currentPhrase=[];
//             }
//     }else{
//         currentPhrase.push(word);
//     }

// }
// if(currentPhrase.length>0){
//     phrases.push(currentPhrase);
// }
//     const freq={};
//     const degree={};
// for(const phrase of phrases){
//    const uniqueWords=new Set(phrase);
//         for(const word of phrase){
//             freq[word]=(freq[word] || 0)+1;
//             degree[word]=(degree[word]||0) + (phrase.length -1);
//         }

// }
//         for(const word in freq){
//             degree[word]+=freq[word] ;
// }

// const wordScores={};
// for(const word in freq)
// {
//     wordScores[word]=degree[word]/freq[word];
// }

// const phraseScores=phrases.map(p=>{
//     const score =p.reduce((sum,w)=>sum+(wordScores[w]||0),0);
//     return {phrase:p.join(''),score};
// });

// phraseScores.sort((a,b)=>b.score-a.score);
// const keywords=phraseScores.slice(0,10).map(p=>p.phrase);


//     return {keywords};
// }

// module.exports={rakeAnalyzer};



// current working version

// const rake=require('node-rake');
// const sw=require('stopword');

// function rakeAnalyzer(text=''){
//     if(!text || text.trim()===""){
//         return{keywords:[]};
//     };
//      console.log('Original text:',text);

//      const stopwords=new Set([...sw.eng,
//         'want', 'wanted', 'wants',
//         'get', 'gets', 'getting',
//         'make', 'makes', 'making',
//         'see', 'sees', 'seeing',
//         'feel', 'feels', 'feeling',
//         'work', 'works', 'working',
//         'apply', 'applies', 'applying',
//         'future', 'view', 'wish', 'amazing', 'interesting'

//      ])

//     // normalize text to lowercase and split into words
//     const sentences=text.toLowerCase().split(/[.;!?]+/).filter(s=>s.trim().length>0);
//      console.log('Split Words:',sentences);
//   const allPhrases=[];

//     for(const sentence of sentences){
//        const words=sentence.split(/[\s,()]+/).filter(w=>w.trim()!='');
//             let currentPhrase=[];
//             for(const word of words){
//                 if(stopwords.has(word)){
//                     if(currentPhrase.length>0){
//                         allPhrases.push([...currentPhrase]);
//                         currentPhrase=[];
//                     }
//                 }else{
//                     currentPhrase.push(word);
//                 }
//             }
//             if(currentPhrase.length>0){
//                 allPhrases.push([...currentPhrase])
//             }
// }
// console.log('All phrases:',allPhrases);

// // filtering all valid phrases 
// const validPhrases=allPhrases.filter(phrase=>phrase.length>=1);
// if(validPhrases.length===0){
//     return{keywords:[]};
// }
// const freq={};
// const degree={};
// for(const phrase of validPhrases){
//     for(const word of phrase){
//         freq[word]=(freq[word]||0)+1;
       
//     }
//     for(const word of phrase){
//         degree[word]=(degree[word]||0)+(phrase.length);
//     }
// }
// console.log('Frequency:',freq);
// console.log('Degree:',degree);

// // calculation of  word scores
// const wordScores={};
// for(const word in freq){
//     wordScores[word]=(degree[word])/freq[word];
// }
// console.log('Word Scores:',wordScores)
// // Calculate phrase scores
// const phraseScores=validPhrases.map(phrase=>({
//     phrase:phrase.join(' '),
//     score:phrase.reduce((sum,word)=>sum+(wordScores[word]||0),0)
// }))
// console.log('PhraseScores:',phraseScores);

// // logic for sorting and selecting top keywords

// phraseScores.sort((a,b)=>b.score-a.score);
// const keywords=phraseScores.slice(0,10).map(p=>p.phrase);


//     return {keywords};
// }

// module.exports={rakeAnalyzer};


const sw=require('stopword');

function rakeAnalyzer(text=''){
    if(!text || text.trim()===""){
        return{keywords:[]};
    };
     console.log('Original text:',text);

     const stopwords=new Set([...sw.eng,
        'want', 'wanted', 'wants',
        'get', 'gets', 'getting',
        'make', 'makes', 'making',
        'see', 'sees', 'seeing',
        'feel', 'feels', 'feeling',
        'work', 'works', 'working',
        'apply', 'applies', 'applying',
        'future', 'view', 'wish', 'amazing', 'interesting'

     ])

    // normalize text to lowercase and split into words
    const sentences=text.toLowerCase().split(/[.;!?]+/).filter(s=>s.trim().length>0);
     console.log('Split Words:',sentences);
  const allPhrases=[];

    for(const sentence of sentences){
       const words=sentence.split(/[\s,()]+/).filter(w=>w.trim()!='');
            let currentPhrase=[];
            for(const word of words){
                if(stopwords.has(word)){
                    if(currentPhrase.length>0){
                        allPhrases.push([...currentPhrase]);
                        currentPhrase=[];
                    }
                }else{
                    currentPhrase.push(word);
                }
            }
            if(currentPhrase.length>0){
                allPhrases.push([...currentPhrase])
            }
}
console.log('All phrases:',allPhrases);

// filtering all valid phrases 
const validPhrases=allPhrases.filter(phrase=>phrase.length>=1);
if(validPhrases.length===0){
    return{keywords:[]};
}
const freq={};
const degree={};
for(const phrase of validPhrases){
    for(const word of phrase){
        freq[word]=(freq[word]||0)+1;
        degree[word]=(degree[word]||0)+(phrase.length);  
    }
}
console.log('Frequency:',freq);
console.log('Degree:',degree);

// calculation of  word scores
const wordScores={};
for(const word in freq){
    wordScores[word]=(degree[word])/freq[word];
}
console.log('Word Scores:',wordScores)
// Calculate phrase scores
const phraseScores=validPhrases.map(phrase=>{
   const  phraseText=phrase.join(' ');
    const baseScore=phrase.reduce((sum,word)=>sum+(wordScores[word]||0),0);

    const lengthBonus=phrase.length>1 ? phrase.length*0.5:0;

    return{
        phrase:phraseText,
        score:baseScore+lengthBonus,
        wordCount:phrase.length

    }

})
console.log('PhraseScores:',phraseScores);

// logic for sorting and selecting top keywords

phraseScores.sort((a,b)=>
{
if (Math.abs( b.score-a.score) <0.1){
    return b.wordCount-a.wordCount;

}
return b.score- a.score;

});

let keywords=phraseScores;
const multiWordPhrases=phraseScores.filter(p=>p.wordCount>1);

if(multiWordPhrases.length>=5){
    keywords=[...multiWordPhrases.slice(0,7),
        ...phraseScores.filter(p=>p.wordCount===1).slice(0,3)].sort((a,b)=>b.score-a.score);
}
    return {keywords:keywords.slice(0,10).map(p=>p.phrase)};
}

module.exports={rakeAnalyzer};