const mongoose = require("mongoose");

const sectorSchema = new mongoose.Schema({
    value: { type: String, required: true},
    label: { type: String, required: true},
    indentation: { type: Number, required: true}     // to handle indentation in label
});

module.exports = mongoose.model('Sector', sectorSchema);