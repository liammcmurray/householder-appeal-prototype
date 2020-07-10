const express = require('express')
const router = express.Router()
const fs = require('fs');
// Add your routes here - above the module.exports line

module.exports = router


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
    res.redirect('/v2/task-list-34complete')
  }
})

router.post('/agricultural-ownership-check-v2', function (req, res) {
  let holding2 = req.session.data['agri-holding-2']

  if (holding2 === 'no') {
    res.redirect('/v2/notification-agriculture')
  } else {
    res.redirect('/v2/task-list-34complete')
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

router.all("/select-council", function(req,res,next){
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
