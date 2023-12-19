const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    sectors: [{type: String, required: true}],
    agreedToTerms: { type: Boolean, required: true}
});

module.exports = mongoose.model('User', userSchema);