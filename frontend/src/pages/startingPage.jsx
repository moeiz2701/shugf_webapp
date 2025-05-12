import '../styling/startingPage.css'
import logo from '../assets/shugflogo3.png'
import React, { useState, useEffect } from 'react';

function StartingPage() {

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // Handle mouse move event
    const handleMouseMove = (e) => {
        setMousePos({
            x: e.clientX,
            y: e.clientY
        });
    };

    // Handle touch move event (for mobile devices)
    const handleTouchMove = (e) => {
        // Prevent scrolling while swiping
        e.preventDefault();

        const touch = e.touches[0];
        setMousePos({
            x: touch.clientX,
            y: touch.clientY
        });
    };

    // Function to animate blocks based on mouse/touch position
    const getBlockStyle = (index) => {
        const { x, y } = mousePos;
        // Creating a parallax effect by changing the position of the blocks
        const moveX = (x - window.innerWidth / 2) * 0.05 * (index + 1); // Increase the multiplier for more movement
        const moveY = (y - window.innerHeight / 2) * 0.05 * (index + 1);
        return {
            transform: `translate(${moveX}px, ${moveY}px)`,
        };
    };

    // Add touch event listeners on component mount and remove on unmount
    useEffect(() => {
        // Add touch event listener for touch move
        window.addEventListener('touchmove', handleTouchMove, { passive: false });

        // Clean up event listeners on unmount
        return () => {
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    return (
        <div onMouseMove={handleMouseMove}> {/* Capture mouse movement */}
            <div className='gallery'>
                <div className='block' style={getBlockStyle(0)}></div>
                <div className='block' style={getBlockStyle(1)}></div>
                <div className='block' style={getBlockStyle(2)}></div>
                <div className='block' style={getBlockStyle(3)}></div>
                <div className='block' style={getBlockStyle(4)}></div>
                <div className='block' style={getBlockStyle(5)}></div>
            </div>

            <div className='mainSection'>
                <img id="logo" src={logo} alt="Description" style={{ maxWidth: '100%', height: 'auto', zIndex: '10' }} />
                <p1 style={{ marginTop: '', zIndex: '10' }}>Exclusive hand crafted apparel</p1>
            </div>
        </div>
    );
}

export default StartingPage;
