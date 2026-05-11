import { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit3, FiSave, FiShoppingBag, FiHeart, FiPackage, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || 'Guest User',
    email: user?.email || 'guest@shopverse.com',
    phone: '+91 98765 43210',
    address: '123 Shopping Street, Mumbai, MH 400001',
  });

  if (!user) {
    return (
      <main className="profile-page page-active" id="profile-page">
        <div className="container">
          <div className="profile__empty">
            <span className="profile__empty-icon">👤</span>
            <h2>Please Login First</h2>
            <p>You need to be logged in to view your profile</p>
            <Button variant="primary" size="lg" onClick={() => navigate('/login')}>Login Now</Button>
          </div>
        </div>
      </main>
    );
  }

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <main className="profile-page page-active" id="profile-page">
      <div className="container">
        <div className="profile__header animate-fade-in-up">
          <h1>My <span className="gradient-text">Profile</span></h1>
        </div>

        <div className="profile__layout">
          {/* Profile Card */}
          <div className="profile__card glass-card animate-fade-in-left">
            <div className="profile__avatar-section">
              <div className="profile__avatar">
                {user.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <h2 className="profile__name">{profile.name}</h2>
              <span className="profile__role badge badge-primary">{user.role || 'Member'}</span>
            </div>

            <div className="profile__stats">
              <div className="profile__stat" onClick={() => navigate('/orders')}>
                <FiPackage />
                <span className="profile__stat-num">5</span>
                <span className="profile__stat-label">Orders</span>
              </div>
              <div className="profile__stat" onClick={() => navigate('/cart')}>
                <FiShoppingBag />
                <span className="profile__stat-num">{cartCount}</span>
                <span className="profile__stat-label">In Cart</span>
              </div>
              <div className="profile__stat" onClick={() => navigate('/wishlist')}>
                <FiHeart />
                <span className="profile__stat-num">{wishlistCount}</span>
                <span className="profile__stat-label">Wishlist</span>
              </div>
            </div>

            <button className="profile__logout-btn" onClick={handleLogout}>
              <FiLogOut /> Logout
            </button>
          </div>

          {/* Details Section */}
          <div className="profile__details glass-card animate-fade-in-right">
            <div className="profile__details-header">
              <h3>Personal Information</h3>
              <button className="profile__edit-btn" onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
                {isEditing ? <><FiSave /> Save</> : <><FiEdit3 /> Edit</>}
              </button>
            </div>

            <div className="profile__fields">
              <div className="profile__field">
                <label><FiUser /> Full Name</label>
                {isEditing ? (
                  <input type="text" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} className="input-field" />
                ) : (
                  <p>{profile.name}</p>
                )}
              </div>

              <div className="profile__field">
                <label><FiMail /> Email Address</label>
                {isEditing ? (
                  <input type="email" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} className="input-field" />
                ) : (
                  <p>{profile.email}</p>
                )}
              </div>

              <div className="profile__field">
                <label><FiPhone /> Phone Number</label>
                {isEditing ? (
                  <input type="tel" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} className="input-field" />
                ) : (
                  <p>{profile.phone}</p>
                )}
              </div>

              <div className="profile__field">
                <label><FiMapPin /> Address</label>
                {isEditing ? (
                  <input type="text" value={profile.address} onChange={(e) => setProfile({...profile, address: e.target.value})} className="input-field" />
                ) : (
                  <p>{profile.address}</p>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="profile__actions">
              <h3>Quick Actions</h3>
              <div className="profile__action-grid">
                <button className="profile__action-card glass-card" onClick={() => navigate('/orders')}>
                  <FiPackage /> <span>My Orders</span>
                </button>
                <button className="profile__action-card glass-card" onClick={() => navigate('/wishlist')}>
                  <FiHeart /> <span>Wishlist</span>
                </button>
                <button className="profile__action-card glass-card" onClick={() => navigate('/cart')}>
                  <FiShoppingBag /> <span>Cart</span>
                </button>
                <button className="profile__action-card glass-card" onClick={() => navigate('/contact')}>
                  <FiMail /> <span>Support</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
