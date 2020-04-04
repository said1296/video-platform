const express = require('express');
const mongoose = require('mongoose'); 
const router = express.Router();

require("../models/Video.js");

router.post('/', (req, res) => {
  var query = {}
  var queryRegex = new RegExp(".*"+req.body.query+".*");

  if(req.body.query!=""){
    Video
    .find({$text: {
      $search: req.body.query
    }},
    { 
      "score": {"$meta": "textScore" } 
    }
    ).sort({ "score": { "$meta": "textScore" } })
    .then(result => res.send(result))
    .catch(err => console.log(err));
  }else{
    Video
    .find({})
    .then(result => res.send(result))
    .catch(err => console.log(err));
  }


});

/*
router.post('/', (req, res) => {
  const newVideo = new Video({
    "title": req.body.title
  })
  newVideo
    .save()
    .then( result => res.json(result) )
    .catch( err => console.log(err) );
});

*/

module.exports = router;