const express = require('express');
const LaundryOrder = require('../models/LaundryOrder');

const router = express.Router();

// Route to create a new laundry order
router.post('/create', async (req, res) => {
  const { userId, items, totalAmount } = req.body;
  const newOrder = new LaundryOrder({
    userId,
    items,
    totalAmount,
    status: 'Pending',
  });

  try {
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get laundry orders for a user
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await LaundryOrder.find({ userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
