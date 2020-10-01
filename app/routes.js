const express = require('express')
const router = express.Router()

var NotifyClient = require('notifications-node-client').NotifyClient,
    notify = new NotifyClient(process.env.NOTIFYAPIKEY);

const fs = require('fs');
const request = require('request');

const moment = require("moment")
// Add your routes here - above the module.exports line


router.post('/check-lpa-section2', function (req, res) {
  let conservation = req.session.data['citizenship-conditional-3']

  if (Array.isArray(conservation) && conservation[0] === 'on') {
    res.redirect('/lpa-submission/conservation-publicity')
  } else {
    res.redirect('/lpa-submission/lpa-task-list')
  }
})

//autocomplete

function sortByProperty(property){
   return function(a,b){
      if(a[property] > b[property])
         return 1;
      else if(a[property] < b[property])
         return -1;

      return 0;
   }
}

router.all("/components/select-council", function(req,res,next){
  const url = "https://local-authority-eng.register.gov.uk/records.json";

  fs.readFile(__basedir + "/app/data/local-authority-eng.json", function(err, data){
    if (err) {
      throw err;
      next()
    }
      res.locals.councils = JSON.parse(data).sort(sortByProperty("name"));
      next()
      
  });

  
});  




router.post("/components/search-council/results", function(req, res, next){
  let postcode = req.body.postcode.replace(/ /g,'');

  request.get("https://api.postcodes.io/postcodes/" + postcode, (error, response, body) => {
     let json = JSON.parse(body);

  
    if(json.status === 200){
      res.locals.councilName = json.result.admin_district;
      res.render("components/search-council/results");
    } else {
      console.log(json.status);
      console.log(json.error);
      res.locals.councilName = json.error;
      res.render("components/search-council/results");
    }
    
  });
});


router.post("/appeal-with-reference/send-letter/summary", function(req, res, next){

  let date = `${req.session.data['planning-date-year']}/${req.session.data['planning-date-month']}/${req.session.data['planning-date-day']}`

  req.session.data['planning-date'] = moment(date).format("D MMMM YYYY"); 
  next()
})


router.post("/appeal-with-reference/send-letter/correspondence-address", function(req, res, next){
  req.session.data['address'] = [
    req.session.data['address-line-1'],
    req.session.data['address-line-2'],
    req.session.data['address-town'],
    req.session.data['address-county'],
    req.session.data['address-postcode']
  ].filter(item => item);


  next()
})

router.post("/appeal-with-reference/send-letter/date", function(req, res, next){

  req.session.data['post-address'] = [
    req.session.data['post-address-line-1'],
    req.session.data['post-address-line-2'],
    req.session.data['post-address-town'],
    req.session.data['post-address-county'],
    req.session.data['post-address-postcode']
  ].filter(item => item);
  next()
})


router.post("/appeal-with-reference/reference-number-post", function(req, res, next){
  console.log(req.body.reference);
  let reference = req.body.reference.toUpperCase();
  if(!reference){
    res.redirect("/appeal-with-reference/reference-number-error")
  }else if(reference.startsWith("HAS")){
    res.redirect("/appeal-with-reference/postcode")
  } else {
    res.redirect("/appeal-with-reference/reference-not-recognised")
  }
})

module.exports = router
