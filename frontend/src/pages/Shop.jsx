import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiFilter, FiX, FiGrid, FiList, FiChevronDown } from 'react-icons/fi';
import ProductCard from '../components/product/ProductCard';
import { products, categories } from '../data/products';
import './Shop.css';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  const searchQuery = searchParams.get('search') || '';

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Price
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return result;
  }, [selectedCategory, sortBy, priceRange, searchQuery]);

  return (
    <main className="shop-page page-active" id="shop-page">
      <div className="container">
        {/* Header */}
        <div className="shop__header animate-fade-in-up">
          <div>
            <h1 className="shop__title">
              {searchQuery ? `Results for "${searchQuery}"` : 'Shop All Products'}
            </h1>
            <p className="shop__count">{filteredProducts.length} products found</p>
          </div>
          <div className="shop__controls">
            <button
              className="shop__filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
              id="filter-toggle-btn"
            >
              {showFilters ? <FiX /> : <FiFilter />}
              Filters
            </button>
            <div className="shop__sort">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="shop__sort-select"
                id="sort-select"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="newest">Newest</option>
              </select>
              <FiChevronDown className="shop__sort-icon" />
            </div>
            <div className="shop__view-modes">
              <button
                className={`shop__view-btn ${viewMode === 'grid' ? 'shop__view-btn--active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <FiGrid />
              </button>
              <button
                className={`shop__view-btn ${viewMode === 'list' ? 'shop__view-btn--active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <FiList />
              </button>
            </div>
          </div>
        </div>

        <div className="shop__layout">
          {/* Sidebar Filters */}
          <aside className={`shop__sidebar ${showFilters ? 'shop__sidebar--open' : ''}`}>
            <div className="shop__sidebar-section">
              <h3 className="shop__sidebar-title">Categories</h3>
              <div className="shop__categories">
                <button
                  className={`shop__category-btn ${selectedCategory === 'All' ? 'shop__category-btn--active' : ''}`}
                  onClick={() => setSelectedCategory('All')}
                >
                  All Products
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    className={`shop__category-btn ${selectedCategory === cat.name ? 'shop__category-btn--active' : ''}`}
                    onClick={() => setSelectedCategory(cat.name)}
                    id={`filter-cat-${cat.name.toLowerCase()}`}
                  >
                    <span>{cat.icon}</span> {cat.name}
                    <span className="shop__category-count">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="shop__sidebar-section">
              <h3 className="shop__sidebar-title">Price Range</h3>
              <div className="shop__price-range">
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                  className="shop__price-slider"
                  id="price-slider"
                />
                <div className="shop__price-labels">
                  <span>$0</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="shop__products">
            {filteredProducts.length > 0 ? (
              <div className={`${viewMode === 'grid' ? 'grid-products' : 'shop__list'} stagger-children`}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="shop__empty">
                <span className="shop__empty-icon">🔍</span>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search query</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Shop;
