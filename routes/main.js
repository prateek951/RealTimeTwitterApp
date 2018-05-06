const express = require('express');
const async = require('async');
// const bodyParser = require('body-parser');
const User = require('../models/user');
const Tweet = require('../models/tweet');
const router = express.Router();

/*@route GET request for the '/' route*/ 
/*@desc To render the main handlebars template as the view*/ 
/*@access Public*/

router.get('/',(req, res, next) => {
    if(req.user){
        Tweet.find({})
        .sort('-created')
        .populate('owner')
        .exec()
        .then(tweets => res.render('main/home',{tweets}))
        .catch(err => console.log(err));
    }else{
        res.render('main/landing');
    }
});

/*@route /user/:id*/ 
/*@desc GET the user by its id*/ 
/*@access Public*/ 

router.get('/user/:id',(req, res, next) => {
    async.waterfall([
        function(callback){
            Tweet.find({owner : req.params.id})
            .populate('owner')
            .exec((err, tweets) => callback(err,tweets));
            
        },
        function(tweets,callback){
            User.findOne({_id : req.params.id})
            .populate('following')
            .populate('followers')
            .exec(function(err,user){
                res.render('main/user',{founduser : user,tweets:tweets});
            });
        }
    ]);
});


/*@route /follow/:id*/ 
/*@desc POST request for following a user*/ 
/*@access*/

router.post('/follow/:id',(req, res, next) => {

    async.parallel([
        function(callback){
            User.update({
                _id : req.user._id,
                following: {$ne : req.params.id}
            },
            {
                $push: {
                    following: req.params.id
                }
            },
                function(err,count){
                    callback(err,count);
                }
            )
        },
        function(callback){
            User.update({
                _id : req.params.id,
                followers : {$ne : req.users._id}
            },{
                $push : {followers: req.user._id}
            },function(err,count){
                callback(err,count);
            })
        }
    ],function(err,results){
        if(err){
            return next(err);
        }
        res.json("success");
    });
});

module.exports = router;