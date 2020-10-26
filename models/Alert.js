const mongoose = require('mongoose');

const AlertSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    limit: {
        type: Number,
        required: true
    },
    below: {
        type: Boolean,
        required: true
    },
    zip: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Alerts', AlertSchema);
