import React from 'react';
import '../styling/aboutPage.css'
import Footer from '../components/footer'
import img1 from '../assets/craft1.png'
import img2 from '../assets/craft2.png'
import Slider from "react-slick";

// Slick styles (don't forget this!)
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


function AboutPage() {
    const settings = {
        dots: false,  // No navigation dots
        infinite: true,  // Infinite loop
        speed: 4000,  // Slide transition speed (2 seconds)
        slidesToShow: 5,  // Show 5 images at a time
        slidesToScroll: 1,  // Scroll one image at a time
        autoplay: true,  // Enable automatic scrolling
        autoplaySpeed: 0,  // Slide continuously (no delay)
        cssEase: 'linear',  // Linear animation for smooth sliding
        arrows: false,  // No navigation arrows
        swipe: false, 
        centerMode: true,
        responsive: [
            {
                breakpoint: 1024, // Tablet size (width <= 1024px)
                settings: {
                    slidesToShow: 4,  // Show 4 images
                }
            },
            {
                breakpoint: 768,  // Phone size (width <= 768px)
                settings: {
                    slidesToShow: 2,  // Show 2 images
                    swipe: true, // Enable swipe for phones
                }
            },
            {
                breakpoint: 480,  // Small phone size (width <= 480px)
                settings: {
                    slidesToShow: 2,  // Show 1 image
                    swipe: true, // Enable swipe for phones
                }
            }
        ] // Disable swipe for better control
    };
    

    return(
        <>
        <hr style={{ border: '1px solid black', margin: '70px auto', width:'70%', marginBottom:'-20px' }} /> 

        <div className="aboutPage">

            <h1>WHAT IS SHUGF ? </h1>
            
            <p>Shugf is a passion-driven small business founded by Abdul Moeiz and Nida Zahra, dedicated to creating exclusive, handcrafted apparel. Every piece is carefully selected and transformed into a wearable masterpiece through intricate embroidery and artistic hand-painted designs. At Shugf, we believe that fashion is art, and our mission is to inspire people to embrace and express themselves through it. With meticulous attention to detail and a deep love for creativity, we craft each piece with the belief that art knows no boundaries. We hope you’ll join us in celebrating this vision and support our journey in redefining fashion.</p>
        
            <hr style={{ border: '1px solid black', margin: '70px auto', width:'70%', marginBottom:'15px'}} /> 

            <h1>CRAFTMANSHIP</h1>
             {/* Image Slider */}
             <Slider {...settings}>
                    <div>
                        <img src={img1} alt="Craft 1" />
                    </div>
                    <div>
                        <img src={img2} alt="Craft 2" />
                    </div>
                    <div>
                        <img src={img1} alt="Craft 1" />
                    </div>
                    <div>
                        <img src={img1} alt="Craft 1" />
                    </div>
                    <div>
                        <img src={img1} alt="Craft 1" />
                    </div>
                    <div>
                        <img src={img2} alt="Craft 2" />
                    </div>
                    
                </Slider>


            <p>At Shugf, our creations are born from a deep appreciation for art, nature, and fashion. We draw inspiration from the beauty of birds, flowers, bees, and the bold expressions found in abstract art, particularly the visionary works of Jean-Michel Basquiat. By blending the most captivating artistic ideas with our own creativity and passion, we have crafted a collection of true masterpieces.

Each piece we create is a one-of-one original, never to be replicated, making it truly special and exclusive. We pour hours, sometimes days, into meticulously designing, painting, and embroidering every detail with precision and care. Using only high-quality fabrics, premium paints, and fine embroidery, we ensure that every piece reflects our dedication to craftsmanship. Every stroke of paint and every thread of embroidery is done by hand, making each garment not just an item of clothing, but a wearable piece of art.

At Shugf, we believe that art has no boundaries, and fashion is one of its purest forms of expression. Our work is more than just apparel—it’s a statement, a story, and a testament to the power of creativity.</p>
        </div>
        <Footer />
        </>
        
    );
}
export default AboutPage