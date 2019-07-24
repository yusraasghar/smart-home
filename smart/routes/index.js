/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
// const Switch = require('../app/models/television-model');
// let devices;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Smart', home: 'active'});
});

// television Schema Create
// const television = new Switch({
//   name: 'Samsung',
//   switch : true,
//   volume : '35',  
//   channel : '14'
// });
// television.save().then(()=>{
//   console.log('saved !');
// })

module.exports = router;
