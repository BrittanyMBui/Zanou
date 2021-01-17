const express = require('express');
const { User } = require('../models');
const router = express.Router();


// Create an Account
router.get('/new', (req, res)=>{
    res.render('users/newUser');
});

// Log into an account
router.get('/login', (req, res)=>{
    res.render('users/loginUser');
});

// Post new Account
router.post('/', (req, res)=>{
    User.create(req.body, (err, newUser)=>{
        if (err) {
            console.log(`Error: ${err}`);
            res.send('This page seems to be broken..');
        }
        res.redirect('/users/login');
    });
});


// User Profile after login
router.get('/:id', (req, res)=>{
    const userId = req.params.id;
    User.findById(userId).populate('entries').exec((err, foundUser)=>{
        if (err) {
            console.log(`Error: ${err}`);
            res.send('This page seems to be broken..');
        }
        res.render('users/profileUser', {
            user: foundUser,
        });
    });
});

module.exports = router;