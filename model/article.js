const mongoose = require("mongoose");
const Mentor = require("./mentor");

const article = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  mentorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Mentor,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  mentorName: {
    type: String,
    required: true,
  },
  mentorEmail: {
    type: String,
    required: true,
  },
  profileUrl: {
    type: String,
    required: true,
  },
});

const Article = mongoose.model("article", article);
module.exports = Article;
