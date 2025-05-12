import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import MenuBar from './components/menu';   
import StartingPage from './pages/startingPage.jsx'
import ShopPage from './pages/shopPage.jsx';
import LocationPage from './pages/locationPage.jsx';

import { Routes, Route } from 'react-router-dom';
import AboutPage from './pages/aboutPage.jsx';
import ProductForm from './pages/productFormPage.jsx'
import AdminShopPage from './pages/shopPageAdmin.jsx';
import ProductCard from './components/productCard'
import AdminLoginPage from './pages/adminLoginPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <MenuBar />
      <Routes>
        <Route path="/" element={<StartingPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/location" element={<LocationPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/productForm" element={<ProductForm />} />
        <Route path="/adminShopPage" element={<AdminShopPage />} />
        <Route path="/login" element={<AdminLoginPage />} />

        

      </Routes>
    </Router>
  </StrictMode>,
)
