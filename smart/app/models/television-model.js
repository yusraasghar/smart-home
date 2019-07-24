/* eslint-disable no-undef */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TelevisionSchema = new Schema({
  name: String,
  switch : Boolean,
  volume : Number,
  channel : Number
});

module.exports = mongoose.model('Television', TelevisionSchema);
