import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiHeart, FiUser, FiMenu, FiX, FiLogOut, FiPackage, FiSettings, FiChevronDown } from 'react-icons/fi';
import { useWishlist } from '../../hooks/useWishlist';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import SearchBar from './SearchBar';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const { wishlistCount } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setIsProfileOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/categories', label: 'Categories' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`} id="main-navbar">
      <div className="navbar__container container">
        {/* Logo */}
        <Link to="/" className="navbar__logo" id="navbar-logo">
          <span className="navbar__logo-icon">🛍️</span>
          <span className="navbar__logo-text">
            Shop<span className="gradient-text">Verse</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className={`navbar__links ${isMobileOpen ? 'navbar__links--open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
                id={`nav-link-${link.label.toLowerCase()}`}
              >
                {link.label}
                <span className="navbar__link-indicator" />
              </Link>
            </li>
          ))}
          {/* Mobile-only auth links */}
          <li className="navbar__mobile-auth">
            {user ? (
              <>
                <Link to="/profile" className="navbar__link">Profile</Link>
                <Link to="/orders" className="navbar__link">Orders</Link>
                <button onClick={handleLogout} className="navbar__link navbar__logout-btn">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="navbar__link">Login</Link>
                <Link to="/signup" className="navbar__link">Sign Up</Link>
              </>
            )}
          </li>
        </ul>

        {/* Actions */}
        <div className="navbar__actions">
          {/* Search Toggle */}
          <button
            className="navbar__action-btn"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            id="search-toggle-btn"
            aria-label="Toggle search"
          >
            <FiSearch />
          </button>

          {/* Wishlist */}
          <Link to="/wishlist" className="navbar__action-btn navbar__wishlist-btn" id="wishlist-btn" aria-label="Wishlist">
            <FiHeart />
            {wishlistCount > 0 && (
              <span className="navbar__wishlist-badge">{wishlistCount}</span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="navbar__action-btn navbar__cart-btn" id="cart-btn" aria-label="Shopping cart">
            <FiShoppingCart />
            {cartCount > 0 && (
              <span className="navbar__cart-badge animate-cart-bounce">{cartCount}</span>
            )}
          </Link>

          {/* User Profile */}
          {user ? (
            <div className="navbar__profile" ref={profileRef}>
              <button
                className="navbar__profile-btn"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                id="profile-dropdown-btn"
              >
                <div className="navbar__avatar">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <FiChevronDown className={`navbar__chevron ${isProfileOpen ? 'navbar__chevron--open' : ''}`} />
              </button>

              {isProfileOpen && (
                <div className="navbar__dropdown animate-fade-in-down">
                  <div className="navbar__dropdown-header">
                    <p className="navbar__dropdown-name">{user.name}</p>
                    <p className="navbar__dropdown-email">{user.email}</p>
                  </div>
                  <div className="navbar__dropdown-divider" />
                  <Link to="/profile" className="navbar__dropdown-item" id="dropdown-profile">
                    <FiUser /> Profile
                  </Link>
                  <Link to="/orders" className="navbar__dropdown-item" id="dropdown-orders">
                    <FiPackage /> My Orders
                  </Link>
                  <Link to="/wishlist" className="navbar__dropdown-item" id="dropdown-wishlist">
                    <FiHeart /> Wishlist
                  </Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="navbar__dropdown-item" id="dropdown-admin">
                      <FiSettings /> Admin Panel
                    </Link>
                  )}
                  <div className="navbar__dropdown-divider" />
                  <button onClick={handleLogout} className="navbar__dropdown-item navbar__dropdown-logout" id="dropdown-logout">
                    <FiLogOut /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="navbar__login-btn" id="login-btn">
              <FiUser />
              <span>Login</span>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="navbar__mobile-toggle"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            id="mobile-menu-toggle"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Search Bar Overlay */}
      {isSearchOpen && (
        <div className="navbar__search-overlay animate-fade-in-down">
          <div className="container">
            <SearchBar onClose={() => setIsSearchOpen(false)} />
          </div>
        </div>
      )}

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="navbar__overlay" onClick={() => setIsMobileOpen(false)} />
      )}
    </nav>
  );
};

export default Navbar;
