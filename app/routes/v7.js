const express = require('express')
const router = express.Router()

var NotifyClient = require('notifications-node-client').NotifyClient,
    notify = new NotifyClient(process.env.NOTIFYAPIKEY);

const fs = require('fs');
const request = require('request');

const moment = require("moment")

function sortByProperty(property){
   return function(a,b){
      if(a[property] > b[property])
         return 1;
      else if(a[property] < b[property])
         return -1;

      return 0;
   }
}

const version = 'v7';


// ELIGIBILITY



router.post('/planning-eligibility-' + version, function(req, res, next){
  let dept = req.body['planning-department'];
  console.log(dept)
  if(dept === 'ESX' || dept === 'WSX' || dept === 'KEN') {
    req.session.data.planningError = false;
    res.redirect('/'+ version +'/eligibility/listed-building')
  } else if (dept === ""){
    req.session.data.planningError = true;
    res.redirect('/'+ version +'/eligibility/planning-department')
  } else {
    req.session.data.planningError = false;
    res.redirect('/'+ version +'/eligibility/planning-department-out')
  }
})


router.post('/applicant-eligibility-' + version, function (req, res) {
  let hasapplicant = req.session.data['appeal-relationship']

  if (hasapplicant === 'me') {
    res.redirect('/'+ version +'/eligibility/decision-date')
  } else if (hasapplicant === 'company') {
    res.redirect('/'+ version +'/eligibility/decision-date')
  } else if (hasapplicant === 'agent') {
    res.redirect('/'+ version +'/eligibility/decision-date')
  } else if (hasapplicant === 'out') {
    res.redirect('/'+ version +'/eligibility/applicant-out')
  } else {
    res.redirect('/'+ version +'/eligibility/applicant-error')
  }
})



router.post('/consent-eligibility-' + version, function (req, res) {
  let hasconsent = req.session.data['how-contacted']

  if (hasconsent === 'yes') {
    res.redirect('/'+ version +'/eligibility/listed-building')
  } else if (hasconsent === 'no') {
    res.redirect('/'+ version +'/eligibility/out')
  } else {
    res.redirect('/'+ version +'/eligibility/consent-error')
  }
})

router.post('/listed-eligibility-' + version, function (req, res) {
  let haslisted = req.session.data['listed-building']

  if (haslisted === 'no') {
    res.redirect('/'+ version +'/eligibility/appeal-statement')
  } else if (haslisted === 'yes') {
    res.redirect('/'+ version +'/eligibility/listed-out')
  } else {
    res.redirect('/'+ version +'/eligibility/listed-error')
  }
})

router.post('/enforcement-eligibility-' + version, function (req, res) {
  let hasenforcement = req.session.data['enforcement-notice']

  if (hasenforcement === 'no') {
    res.redirect('/'+ version +'/eligibility/appeal-statement')
  } else if (hasenforcement === 'yes') {
    res.redirect('/'+ version +'/eligibility/enforcement-out')
  } else {
    res.redirect('/'+ version +'/eligibility/enforcement-error')
  }
})

router.post('/decision-eligibility-' + version, function (req, res) {
  let day = req.session.data['decision-date-day'],
      month = req.session.data['decision-date-month'],
      year = req.session.data['decision-date-year'];
   if(!day || !month  || !year) {
     res.redirect('/'+ version +'/eligibility/decision-date-error')
   }

  let date = moment(`${year}-${month}-${day}`, "Y-M-D", true);

  console.log(date.isValid());

  if(date.isValid() === false){
    res.redirect('/'+ version +'/eligibility/decision-date-error')
  } else{
    let checkDate = date.add(12, "weeks");
    let today = moment();
    if(checkDate.isBefore(today, "days")){

      req.session.data.deadlineDate = checkDate.format("D MMMM YYYY");
      res.redirect('/'+ version +'/eligibility/decision-date-out')
    } else {
      res.redirect('/'+ version +'/eligibility/planning-department')
    }
  } 

  
})

router.all('/' + version +'/eligibility/planning-department', function(req,res,next){
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

// SINGLE PAGE ELIGIBILITY
router.post('/eligibility-list-check-' + version, function (req, res) {
  let eligible = req.session.data['eligibility-list']

  if (Array.isArray(eligible) && eligible[0] === 'notapplicant') {
    res.redirect('/'+ version +'/eligibility/appeal-statement')
  } else {
    res.redirect('/'+ version +'/eligibility/eligibility-list-error')
  }
})

// SUBMISSION
router.post('/site-ownership-check-' + version, function (req, res) {
  let owner = req.session.data['site-owner-names']

  if (owner === 'no') {
    res.redirect('/'+ version +'/site-ownership-certb')
  } else {
    res.redirect('/'+ version +'/task-list')
  }
})

router.post('/grounds-check-' + version, function (req, res) {
  let sense = req.session.data['sense-check']

  if (Array.isArray(sense) && sense[0] === 'on') {
    res.redirect('/'+ version +'/supporting-documents')
  } else {
    res.redirect('/'+ version +'/grounds-of-appeal-error')
  }
})

router.post('/submission-check-' + version, function (req, res) {
  let agreed = req.session.data['appellant-confirmation']

  if (Array.isArray(agreed) && agreed[0] === 'on') {
    res.redirect('/'+ version +'/confirmation')
  } else {
    res.redirect('/'+ version +'/submission-error')
  }
})



module.exports = router