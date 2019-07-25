/* eslint-disable no-undef */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoolerSchema = new Schema({
  name: String,
  switch : Boolean,
  temperature : Number
});

module.exports = mongoose.model('Air Conditioner', CoolerSchema);
