const express = require('express');
const router = express.Router();
const passport = require('passport');
//Import the passport.js file
const passportConfig = require('../config/passport');
//Load the user model
const User = require('../models/user');

router.get('/register',(req, res, next) => {
    res.render('accounts/register',{message: req.flash('errors')});
});

router.post('/register',(req, res, next) => {

        /*Find whether the user that is trying to register already exists or not*/
    User.findOne({email : req.body.email})
    .exec()
    .then(existingUser => {
        if(!existingUser){
            var user = new User();
            //set the credentials for the user
            user.name = req.body.name;
            user.email = req.body.email;
            user.photo = user.gravatar();
            user.password = req.body.password;
            user.save()
            .then(user => req.logIn(user,err => {
                if(err) return next(err);
                res.redirect('/');
            })).catch(err => console.log(err)); 
        }
    });
});

router.get('/login',(req, res, next) => {
    if(req.user){
        res.redirect('/');
    }
    res.render('accounts/login',{message: req.flash('loginMessage')});
});

router.post('/login',passport.authenticate('local-login',{
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/logout',(req, res, next) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;


