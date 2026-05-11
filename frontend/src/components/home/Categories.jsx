import { Link } from 'react-router-dom';
import { categories } from '../../data/products';
import { FiArrowRight } from 'react-icons/fi';
import './Categories.css';

const Categories = () => {
  return (
    <section className="categories section" id="categories-section">
      <div className="container">
        <div className="section-title">
          <h2>Shop by Category</h2>
          <p>Browse our curated collections across trending categories</p>
        </div>

        <div className="categories__grid stagger-children">
          {categories.map((cat) => (
            <Link
              to={`/shop?category=${cat.name}`}
              key={cat.id}
              className="categories__card glass-card"
              id={`category-${cat.name.toLowerCase()}`}
              style={{ '--cat-color': cat.color }}
            >
              <div className="categories__image-wrapper">
                <img src={cat.image} alt={cat.name} className="categories__image" />
                <div className="categories__image-overlay" />
              </div>
              <div className="categories__info">
                <span className="categories__icon">{cat.icon}</span>
                <h3 className="categories__name">{cat.name}</h3>
                <p className="categories__count">{cat.count}+ Products</p>
                <span className="categories__arrow"><FiArrowRight /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
