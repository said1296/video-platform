const express = require('express');
const mongoose = require('mongoose'); 
const router = express.Router();

require("../models/User.js");

router.post('/', (req, res) => {
    const { user, password } = req.body;
    User.findOne({ user: user }, function(err, user){
        if(err){
            res.status(500).json({
                error: 'Internal error'
            })
        }else if (!user){
            res.status(401).json({
                error: "User doesn't exist"
            })
        }else{
            user.checkPassword(password, function(err, correct){
                if(err){
                    res.status(500).json({
                        error: 'Internal error'
                    })
                }else if(!correct){
                    res.status(401).json({
                        error: "Incorrect password"
                    })
                }else{
                    res.status(200).json({});
                }
            })
        }
    });
});

module.exports = router;