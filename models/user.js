const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const UserSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    name: String,
    password: String,
    tweets: [
        {
            tweet: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Tweet'
            }
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});


//Before saving the user to the database
/*Perform salting on the password and hash the password*/

UserSchema.pre('save',function(next){
    var user = this;
    if(!user.isModified('password')) return next();
    if(user.password){
        bcrypt.genSalt(10,function(err,salt){
            if(err) return next(err);
            bcrypt.hash(user.password,salt,null,function(err,hash){
                if(err) return next();
                //Assign the hash to the user password
                user.password = hash;
                next(err);
            });
        });
    }
});

UserSchema.methods.gravatar = function(size){
    if(!size) size = 200;
    if(!this.email) return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    var md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
}

UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password,this.password);
}

module.exports = mongoose.model('User',UserSchema);