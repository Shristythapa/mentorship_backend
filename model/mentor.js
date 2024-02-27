const mongoose = require("mongoose")

const mentor = mongoose.Schema({
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
  mentorProfileInformation: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    address: {
      type: String,
    },
    skills: {
      type: [String],
    },
  },
  profileUrl: {
    type: String,
    trim: true,
    required:false
  },
});

const Mentor = mongoose.model('mentor',mentor)
module.exports=Mentor