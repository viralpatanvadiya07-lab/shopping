import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { FiHome } from 'react-icons/fi';

const NotFound = () => {
  return (
    <main className="page-active" id="not-found-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 20px' }}>
      <div className="animate-scale-in">
        <span style={{ fontSize: '6rem', display: 'block', marginBottom: '16px' }}>😕</span>
        <h1 style={{ fontSize: '4rem', fontWeight: 900 }}>4<span className="gradient-text">0</span>4</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '32px', maxWidth: '400px' }}>Oops! The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/"><Button variant="primary" size="lg" icon={<FiHome />}>Back to Home</Button></Link>
      </div>
    </main>
  );
};

export default NotFound;
