import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import ProductCard from '../product/ProductCard';
import { products } from '../../data/products';

const TrendingProducts = () => {
  const trending = products.filter((p) => p.badge === 'Trending' || p.badge === 'Popular').slice(0, 4);

  return (
    <section className="featured section" id="trending-section">
      <div className="container">
        <div className="featured__header">
          <div className="section-title" style={{ textAlign: 'left', marginBottom: 0 }}>
            <h2>Trending Now</h2>
            <p>What everyone is talking about this week</p>
          </div>
          <Link to="/shop?sort=trending" className="featured__view-all">
            View All <FiArrowRight />
          </Link>
        </div>

        <div className="grid-products stagger-children">
          {trending.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
