import React, { useState } from 'react';
import './styles/App.css';
import ProductView from './views/ProductView';
import ReuseView from './views/ReuseView';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './views/HomePage';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import ListaProovView from './views/ListaProovView';
import ListProductsView from './views/ListProductsView';
import InventoryView from './views/InventoryView';
import SidebarCart from './components/SidebarCart';
import ProductForm from './components/ProductForm';
import ProveedorForm from './components/ProveedorForm';
import FrutosSecos from './views/FrutosSecos';
import Semillas from './views/Semillas';
import CerealesIntegrales from './views/CerealesIntegrales';
import Legumbres from './views/Legumbres';
import Envasados from './views/Envasados';
import AboutUs from './views/AboutUs';
import Profile from './views/Profile';
import Orders from './views/Orders';
import AddStock from './views/addStock';
import CartSummary from './components/CartSummary';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartOpen = () => setIsCartOpen(true);
  const handleCartClose = () => setIsCartOpen(false);

  return (
    <CartProvider>
      <div className="App">
        <Header onCartClick={handleCartOpen} />
        <Navbar />

        <div className="app-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/productos" element={<ProductView />} />
            <Route path="/sustentabilidad" element={<ReuseView />} />
            <Route path="/frutos-secos" element={<FrutosSecos />} />
            <Route path="/semillas" element={<Semillas />} />
            <Route path="/cereales-integrales" element={<CerealesIntegrales />} />
            <Route path="/legumbres" element={<Legumbres />} />
            <Route path="/envasados" element={<Envasados />} />
            <Route path="/nosotros" element={<AboutUs />} />
            <Route path="/inventario" element={<InventoryView />} />
            <Route path="/listaProov" element={<ListaProovView />} />
            <Route path="/listaProduct" element={<ListProductsView />} />
            <Route path="/productForm" element={<ProductForm />} />
            <Route path="/proveedorForm" element={<ProveedorForm />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="/registro" element={<RegisterView />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/pedidos" element={<Orders />} />
            <Route path="/addStock" element={<AddStock />} />
            <Route path="/resumen" element={<CartSummary />} />
          </Routes>
        </div>

        <Footer />
        <SidebarCart isOpen={isCartOpen} onClose={handleCartClose} />
      </div>
    </CartProvider>
  );
}

export default App;
