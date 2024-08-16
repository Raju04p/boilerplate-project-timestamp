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
app.get("/api/:date?", function (req, res) {
    let  date =  req.params.date;
    let unixDate;
    let dateObj;
    let utcDate;

  // test wheather the input date is a number
  let isUnix = /^\d+$/.test(date);

  // if no date specified current date
  if(!date){
    dateObj = new Date();
  }
  // if our input is a unix string we set the unixDate as the input
  else if( date && isUnix ){
    unixDate = parseInt(date);
    dateObj = new Date(unixDate);
  }
    // date not is not unix time stamp
  else if(date && !isUnix){
    dateObj = new Date(date);
  }
  if (dateObj.toString() === "Invalid Date"){
    res.json({error: "Invalid Date"});
    return;
  }
  unixDate = dateObj.getTime();
  utcDate = dateObj.toUTCString();
    res.json({
      unix: unixDate,
      utc: utcDate
    });
});




// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
