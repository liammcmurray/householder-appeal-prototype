

const express = require('express')
const router = express.Router()


const fs = require('fs');
const request = require('request');

const moment = require("moment");


// Add your routes here - above the module.exports line

// SUBMISSION - APPEAL STATEMENT
router.post('/check-statement', function (req, res) {
  let sense = req.session.data['sense-check']

  if (Array.isArray(sense) && sense[0] === 'on') {
    res.redirect('/appellant-submission/supporting-documents')
  } else {
    res.redirect('/appellant-submission/appeal-statement-error')
  }
})

// SUBMISSION - SITE OWNERSHIP
router.post('/check-site-ownership', function (req, res) {
  let owner = req.session.data['site-owner-names']

  if (owner === 'no') {
    res.redirect('/appellant-submission/site-ownership-certb')
  } else {
    res.redirect('/appellant-submission/site-access')
  }
})


// SUBMISSION - SUBMISSION
router.post('/check-submission', function (req, res) {
  let agreed = req.session.data['appellant-confirmation']

  if (Array.isArray(agreed) && agreed[0] === 'on') {
    res.redirect('/appellant-submission/confirmation')
  } else {
    res.redirect('/appellant-submission/submission-error')
  }
})


///////////////////////////////////////////////////////////////

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

const localCouncils = require("./data/local-authority-eng.json");


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
    res.locals.councils = localCouncils.sort(sortByProperty("name"));
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

router.all('/eligibility/planning-department', function(req,res,next){
  
  res.locals.councils = localCouncils.sort(sortByProperty("name"));
  
  next()
  
}); 

router.post('/eligibility/planning-department-post', function(req, res, next){
  let dept = req.body['planning-department'];
  console.log(dept)
  if(dept === 'ESX' || dept === 'WSX' || dept === 'KEN' || dept === 'SGC') {
    req.session.data.planningError = false;
    res.redirect('/submit-appeal/planning-number')
  } else if (dept === ""){
    req.session.data.planningError = true;
    res.redirect('/eligibility/planning-department')
  } else {
    req.session.data.planningError = false;
    res.redirect('/eligibility/planning-department-out')
  }
})

router.post('/eligibility/listed-building-post', function (req, res) {
  let haslisted = req.session.data['listed-building']

  if (haslisted === 'no') {
    res.redirect('/eligibility/appeal-statement')
  } else if (haslisted === 'yes') {
    res.redirect('/eligibility/listed-out')
  } else {
    res.redirect('/submit-appeal/planning-number')
  }
})

router.post("/submit-appeal/planning-number-post", function(req, res, next){
  console.log(req.body.reference);
  let reference = req.body.reference.toUpperCase();
  if(!reference){
    res.redirect("/submit-appeal/reference-number-error")
  } else if(reference.startsWith("9")){
    res.redirect("/submit-appeal/reference-number-not-found")
  } else if(reference.startsWith("8")){
    req.session.data.pastDeadline = true;
    res.redirect("/submit-appeal/postcode")
  } else {
    req.session.data.pastDeadline = false;
    res.redirect("/submit-appeal/postcode")
  }
})

router.post("/submit-appeal/postcode-post", function(req, res, next){
  if(req.session.data.pastDeadline){
      res.redirect("/submit-appeal/appeal-after-deadline")
  } else {
      res.redirect("/submit-appeal/appeal-details")
  }
})


router.post("/submit-appeal/contact-details-post", function(req, res, next){

    if (req.body.contact.includes("post")){
      res.redirect('/submit-appeal/address')
    }
    
    res.redirect('/submit-appeal/check-answers')
})


router.all("/submit-appeal/reference-number-not-found", function(req, res, next){
  let council = localCouncils.filter(council => council.key === req.session.data['planning-department']);

  res.locals.councilName = council[0]['official-name'];
  next()
})

module.exports = router
