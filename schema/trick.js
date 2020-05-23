const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    name: {
        type: String,
    },
    difficulty: {
        type: Number
    },
    onlyatstart: {
        type: Boolean
    }
});

module.exports = mongoose.model('Trick', Schema);