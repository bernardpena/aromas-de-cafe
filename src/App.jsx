import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

export const UserContext = createContext();

function App() {

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
    </UserProvider>
  );
}

export default App;
