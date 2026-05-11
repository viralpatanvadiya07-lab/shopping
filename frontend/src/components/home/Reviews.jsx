import { FiStar } from 'react-icons/fi';
import { testimonials } from '../../data/products';
import './Reviews.css';

const Reviews = () => {
  return (
    <section className="reviews section" id="reviews-section">
      <div className="container">
        <div className="section-title">
          <h2>What Our Customers Say</h2>
          <p>Real reviews from real shoppers who love ShopVerse</p>
        </div>

        <div className="reviews__grid stagger-children">
          {testimonials.map((review) => (
            <div key={review.id} className="reviews__card glass-card">
              <div className="reviews__stars">
                {[...Array(review.rating)].map((_, i) => (
                  <FiStar key={i} className="reviews__star" />
                ))}
              </div>
              <p className="reviews__text">"{review.text}"</p>
              <div className="reviews__author">
                <span className="reviews__avatar">{review.avatar}</span>
                <div>
                  <p className="reviews__name">{review.name}</p>
                  <p className="reviews__role">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
