/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Smart', home: 'active' });
});
module.exports = router;
