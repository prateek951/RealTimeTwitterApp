const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const hbs = require('hbs');
const ehbs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const config = require('./config/secret');
/*Init app*/
const app = express();

mongoose.Promise = global.Promise;

mongoose.connect(config.mongoURI)
.then(connection => console.log('Connected to MongoLab database'))
.catch(err => console.log('an error occured while trying to connect to the database'));

// mongodb://<dbuser>:<dbpassword>@ds259119.mlab.com:59119/twitclone
app.engine('.hbs',ehbs({defaultLayout: 'layout',extname: '.hbs'}));
app.set('view engine','hbs');
app.use(express.static(path.join(__dirname + '/public')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret : config.TWIT_SECRET,
    store : new MongoStore({url : config.mongoURI,autoReconnect: true})
}));
app.use(flash());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
    // Setting up user as the global vars
    res.locals.user = req.user;
    next();
})
const mainRoutes = require('./routes/main');
const userRoutes = require('./routes/user');
app.use(mainRoutes);
app.use(userRoutes);

/*Server listen*/ 
const port = process.env.PORT || 1211;
app.listen(port,() => console.log(`Server running on port : ${port}`));

