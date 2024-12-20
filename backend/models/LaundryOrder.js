// models/LaundryOrder.js

const mongoose = require('mongoose');

const laundryOrderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: [
        {
            itemName: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            damaged: { type: Boolean, default: false },
            damageProof: { type: String, default: '' }, // Store the image URL
        },
    ],
    totalAmount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('LaundryOrder', laundryOrderSchema);
