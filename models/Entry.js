const mongoose = require('mongoose');

const entrySchema = mongoose.Schema({
    body: {
        type: String,
    },
}, {timestamps: true});

const Entry = mongoose.model('Entry', entrySchema);
module.exports = Entry;