const express = require('express')
const router = express.Router()

var NotifyClient = require('notifications-node-client').NotifyClient,
    notify = new NotifyClient(process.env.NOTIFYAPIKEY);

const fs = require('fs');
const request = require('request');

const moment = require("moment")
// Add your routes here - above the module.exports line

// V1

router.post('/lpa-decision-check', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let lpa = req.session.data['lpa-decision']

  if (lpa === 'no') {
    res.redirect('/lpa-details-decision-error')
  } else {
    res.redirect('/upload-decision')
  }
})

router.post('/agricultural-check', function (req, res) {
  let holding = req.session.data['agri-holding']

  if (holding === 'yes') {
    res.redirect('/v1/agricultural-ownership')
  } else {
    res.redirect('/v1/task-list')
  }
})

router.post('/agricultural-ownership-check', function (req, res) {
  let holding2 = req.session.data['agri-holding-2']

  if (holding2 === 'no') {
    res.redirect('/v1/notification-agriculture')
  } else {
    res.redirect('/v1/task-list')
  }
})

router.post('/grounds-check', function (req, res) {
  let sense = req.session.data['sense-check']

  if (Array.isArray(sense) && sense[0] === 'on') {
    res.redirect('/v1/supporting-documents')
  } else {
    res.redirect('/v1/grounds-of-appeal-error')
  }
})

router.post('/submission-check', function (req, res) {
  let agreed = req.session.data['appellant-confirmation']

  if (Array.isArray(agreed) && agreed[0] === 'on') {
    res.redirect('/v1/confirmation')
  } else {
    res.redirect('/v1/submission-error')
  }
})

// ELIGIBILITY

router.post('/applicant-eligibility', function (req, res) {
  let hasapplicant = req.session.data['how-contacted']

  if (hasapplicant === 'me') {
    res.redirect('/v1/eligibility/decision-date')
  } else if (hasapplicant === 'company') {
    res.redirect('/v1/eligibility/decision-date')
  } else if (hasapplicant === 'agent') {
    res.redirect('/v1/eligibility/decision-date')
  } else if (hasapplicant === 'out') {
    res.redirect('/v1/eligibility/applicant-out')
  } else {
    res.redirect('/v1/eligibility/applicant-error')
  }
})

router.post('/consent-eligibility', function (req, res) {
  let hasconsent = req.session.data['how-contacted']

  if (hasconsent === 'yes') {
    res.redirect('/v1/eligibility/listed-building')
  } else if (hasconsent === 'no') {
    res.redirect('/v1/eligibility/out')
  } else {
    res.redirect('/v1/eligibility/consent-error')
  }
})

router.post('/listed-eligibility', function (req, res) {
  let haslisted = req.session.data['listed-building']

  if (haslisted === 'no') {
    res.redirect('/v1/eligibility/enforcement')
  } else if (haslisted === 'yes') {
    res.redirect('/v1/eligibility/out')
  } else {
    res.redirect('/v1/eligibility/listed-error')
  }
})

router.post('/enforcement-eligibility', function (req, res) {
  let hasenforcement = req.session.data['enforcement']

  if (hasenforcement === 'no') {
    res.redirect('/v1/eligibility/appeal-statement')
  } else if (hasenforcement === 'yes') {
    res.redirect('/v1/eligibility/out')
  } else {
    res.redirect('/v1/eligibility/enforcement-error')
  }
})

router.post('/decision-eligibility', function (req, res) {
  let date = req.session.data['decision-date-year']

  if (date === '2020') {
    res.redirect('/v1/eligibility/consent')
  } else if (date === '2019') {
    res.redirect('/v1/eligibility/decision-date-out')
  } else {
    res.redirect('/v1/eligibility/decision-date-error')
  }
})


// V2

router.post('/site-ownership-check-v2', function (req, res) {
  let owner = req.session.data['site-owner-names']

  if (owner === 'no') {
    res.redirect('/v2/site-ownership-certb')
  } else {
    res.redirect('/v2/notification')
  }
})

router.post('/grounds-check-v2', function (req, res) {
  let sense = req.session.data['sense-check']

  if (Array.isArray(sense) && sense[0] === 'on') {
    res.redirect('/v2/supporting-documents')
  } else {
    res.redirect('/v2/grounds-of-appeal-error')
  }
})

router.post('/submission-check-v2', function (req, res) {
  let agreed = req.session.data['appellant-confirmation']

  if (Array.isArray(agreed) && agreed[0] === 'on') {
    res.redirect('/v2/confirmation')
  } else {
    res.redirect('/v2/submission-error')
  }
})

