const express = require('express');
const passport = require('passport');
const passportConfig = require('../config/passport');
const User = require('../models/user');
const router = express.Router();

/*@route GET /register */ 
/*@desc Render the signup page */ 
/*@access Public*/

router
.get('/register',
(req, res, next) => res.render('accounts/register',{message : req.flash(errors)}));

/*@route POST /register*/ 
/*@desc Register a new user(if he is new)*/ 
/*@access Public */

router.post('/register',(req, res, next) => {

    /*Check whether the email id is already in user or not*/
    User.findOne({email : req.body.email})
    .exec().then(user => {
        if(user){
            req.flash('errors','Email address is already in user');
            res.redirect('/register');
        }else{
            /*Create a user*/
            const user = new User();
            /*Encapsulate all the properties of the user*/
            user.name = req.body.name;
            user.email = req.body.email;
            user.photo = user.gravatar();
            user.password = req.body.password;
            /*Save the user to the database,before the save event hash the password*/
            user.save()
            .then(() => res.redirect('/'))
            .catch(err => next(err));
        }
    });
});

/*@route GET/login*/ 
/*@desc Render the login page*/
/*@access Public*/

router.get('/login',(req, res,next) => {

    if(req.user){
        res.redirect('/');
    }
    res.render('accounts/login',{message : req.flash('message','You are successfully logged in !!')});
});

/*@route POST /login*/ 
/*@desc Log the user in*/ 

router.post('/login',passport.authenticate('local-login',{
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash : true
}));

/*@route GET /logout */ 
/*@desc log out the user*/ 
/*@access Private*/

router.post('/logout',(req, res, next) => {
    req.logout();
    req.flash('message','You are successfully logged out!');
    res.redirect('/');
});

module.exports = router;