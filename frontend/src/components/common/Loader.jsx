import './Loader.css';

const Loader = ({ size = 'md', text = 'Loading...' }) => {
  return (
    <div className={`loader loader--${size}`} id="main-loader">
      <div className="loader__spinner">
        <div className="loader__ring" />
        <div className="loader__ring" />
        <div className="loader__ring" />
        <span className="loader__icon">🛍️</span>
      </div>
      {text && <p className="loader__text">{text}</p>}
    </div>
  );
};

export default Loader;
