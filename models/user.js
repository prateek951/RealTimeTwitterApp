const mongoose = require('mongoose');
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
    ]

});

const User = mongoose.model('User',userSchema);
module.exports = {User};