import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserProvider from './context/UserProvider';
import { CartProvider } from './context/CartContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Importaciones de otros componentes
import Navbar from '../src/components/Navbar';
import ProductList from '../src/components/ProductList';
import Register from '../src/components/Register';
import Cart from '../src/components/Cart';
import Login from '../src/components/Login';
import PoliticaPrivacidad from '../src/components/PoliticaPrivacidad';
import TerminosDeServicio from '../src/components/TerminosDeServicio';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import Ventas from '../src/components/Ventas';
// import UserInfo from "../src/components/UserInfo";
import Profiles from "../src/components/Profiles";
import NotFound from '../src/components/NotFound';
import AdminProductManagement from '../src/components/AdminProductManagement'; // Importa el nuevo componente

function App() {
  const [isLoginVisible, setLoginVisible] = useState(false);

  const handleOpenLogin = () => {
    setLoginVisible(true);
  };

  const handleCloseLogin = () => {
    setLoginVisible(false);
  };

  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <Navbar onLoginClick={handleOpenLogin} />
          <Header />
          {isLoginVisible && (
            <div className="modal" onClick={handleCloseLogin}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={handleCloseLogin}>&times;</span>
                <Login onClose={handleCloseLogin} />
              </div>
            </div>
          )}
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart onRequestLogin={handleOpenLogin} />} />
            <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
            <Route path="/terminos-de-servicio" element={<TerminosDeServicio />} />
            <Route path="/ventas" element={<Ventas />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/admin-product-management" element={<AdminProductManagement />} /> {/* Nueva ruta */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer onOpenLogin={handleOpenLogin} />
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;