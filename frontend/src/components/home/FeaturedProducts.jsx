import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import ProductCard from '../product/ProductCard';
import { products } from '../../data/products';
import './FeaturedProducts.css';

const FeaturedProducts = () => {
  const featured = products.filter((p) => p.badge === 'Best Seller' || p.badge === 'Top Rated').slice(0, 4);

  return (
    <section className="featured section" id="featured-section">
      <div className="container">
        <div className="featured__header">
          <div className="section-title" style={{ textAlign: 'left', marginBottom: 0 }}>
            <h2>Featured Products</h2>
            <p>Handpicked items our customers love the most</p>
          </div>
          <Link to="/shop" className="featured__view-all">
            View All <FiArrowRight />
          </Link>
        </div>

        <div className="grid-products stagger-children">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
