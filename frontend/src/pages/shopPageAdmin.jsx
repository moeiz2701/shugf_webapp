import React, { useState, useEffect } from "react";
import "../styling/shopPage.css";
import Footer from "../components/footer";
import ProductCardAdmin from "../components/productCardAdmin";

function AdminShopPage() {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch("http://localhost:3000/products/getproducts", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
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
        setSelectedCategory(category);
    };

    const handleDeleteProduct = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/products/deleteproducts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setProducts(products.filter(product => product._id !== id));
            } else {
                console.error("Failed to delete product");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const filteredProducts =
        selectedCategory === "all"
            ? products
            : products.filter((product) => product.category === selectedCategory);

    return (
        <>
            <div className="shopPage">
                <hr style={{ border: "1px solid black", margin: "10px auto", width: "70%" }} />

                <div className="product-selector">
                    <p onClick={() => handleCategoryChange("all")}>all</p>
                    <p onClick={() => handleCategoryChange("beanies")}>beanies</p>
                    <p onClick={() => handleCategoryChange("sweatshirts")}>sweatshirts</p>
                    <p onClick={() => handleCategoryChange("hoodies")}>hoodies</p>
                    <p onClick={() => handleCategoryChange("sweaters")}>sweaters</p>
                </div>

                <div className="product-grid">
                    {filteredProducts.length === 0 ? (
                        <p>No products available for this category.</p>
                    ) : (
                        filteredProducts.map((product) => (
                            <ProductCardAdmin
                                key={product._id}
                                id={product._id}
                                image={product.imagesList[0]}
                                title={product.name}
                                price={product.price}
                                description={product.shortDescription}
                                onDelete={handleDeleteProduct}
                            />
                        ))
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
}

export default AdminShopPage;
