const express = require('express')
const router = express.Router()


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

router.post('/appellant-submission-check', function (req, res) {
  let accuracy = req.session.data['is-accurate']

  if (accuracy === 'yes') {
    res.redirect('/lpa-submission/conditions')
  }  else {
    res.redirect('/lpa-submission/appellant-submission-error')
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

router.post('/eligibility/decision-date-post', function (req, res) {
  let day = req.session.data['decision-date-day'],
      month = req.session.data['decision-date-month'],
      year = req.session.data['decision-date-year'];
   if(!day || !month  || !year) {
     res.redirect('/eligibility/decision-date-error')
   }

  let date = moment(`${year}-${month}-${day}`, "Y-M-D", true);

  console.log(date.isValid());

  if(date.isValid() === false){
    res.redirect('/eligibility/decision-date-error')
  } else{
    let checkDate = date.add(12, "weeks");
    let today = moment();
    if(checkDate.isBefore(today, "days")){

      req.session.data.deadlineDate = checkDate.format("D MMMM YYYY");
      res.redirect('/eligibility/decision-date-out')
    } else {
      res.redirect('/eligibility/planning-department')
    }
  } 

  
})


module.exports = router
