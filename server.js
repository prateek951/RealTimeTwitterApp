const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const hbs = require('hbs');
const ehbs = require('express-handlebars');

/*Init app*/
const app = express();

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
const port = process.env.PORT || Math.floor(Math.random()*10000) + 1;
app.listen(port,() => console.log(`Server running on port : ${port}`));

