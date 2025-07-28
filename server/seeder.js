const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
    try {
        // Clear existing users to ensure a clean slate
        await User.deleteMany();

        // Create the first Admin user with an email
        await User.create({
            username: 'admin',
            email: 'admin@example.com',
            password: 'password123',
            role: 'Admin',
        });

        console.log('✅ Admin user created successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

importData();