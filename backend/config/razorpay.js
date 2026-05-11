const Razorpay = require('razorpay');
const dotenv = require('dotenv');

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_example_id',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'example_secret',
});

module.exports = razorpay;
