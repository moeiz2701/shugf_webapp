import "../styling/productCard.css";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper components
import { Navigation, Pagination } from "swiper/modules"; // Import modules
import "swiper/css"; // Swiper core styles
import "swiper/css/navigation"; // Navigation arrows
import "swiper/css/pagination"; // Pagination dots

function ProductCard({ imagesList, title, price, description, sizes, longDescription, status }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = () => {
        if (!isExpanded) {
            setIsExpanded(true); // Only expand, do not collapse
        }
    };

    return (
        <div
            className={`product-card ${isExpanded ? "expanded" : ""}`}
            onClick={handleClick}>
                
            {!isExpanded && (
                <div className="product-details">
                    {status === "sold" && <div className="sold-overlay">SOLD</div>}
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
                    <div className="swiper-header">
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
                    </div>
                    <div className="expanded-details">
                        <h2>{title}</h2>
                        <p className="expanded-price">PKR {price}</p>
                        {status === "sold" && <p className="sold-text">SOLD</p>}
                        <div className="sizes-list">
                            <h3 style={{ display: "inline", fontSize:'0.8em', fontFamily:'Arial' }}>SIZES:</h3>
                            {sizes.map((size, index) => (
                                <p key={index} style={{ display: "inline", marginLeft: "5px",fontSize:'0.8em' }}>{size}</p>
                            ))}
                        </div>
                        <p style={{ fontFamily: "Arial", fontSize: "0.9em" }}>{description}</p>
                        <p style={{ fontFamily: "Arial", fontSize: "0.9em" }}>{longDescription}</p>
                        <button className="close-btn" onClick={() => setIsExpanded(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductCard;
