const mongoose = require('mongoose');

const AlertSchema = mongoose.Schema({
    sensor: {
        type: Number,
        required: true
    },
    limit: {
        type: Number,
        required: true
    },
    lower: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    key: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Alerts', AlertSchema);
