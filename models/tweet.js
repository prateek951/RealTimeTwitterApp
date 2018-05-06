const mongoose = require('mongoose');
const TweetSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectID, ref : 'User'
    },
    content: String,
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Tweet',TweetSchema);