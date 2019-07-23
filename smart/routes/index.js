const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Smart', home : 'active' });
});
/* GET appliances page. */
router.get('/appliance', function(req, res, next) {
  res.render('appliance', { title: 'Smart' , appliance : 'active' });
});
/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Smart', about : 'active' });
});
/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Smart' , contact : 'active' });
});


module.exports = router;
