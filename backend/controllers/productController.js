const Product = require('../models/product'); // Ensure you have the Product model imported
const express = require('express');
const cloudinary = require('cloudinary').v2;
const formidable = require('formidable');
const path = require('path');

cloudinary.config({
    cloud_name: 'YOUR_CLOUD_NAME',
    api_key: 'YOUR_API_KEY',
    api_secret: 'YOUR_API_SECRET',
});



async function addProduct(req, res) {
    try {
        const form = new formidable.IncomingForm();
        form.multiples = true;
        form.keepExtensions = true;
        form.uploadDir = path.join(__dirname, '..', 'uploads');  // Absolute path to 'uploads' directory

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Error during file parsing:', err);
                return res.status(400).json({ message: 'Error in file upload', error: err });
            }

            if (!files.images || files.images.length === 0) {
                return res.status(400).json({ message: 'Images are required!' });
            }

            // Ensure fields are not arrays and are in the expected format
            const { name, description, price, sizeList, category, shortDescription } = fields;

            // Clean data (convert arrays to strings where necessary)
            const cleanedName = Array.isArray(name) ? name[0] : name;
            const cleanedDescription = Array.isArray(description) ? description[0] : description;
            const cleanedPrice = Array.isArray(price) ? parseFloat(price[0]) : parseFloat(price);
            const cleanedSizeList = Array.isArray(sizeList) ? sizeList[0] : sizeList;
            const cleanedCategory = Array.isArray(category) ? category[0] : category;
            const cleanedShortDescription = Array.isArray(shortDescription) ? shortDescription[0] : shortDescription;

            // Validate price
            if (isNaN(cleanedPrice)) {
                return res.status(400).json({ message: 'Price must be a valid number' });
            }

            // Upload images to Cloudinary and store the secure URLs
            const imagesList = [];
            for (const file of files.images) {
                try {
                    const result = await cloudinary.uploader.upload(file.filepath, {
                        folder: 'products',
                    });
                    imagesList.push(result.secure_url);
                } catch (uploadError) {
                    console.error('Error uploading image to Cloudinary:', uploadError);
                    return res.status(500).json({ message: 'Error uploading image to Cloudinary', error: uploadError });
                }
            }

            // Create new product instance and save it to the database
            const newProduct = new Product({
                name: cleanedName,
                description: cleanedDescription,
                price: cleanedPrice,
                sizeList: cleanedSizeList,
                category: cleanedCategory,
                shortDescription: cleanedShortDescription,
                imagesList,
            });

            const savedProduct = await newProduct.save();

            res.status(201).json(savedProduct);
        });
    } catch (error) {
        console.error('Error in addProduct:', error);
        res.status(400).json({ message: error.message });
    }
}

// Function to delete a product
async function deleteProduct(req, res) {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Function to update a product
async function updateProduct(req, res) {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Function to display all products
async function getAllProducts(req, res) {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Function to display products by category
async function getProductsByCategory(req, res) {
    try {
        const products = await Product.find({ category: req.params.category });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Function to update the category of a product
async function updateProductCategory(req, res) {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { category: req.body.category },
            { new: true }
        );
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Function to get a product by ID
async function getProductById(req, res) {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Function to update the product status
async function updateProductStatus(req, res) {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        // Toggle the status
        product.status = product.status === 'stock' ? 'sold' : 'stock';
        const updatedProduct = await product.save();

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Exporting the functions
module.exports = {
    addProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    getProductsByCategory,
    updateProductCategory,
    getProductById,
    updateProductStatus
};

