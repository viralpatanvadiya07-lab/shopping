import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';
import './Auth.css';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await signup(name, email, password);
    setLoading(false);
    if (result.success) navigate('/');
  };

  return (
    <main className="auth-page page-active" id="signup-page">
      <div className="auth__bg"><div className="auth__blob auth__blob--1" /><div className="auth__blob auth__blob--2" /></div>
      <div className="auth__card glass-card animate-scale-in">
        <div className="auth__header">
          <Link to="/" className="auth__logo">🛍️ Shop<span className="gradient-text">Verse</span></Link>
          <h1>Create Account</h1>
          <p>Join ShopVerse and start shopping</p>
        </div>
        <form onSubmit={handleSubmit} className="auth__form" id="signup-form">
          <div className="auth__field">
            <FiUser className="auth__field-icon" />
            <input type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} className="auth__input" required id="signup-name" />
          </div>
          <div className="auth__field">
            <FiMail className="auth__field-icon" />
            <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} className="auth__input" required id="signup-email" />
          </div>
          <div className="auth__field">
            <FiLock className="auth__field-icon" />
            <input type={showPass ? 'text' : 'password'} placeholder="Password (min 6 chars)" value={password} onChange={(e) => setPassword(e.target.value)} className="auth__input" required minLength={6} id="signup-password" />
            <button type="button" className="auth__toggle-pass" onClick={() => setShowPass(!showPass)}>{showPass ? <FiEyeOff /> : <FiEye />}</button>
          </div>
          <Button type="submit" variant="primary" size="lg" fullWidth loading={loading} id="signup-submit">Create Account</Button>
        </form>
        <p className="auth__switch">Already have an account? <Link to="/login">Sign In</Link></p>
      </div>
    </main>
  );
};

export default SignupPage;
