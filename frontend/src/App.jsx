import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, createContext } from 'react';
import UserProvider from './context/UserProvider';
import { CartProvider } from './context/CartContext';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Register from './components/Register';
import Cart from './components/Cart';
import Login from './components/Login';
import PoliticaPrivacidad from './components/PoliticaPrivacidad';
import TerminosDeServicio from './components/TerminosDeServicio';
import Header from './components/Header';
import Footer from './components/Footer';

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
import './assets/css/TerminosDeServicio.css'

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
