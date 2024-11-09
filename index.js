// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
//Modified up until..
app.get('/api/:date?',(req,res)=>{
  date=req.params.date;
  if(!date){
    date=Date.now();
  }
 // console.log('#0:'+Date.parse(date))
  /*if(Date.parse(date)!="Invalid String"){//if input is unix
  date2=new Date(new Number(date));
  }
  else{//if input is utc
    console.log('#2');
    tdate=date.toString();

    date2=new Date(tdate.slice(0,5),tdate.slice(6,8),tdate.slice(9));
  }*/
 // console.log(date,",",date2)
  dateUNIX=Date.parse(date);
  if(isNaN(dateUNIX)){
    dateUNIX=new Date(date*1);
  }
  date3=new Date(dateUNIX)
  dateUTC=date3.toUTCString();
//  console.log("unix:"+dateUNIX+",utc:"+dateUTC);
 /* if(isNaN(dateUNIX)||isNaN(dateUTC)){
    res.send({error:"Invalid Date"});
  }*/
 if(dateUTC=="Invalid Date"){
  res.send({error:dateUTC});
 }
  else{
    res.send({unix:new Number(dateUNIX),utc:dateUTC.toString()});
  }
})
//.. until HERE.


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
