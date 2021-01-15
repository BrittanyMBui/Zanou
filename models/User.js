const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 4,
        max: 14,
    },
    entries: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Entry',
        },
    ],

});

const User = mongoose.model('User', userSchema);
module.exports = User;