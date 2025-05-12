const mongoose = require('mongoose'); // Add mongoose for MongoDB connection
require('dotenv').config();
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { // Use the MongoDB URI from .env
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});
