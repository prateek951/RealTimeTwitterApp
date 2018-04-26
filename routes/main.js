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
    
    const user = new User();
    user.email = req.body.username;
    user.password = req.body.password;
    user.name = req.body.name;
    user.save().then(user => res.json('user saved successfully to the database'))
    .catch(err => res.status(500).json('an error occured while trying to save the user to the database'));

})
module.exports = router;