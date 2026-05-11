import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { FiShoppingCart, FiHeart, FiStar, FiMinus, FiPlus, FiTruck, FiShield, FiRefreshCw, FiArrowLeft } from 'react-icons/fi';
import { products, formatPrice, getDiscountPercent } from '../data/products';
import { useCart } from '../hooks/useCart';
import ProductCard from '../components/product/ProductCard';
import Button from '../components/common/Button';
import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);

  if (!product) {
    return (
      <main className="product-page page-active" style={{ paddingTop: '120px' }}>
        <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
          <h2>Product not found</h2>
          <Link to="/shop"><Button variant="primary">Back to Shop</Button></Link>
        </div>
      </main>
    );
  }

  const discount = product.originalPrice ? getDiscountPercent(product.originalPrice, product.price) : 0;
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <main className="product-page page-active" id="product-page">
      <div className="container">
        <Link to="/shop" className="product-page__back">
          <FiArrowLeft /> Back to Shop
        </Link>

        <div className="product-page__grid animate-fade-in-up">
          {/* Images */}
          <div className="product-page__images">
            <div className="product-page__main-image glass-card">
              <img src={product.image} alt={product.name} />
              {discount > 0 && (
                <span className="product-page__discount-badge">-{discount}%</span>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="product-page__details">
            <span className="product-page__category">{product.category}</span>
            <h1 className="product-page__name">{product.name}</h1>

            <div className="product-page__rating">
              <div className="product-page__stars">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className={i < Math.floor(product.rating) ? 'star--filled' : ''} />
                ))}
              </div>
              <span>{product.rating} ({product.reviews} reviews)</span>
            </div>

            <div className="product-page__price">
              <span className="product-page__current-price">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="product-page__original-price">{formatPrice(product.originalPrice)}</span>
              )}
              {discount > 0 && (
                <span className="product-page__save">Save {discount}%</span>
              )}
            </div>

            <p className="product-page__desc">{product.description}</p>

            {/* Colors */}
            {product.colors && (
              <div className="product-page__option">
                <label>Color</label>
                <div className="product-page__colors">
                  {product.colors.map((color, i) => (
                    <button
                      key={i}
                      className={`product-page__color ${selectedColor === i ? 'product-page__color--active' : ''}`}
                      style={{ background: color }}
                      onClick={() => setSelectedColor(i)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="product-page__option">
              <label>Quantity</label>
              <div className="product-page__quantity">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><FiMinus /></button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}><FiPlus /></button>
              </div>
            </div>

            {/* Actions */}
            <div className="product-page__actions">
              <Button
                variant="primary"
                size="lg"
                icon={<FiShoppingCart />}
                onClick={() => addToCart(product, quantity)}
                fullWidth
                id="add-to-cart-btn"
              >
                Add to Cart
              </Button>
              <Button variant="outline" size="lg" icon={<FiHeart />} id="wishlist-product-btn">
                Wishlist
              </Button>
            </div>

            {/* Features */}
            <div className="product-page__features">
              <div className="product-page__feature">
                <FiTruck /> <span>Free shipping on orders over $99</span>
              </div>
              <div className="product-page__feature">
                <FiShield /> <span>2-year warranty included</span>
              </div>
              <div className="product-page__feature">
                <FiRefreshCw /> <span>30-day return policy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="product-page__related section">
            <div className="section-title">
              <h2>You May Also Like</h2>
              <p>Similar products in {product.category}</p>
            </div>
            <div className="grid-products stagger-children">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default ProductPage;
