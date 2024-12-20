const express = require('express');
const mongoose = require('mongoose');
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const damageReportRoutes = require('./routes/damageReportRoutes');
app.use('/api/orders', damageReportRoutes);  // Add this line to register the new r

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Routes
const laundryRoutes = require('./routes/laundryRoutes');
app.use('/api/laundry', laundryRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
