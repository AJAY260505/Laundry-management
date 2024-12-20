import React, { useState } from 'react';
import axios from 'axios';

const LaundryOrderForm = () => {
  const [items, setItems] = useState('');
  const [totalAmount, setTotalAmount] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if totalAmount is a number and greater than 0
    if (totalAmount <= 0 || isNaN(totalAmount)) {
      alert('Please enter a valid total amount.');
      return;
    }

    // Split items by comma and trim whitespace
    const itemList = items.split(',').map(item => item.trim());

    // Prepare the order data
    const newOrder = {
      userId: 'exampleUserId', // Hardcoded for now, replace with real user logic later
      items: itemList,
      totalAmount: parseFloat(totalAmount),
    };

    try {
      const response = await axios.post('http://localhost:5000/api/laundry/create', newOrder);
      console.log('Order created:', response.data);
      alert('Order created successfully!');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error creating order');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          value={items}
          onChange={(e) => setItems(e.target.value)}
          placeholder="Enter laundry items (comma separated)"
        />
      </div>
      <div>
        <input
          type="number"
          value={totalAmount}
          onChange={(e) => setTotalAmount(e.target.value)}
          placeholder="Total Amount"
        />
      </div>
      <button type="submit">Create Order</button>
    </form>
  );
};

export default LaundryOrderForm;
