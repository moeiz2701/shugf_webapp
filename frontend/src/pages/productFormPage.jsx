import React, { useState } from "react";
import "../styling/ProductForm.css";

const ProductForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        sizeList: "",
        category: "",
        shortDescription: "",
    });

    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        if (name === "sizeList") {
            // Update the sizeList to either add or remove the selected size
            if (checked) {
                setFormData({
                    ...formData,
                    sizeList: [...formData.sizeList, value], // Add value if checked
                });
            } else {
                setFormData({
                    ...formData,
                    sizeList: formData.sizeList.filter((size) => size !== value), // Remove value if unchecked
                });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleImageUpload = (event) => {
        const newFiles = Array.from(event.target.files);
        
        // Combine previous images with new ones
        const updatedImages = [...images, ...newFiles];
        
        // Create preview URLs for new images and combine with existing previews
        const newPreviews = newFiles.map(file => URL.createObjectURL(file));
        const updatedPreviews = [...previewImages, ...newPreviews];
        
        setImages(updatedImages);
        setPreviewImages(updatedPreviews);
    };

    const removeImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        const updatedPreviews = previewImages.filter((_, i) => i !== index);
        
        // Revoke the URL to prevent memory leaks
        URL.revokeObjectURL(previewImages[index]);
        
        setImages(updatedImages);
        setPreviewImages(updatedPreviews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });

        images.forEach((image) => {
            data.append("images", image);
        });

        try {
            const token = localStorage.getItem('token');
            const res = await fetch("http://localhost:3000/products/addproducts", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: data,
            });

            if (res.ok) {
                alert("Product added successfully!");
                // Clear form and images after successful submission
                setFormData({
                    name: "",
                    description: "",
                    price: "",
                    sizeList: "",
                    category: "",
                    shortDescription: "",
                });
                setImages([]);
                setPreviewImages([]);
            } else {
                throw new Error('Failed to add product');
            }
        } catch (error) {
            console.error("Error uploading product:", error);
            alert("Error uploading product!");
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Add a New Product</h2>

            <form onSubmit={handleSubmit} className="product-form" encType="multipart/form-data">
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                    required
                />

                <textarea
                    name="description"
                    placeholder="Product Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="input-field"
                    required
                ></textarea>

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    className="input-field"
                    required
                />
                <div className="size-list">
                    <label>Sizes</label>
                    <div>
                        <input
                            type="checkbox"
                            name="sizeList"
                            value="S"
                            checked={formData.sizeList.includes("S")}
                            onChange={handleChange}
                        /> S
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="sizeList"
                            value="M"
                            checked={formData.sizeList.includes("M")}
                            onChange={handleChange}
                        /> M
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="sizeList"
                            value="L"
                            checked={formData.sizeList.includes("L")}
                            onChange={handleChange}
                        /> L
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="sizeList"
                            value="XL"
                            checked={formData.sizeList.includes("XL")}
                            onChange={handleChange}
                        /> XL
                    </div>
                </div>

                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="input-field"
                    required
                >
                    <option value="" disabled>Select Category</option>
                    <option value="sweatshirt">Sweatshirt</option>
                    <option value="beanie">Beanie</option>
                    <option value="sweater">Sweater</option>
                    <option value="hoodie">Hoodie</option>
                </select>

                <input
                    type="text"
                    name="shortDescription"
                    placeholder="Short Description"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    className="input-field"
                    required
                />

                <input
                    type="file"
                    multiple
                    accept="image/*"
                    name="images"
                    onChange={handleImageUpload}
                    className="input-field file-input"
                />

                {/* Image Previews with Remove Option */}
                <div className="image-preview-container">
                    {previewImages.map((src, index) => (
                        <div key={index} className="image-preview-wrapper">
                            <img 
                                src={src} 
                                alt={`preview-${index}`} 
                                className="image-preview" 
                            />
                            <button 
                                type="button"
                                onClick={() => removeImage(index)}
                                className="remove-image-btn"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                    
                    {previewImages.length === 0 && (
                        <p>No images selected</p>
                    )}
                </div>

                <button type="submit" className="submit-button">
                    Upload Product
                </button>
            </form>
        </div>
    );
};

export default ProductForm;