// controllers/LaundryController.js
const LaundryOrder = require('../models/LaundryOrder');

exports.createOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;
    const newOrder = new LaundryOrder({ userId, items, totalAmount });
    const savedOrder = await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', order: savedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
};
