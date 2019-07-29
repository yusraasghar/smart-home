/* eslint-disable no-undef */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LightSchema = new Schema({
  name: String,
  switch : Boolean
});

module.exports = mongoose.model('Light', LightSchema);
