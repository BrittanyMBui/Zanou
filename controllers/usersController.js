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
    User.findById(req.params.userId, (err, foundUser)=>{
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
                res.redirect(`/users/${savedUser._id}`);
            });
        });
    });
});

// View One Entry
router.get('/:userId/entries/:id', (req, res)=>{
    const entryId = req.params.id;
    Entry.findById(entryId, (err, foundEntry)=>{
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
router.put('/:userId/entries/:entryId', (req, res)=>{
    const entryId = req.params.entryId;
    Entry.findByIdAndUpdate(entryId, req.body, (err, updatedEntry)=>{
        if (err) {
            console.log(`Error: ${err}`);
            return res.send('Page seems to be broken..');
        }
        const userId = req.params.userId;
        User.findById(userId, (err, foundUser)=>{
            if (err) {
                console.log(`Error: ${err}`);
            }

            res.redirect(`/users/${userId}`);
        });
    });
});

// Delete an Entry
router.delete('/:userId/entries/:entryId', (req, res)=>{
    const entryId = req.params.entryId;
    Entry.findByIdAndDelete(entryId, (err, deletedEntry)=>{
        if (err) {
            console.log(`Error: ${err}`);
            return res.send('Page seems to be broken..');
        }
        const userId = req.params.userId;
        User.findByIdAndUpdate(
            deletedEntry.user,
            { $pull: {entries: deletedEntry._id} },
            { new: true },
            (err, updatedUser)=>{
                if (err) {
                    console.log(err);
                }
                res.redirect(`/users/${userId}`);
            }
        )
    });
});


module.exports = router;