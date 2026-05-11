import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you soon.');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <main className="contact-page page-active" id="contact-page">
      <div className="container">
        <div className="section-title animate-fade-in-up">
          <h2>Get in Touch</h2>
          <p>Have a question or feedback? We'd love to hear from you.</p>
        </div>
        <div className="contact__grid">
          <form onSubmit={handleSubmit} className="contact__form glass-card animate-fade-in-left" id="contact-form">
            <div className="contact__row">
              <input type="text" placeholder="Your name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="input-field" required />
              <input type="email" placeholder="Your email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="input-field" required />
            </div>
            <input type="text" placeholder="Subject" value={form.subject} onChange={(e) => setForm({...form, subject: e.target.value})} className="input-field" required />
            <textarea placeholder="Your message..." value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} className="input-field contact__textarea" required rows={5} />
            <Button type="submit" variant="primary" size="lg" icon={<FiSend />} id="contact-submit">Send Message</Button>
          </form>
          <div className="contact__info animate-fade-in-right">
            <div className="contact__info-card glass-card">
              <div className="contact__info-icon"><FiMail /></div>
              <h3>Email Us</h3>
              <p>support@shopverse.com</p>
            </div>
            <div className="contact__info-card glass-card">
              <div className="contact__info-icon"><FiPhone /></div>
              <h3>Call Us</h3>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="contact__info-card glass-card">
              <div className="contact__info-icon"><FiMapPin /></div>
              <h3>Visit Us</h3>
              <p>123 Shopping Ave, NY 10001</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
