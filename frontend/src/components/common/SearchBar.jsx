import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiX } from 'react-icons/fi';
import './SearchBar.css';

const SearchBar = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      if (onClose) onClose();
    }
  };

  return (
    <form className="searchbar" onSubmit={handleSubmit} id="search-form">
      <div className="searchbar__wrapper">
        <FiSearch className="searchbar__icon" />
        <input
          type="text"
          className="searchbar__input"
          placeholder="Search products, categories, brands..."
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
            aria-label="Clear search"
          >
            <FiX />
          </button>
        )}
        <button type="submit" className="searchbar__submit" id="search-submit-btn">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
