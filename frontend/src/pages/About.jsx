import { FiShield, FiTruck, FiHeadphones, FiAward } from 'react-icons/fi';
import './About.css';

const About = () => {
  const features = [
    { icon: <FiShield />, title: 'Secure Shopping', desc: 'Your data is protected with enterprise-grade encryption' },
    { icon: <FiTruck />, title: 'Fast Delivery', desc: 'Free express shipping on orders over $99' },
    { icon: <FiHeadphones />, title: '24/7 Support', desc: 'Our team is always here to help you' },
    { icon: <FiAward />, title: 'Best Quality', desc: 'Curated products from trusted brands worldwide' },
  ];

  return (
    <main className="about-page page-active" id="about-page">
      <div className="container">
        <div className="about__hero animate-fade-in-up">
          <h1>About <span className="gradient-text">ShopVerse</span></h1>
          <p>We're on a mission to make premium products accessible to everyone. Founded in 2024, ShopVerse has grown from a small startup to a global marketplace trusted by over 50,000 customers worldwide.</p>
        </div>
        <div className="about__features stagger-children">
          {features.map((f, i) => (
            <div key={i} className="about__feature glass-card">
              <div className="about__feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="about__stats animate-fade-in-up">
          <div className="about__stat"><span className="about__stat-num">50K+</span><span>Happy Customers</span></div>
          <div className="about__stat"><span className="about__stat-num">10K+</span><span>Products</span></div>
          <div className="about__stat"><span className="about__stat-num">99%</span><span>Satisfaction Rate</span></div>
          <div className="about__stat"><span className="about__stat-num">24/7</span><span>Customer Support</span></div>
        </div>
      </div>
    </main>
  );
};

export default About;
