/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();

/* GET contact page. */
router.get('/', function(req, res, next) {
    res.render('contact', { title: 'Smart', contact: 'active' });
  });

router.post('/form', function(req,res,next){
  res.end('OK');
});
module.exports = router;