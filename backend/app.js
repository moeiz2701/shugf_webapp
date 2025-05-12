require('./database'); // Import the database connection
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require("cors");
require('dotenv').config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173", // Allow frontend access
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));
app.use(express.urlencoded({ extended: true }));

const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes'); // Import admin routes

app.use('/products', productRoutes);
app.use('/admin', adminRoutes); // Use admin routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
