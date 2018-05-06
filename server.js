const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const eHbs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const passport = require('passport');
const passportSocketIO = require('passport.socketio');
const cookieParser = require('cookie-parser');
const config = require('./config/secret');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const sessionStore = new MongoStore({url : config.mongoURI,autoReconnect: true});

mongoose.Promise = global.Promise;

mongoose.connect(config.mongoURI)
.then(connection => console.log('connected to the database with success'))
.catch(err => console.log(err));

app.engine('.hbs',eHbs({defaultLayout: 'layout',extname: '.hbs'}));
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: config.secret,
    store: sessionStore
}));
app.use(flash());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res, next){
    res.locals.user = req.user;
    next();
});
io.use(passportSocketIO.authorize({
    cookieParser:cookieParser,
    key:'connect.sid',
    secret:config.secret,
    store:sessionStore,
    success:onAuthorizeSuccess,
    fail:onAuthorizeFail
}));

function onAuthorizeSuccess(data,accept){
    console.log('successful connection');
    accept();
}
function onAuthorizeFail(data,message,error,accept){
    console.log('failure in connection');
    if(error)
        accept(new Error(message));
}
require('./realtime/io')(io);

const mainRoutes = require('./routes/main');
const userRoutes = require('./routes/user');

app.use(mainRoutes);
app.use(userRoutes);

const port = process.env.PORT || 3544;
http.listen(port,() => console.log(`Server running on port: ${port}`));


