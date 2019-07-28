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
    console.log(typeof 'switch');
    if(!req.body.switch){
      res.send('Incomplete form values')
    }
    let item = req.body.switch;
    if(Array.isArray(item)){
      item = item.pop();
    } 
    Switch.findByIdAndUpdate(req.params.id, {
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
      switch: item,
      temperature : req.body.temperature 
    }, { new: true, useFindAndModify: false }, (err) => {
      if (err) throw (err);
    }).then(res.send('save hoooooooooo gaya!!'));
  })

  router.post('/save/tv/:id',function(req, res){
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
  if(!req.body.switch){
    res.send('Incomplete form values')
  }
  let item = req.body.switch;

  if(Array.isArray(item)){
    item = item.pop();
  }
    Speaker.findByIdAndUpdate(req.params.id, {
      switch: item,
      volume : req.body.volume,
    }, { new: true, useFindAndModify: false }, (err) => {
      if (err) throw (err);
    }).then(res.send('save hoooooooooo gaya!!'));
  })

  module.exports = router;

