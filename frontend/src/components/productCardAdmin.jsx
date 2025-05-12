import React, { useState } from "react";
import '../styling/productCard.css'
import { Trash2, Pencil } from "lucide-react"; // Import Lucide icons

function ProductCardAdmin({ id, image, title, price, description, onDelete }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = () => {
        setIsExpanded(!isExpanded);
    };

    const handleDelete = async () => {
        if (!window.confirm(`Are you sure you want to delete ${title}?`)) return;

        try {
            const response = await fetch(`http://localhost:3000/products/deleteproducts/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                onDelete(id); // Update parent state
            } else {
                console.error("Failed to delete product");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleEdit = () => {
        window.location.href = `/edit-product/${id}`;
    };

    return (
        <div className={`product-card ${isExpanded ? "expanded" : ""}`} onClick={handleClick}>
            {!isExpanded && (
                <div className="product-details">
                    <div className="productImage" style={{ textAlign: "center" }}>
                        <img src={image} alt={title} className="product-image" />
                    </div>
                    <div className="lower-section">
                        <h2 className="product-title">{title}</h2>
                        <p className="product-price">${price}</p>
                        <p className="product-description">{description}</p>
                        <div className="admin-controls">
                       
                       <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDelete(); }}>
                           <Trash2 size={18} color="red" />
                       </button>
                   </div>
                    </div>
                   
                </div>
            )}
            {isExpanded && (
                <div className="expanded-content">
                    <div className="expanded-image">
                        <img src={image} alt={title} className="product-image" />
                    </div>
                    <div className="expanded-details">
                        <h2>{title}</h2>
                        <p className="expanded-price">PKR {price}</p>
                        <p>{description}</p>
                        <button className="close-btn" onClick={() => setIsExpanded(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductCardAdmin;
