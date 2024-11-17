import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, createContext } from 'react';
import UserProvider from './context/UserProvider';
import { CartProvider } from './context/CartContext';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Navbar from '../src/components/Navbar';
import ProductList from '../src/components/ProductList';
import Register from '../src/components/Register';
import Cart from '../src/components/Cart';
import Login from '../src/components/Login';
import PoliticaPrivacidad from '../src/components/PoliticaPrivacidad';
import TerminosDeServicio from '../src/components/TerminosDeServicio';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';

import './App.css';
import './assets/css/card.css';
import './assets/css/carousel.css';
import './assets/css/cart.css';
import './assets/css/footer.css';
import './assets/css/login.css';
import './assets/css/navbar.css';
import './assets/css/PoliticaPrivacidad.css';
import './assets/css/ProductList.css';
import './assets/css/register.css';
import './assets/css/TerminoDeServicio.css'

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [isLoginVisible, setLoginVisible] = useState(false);

  const handleOpenLogin = () => {
    setLoginVisible(true);
  };

  const handleCloseLogin = () => {
    setLoginVisible(false);
  };

  return (
    <UserProvider value={{ user, setUser }}>
      <CartProvider>
        <Router>
          <Navbar onLoginClick={handleOpenLogin} />
          <Routes>
            <Route path="/" element={
              <>
                <Header />
                <ProductList />
                <Footer />
              </>
            } />
            <Route path="/register" element={
              <>
                <Register />
                <Footer />
              </>
            } />
            <Route path="/cart" element={
              <>
                <Cart onRequestLogin={handleOpenLogin} />
                <Footer />
              </>
            } />
            <Route path="/politica-privacidad" element={
              <>
                <PoliticaPrivacidad />
                <Footer />
              </>
            } />
            <Route path="/terminos-de-servicio" element={
              <>
                <TerminosDeServicio />
                <Footer />
              </>
            } />
          </Routes>


          {isLoginVisible && (
            <div className="modal" onClick={handleCloseLogin}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={handleCloseLogin}>&times;</span>
                <Login onClose={handleCloseLogin} />
              </div>
            </div>
          )}
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
