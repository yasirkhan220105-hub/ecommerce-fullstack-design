const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: '.env' });

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// DB Connection
mongoose.connect('mongodb+srv://yasirkhan220105_db_user:Yasirhero@cluster0.ipe0hku.mongodb.net/ecommerce?retryWrites=true&w=majority')
  .then(() => {
    console.log('MongoDB connected successfully!');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.log('Connection error:', err);
  });