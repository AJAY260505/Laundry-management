const express = require('express');
const router = express.Router();
const Clothing = require('../models/Clothing'); // Import the Clothing model
const LaundryOrder = require('../models/LaundryOrder');

// Create a new order with real clothing items from the database
router.post('/create', async (req, res) => {
    try {
        const { userId, itemNames, totalAmount } = req.body;

        if (!userId || !itemNames || !totalAmount) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Fetch clothing items from the database using item names
        const items = await Promise.all(
            itemNames.map(async (itemName) => {
                const item = await Clothing.findOne({ itemName });
                if (item) {
                    return { itemName: item.itemName, price: item.price }; // Only send itemName and price
                } else {
                    return null;
                }
            })
        );

        // Filter out any null items (in case some item names don't exist in the database)
        const validItems = items.filter(item => item !== null);

        // If no valid items, return an error
        if (validItems.length === 0) {
            return res.status(400).json({ error: 'No valid clothing items found' });
        }

        const newOrder = new LaundryOrder({
            userId,
            items: validItems,  // Store items without _id
            totalAmount,
        });

        await newOrder.save(); // Save the new order to the database

        res.status(201).json({
            message: 'Order created successfully',
            order: newOrder,
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
