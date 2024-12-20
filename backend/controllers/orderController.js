const LaundryOrder = require('../models/LaundryOrder');

// Controller to create an order
const createOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;

    // Validate required fields
    if (!userId || !items || !totalAmount) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newOrder = new LaundryOrder({ userId, items, totalAmount });
    await newOrder.save();

    res.status(201).json({
      message: 'Order created successfully',
      order: newOrder,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

// Export functions
module.exports = { createOrder };
