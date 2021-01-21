const express = require('express');
const { User, Entry } = require('../models');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const router = express.Router();


// Render Create an Account Page
router.get('/new', (req, res)=>{
    res.render('users/newUser');
});

// Render Log Into Account Page
router.get('/login', (req, res)=>{
    res.render('users/loginUser');
});

// Create New Account
router.post('/',
body('email').isEmail().withMessage('Not a valid email'),
body('confirmPassword').custom((value, { req })=>{
    if (value !== req.body.password) {
        throw new Error('Password does not match');
    }
    return true;
}),
(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send(errors)
    }

    bcrypt.genSalt(10, (err, salt)=>{
        if (err) {
            return console.log(err)
        }

        bcrypt.hash(req.body.password, salt, (err, hashedPassword)=>{
            const newUser = {
                username: req.body.username,
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            }

            User.create(newUser, (err, createdUser)=>{
                if (err) {
                    console.log(`Error: ${err}`);
                    res.send('This page seems to be broken..');
                }

                res.redirect('/users/login');
            })
        })
    })
});

// Log in with email and password
router.post('/login', (req, res)=>{

    User.findOne({ email: req.body.email }, (err, foundUser)=>{
        if (err) {
            console.log(`Error: ${err}`);
        }
        if (!foundUser) {
            return res.redirect('/users/login');
        }

        bcrypt.compare(req.body.password, foundUser.password, (err, result)=>{
            if (err) {
                console.log(`Error: ${err}`);
            }
            if (result) {
                req.session.user = foundUser;
                res.redirect('/users/profile');
            }
            else {
                res.redirect('/users/login');
            }
        })
    });
});

// User Profile after login
router.get('/profile', (req, res)=>{
    if(!req.session.user) {
        res.redirect('/users/login');
    }

    User.findById(req.session.user._id).populate('entries').exec((err, foundUser)=>{
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
router.get('/profile/entries/new', (req, res)=>{
    res.render('entries/newEntry', {
        userId: req.params.id,
    });
});

// Post New Entry
router.post('/profile/entries', (req, res)=>{
    User.findById(req.session.user._id, (err, foundUser)=>{
        if (err) {
            console.log(`Error: ${err}`);
            return res.send('Page seems to be broken..');
        }
        const context = {
            title: req.body.title,
            body: req.body.body,
            user: foundUser._id,
        };
        Entry.create(context, (err, newEntry)=>{
            if (err) {
                console.log(err);
                return res.send('Page seems to be broken..');
            }
            foundUser.entries.push(newEntry);

            foundUser.save((err, savedUser)=>{
                if (err) {
                    console.log(err);
                }
                res.redirect('/users/profile');
            });
        });
    });
});

// View One Entry
router.get('/profile/entries/:id', (req, res)=>{
    const entryId = req.params.id;
    Entry.findById(entryId, (err, foundEntry)=>{
        if (err) {
            console.log(`Error: ${err}`);
            return res.send('Page seems to be broken..');
        }
        
        User.findById(req.session.user._id, (err, foundUser)=>{
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
router.get('/:userId/entries/:entryId/edit', (req, res)=>{
    Entry.findById(req.params.entryId, (err, foundEntry)=>{
        if (err) {
            console.log(`Error: ${err}`);
            return res.send('Page seems to be broken..');
        }

        User.findById(req.params.userId, (err, foundUser)=>{
            if (err) {
                console.log(`Error: ${err}`);
            }

            res.render('entries/editEntry', {
                entry: foundEntry,
            });
        });
    });
});

// Post Edit
router.put('/profile/entries/:entryId', (req, res)=>{
    const entryId = req.params.entryId;
    Entry.findByIdAndUpdate(entryId, req.body, (err, updatedEntry)=>{
        if (err) {
            console.log(`Error: ${err}`);
            return res.send('Page seems to be broken..');
        }

        User.findById(req.session.user._id, (err, foundUser)=>{
            if (err) {
                console.log(`Error: ${err}`);
            }

            res.redirect('/users/profile');
        });
    });
});

// Delete an Entry
router.delete('/profile/entries/:entryId', (req, res)=>{
    const entryId = req.params.entryId;
    Entry.findByIdAndDelete(entryId, (err, deletedEntry)=>{
        if (err) {
            console.log(`Error: ${err}`);
            return res.send('Page seems to be broken..');
        }

        User.findByIdAndUpdate(
            deletedEntry.user,
            { $pull: {entries: deletedEntry._id} },
            { new: true },
            (err, updatedUser)=>{
                if (err) {
                    console.log(err);
                }
                res.redirect('/users/profile');
            }
        )
    });
});

// Log Out
router.get('/profile/logout', (req, res)=>{
    req.session.destroy((err)=>{
        if (err) {
            console.log(`Error: ${err}`);
        }

        res.redirect('/');
    })
});


module.exports = router;