const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const hbs = require('hbs');
const ehbs = require('express-handlebars');
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

app.get("/",(req, res) => res.send('Welcome to the Indexx Route'));

const mainRoutes = require('./routes/main');
app.use('/test',mainRoutes);


/*Server listen*/ 
const port = process.env.PORT || 1211;
app.listen(port,() => console.log(`Server running on port : ${port}`));

