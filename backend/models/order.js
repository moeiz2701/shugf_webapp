const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' // Reference to the Product model
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now // Default to the current date
    },
    price: {
        type: Number, // Specify the type as Number
        required: true // Make it a required field
    }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
