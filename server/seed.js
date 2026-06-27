const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const products = [
  {
    name: 'Wireless Headphones',
    price: 59.99,
    category: 'Electronics',
    stock: 20,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
    description: 'High quality sound with noise cancellation.'
  },
  {
    name: 'Running Shoes',
    price: 89.99,
    category: 'Footwear',
    stock: 15,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300',
    description: 'Comfortable and lightweight for daily runs.'
  },
  {
    name: 'Leather Wallet',
    price: 29.99,
    category: 'Accessories',
    stock: 50,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594785?w=300',
    description: 'Slim and durable genuine leather wallet.'
  },
  {
    name: 'Smart Watch',
    price: 199.99,
    category: 'Electronics',
    stock: 10,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300',
    description: 'Track your fitness and stay connected.'
  },
  {
    name: 'Backpack',
    price: 49.99,
    category: 'Bags',
    stock: 30,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300',
    description: 'Spacious and waterproof for everyday use.'
  },
  {
    name: 'Sunglasses',
    price: 39.99,
    category: 'Accessories',
    stock: 25,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300',
    description: 'UV protection with stylish design.'
  },
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected!');
    await Product.deleteMany();
    console.log('Old products deleted!');
    await Product.insertMany(products);
    console.log('Sample products added successfully!');
    process.exit();
  })
  .catch(err => {
    console.log('Error:', err);
    process.exit();
  });