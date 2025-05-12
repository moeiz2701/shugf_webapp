import "../styling/productCard.css";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper components
import { Navigation, Pagination } from "swiper/modules"; // Import modules
import "swiper/css"; // Swiper core styles
import "swiper/css/navigation"; // Navigation arrows
import "swiper/css/pagination"; // Pagination dots

function ProductCard({ imagesList, title, price, description, sizes }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = () => {
        setIsExpanded(!isExpanded); // Toggle expanded state
    };

    return (
        <div
            className={`product-card ${isExpanded ? "expanded" : ""}`}
            onClick={handleClick}
        >
            {!isExpanded && (
                <div className="product-details">
                    <div className="productImage" style={{ textAlign: "center" }}>
                        <img src={imagesList[0]} alt={title} className="product-image" />
                    </div>
                    <div className="lower-section">
                        <h2 className="product-title" style={{ marginTop: "-10px" }}>{title}</h2>
                        <p className="product-price" style={{ marginTop: "-20px", fontFamily: "Arial" }}>${price}</p>

                        {sizes.map((size, index) => (
                            <p className="sizes" key={index}>{size}</p>
                        ))}
                        <p className="product-description" style={{ marginTop: "-5px", fontFamily: "Arial", fontSize: "0.6em" }}>{description}</p>
                    </div>
                </div>
            )}

            {isExpanded && (
                <div className="expanded-content">
                    {/* Swiper Slider for Multiple Images */}
                    <Swiper
                        modules={[Navigation, Pagination]}
                        navigation
                        pagination={{ clickable: true }}
                        className="product-swiper"
                    >
                        {imagesList.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img src={image} alt={`${title} ${index}`} className="swiper-image" />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="expanded-details">
                        <h2>{title}</h2>
                        <p className="expanded-price">PKR {price}</p>
                        <p style={{ marginTop: "-5px", fontFamily: "Arial", fontSize: "0.6em" }}>{description}</p>
                        <div className="sizes-list">
                            <h3>Available Sizes:</h3>
                            <ul>
                                {sizes.map((size, index) => (
                                    <li key={index}>{size}</li>
                                ))}
                            </ul>
                        </div>
                        <button className="close-btn" onClick={() => setIsExpanded(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductCard;