router.post('/agricultural-check-v2', function (req, res) {
  let holding = req.session.data['agri-holding']

  if (holding === 'yes') {
    res.redirect('/v2/agricultural-ownership')
  } else {
    res.redirect('/v2/task-list')
  }
})

router.post('/agricultural-ownership-check-v2', function (req, res) {
  let holding2 = req.session.data['agri-holding-2']

  if (holding2 === 'no') {
    res.redirect('/v2/notification-agriculture')
  } else {
    res.redirect('/v2/task-list')
  }
})


// VERSION 3
// ELIGIBILITY
router.post('/applicant-eligibility-v3', function (req, res) {
  let hasapplicant = req.session.data['appeal-relationship']

  if (hasapplicant === 'me') {
    res.redirect('/v3/eligibility/decision-date')
  } else if (hasapplicant === 'company') {
    res.redirect('/v3/eligibility/decision-date')
  } else if (hasapplicant === 'agent') {
    res.redirect('/v3/eligibility/decision-date')
  } else if (hasapplicant === 'out') {
    res.redirect('/v3/eligibility/applicant-out')
  } else {
    res.redirect('/v3/eligibility/applicant-error')
  }
})

router.post('/consent-eligibility-v3', function (req, res) {
  let hasconsent = req.session.data['how-contacted']

  if (hasconsent === 'yes') {
    res.redirect('/v3/eligibility/listed-building')
  } else if (hasconsent === 'no') {
    res.redirect('/v3/eligibility/out')
  } else {
    res.redirect('/v3/eligibility/consent-error')
  }
})

router.post('/listed-eligibility-v3', function (req, res) {
  let haslisted = req.session.data['listed-building']

  if (haslisted === 'no') {
    res.redirect('/v3/eligibility/enforcement')
  } else if (haslisted === 'yes') {
    res.redirect('/v3/eligibility/out')
  } else {
    res.redirect('/v3/eligibility/listed-error')
  }
})

router.post('/enforcement-eligibility-v3', function (req, res) {
  let hasenforcement = req.session.data['enforcement']

  if (hasenforcement === 'no') {
    res.redirect('/v3/eligibility/appeal-statement')
  } else if (hasenforcement === 'yes') {
    res.redirect('/v3/eligibility/out')
  } else {
    res.redirect('/v3/eligibility/enforcement-error')
  }
})

router.post('/decision-eligibility-v3', function (req, res) {
  let date = req.session.data['decision-date-year']

  if (date === '2020') {
    res.redirect('/v3/eligibility/consent')
  } else if (date === '2019') {
    res.redirect('/v3/eligibility/decision-date-out')
  } else {
    res.redirect('/v3/eligibility/decision-date-error')
  }
})

// SUBMISSION
router.post('/site-ownership-check-v3', function (req, res) {
  let owner = req.session.data['site-owner-names']

  if (owner === 'no') {
    res.redirect('/v3/site-ownership-certb')
  } else {
    res.redirect('/v3/task-list')
  }
})

router.post('/grounds-check-v3', function (req, res) {
  let sense = req.session.data['sense-check']

  if (Array.isArray(sense) && sense[0] === 'on') {
    res.redirect('/v3/supporting-documents')
  } else {
    res.redirect('/v3/grounds-of-appeal-error')
  }
})

router.post('/submission-check-v3', function (req, res) {
  let agreed = req.session.data['appellant-confirmation']

  if (Array.isArray(agreed) && agreed[0] === 'on') {
    res.redirect('/v3/confirmation')
  } else {
    res.redirect('/v3/submission-error')
  }
})


// SAVE AND RETURN
router.post('/save-return-check', function (req, res) {
  let savelog = req.session.data['return-input']

  if (savelog === '12345678abcd') {
    res.redirect('/save-return/task-list')
  } else {
    res.redirect('/save-return/save-return-error')
  }
})


// SAVE RETURN V2
router.post('/return-info-check', function (req, res) {
  let returnemail = req.session.data['return-email']

  if (returnemail === '') {
    res.redirect('/v4/save-return/return-info-error')
  } else {
    res.redirect('/v4/save-return/save-confirmation')
  }
})

router.post('/save-return-check-v2', function (req, res) {
  let savelog = req.session.data['return-input']

  if (savelog === '1234ab') {
    res.redirect('/v4/task-list')
  } else {
    res.redirect('/v4/save-return/save-return-error')
  }
})

