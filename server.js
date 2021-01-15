const express = require('express');
const ejs = require('ejs');
require('./models/index');
const PORT = process.env.PORT || 4000;
const app = express();

app.set('view engine', 'ejs');

// MIDDLEWARE
app.use((req, res, next)=>{
    next();
});

// HOMEPAGE
app.get('/', (req, res)=>{
    res.render('homepage');
});



app.listen(PORT, ()=>{
    console.log(`Local host is listening at ${PORT}`);
});