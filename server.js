const express = require('express');
const ejs = require('ejs');
const PORT = process.env.PORT || 4000;
const app = express();

app.set('view engine', 'ejs');

// MIDDLEWARE
app.use((req, res, next)=>{
    next();
});

app.get('/', (req, res)=>{
    res.send('home route');
});



app.listen(PORT, ()=>{
    console.log(`Local host is listening at ${PORT}`);
});