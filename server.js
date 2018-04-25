const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const hbs = require('hbs');
const ehbs = require('express-handlebars');

/*Init app*/
const app = express();

app.get("/",(req, res) => res.send('Welcome to the Indexx Route'));

/*Server listen*/ 
const port = process.env.PORT || Math.floor(Math.random()*10000) + 1;
app.listen(port,() => console.log(`Server running on port : ${port}`));

