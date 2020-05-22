const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    name: {
        type: String
    }
});

module.exports = mongoose.model('Trick', Schema);