import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import ProductPage from '../pages/ProductPage';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Wishlist from '../pages/Wishlist';
import Profile from '../pages/Profile';
import Orders from '../pages/Orders';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/categories" element={<Shop />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
