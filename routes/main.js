const express = require('express');
// const bodyParser = require('body-parser');
const User = require('../models/user');
const router = express.Router();

/*@route GET request for the '/' route*/ 
/*@desc To render the main handlebars template as the view*/ 
/*@access Public*/

router.get('/',(req, res) => res.render('main/landing'));

/*@route POST request for the /new route*/ 
/*@desc Create a new user/ 
/*@access Public*/

router.post('/new',(req, res) => {

    /*Tap the values of input fields pertaining to the user*/
    new User(req.body).save().then(user => res.json(user))
    .catch(err => res.status(500).json(err));
});


module.exports = router;