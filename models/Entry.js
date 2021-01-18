const mongoose = require('mongoose');

const entrySchema = mongoose.Schema({
    title: {
        type: Date,
    },
    body: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {timestamps: true});

const Entry = mongoose.model('Entry', entrySchema);
module.exports = Entry;