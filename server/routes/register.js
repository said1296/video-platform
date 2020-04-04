const express = require('express');
const mongoose = require('mongoose'); 
const router = express.Router();

require("../models/User.js");

router.post('/', (req, res) => {
    console.log(req.body);
    const newUser = new User(req.body);
    newUser.save(err => (err) ? console.log(err) : console.log("Registered"));
});

module.exports = router;