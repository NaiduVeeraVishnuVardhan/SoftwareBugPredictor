const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  date: Date,
  ownerId: String,
  name: String
});
  
module.exports = mongoose.model('result', ResultSchema);