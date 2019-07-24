/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const Switch = require('../app/models/light-model');
const Air = require('../app/models/cooler-model');
const Sound = require('../app/models/speaker-model');
const Movie = require('../app/models/television-model');

// BEDROOM PAGE
// Retrive the devices
// router.get('/',function(req,res,next){
//     Switch.find().then((device) => {
//         devices = device;
//         res.render('index', { title: 'Dukaan', devices: devices });
//     })
//   });
  
  //  Update the light
  router.post('/save/:id', function (req, res) {
    console.log('saved successfully....');
    console.log(req.params);
    console.log(req.body);
    Switch.findByIdAndUpdate(req.params.id, {
        // name: req.body.name,
        switch: req.body.switch
    }, { new: true, useFindAndModify: false }, (err) => {
      if (err) throw (err);
    }).then(res.send('light band hogayi'));
  });   
  
  module.exports = router;