// The URL here needs to match the URL of the page that the user is on
// when they type in their email address
router.post('/save-return/return-info', function (req, res) {

  notify.sendEmail(
    // this long string is the template ID, copy it from the template
    // page in GOV.UK Notify. It’s not a secret so it’s fine to put it
    // in your code.
    'bd5cd68c-b4cb-4d87-a10c-88f964da07b3',
    // `emailAddress` here needs to match the name of the form field in
    // your HTML page
    req.body.emailAddress
  );

  // This is the URL the users will be redirected to once the email
  // has been sent
  res.redirect('/save-return/save-confirmation');

});

// SAVE RETURN V5
router.post('/return-info-check-v5', function (req, res) {
  let returnemail = req.session.data['appellant-email']
  let returnnumber = req.session.data['application-number']

  if (returnemail === '') {
    res.redirect('/v5/save-return/return-info-error')
  } else if (returnnumber === '') {
    res.redirect('/v5/save-return/return-info-error')
  } else {
    res.redirect('/v5/save-return/save-confirmation')
  }
})


// VERSION 4
// ELIGIBILITY
router.post('/applicant-eligibility-v4', function (req, res) {
  let hasapplicant = req.session.data['appeal-relationship']

  if (hasapplicant === 'me') {
    res.redirect('/v4/eligibility/decision-date')
  } else if (hasapplicant === 'company') {
    res.redirect('/v4/eligibility/decision-date')
  } else if (hasapplicant === 'agent') {
    res.redirect('/v4/eligibility/decision-date')
  } else if (hasapplicant === 'out') {
    res.redirect('/v4/eligibility/applicant-out')
  } else {
    res.redirect('/v4/eligibility/applicant-error')
  }
})

router.post('/consent-eligibility-v4', function (req, res) {
  let hasconsent = req.session.data['how-contacted']

  if (hasconsent === 'yes') {
    res.redirect('/v4/eligibility/listed-building')
  } else if (hasconsent === 'no') {
    res.redirect('/v4/eligibility/out')
  } else {
    res.redirect('/v4/eligibility/consent-error')
  }
})

router.post('/listed-eligibility-v4', function (req, res) {
  let haslisted = req.session.data['listed-building']

  if (haslisted === 'no') {
    res.redirect('/v4/eligibility/enforcement')
  } else if (haslisted === 'yes') {
    res.redirect('/v4/eligibility/listed-out')
  } else {
    res.redirect('/v4/eligibility/listed-error')
  }
})

router.post('/enforcement-eligibility-v4', function (req, res) {
  let hasenforcement = req.session.data['enforcement-notice']

  if (hasenforcement === 'no') {
    res.redirect('/v4/eligibility/appeal-statement')
  } else if (hasenforcement === 'yes') {
    res.redirect('/v4/eligibility/enforcement-out')
  } else {
    res.redirect('/v4/eligibility/enforcement-error')
  }
})

router.post('/decision-eligibility-v4', function (req, res) {
  let date = req.session.data['decision-date-year']

  if (date === '2020') {
    res.redirect('/v4/eligibility/consent')
  } else if (date === '2019') {
    res.redirect('/v4/eligibility/decision-date-out')
  } else {
    res.redirect('/v4/eligibility/decision-date-error')
  }
})

// SINGLE PAGE ELIGIBILITY
router.post('/eligibility-list-check-v4', function (req, res) {
  let eligible = req.session.data['eligibility-list']

  if (Array.isArray(eligible) && eligible[0] === 'notapplicant') {
    res.redirect('/v4/eligibility/appeal-statement')
  } else {
    res.redirect('/v4/eligibility/eligibility-list-error')
  }
})


// SUBMISSION
router.post('/site-ownership-check-v4', function (req, res) {
  let owner = req.session.data['site-owner-names']

  if (owner === 'no') {
    res.redirect('/v4/site-ownership-certb')
  } else {
    res.redirect('/v4/task-list')
  }
})

router.post('/grounds-check-v4', function (req, res) {
  let sense = req.session.data['sense-check']

  if (Array.isArray(sense) && sense[0] === 'on') {
    res.redirect('/v4/supporting-documents')
  } else {
    res.redirect('/v4/grounds-of-appeal-error')
  }
})

router.post('/submission-check-v4', function (req, res) {
  let agreed = req.session.data['appellant-confirmation']

  if (Array.isArray(agreed) && agreed[0] === 'on') {
    res.redirect('/v4/confirmation')
  } else {
    res.redirect('/v4/submission-error')
  }
})


// VERSION 5
// ELIGIBILITY

