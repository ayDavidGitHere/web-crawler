
const cheerio = require('cheerio');
function convertToDecimal(num){
  if(/^[-+]?\d*\.?\d+e[-+]?\d+$/.test(num.toString()) == false) return num;
  let splits = num.toString().split("e-");
  let zeros = ""; //console.log((num.toString()))
  for(let i=0; Number(splits[1])>i; i++){zeros+="0";}
  return "0."+zeros+splits[0].replace(".", "");
}
function convertToReadable(num) {
   num  = convertToDecimal(num);
   if(num>0.9999) return num.toLocaleString('en-US', {maximumFractionDigits:3})
   var zeroslen = 0;
   var zeros = num.toString().split(".")[1].match(/^0+/);;
   if (zeros) zeroslen =  zeros[0].length;
   if (zeroslen < 2) return num.toString().slice(0,zeroslen+2+3);
   
   let fixedNum =  num.toString().slice(2+zeroslen);
   var readableNum = "0(" + zeroslen + ")" + fixedNum.toString().slice(0,3)
   return readableNum;
}






Tests = {
  cheerio: function (){
        const $ = cheerio.load('<h2 class="title">Hello world</h2>', null , false);
        console.log($.html());
        
        
        
        
        //$('h2.title').text('Hello there!');
        //$('h2').addClass('welcome');
        //$.html();
        //=> <html><head></head><body><h2 class="title welcome">Hello there!</h2></body></html>
  },
  random: function (){
    let per = 0.0000456000053567;
    //console.log( ((0.0456000053567*1000)/1000).toString().slice(0,5)+"%" )
    console.log(convertToReadable(per)+"%");
    console.log('<html><head></head><body><h2 class="title welcome">Hello there!</h2></body></html>'.toLowerCase().indexOf("".toLowerCase()) >= 0)
  }
}
Tests.random();