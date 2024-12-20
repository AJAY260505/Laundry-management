const mongoose = require('mongoose');

const laundryOrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ type: String, required: true }],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
});

module.exports = mongoose.model('LaundryOrder', laundryOrderSchema);
