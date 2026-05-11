import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiTrash2, FiShoppingBag, FiX } from 'react-icons/fi';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../hooks/useCart';
import { formatPrice, getDiscountPercent } from '../data/products';
import Button from '../components/common/Button';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  if (wishlistItems.length === 0) {
    return (
      <main className="wishlist-page page-active" id="wishlist-page">
        <div className="container">
          <div className="wishlist__empty">
            <span className="wishlist__empty-icon">❤️</span>
            <h2>Your wishlist is empty</h2>
            <p>Save items you love for later. Start exploring!</p>
            <Link to="/shop"><Button variant="primary" size="lg" icon={<FiShoppingBag />}>Explore Products</Button></Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="wishlist-page page-active" id="wishlist-page">
      <div className="container">
        <div className="wishlist__header animate-fade-in-up">
          <div>
            <h1>My <span className="gradient-text">Wishlist</span></h1>
            <p className="wishlist__count">{wishlistItems.length} items saved</p>
          </div>
          <button className="wishlist__clear" onClick={clearWishlist}>
            <FiTrash2 /> Clear All
          </button>
        </div>

        <div className="wishlist__grid stagger-children">
          {wishlistItems.map((item) => {
            const discount = item.originalPrice ? getDiscountPercent(item.originalPrice, item.price) : 0;
            return (
              <div key={item.id} className="wishlist__card glass-card" id={`wishlist-item-${item.id}`}>
                <button className="wishlist__remove" onClick={() => removeFromWishlist(item.id)} aria-label="Remove from wishlist">
                  <FiX />
                </button>

                <Link to={`/product/${item.id}`} className="wishlist__image-wrapper">
                  <img src={item.image} alt={item.name} className="wishlist__image" />
                  {discount > 0 && (
                    <span className="wishlist__discount">-{discount}%</span>
                  )}
                </Link>

                <div className="wishlist__info">
                  <Link to={`/shop?category=${item.category}`} className="wishlist__category">{item.category}</Link>
                  <Link to={`/product/${item.id}`} className="wishlist__name">{item.name}</Link>
                  
                  <div className="wishlist__price-row">
                    <span className="wishlist__price">{formatPrice(item.price)}</span>
                    {item.originalPrice && (
                      <span className="wishlist__original-price">{formatPrice(item.originalPrice)}</span>
                    )}
                  </div>

                  <button className="wishlist__move-btn" onClick={() => handleMoveToCart(item)}>
                    <FiShoppingCart /> Move to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Wishlist;
