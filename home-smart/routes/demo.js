/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const Switch = require('../app/models/light_model');
const TV = require('../app/models/television_model');
const AC = require('../app/models/cooler_model');
const Speaker = require('../app/models/speaker_model')

/* GET demo page. */
router.get('/', function(req, res, next) {
  let formsData=[];
  // TODO!! Fetch all items from the DB and pass them to index.ejs
  Switch.find().then(data => {
    formsData=[...formsData,...data];
    TV.find().then(data => {
      formsData=[...formsData,...data];
      AC.find().then(data => {
        formsData=[...formsData,...data];
      Speaker.find().then(data => {
        formsData=[...formsData,...data];
    res.render('demo', { title: 'Smart', demo: 'active', formsData ,
    host: process.env.URL || 'http://localhost:7860'});
    console.log(formsData)
  })
})
    })
}).catch(err => {
    console.log( err.message || "Some error occurred while retrieving notes.");
});
  });

  module.exports = router;