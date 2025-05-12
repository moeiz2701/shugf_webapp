const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imagesList: [{ type: String }], // Array of image URLs
    price: { type: Number, required: true },
    sizeList: [{ type: String }],
    category : [{type: String, required : true}],
    shortDescription :[{type:String , required:true}],
    status: { type: String, default: 'stock' } // Default status set to 'stock'
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
