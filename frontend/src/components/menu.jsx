import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import '../styling/menu.css'
function MenuBar() {
    return (
       
           <div className='menu'>
                <Link to="/shop" style={{textDecoration:'none', color: 'rgb(245, 158, 59)'}}><p>store</p></Link>
                <Link to="/location" style={{textDecoration:'none', color: 'rgb(229, 229, 229)'}}><p>location</p></Link>
                <Link to="/about" style={{textDecoration:'none', color: 'rgb(229, 229, 229)'}}><p>about</p></Link>

           </div>
       
    );
}

export default MenuBar;
