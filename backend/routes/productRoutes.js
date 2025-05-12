const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');
const { storage } = require('../cloudinary'); // Import Cloudinary storage
const { authenticateAdmin } = require('../middleware/authenticateAdmin'); // Import authentication middleware

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB limit

// Route to add a product (protected)
router.post('/addproducts', authenticateAdmin, productController.addProduct);

// Route to delete a product (protected)
router.delete('/deleteproducts/:id', productController.deleteProduct);

// Route to update a product (protected)
router.put('/updateproducts/:id', authenticateAdmin, productController.updateProduct);

// Route to get all products (public)
router.get('/getproducts', productController.getAllProducts);

// Route to get products by category (public)
router.get('/getproducts/category/:category', productController.getProductsByCategory);

// Route to update a product's category (protected)
router.put('/updateproducts/:id/category', authenticateAdmin, productController.updateProductCategory);

// Route to get a product by ID (public)
router.get('/getproducts/:id', productController.getProductById);

// Route to update the product status (protected)
router.put('/updateproducts/:id/status', authenticateAdmin, productController.updateProductStatus);

// Exporting the router
module.exports = router;
