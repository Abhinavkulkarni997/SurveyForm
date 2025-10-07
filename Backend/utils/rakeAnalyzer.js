// const rake=require('node-rake');
const sw=require('stopword');

function rakeAnalyzer(text=''){
    if(!text || text.trim()===""){
        return{keywords:[]};
    };

    // normalize text to lowercase and split into words
    const words=text.toLowerCase().split(/[\s,.;!?()]+/);
    // mark stopwords
    const stopwords=new Set(sw.removeStopwords(words).length<words.length ? sw.eng:[]);

    // const filteredWords=sw.removeStopwords(words);

    const phrases=[];
    let currentPhrase=[];

    for(const word of words){
        if(sw.removeStopwords([word]).length===0 || word.trim()===''){
            if(currentPhrase.length>0){
                phrases.push(currentPhrase);
                currentPhrase=[];
            }
    }else{
        currentPhrase.push(word);
    }

}
if(currentPhrase.length>0){
    phrases.push(currentPhrase);
}
    const freq={};
    const degree={};
for(const phrase of phrases){
   const uniqueWords=new Set(phrase);
        for(const word of phrase){
            freq[word]=(freq[word] || 0)+1;
            degree[word]=(degree[word]||0) + (phrase.length -1);
        }

}
        for(const word in freq){
            degree[word]+=freq[word] ;
}

const wordScores={};
for(const word in freq)
{
    wordScores[word]=degree[word]/freq[word];
}

const phraseScores=phrases.map(p=>{
    const score =p.reduce((sum,w)=>sum+(wordScores[w]||0),0);
    return {phrase:p.join(''),score};
});

phraseScores.sort((a,b)=>b.score-a.score);
const keywords=phraseScores.slice(0,10).map(p=>p.phrase);


    return {keywords};
}




module.exports={rakeAnalyzer};