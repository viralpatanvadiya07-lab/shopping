import { Link } from 'react-router-dom';
import { FiClock, FiArrowRight } from 'react-icons/fi';
import './OffersSection.css';

const OffersSection = () => {
  return (
    <section className="offers section" id="offers-section">
      <div className="container">
        <div className="offers__grid">
          {/* Main Offer */}
          <div className="offers__card offers__card--main glass-card">
            <div className="offers__card-bg" />
            <div className="offers__content">
              <span className="offers__label">Limited Time Deal</span>
              <h2 className="offers__title">
                Summer Sale
                <span className="gradient-text"> Up to 50% Off</span>
              </h2>
              <p className="offers__text">
                Don't miss out on our biggest sale of the season.
                Premium products at unbeatable prices.
              </p>
              <div className="offers__timer">
                <div className="offers__timer-item">
                  <span className="offers__timer-number">02</span>
                  <span className="offers__timer-label">Days</span>
                </div>
                <span className="offers__timer-sep">:</span>
                <div className="offers__timer-item">
                  <span className="offers__timer-number">14</span>
                  <span className="offers__timer-label">Hours</span>
                </div>
                <span className="offers__timer-sep">:</span>
                <div className="offers__timer-item">
                  <span className="offers__timer-number">36</span>
                  <span className="offers__timer-label">Mins</span>
                </div>
                <span className="offers__timer-sep">:</span>
                <div className="offers__timer-item">
                  <span className="offers__timer-number">52</span>
                  <span className="offers__timer-label">Secs</span>
                </div>
              </div>
              <Link to="/shop?filter=deals" className="offers__cta">
                Shop the Sale <FiArrowRight />
              </Link>
            </div>
          </div>

          {/* Side Offers */}
          <div className="offers__side">
            <div className="offers__card offers__card--sm glass-card" style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(16, 185, 129, 0.1))' }}>
              <div className="offers__sm-content">
                <span className="offers__sm-badge">Free Shipping</span>
                <h3>On Orders Over $99</h3>
                <p>Worldwide delivery at no extra cost</p>
                <Link to="/shop" className="offers__sm-link">Shop Now <FiArrowRight /></Link>
              </div>
            </div>
            <div className="offers__card offers__card--sm glass-card" style={{ background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(239, 68, 68, 0.1))' }}>
              <div className="offers__sm-content">
                <span className="offers__sm-badge">New Members</span>
                <h3>Get 20% Off First Order</h3>
                <p>Sign up and save on your first purchase</p>
                <Link to="/signup" className="offers__sm-link">Join Now <FiArrowRight /></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
