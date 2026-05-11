import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiEye, FiStar } from 'react-icons/fi';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { formatPrice, getDiscountPercent } from '../../data/products';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const discount = product.originalPrice
    ? getDiscountPercent(product.originalPrice, product.price)
    : 0;
  const wishlisted = isInWishlist(product.id);

  return (
    <div className="product-card glass-card" id={`product-card-${product.id}`}>
      {/* Image */}
      <div className="product-card__image-wrapper">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="product-card__image"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        {product.badge && (
          <span className={`product-card__badge badge badge-${
            product.badge === 'Sale' ? 'error' :
            product.badge === 'New' ? 'primary' :
            product.badge === 'Trending' ? 'warning' : 'success'
          }`}>
            {product.badge}
          </span>
        )}

        {discount > 0 && (
          <span className="product-card__discount">-{discount}%</span>
        )}

        {/* Quick Actions */}
        <div className="product-card__actions">
          <button
            className="product-card__action-btn"
            onClick={() => addToCart(product)}
            title="Add to Cart"
            aria-label="Add to cart"
          >
            <FiShoppingCart />
          </button>
          <button
            className={`product-card__action-btn ${wishlisted ? 'product-card__action-btn--wishlisted' : ''}`}
            onClick={() => toggleWishlist(product)}
            title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <FiHeart />
          </button>
          <Link to={`/product/${product.id}`} className="product-card__action-btn" title="Quick View" aria-label="View product">
            <FiEye />
          </Link>
        </div>
      </div>

      {/* Info */}
      <div className="product-card__info">
        <Link to={`/shop?category=${product.category}`} className="product-card__category">
          {product.category}
        </Link>

        <Link to={`/product/${product.id}`} className="product-card__name">
          {product.name}
        </Link>

        {/* Rating */}
        <div className="product-card__rating">
          <div className="product-card__stars">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`product-card__star ${i < Math.floor(product.rating) ? 'product-card__star--filled' : ''}`}
              />
            ))}
          </div>
          <span className="product-card__rating-text">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="product-card__price-row">
          <span className="product-card__price">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="product-card__original-price">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Colors */}
        {product.colors && (
          <div className="product-card__colors">
            {product.colors.map((color, i) => (
              <span
                key={i}
                className="product-card__color"
                style={{ background: color }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
