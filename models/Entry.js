const mongoose = require('mongoose');

const entrySchema = mongoose.Schema({
    title: {
        type: 'String',
        default: Date,
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