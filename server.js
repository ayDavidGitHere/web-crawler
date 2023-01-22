require('dotenv').config();
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_CX = process.env.GOOGLE_CX;



async function parseContent(items, selector, keyword = ""){
    return new Promise((resolve, reject)=>{  
        if (!items) {
            return ({
                error: 'No Results Found'
            })
        }
        const urls = items.map(item => item.link)
        let sites = []; let urlcount = 0;
        urls.forEach(async (url, index) => {
            try { 
                const response = await axios.get(url, {
                      headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                        'Accept-Encoding': 'gzip, deflate, br',
                        'Accept-Language': 'en-US,en;q=0.9',
                        'Connection': 'keep-alive',
                        'Upgrade-Insecure-Requests': '1'
                      },
                      maxRedirects: 10,
                      validateStatus: function (status) {
                        return status >= 200 && status < 300;
                      }             
                }); 
                const html = response.data; //console.log(url); ////console.log("html ... \n", typeof html, "\n", html.slice(0, 50))
                const $ = cheerio.load(html);  
                if ($(selector).length > 0  && html.toLowerCase().indexOf(keyword.toLowerCase()) >= 0)
                sites.push({url, elements: $(selector)});
                else
                console.log(`url (not match) (${index}):`, url); 
            } catch (err) {
                //if(index>2)  console.log(err.message);//for(let key in err) {console.log(key)}
                console.log(`url (error) (${index}): `, url, "\x1b[31m", index>0?"               |=|=|   "+err.message:"", "\x1b[37m"); 
            }
            urlcount ++;
            if(urlcount >= urls.length) resolve(sites);
        });  
    });//return
}
async function googleSearch(q){
    try{
        let response =  await axios.get('https://www.googleapis.com/customsearch/v1', {
            params: {
                key: GOOGLE_API_KEY,
                cx: GOOGLE_CX,
                q: q,
                start: 0,
            }
        });
        const { data } = response
        const { items } = data; 
        return {items};
    }
    catch(err){
        console.error(err)
        return ({ error: 'Error Occurred' })
    }
}//EO googleSearch()
(async function (){
    let gs = ( await googleSearch("buy airtime glo") );
    let content = await parseContent(gs.items, "script", "paystack"); 
    console.log( content );
})();






app.get('/search', async (req, res) => {
    const { q } = req.query;
    return res.json(await googleSearch(q));
})
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000')
})
