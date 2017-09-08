/*import superagent from 'superagent';
import cheerio from 'cheerio';

const baseUrl='http://jandan.net/duan';

superagent.get(baseUrl)
.end((err,reponse)=>{
    if(err){
        return console.log(err);

    }
    let $=cherrio.load(response.text);
    let currentMaximumpage=$('.current-comment-page').first().text();
    currentMaximumpage=parseInt(currentMaximumpage.substr(1,currentMaximumpage.length-2));
    console.log("current maximum page:"+currentMaximumpage);

})*/