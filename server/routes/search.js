const express = require('express');
const mongoose = require('mongoose'); 
const router = express.Router();

require("../models/Video.js");

router.get('/', (req, res) => {
  Video
    .find("user": req.user)
    .populate('user', 'name')
    .then(result => res.send(result))
    .catch(err => console.log(err));
});

module.exports = router;