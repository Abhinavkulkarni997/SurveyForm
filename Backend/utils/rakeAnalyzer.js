const rake=require('node-rake');
const sw=require('stopword');

function rakeAnalyzer(text=''){
    if(!text || !text.trim()){
        return{keywords:[]};
    };
    const words=text.toLowerCase().split(/[\s,.;!?]+/);
    const filteredWords=sw.removeStopwords(words);

    const keywords=rake.generate(filteredWords.join(' '));
    return {keywords};
}




module.exports={rakeAnalyzer};