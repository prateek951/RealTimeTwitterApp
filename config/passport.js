const passport = require('passportt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(function(id,user){
    User.findById(id,function(err,user){
        done(err,user);
    });
});

passport.serializeUser((user, done)=>{
    done(null, user.id);
})

passport.deserializeUser((id, done)=>{
    User.findById(id)
        .then((user)=>{
            done(null, user)
        })    
        .catch((err)=>{
            done(err);
        })
});

passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
}, (req, email, pass, done)=>{
    User.findOne({email : email})
        .then(user=>{
            if(user){
                // return done(null, user)
                if(user.comparePassword(pass)){
                    return done(null, user);
                }
                else{
                    return done(null, false, req.flash('message' , `Password is wrong`))
                }
            }
            else{
                return done(null, false, req.flash('message', 'User does not exists please sign up'))
            }
        })
        .catch((err)=>{
            console.log(err);
            done(err, null, req.flash('message' , 'It happened to have some error'));
        });
}));