import superagent from 'superagent';
import cheerio from 'cheerio';
import mapLimit from 'async/mapLimit';
import args from './utils/args';
import fs from 'fs';

const url = 'http://jandan.net/duan';
var currentCount = 0;

function crawlAndParsePage(url, callback) {
    if (args.mongodb == false) {
  
    fs.appendFileSync(args.file, JSON.stringify(duanziStore)+"\n")
  } else{
    mongoConnect("mongodb://localhost:27017/duanzi")
    .then(
        async (db)=>{
            try {
                const collection = db.collection('jandan');
                const res = await collection.insertMany(duanziStore);
                console.log("save content from " + url +" success");
            }
            catch(err) {
                console.log("save error");
                db.close();
                throw err;
            }
            db.close();
        },
        (err)=>{
            console.log("db connection error")
            throw err;
        }
    )
    .catch((err)=>{
        console.log(err);
    })
}
 }
    superagent.get(url)
    .end((err, response) => {
        if (err) {
            console.log("get " + url + " failed");
            return console.log(err);
        }
        let $ = cheerio.load(response.text);
        let duanziStore = duanziExtraction($);
        console.log(url + " extraction result")
        console.log(duanziStore);

        // 建立一个随机延时和回条函数；
        let delay = Math.random()*2000;
        setTimeout(function(){
            currentCount--;
            callback(null, "url is " + url + " delay is " + delay);
        },delay);
    })

function duanziExtraction($){
    let duanziStore = [];
    $('.commentlist li').each(function(idx, elem) {
        let commentLike = parseInt($(elem).find('.tucao-like-container span').text());
        let commentUnlike = parseInt($(elem).find('.tucao-unlike-container span').text());
        if (commentUnlike+ commentLike >= 50 && (commentLike / commentUnlike) < 0.618){
            // bad duanzi
        }else {
            let duanziId = $(elem).find(".righttext a").text()
            let pArray = $(elem).find("p")
            let duanziContent = ""
            pArray.each(function(index, element){
                duanziContent += $(element).text() + "\n"
            })
            duanziStore.push({
                duanziId,
                duanziContent,
                commentLike,
                commentUnlike
            })
        }
    })
    return duanziStore;
}

    mapLimit(url,3,
        (url,callback)=>{
            console.log("current url is"+url);
            crawlAndParsePage(url,callback);
        },

        (err,result)=>{
            if(err){
                console.log("error happened");
                console.log(err);

            }else{
                console.log("mapLimit done");
                //console.log(result);

            }
        })

   //console.log("current maximum page:"+currentMaximumpage);

