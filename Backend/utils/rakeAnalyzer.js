const rake=require('node-rake');
const sw=require('stopword');

function rakeAnalyzer(text=''){
    if(!text || !text.trim()){
        return{keywords:[]};
    };
    const words=text.toLowerCase().split(/[\s,.;!?()]+/);
    const stopwords=new Set(sw.en);

    // const filteredWords=sw.removeStopwords(words);

    const phrases=[];
    let currentPhrase=[];

    for(const word of words){
        if(stopwords.has(word) || word.trim()===''){
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
        for(const word of uniqueWords){
            degree[word]=(degree[word]||0) +1;
}
}
const keywords=Object.entries(freq)
.sort((a,b)=>(b[1]-a[1]))
.map(e=>e[0])
    return {keywords};
}




module.exports={rakeAnalyzer};