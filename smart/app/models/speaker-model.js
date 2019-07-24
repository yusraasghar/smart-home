/* eslint-disable no-undef */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpeakerSchema = new Schema({
  name: String,
  switch : Boolean,
  volume : Number
});

module.exports = mongoose.model('Speaker', SpeakerSchema);
