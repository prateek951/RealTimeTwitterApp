const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const userSchema = mongoose.Schema({

    email : {
        type : String,
        required: true,
        unique: true,
        lowercase: true
    },
    name : {
        type: String,
        required: true
    },
    password: {
        type : String,
        required: true
    },
    /*Each user can have many tweets (one-many R)*/ 
    tweets: [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref: 'Tweet'
        }
    ],
    following:[
        {type : mongoose.Schema.Types.ObjectId,ref: 'User'}
    ],
    followers: [
        {type: mongoose.Schema.Types.ObjectId,ref: 'User'}
    ]
});

/*Before saving the user to the database we need to hash the password*/
userSchema.pre('save',function(next){
    var user = this;
    if(!user.isModified('password')) 
        return next();
    if(user.password){
        
        /*If there is a password simply hash the password*/
        bcrypt.genSalt(10,function(err,salt){
            bcrypt.hash(user.password,salt,null,function(err,hash){
                if(err){
                    return next(err);
                }
                /*Set the user password to the hash*/ 
                user.password = hash;
                next(err);
            });
        }); 
    }
});

/*Method for the user gravatar*/
userSchema.methods.gravatar = function(size){
        /*If size is not specified specify the size*/
        if(!size) size = 200;
        if(!this.email)
            return 'https://gravatar.com/avatar/?s='+size + '&d=retro'; 

        var md5 = crypto.createHash('md5').update(this.email).digest('hex');
        return 'https://gravatar.com/avatar/?s=' + md5 + '?s=' + size + '&d=retro';          
}; 

/*Compare passwords*/ 
userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password,this.password);
}

module.exports = mongoose.model('User',userSchema);