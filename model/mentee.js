const mongoose = require("mongoose")

const mentee = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  profileUrl: {
    type: String,
    trim: true,
    required: false
  },
});

const Mentee = mongoose.model('mentees',mentee)
module.exports=Mentee;