const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    pastOrders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order' // Assuming you have an Order model
    }]
});

const User = mongoose.model('User', userSchema);
module.exports = User;