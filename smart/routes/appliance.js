/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();

/* GET appliances page. */
router.get('/', function(req, res, next) {
    res.render('appliance', { title: 'Smart', app: 'active' });
  });

module.exports = router;