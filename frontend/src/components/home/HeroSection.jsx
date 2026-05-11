import { Link } from 'react-router-dom';
import { FiArrowRight, FiShoppingBag } from 'react-icons/fi';
import Button from '../common/Button';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero" id="hero-section">
      {/* Background Elements */}
      <div className="hero__bg">
        <div className="hero__blob hero__blob--1" />
        <div className="hero__blob hero__blob--2" />
        <div className="hero__blob hero__blob--3" />
        <div className="hero__grid-pattern" />
      </div>

      <div className="container hero__container">
        <div className="hero__content animate-fade-in-up">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            New Season Collection 2026
          </div>

          <h1 className="hero__title">
            Discover Your
            <span className="hero__title-highlight"> Perfect Style</span>
            <br />with LuxeLane
          </h1>

          <p className="hero__subtitle">
            Explore thousands of premium products across electronics, fashion, sports & more.
            Get up to <span className="hero__discount">50% OFF</span> on your first order.
          </p>

          <div className="hero__actions">
            <Link to="/shop">
              <Button variant="primary" size="lg" icon={<FiShoppingBag />}>
                Shop Now
              </Button>
            </Link>
            <Link to="/shop?filter=deals">
              <Button variant="outline" size="lg" icon={<FiArrowRight />}>
                View Deals
              </Button>
            </Link>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-number">10K+</span>
              <span className="hero__stat-label">Products</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-number">50K+</span>
              <span className="hero__stat-label">Customers</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-number">4.9★</span>
              <span className="hero__stat-label">Rating</span>
            </div>
          </div>
        </div>

        <div className="hero__visual animate-fade-in-right">
          <div className="hero__image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=700&fit=crop"
              alt="Shopping collection"
              className="hero__image"
            />
            <div className="hero__image-overlay" />

            {/* Floating Cards */}
            <div className="hero__float-card hero__float-card--1 animate-float">
              <span className="hero__float-icon">🎧</span>
              <div>
                <p className="hero__float-title">Headphones</p>
                <p className="hero__float-price">$299</p>
              </div>
            </div>

            <div className="hero__float-card hero__float-card--2 animate-float" style={{ animationDelay: '1s' }}>
              <span className="hero__float-icon">⌚</span>
              <div>
                <p className="hero__float-title">Smart Watch</p>
                <p className="hero__float-price">$449</p>
              </div>
            </div>

            <div className="hero__float-card hero__float-card--3 animate-float" style={{ animationDelay: '2s' }}>
              <span>⭐ 4.9</span>
              <span>2.5K Reviews</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
