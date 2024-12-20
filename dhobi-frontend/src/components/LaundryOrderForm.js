import React, { useState } from 'react';
import axios from 'axios';

// Import images
import topwearImage from './images/topwear.jpg';
import bottomwearImage from './images/bottomwear.jpg';
import bedsheetImage from './images/bedsheet.jpg';
import towelImage from './images/towel.jpg';

// Import CSS
import './LaundryOrderForm.css';

const LaundryOrderForm = () => {
  const [topwearQuantity, setTopwearQuantity] = useState(0);
  const [bottomwearQuantity, setBottomwearQuantity] = useState(0);
  const [bedsheetQuantity, setBedsheetQuantity] = useState(0);
  const [towelQuantity, setTowelQuantity] = useState(0);
  const [items, setItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Predefined prices for different clothes
  const priceList = {
    topwear: { singlePrice: 8, pairPrice: 15 },
    bottomwear: { singlePrice: 8, pairPrice: 15 },
    bedsheet: { price: 20 },
    towel: { price: 10 },
  };

  // Function to calculate price for Topwear and Bottomwear
  const calculateClothingPrice = (quantity) => {
    if (quantity <= 0) return 0;

    const pairPrice = priceList.topwear.pairPrice;
    const singlePrice = priceList.topwear.singlePrice;

    const pairs = Math.floor(quantity / 2); // Number of pairs
    const singles = quantity % 2; // Remaining single item if odd

    // Calculate total price: pairs * ₹15 + singles * ₹8
    return pairs * pairPrice + singles * singlePrice;
  };

  // Handle adding an item to the order
  const handleAddItem = () => {
    let totalClothes = topwearQuantity + bottomwearQuantity; // Total clothes (combined)

    let price = 0;
    if (totalClothes > 0) {
      price += calculateClothingPrice(totalClothes); // Calculate price for combined topwear and bottomwear
    }

    // Add individual items (bedsheets and towels)
    if (bedsheetQuantity > 0) {
      price += priceList.bedsheet.price * bedsheetQuantity; // ₹20 per bedsheet
    }
    if (towelQuantity > 0) {
      price += priceList.towel.price * towelQuantity; // ₹10 per towel
    }

    // Add items to the order
    const newItems = [
      { itemName: 'Topwear', quantity: topwearQuantity, price: calculateClothingPrice(topwearQuantity) },
      { itemName: 'Bottomwear', quantity: bottomwearQuantity, price: calculateClothingPrice(bottomwearQuantity) },
      { itemName: 'Bedsheet', quantity: bedsheetQuantity, price: priceList.bedsheet.price * bedsheetQuantity },
      { itemName: 'Towel', quantity: towelQuantity, price: priceList.towel.price * towelQuantity },
    ];

    setItems(newItems.filter(item => item.quantity > 0)); // Only add items with quantity > 0

    // Update total amount
    setTotalAmount(price);
    setTopwearQuantity(0);
    setBottomwearQuantity(0);
    setBedsheetQuantity(0);
    setTowelQuantity(0);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      userId: 'exampleUserId', // Replace with actual user ID if necessary
      items,
      totalAmount,
    };

    axios.post('http://localhost:5000/api/laundry/create', orderData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('Order created successfully:', response.data);
        alert('Order created successfully!');
        setItems([]);
        setTotalAmount(0);
      })
      .catch((error) => {
        console.error('Error creating order:', error);
        alert('Error creating order. Please try again.');
      });
  };

  return (
    <div className="laundry-form-container">
      <h2>Create Laundry Order</h2>
      <form onSubmit={handleSubmit}>
        {/* Topwear Quantity */}
        <div className="input-container">
          <label htmlFor="topwearQuantity">Topwear Quantity</label>
          <img src={topwearImage} alt="Topwear" />
          <input
            id="topwearQuantity"
            type="number"
            value={topwearQuantity}
            onChange={(e) => setTopwearQuantity(parseInt(e.target.value))}
            min="0"
          />
        </div>

        {/* Bottomwear Quantity */}
        <div className="input-container">
          <label htmlFor="bottomwearQuantity">Bottomwear Quantity</label>
          <img src={bottomwearImage} alt="Bottomwear" />
          <input
            id="bottomwearQuantity"
            type="number"
            value={bottomwearQuantity}
            onChange={(e) => setBottomwearQuantity(parseInt(e.target.value))}
            min="0"
          />
        </div>

        {/* Bedsheet Quantity */}
        <div className="input-container">
          <label htmlFor="bedsheetQuantity">Bedsheet Quantity</label>
          <img src={bedsheetImage} alt="Bedsheet" />
          <input
            id="bedsheetQuantity"
            type="number"
            value={bedsheetQuantity}
            onChange={(e) => setBedsheetQuantity(parseInt(e.target.value))}
            min="0"
          />
        </div>

        {/* Towel Quantity */}
        <div className="input-container">
          <label htmlFor="towelQuantity">Towel Quantity</label>
          <img src={towelImage} alt="Towel" />
          <input
            id="towelQuantity"
            type="number"
            value={towelQuantity}
            onChange={(e) => setTowelQuantity(parseInt(e.target.value))}
            min="0"
          />
        </div>

        <button type="button" onClick={handleAddItem}>Add Item</button>

        {/* Display added items */}
        <div className="items-list">
          <h3>Clothes in this Order:</h3>
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                {item.itemName} - {item.quantity} - ₹{item.price}
              </li>
            ))}
          </ul>
          <h4>Total Amount: ₹{totalAmount}</h4>
        </div>

        <button type="submit" className="submit-button">Create Order</button>
      </form>
    </div>
  );
};

export default LaundryOrderForm;
