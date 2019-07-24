/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// const express = require('express');
// eslint-disable-next-line new-cap

const express = require('express');
const router = express.Router();
const Switch = require('../app/models/light_model');
const TV = require('../app/models/television_model');
const AC = require('../app/models/cooler_model');
const Speaker = require('../app/models/speaker_model')

router.post('/save/:id', function (req, res) {
    console.log('saved successfully!!!!');
    console.log(req.params);
    console.log(req.body);
    console.log(typeof 'switch');
    if(!req.body.switch){
      res.send('Incomplete form values')
    }

    let item = req.body.switch;

    if(Array.isArray(item)){
      item = item.pop();
    }
      
    Switch.findByIdAndUpdate(req.params.id, {
      // name : req.body.name,
      switch: item
    }, { new: true, useFindAndModify: false }, (err) => {
      if (err) throw (err);
    }).then(res.send('save hoooooooooo gaya!!'));
  });

  router.post('/save/ac/:id',function(req, res){
    console.log('saved successfully!!!!')
    console.log(req.params);
    console.log(req.body);
    
    if(!req.body.switch){
      res.send('Incomplete form values')
    }

    let item = req.body.switch;

    if(Array.isArray(item)){
      item = item.pop();
    }
    AC.findByIdAndUpdate(req.params.id, {
      // name : req.body.name,
      switch: item,
      temperature : req.body.temperature 
    }, { new: true, useFindAndModify: false }, (err) => {
      if (err) throw (err);
    }).then(res.send('save hoooooooooo gaya!!'));
  })

  router.post('/save/tv/:id',function(req, res){
  console.log('saved successfully!!!!')
  if(!req.body.switch){
    res.send('Incomplete form values')
  }

  let item = req.body.switch;

  if(Array.isArray(item)){
    item = item.pop();
  }
    TV.findByIdAndUpdate(req.params.id, {
      name : req.body.name,
      switch: item,
      volume : req.body.volume,
      channel : req.body.channel
    }, { new: true, useFindAndModify: false }, (err) => {
      if (err) throw (err);
    }).then(res.send('save hoooooooooo gaya!!'));
  });

  router.post('/save/sono/:id',function(req, res){
    console.log('saved successfully!!!!')
  if(!req.body.switch){
    res.send('Incomplete form values')
  }
  let item = req.body.switch;

  if(Array.isArray(item)){
    item = item.pop();
  }
    Speaker.findByIdAndUpdate(req.params.id, {
     // name : req.body.name,
      switch: item,
      volume : req.body.volume,
    }, { new: true, useFindAndModify: false }, (err) => {
      if (err) throw (err);
    }).then(res.send('save hoooooooooo gaya!!'));
  })

  module.exports = router;

// const router = express.Router();
//const Switch = require('../app/models/light_model');
// const Air = require('../app/models/cooler-model');
// const Sound = require('../app/models/speaker-model');
// const Movie = require('../app/models/television-model');

// BEDROOM PAGE
// Retrive the devices
// router.get('/',function(req,res,next){
//     Switch.find().then((device) => {
//         devices = device;
//         res.render('index', { title: 'Dukaan', devices: devices });
//     })
//   });
  
  //  Update the light
  // router.post('/save/:id', function (req, res) {
  //   console.log('saved successfully....');
  //   console.log(req.params);
  //   console.log(req.body);
  //   Switch.findByIdAndUpdate(req.params.id, {
        // name: req.body.name,
  //       switch: req.body.switch
  //   }, { new: true, useFindAndModify: false }, (err) => {
  //     if (err) throw (err);
  //   }).then(res.send('light band hogayi'));
  // });   
  
  // module.exports = router;