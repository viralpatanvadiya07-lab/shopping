import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiSearch, FiX, FiArrowRight } from 'react-icons/fi';
import { products } from '../../data/products';
import './SearchBar.css';

const SearchBar = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    if (query.trim().length > 1) {
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      if (onClose) onClose();
    }
  };

  return (
    <div className="searchbar-container" ref={searchRef}>
      <form className="searchbar" onSubmit={handleSubmit} id="search-form">
        <div className="searchbar__wrapper">
          <FiSearch className="searchbar__icon" />
          <input
            type="text"
            className="searchbar__input"
            placeholder="Search products, categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            id="search-input"
          />
          {query && (
            <button
              type="button"
              className="searchbar__clear"
              onClick={() => setQuery('')}
            >
              <FiX />
            </button>
          )}
          <button type="submit" className="searchbar__submit">
            Search
          </button>
        </div>
      </form>

      {results.length > 0 && (
        <div className="search-results animate-fade-in-up">
          <div className="search-results__list">
            {results.map(product => (
              <Link 
                key={product.id} 
                to={`/product/${product.id}`} 
                className="search-result-item"
                onClick={onClose}
              >
                <img src={product.image} alt={product.name} />
                <div className="result-info">
                  <span className="result-name">{product.name}</span>
                  <span className="result-category">{product.category}</span>
                </div>
                <FiArrowRight className="result-arrow" />
              </Link>
            ))}
          </div>
          <button className="search-view-all" onClick={handleSubmit}>
            View all results for "{query}"
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
