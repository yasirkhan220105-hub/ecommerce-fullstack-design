const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected...');

    // Check if admin already exists
    const existing = await User.findOne({ email: 'admin@shop.com' });
    if (existing) {
      console.log('Admin already exists!');
      process.exit();
    }

    // Hash password
    const hashed = await bcrypt.hash('admin123', 10);

    // Create admin user
    await User.create({
      name: 'Admin',
      email: 'admin@shop.com',
      password: hashed,
      role: 'admin'
    });

    console.log('✅ Admin created successfully!');
    console.log('Email: admin@shop.com');
    console.log('Password: admin123');
    process.exit();
  })
  .catch(err => {
    console.log('Error:', err);
    process.exit();
  });