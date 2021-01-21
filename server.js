const express = require('express');
const ejs = require('ejs');
require('./models/index');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const usersController = require('./controllers/usersController');

const PORT = process.env.PORT || 4000;
const app = express();

app.set('view engine', 'ejs');

// MIDDLEWARE
app.use((req, res, next)=>{
    next();
});
// BODY-PARSER
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'milo the barking dog',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 4,
  },
}));
// METHOD-OVERRIDE
app.use(methodOverride('_method'));
// CONTROLLERS
app.use('/users', usersController);
// STATIC ASSETS
app.use(express.static(`${__dirname}/public`));
// REMOVES 404 ERROR FAVICON
function ignoreFavicon(req, res, next) {
    if (req.originalUrl.includes('favicon.ico')) {
      res.status(204).end()
    }
    next();
  };
app.use(ignoreFavicon);
// SESSION


// HOMEPAGE
app.get('/', (req, res)=>{
  if (req.session.user) {
    res.redirect('/users/profile');
  }
    res.render('homepage');
});



app.listen(PORT, ()=>{
    console.log(`Local host is listening at ${PORT}`);
});