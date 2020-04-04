const mongoose = require('mongoose');
require("./User.js");

const videoSchema = mongoose.Schema({
  "title": {
    type: String,
    required: true
  },
  "description": String,
  "likes": {
      type: Number,
  },
  "uploaded": {
    type: Date,
    default: Date.now
  },
  "user": {
    "id": {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true
    },
    "name": String
  }
});

videoSchema.index({
    title: "text",
    description: "text",
    "user.name": "text",
  },
  {
    default_language: "none"
});

module.exports = Video = mongoose.model('Video', videoSchema);