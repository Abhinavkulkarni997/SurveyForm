const rake=require('node-rake');
const sw=require('stopword');

function rakeAnalyzer(text=''){
    if(!text || !text.trim()){
        return{keywords:[]};
    };
    const words=text.toLowerCase().split(/[\s,.;!?]+/);
    const filteredWords=sw.removeStopwords(words);

    const freq={};
    filteredWords.forEach(word=>{
        if(word.length>2){
            freq[word]=(freq[word] || 0)+1
        }
})

const keywords=Object.entries(freq)
.sort((a,b)=>(b[1]-a[1]))
.map(e=>e[0])
    return {keywords};
}




module.exports={rakeAnalyzer};