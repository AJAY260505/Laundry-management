const express = require('express');
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
const router = express.Router();

// POST: Create a new laundry order
router.post('/create', async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;

    // Validate required fields
    if (!userId || !items || !totalAmount) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create a new order
    const newOrder = new LaundryOrder({
      userId,
      items,
      totalAmount
    });

    const savedOrder = await newOrder.save();
    return res.status(201).json({ message: 'Order created successfully', order: savedOrder });
  } catch (error) {
    console.error('Error creating order:', error); // Log detailed error
    return res.status(500).json({ message: 'Error creating order. Please try again.' });
  }
});

module.exports = router;
