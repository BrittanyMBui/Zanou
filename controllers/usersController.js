const express = require('express');
const { User, Entry } = require('../models');
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

// Log in with email and password
router.post('/login', (req, res)=>{
    const userEmail = req.body.email;
    User.findOne({email: userEmail}, (err, foundUser)=>{
        if (err) {
            console.log(`Error: ${err}`);
            return res.send('Page seems to be broken..');
        }
        if (!foundUser) {
            res.render('users/loginUser');
        }
        if(foundUser.password === req.body.password) {
            return res.redirect(`/users/${foundUser._id}`);
        }

        res.render('users/loginUser');
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

// Add New Entry Page
router.get('/:id/entries/new', (req, res)=>{
    res.render('entries/newEntry', {
        userId: req.params.id,
    });
});

// Post New Entry
router.post('/:userId/entries', (req, res)=>{
    Entry.create(req.body, (err, newEntry)=>{
        if (err) {
            console.log(err);
            return res.send('Page seems to be broken..');
        }

        User.findById(req.params.userId, (err, foundUser)=>{
            if (err) {
                console.log(err);
            }
            
            foundUser.entries.push(newEntry);

            foundUser.save((err, savedUser)=>{
                if (err) {
                    console.log(err);
                }
                res.redirect(`/users/${savedUser._id}`);
            });
        });
    });
});

// View One Entry
router.get('/:userId/entries/:id', (req, res)=>{
    const entryId = req.params.id;
    Entry.findById(entryId)
    .populate('user')
    .exec((err, foundEntry)=>{
        if (err) {
            console.log(`Error: ${err}`);
            return res.send('Page seems to be broken..');
        }
        
        User.findById(req.params.userId, (err, foundUser)=>{
            if (err) {
                console.log(err);
            }
            res.render('entries/showEntry', {
                entry: foundEntry,
            });
        });
    });
});

// Edit Entry
// router.get('/:userId/entries/:id/edit', (req, res)=>{
//     const entryId = req.params.id;
//     Entry.findById(entryId, (err, foundEntry)=>{
//         if (err) {
//             console.log(`Error: ${err}`);
//             return res.send('Page seems to be broken..');
//         }

//         User.findById(req.params.userId, (err, foundUser)=>{
//             if (err) {
//                 console.log(`Error: ${err}`);
//             }

//             res.render('entries/editEntry', {
//                 entry: foundEntry,
//             });
//         });
//     });
// });

module.exports = router;