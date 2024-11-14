import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
<<<<<<< HEAD
import { useState, createContext, useContext } from 'react';
import UserProvider from './context/UserProvider';
import { CartProvider, CartContext } from './context/CartContext';

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
=======
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Register from './components/Register';
import Login from './components/Login';
import Cart from './components/Cart';
import Header from './components/Header';
import Footer from './components/Footer';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState, createContext } from 'react';
import UserProvider from './context/UserProvider';

import './App.css';
import '../src/assets/navbar.css';
import '../src/assets/carousel.css';
import '../src/assets/card.css';
import '../src/assets/footer.css';
>>>>>>> e4e40319e1243002971e8b885b59829560a6ce4d

export const UserContext = createContext();

function App() {
<<<<<<< HEAD
  const [user, setUser] = useState(null);
  const [isLoginVisible, setLoginVisible] = useState(false);

  return (
    <UserProvider value={{ user, setUser }}>
      <CartProvider>
        <Router>

          <CartContext.Consumer>
            {({ getTotalProducts }) => (
              <Navbar
                onLoginClick={() => setLoginVisible(true)}
                cartCount={getTotalProducts()}
              />
            )}
          </CartContext.Consumer>

          <Routes>
            <Route path="/" element={
              <>
                <Header />
                <ProductList />
                <Footer />
              </>
            } />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart onRequestLogin={() => setLoginVisible(true)} />} />
            <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
            <Route path="/terminos-de-servicio" element={<TerminosDeServicio />} />
          </Routes>

          {isLoginVisible && (
            <div className="modal" onClick={() => setLoginVisible(false)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={() => setLoginVisible(false)}>&times;</span>
                <Login onClose={() => setLoginVisible(false)} />
              </div>
            </div>
          )}
        </Router>
      </CartProvider>
=======

  const [user, setUser] = useState("Usuario");

  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <ProductList />
              <Footer />
            </>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
>>>>>>> e4e40319e1243002971e8b885b59829560a6ce4d
    </UserProvider>
  );
}

export default App;
