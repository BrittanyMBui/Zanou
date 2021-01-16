const express = require('express');
const ejs = require('ejs');
require('./models/index');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const usersController = require('./controllers/usersController');

const PORT = process.env.PORT || 4000;
const app = express();

app.set('view engine', 'ejs');

// MIDDLEWARE
app.use((req, res, next)=>{
    next();
});
// BODY-PARSER
app.use(bodyParser.urlencoded({ extended: false }));
// METHOD-OVERRIDE
app.use(methodOverride('_method'));
// CONTROLLERS
app.use('/users', usersController);
// STATIC ASSETS
app.use(express.static(`${__dirname}/public`));

// HOMEPAGE
app.get('/', (req, res)=>{
    res.render('homepage');
});



app.listen(PORT, ()=>{
    console.log(`Local host is listening at ${PORT}`);
});