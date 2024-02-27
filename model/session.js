  const mongoose = require("mongoose");
const Mentor = require("./mentor");

  // Define a custom Mongoose schema type for time
  const TimeType = {};

  const session = mongoose.Schema({
    mentorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:Mentor,
      required: true,
    },
    mentor: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      required: true,
      type: String,
     
    },

    endTime: {
      required: true,
      type: String,

    },

    attendesSigned: {
      type: [
        {
          email: {
            type: String,
            required: true,
          },
        },
      ],
      default: [],
    },
    noOfAttendesSigned: {
      type: Number,
      default: 0,
    },
    maxNumberOfAttendesTaking: {
      type: Number,
      required: true,
    },

    isOngoing: {
      type: Boolean,
      default: false,
    },
  });

  const Session = mongoose.model("Session", session);
  module.exports = Session;