router.post('/planning-eligibility-v5', function(req, res, next){
  let dept = req.body['planning-department'];
  console.log(dept)
  if(dept === 'ESX' || dept === 'WSX' || dept === 'KEN') {
    req.session.data.planningError = false;
    res.redirect('/v5/eligibility/applicant')
  } else if (dept === ""){
    req.session.data.planningError = true;
    res.redirect('/v5/eligibility/planning-department')
  } else {
    req.session.data.planningError = false;
    res.redirect('/v5/eligibility/planning-department-out')
  }
})


router.post('/applicant-eligibility-v5', function (req, res) {
  let hasapplicant = req.session.data['appeal-relationship']

  if (hasapplicant === 'me') {
    res.redirect('/v5/eligibility/decision-date')
  } else if (hasapplicant === 'company') {
    res.redirect('/v5/eligibility/decision-date')
  } else if (hasapplicant === 'agent') {
    res.redirect('/v5/eligibility/decision-date')
  } else if (hasapplicant === 'out') {
    res.redirect('/v5/eligibility/applicant-out')
  } else {
    res.redirect('/v5/eligibility/applicant-error')
  }
})



router.post('/consent-eligibility-v5', function (req, res) {
  let hasconsent = req.session.data['how-contacted']

  if (hasconsent === 'yes') {
    res.redirect('/v5/eligibility/listed-building')
  } else if (hasconsent === 'no') {
    res.redirect('/v5/eligibility/out')
  } else {
    res.redirect('/v5/eligibility/consent-error')
  }
})

router.post('/listed-eligibility-v5', function (req, res) {
  let haslisted = req.session.data['listed-building']

  if (haslisted === 'no') {
    res.redirect('/v5/eligibility/enforcement')
  } else if (haslisted === 'yes') {
    res.redirect('/v5/eligibility/listed-out')
  } else {
    res.redirect('/v5/eligibility/listed-error')
  }
})

router.post('/enforcement-eligibility-v5', function (req, res) {
  let hasenforcement = req.session.data['enforcement-notice']

  if (hasenforcement === 'no') {
    res.redirect('/v5/eligibility/appeal-statement')
  } else if (hasenforcement === 'yes') {
    res.redirect('/v5/eligibility/enforcement-out')
  } else {
    res.redirect('/v5/eligibility/enforcement-error')
  }
})

router.post('/decision-eligibility-v5', function (req, res) {
  let day = req.session.data['decision-date-day'],
      month = req.session.data['decision-date-month'],
      year = req.session.data['decision-date-year'];
   if(!day || !month  || !year) {
     res.redirect('/v5/eligibility/decision-date-error')
   }

  let date = moment(`${year}-${month}-${day}`, "Y-M-D", true);

  console.log(date.isValid());

  if(date.isValid() === false){
    res.redirect('/v5/eligibility/decision-date-error')
  } else{
    let checkDate = date.add(12, "weeks");
    let today = moment();
    if(checkDate.isBefore(today, "days")){

      req.session.data.deadlineDate = checkDate.format("D MMMM YYYY");
      res.redirect('/v5/eligibility/decision-date-out')
    } else {
      res.redirect('/v5/eligibility/consent')
    }
  } 

  
})

router.all("/v5/eligibility/planning-department", function(req,res,next){
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
router.post('/eligibility-list-check-v5', function (req, res) {
  let eligible = req.session.data['eligibility-list']

  if (Array.isArray(eligible) && eligible[0] === 'notapplicant') {
    res.redirect('/v5/eligibility/appeal-statement')
  } else {
    res.redirect('/v5/eligibility/eligibility-list-error')
  }
})





// SUBMISSION
router.post('/site-ownership-check-v5', function (req, res) {
  let owner = req.session.data['site-owner-names']

  if (owner === 'no') {
    res.redirect('/v5/site-ownership-certb')
  } else {
    res.redirect('/v5/task-list')
  }
})

router.post('/grounds-check-v5', function (req, res) {
  let sense = req.session.data['sense-check']

  if (Array.isArray(sense) && sense[0] === 'on') {
    res.redirect('/v5/supporting-documents')
  } else {
    res.redirect('/v5/grounds-of-appeal-error')
  }
})

router.post('/submission-check-v5', function (req, res) {
  let agreed = req.session.data['appellant-confirmation']

  if (Array.isArray(agreed) && agreed[0] === 'on') {
    res.redirect('/v5/confirmation')
  } else {
    res.redirect('/v5/submission-error')
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


router.post("/appeal-wtih-reference/send-letter/summary", function(req, res, next){

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
