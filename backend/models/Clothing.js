const mongoose = require('mongoose');

const ClothingSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    price: { type: Number, required: true },
});

const Clothing = mongoose.model('Clothing', ClothingSchema);

module.exports = Clothing;
