import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiTwitter, FiInstagram, FiLinkedin, FiArrowRight } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { label: 'All Products', path: '/shop' },
      { label: 'New Arrivals', path: '/shop?sort=newest' },
      { label: 'Best Sellers', path: '/shop?sort=popular' },
      { label: 'Deals & Offers', path: '/shop?filter=deals' },
      { label: 'Gift Cards', path: '/gift-cards' },
    ],
    support: [
      { label: 'Help Center', path: '/help' },
      { label: 'Track Order', path: '/track-order' },
      { label: 'Returns & Refunds', path: '/returns' },
      { label: 'Shipping Info', path: '/shipping' },
      { label: 'FAQs', path: '/faq' },
    ],
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'Careers', path: '/careers' },
      { label: 'Contact Us', path: '/contact' },
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
    ],
  };

  return (
    <footer className="footer" id="main-footer">
      {/* Newsletter */}
      <div className="footer__newsletter">
        <div className="container">
          <div className="footer__newsletter-content">
            <div className="footer__newsletter-text">
              <h3>ShopVerse Newsletter</h3>
              <p>Get exclusive deals, new arrivals & more delivered to your inbox.</p>
            </div>
            <form className="footer__newsletter-form" onSubmit={(e) => e.preventDefault()} id="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="footer__newsletter-input"
                id="newsletter-email"
              />
              <button type="submit" className="footer__newsletter-btn" id="newsletter-submit">
                Subscribe <FiArrowRight />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">
            {/* Brand */}
            <div className="footer__brand">
              <Link to="/" className="footer__logo">
                <span>🛍️</span>
                <span>Shop<span className="gradient-text">Verse</span></span>
              </Link>
              <p className="footer__description">
                Your premium destination for the latest trends in fashion, electronics, and lifestyle products. Shop with confidence at ShopVerse.
              </p>
              <div className="footer__socials">
                <a href="#" className="footer__social-link" aria-label="GitHub"><FiGithub /></a>
                <a href="#" className="footer__social-link" aria-label="Twitter"><FiTwitter /></a>
                <a href="#" className="footer__social-link" aria-label="Instagram"><FiInstagram /></a>
                <a href="#" className="footer__social-link" aria-label="LinkedIn"><FiLinkedin /></a>
              </div>
            </div>

            {/* Links */}
            <div className="footer__links-group">
              <h4 className="footer__links-title">Shop</h4>
              <ul className="footer__links">
                {footerLinks.shop.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="footer__link">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__links-group">
              <h4 className="footer__links-title">Support</h4>
              <ul className="footer__links">
                {footerLinks.support.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="footer__link">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__links-group">
              <h4 className="footer__links-title">Company</h4>
              <ul className="footer__links">
                {footerLinks.company.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="footer__link">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="footer__contact">
              <h4 className="footer__links-title">Get in Touch</h4>
              <div className="footer__contact-items">
                <div className="footer__contact-item">
                  <FiMapPin />
                  <span>123 Shopping Ave, New York, NY 10001</span>
                </div>
                <div className="footer__contact-item">
                  <FiPhone />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="footer__contact-item">
                  <FiMail />
                  <span>support@shopverse.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-content">
            <p>© {currentYear} ShopVerse. All rights reserved.</p>
            <div className="footer__payment-methods">
              <span>💳</span>
              <span>🏦</span>
              <span>📱</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
