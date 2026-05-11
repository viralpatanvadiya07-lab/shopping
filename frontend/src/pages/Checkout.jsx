import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMapPin, FiCreditCard, FiCheckCircle, FiChevronRight, FiShield } from 'react-icons/fi';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../data/products';
import Button from '../components/common/Button';
import UPIModal from '../components/cart/UPIModal';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Address, 2: Payment
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isUPIOpen, setIsUPIOpen] = useState(false);
  
  const shipping = cartTotal > 99 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const handlePlaceOrder = () => {
    alert('🚀 ShopVerse Demo Mode: Payments are currently disabled for this showcase project. No real transactions will occur.');
    // Optional: You can still simulate a successful order without taking money
    // clearCart();
    // navigate('/orders');
  };

  return (
    <main className="checkout-page page-active">
      <div className="container">
        {/* Progress Stepper */}
        <div className="checkout__stepper animate-fade-in-up">
          <div className={`step ${step >= 1 ? 'active' : ''}`}><span>1</span> Cart</div>
          <FiChevronRight className="step-sep" />
          <div className={`step ${step >= 2 ? 'active' : ''}`}><span>2</span> Address</div>
          <FiChevronRight className="step-sep" />
          <div className={`step ${step >= 3 ? 'active' : ''}`}><span>3</span> Payment</div>
        </div>

        <div className="checkout__layout">
          {/* Main Form */}
          <div className="checkout__main animate-fade-in-left">
            {step === 1 ? (
              <div className="checkout__section glass-card">
                <div className="section-header">
                  <FiMapPin /> <h2>Shipping Address</h2>
                </div>
                <div className="checkout__form">
                  <div className="form-row">
                    <input type="text" placeholder="First Name" className="input-field" />
                    <input type="text" placeholder="Last Name" className="input-field" />
                  </div>
                  <input type="email" placeholder="Email Address" className="input-field" />
                  <input type="text" placeholder="Street Address" className="input-field" />
                  <div className="form-row">
                    <input type="text" placeholder="City" className="input-field" />
                    <input type="text" placeholder="PIN Code" className="input-field" />
                  </div>
                  <input type="text" placeholder="Phone Number" className="input-field" />
                  <Button variant="primary" size="lg" fullWidth onClick={() => setStep(2)}>Deliver to this Address</Button>
                </div>
              </div>
            ) : (
              <div className="checkout__section glass-card">
                <div className="section-header">
                  <FiCreditCard /> <h2>Select Payment Method</h2>
                </div>
                <div className="payment-options">
                  <div 
                    className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('upi')}
                  >
                    <div className="option-radio" />
                    <div className="option-info">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" />
                      <div>
                        <strong>UPI (GPay, PhonePe, Paytm)</strong>
                        <p>Instant payment using any UPI app</p>
                      </div>
                    </div>
                    <span className="recommended-badge">Recommended</span>
                  </div>

                  <div 
                    className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <div className="option-radio" />
                    <div className="option-info">
                      <FiCreditCard />
                      <div>
                        <strong>Credit / Debit Card</strong>
                        <p>Visa, Mastercard, RuPay, Maestro</p>
                      </div>
                    </div>
                  </div>

                  <div 
                    className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('cod')}
                  >
                    <div className="option-radio" />
                    <div className="option-info">
                      <FiCheckCircle />
                      <div>
                        <strong>Cash on Delivery</strong>
                        <p>Pay when you receive the order</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="checkout__actions">
                  <button className="btn-back" onClick={() => setStep(1)}>Back to Address</button>
                  <Button variant="primary" size="lg" onClick={handlePlaceOrder}>Complete Order</Button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Summary */}
          <aside className="checkout__sidebar animate-fade-in-right">
            <div className="checkout__summary glass-card">
              <h3>Order Summary</h3>
              <div className="checkout__items-preview">
                {cartItems.map(item => (
                  <div key={item.id} className="preview-item">
                    <img src={item.image} alt={item.name} />
                    <div className="preview-info">
                      <p>{item.name}</p>
                      <span>Qty: {item.quantity}</span>
                    </div>
                    <span className="preview-price">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="summary-divider" />
              <div className="summary-row"><span>Subtotal</span><span>{formatPrice(cartTotal)}</span></div>
              <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
              <div className="summary-row"><span>Tax</span><span>{formatPrice(tax)}</span></div>
              <div className="summary-row total"><span>Total</span><span>{formatPrice(total)}</span></div>
              <div className="secure-checkout-note">
                <FiShield /> <span>Secure SSL Encrypted Checkout</span>
              </div>
            </div>
          </aside>
        </div>
      </div>

    </main>
  );
};

export default Checkout;
