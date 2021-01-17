const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    res.send('users route');
});

router.get('/new', (req, res)=>{
    res.render('users/newUser');
});

router.get('/login', (req, res)=>{
    res.render('users/loginUser');
})

module.exports = router;