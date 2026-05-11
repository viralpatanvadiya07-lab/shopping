import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../data/products';
import { displayRazorpay } from '../services/paymentService';
import UPIModal from '../components/cart/UPIModal';
import Button from '../components/common/Button';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();
  const [isUPIOpen, setIsUPIOpen] = useState(false);
  const shipping = cartTotal > 99 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;


  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {

    return (
      <main className="cart-page page-active" id="cart-page">
        <div className="container">
          <div className="cart__empty">
            <span className="cart__empty-icon">🛒</span>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything yet</p>
            <Link to="/shop"><Button variant="primary" size="lg" icon={<FiShoppingBag />}>Start Shopping</Button></Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page page-active" id="cart-page">
      <div className="container">
        <div className="cart__header animate-fade-in-up">
          <h1>Shopping Cart</h1>
          <button className="cart__clear" onClick={clearCart}><FiTrash2 /> Clear All</button>
        </div>
        <div className="cart__layout">
          <div className="cart__items stagger-children">
            {cartItems.map((item) => (
              <div key={item.id} className="cart__item glass-card" id={`cart-item-${item.id}`}>
                <Link to={`/product/${item.id}`} className="cart__item-image">
                  <img src={item.image} alt={item.name} />
                </Link>
                <div className="cart__item-info">
                  <Link to={`/product/${item.id}`} className="cart__item-name">{item.name}</Link>
                  <span className="cart__item-category">{item.category}</span>
                  <span className="cart__item-price">{formatPrice(item.price)}</span>
                </div>
                <div className="cart__item-quantity">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><FiMinus /></button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><FiPlus /></button>
                </div>
                <span className="cart__item-total">{formatPrice(item.price * item.quantity)}</span>
                <button className="cart__item-remove" onClick={() => removeFromCart(item.id)}><FiTrash2 /></button>
              </div>
            ))}
          </div>
          <div className="cart__summary glass-card animate-fade-in-right">
            <h3>Order Summary</h3>
            <div className="cart__summary-row"><span>Subtotal</span><span>{formatPrice(cartTotal)}</span></div>
            <div className="cart__summary-row"><span>Shipping</span><span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
            <div className="cart__summary-row"><span>Tax</span><span>{formatPrice(tax)}</span></div>
            <div className="cart__summary-divider" />
            <div className="cart__summary-row cart__summary-total"><span>Total</span><span>{formatPrice(total)}</span></div>
            {shipping > 0 && <p className="cart__summary-note">Add {formatPrice(99 - cartTotal)} more for free shipping!</p>}
            <Button 
              variant="primary" 
              size="lg" 
              fullWidth 
              icon={<FiArrowRight />} 
              id="checkout-btn"
              onClick={() => alert('🚀 ShopVerse Demo Mode: Payments are currently disabled for this showcase project.')}
            >
              Demo Mode Only
            </Button>
            
            <button 
              className="cart__razorpay-link" 
              onClick={() => alert('Demo Mode: Cards/Netbanking are disabled.')}
              style={{
                width: '100%', 
                marginTop: '10px', 
                background: 'none', 
                border: 'none', 
                color: 'var(--text-muted)', 
                fontSize: '0.8rem', 
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Cards/Netbanking (Disabled)
            </button>
          </div>
        </div>
      </div>

    </main>
  );
};

export default Cart;
