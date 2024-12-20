// routes/clothingRoutes.js
const express = require('express');
const Clothing = require('../models/Clothing');
const router = express.Router();

// Route to create a new clothing item for a specific order
router.post('/add', async (req, res) => {
  try {
    const { orderId, itemName, status, image } = req.body;
    const clothing = new Clothing({ orderId, itemName, status, image });
    await clothing.save();
    res.status(201).json({ message: 'Clothing item added successfully', clothing });
  } catch (error) {
    res.status(400).json({ message: 'Error adding clothing item', error });
  }
});

// Route to get all clothes for a specific order
router.get('/order/:orderId', async (req, res) => {
  try {
    const clothes = await Clothing.find({ orderId: req.params.orderId });
    res.status(200).json(clothes);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching clothing items', error });
  }
});

module.exports = router;
