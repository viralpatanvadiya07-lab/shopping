import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';
import './Auth.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) navigate('/');
  };

  return (
    <main className="auth-page page-active" id="login-page">
      <div className="auth__bg">
        <div className="auth__blob auth__blob--1" />
        <div className="auth__blob auth__blob--2" />
      </div>
      <div className="auth__card glass-card animate-scale-in">
        <div className="auth__header">
          <Link to="/" className="auth__logo">🛍️ Shop<span className="gradient-text">Verse</span></Link>
          <h1>Welcome Back</h1>
          <p>Sign in to your account to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="auth__form" id="login-form">
          <div className="auth__field">
            <FiMail className="auth__field-icon" />
            <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} className="auth__input" required id="login-email" />
          </div>
          <div className="auth__field">
            <FiLock className="auth__field-icon" />
            <input type={showPass ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="auth__input" required id="login-password" />
            <button type="button" className="auth__toggle-pass" onClick={() => setShowPass(!showPass)}>{showPass ? <FiEyeOff /> : <FiEye />}</button>
          </div>
          <div className="auth__options">
            <label className="auth__remember"><input type="checkbox" /> Remember me</label>
            <Link to="/forgot-password" className="auth__forgot">Forgot password?</Link>
          </div>
          <Button type="submit" variant="primary" size="lg" fullWidth loading={loading} id="login-submit">Sign In</Button>
        </form>
        <p className="auth__switch">Don't have an account? <Link to="/signup">Sign Up</Link></p>
        <div className="auth__demo">
          <p>Demo: any email + password (min 6 chars)</p>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
