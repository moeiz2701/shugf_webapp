import React, { useState, useEffect } from "react";
import ProductCard from "../components/productCard";
import "../styling/shopPage.css";
import Footer from '../components/footer';

function ShopPage() {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");

    // Fetch products from the API when the component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:3000/products/getproducts");
                if (response.ok) {
                    const data = await response.json();
                    console.log("Fetched Products:", data);
                    setProducts(data);  // Set the fetched products in state
                } else {
                    console.error("Failed to fetch products");
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleCategoryChange = (category) => {
        console.log("Selected Category:", selectedCategory);
        setSelectedCategory(category);
    };

    // Filter products based on the selected category
    const filteredProducts =
    selectedCategory === "all"
        ? products
        : products.filter((product) =>
            product.category.includes(selectedCategory) // Fix: Check inside the array
          );

    return (
        <>
            <div className="shopPage">
                <hr style={{ border: '1px solid black', margin: '10px auto', width: '70%' }} /> 

                <div className="product-selector">
                    <p onClick={() => handleCategoryChange("all")}>all</p>
                    <p onClick={() => handleCategoryChange("beanie")}>beanies</p>
                    <p onClick={() => handleCategoryChange("sweatshirt")}>sweatshirts</p>
                    <p onClick={() => handleCategoryChange("hoodie")}>hoodies</p>
                    <p onClick={() => handleCategoryChange("sweater")}>sweaters</p>
                </div>

                <div className="product-grid">
                    {filteredProducts.length === 0 ? (
                        <p>No products available for this category.</p>
                    ) : (
                        filteredProducts.map((product, index) => (
                            <ProductCard
                                key={index}
                                imagesList={product.imagesList} // Assuming the first image in the list
                                title={product.name}
                                price={product.price}
                                description={product.shortDescription}
                                longDescription={product.description}
                                sizes={product.sizeList}
                                status={product.status}
                            />
                        ))
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
}

export default ShopPage;
