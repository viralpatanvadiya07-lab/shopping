const razorpay = require('../config/razorpay');
const crypto = require('crypto');
const asyncHandler = require('express-async-handler');

// @desc    Create Razorpay Order
// @route   POST /api/payment/order
// @access  Public
const createOrder = asyncHandler(async (req, res) => {
  const { amount, currency = 'INR' } = req.body;

  const options = {
    amount: amount * 100, // amount in the smallest currency unit (paise)
    currency,
    receipt: `receipt_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(201).json(order);
  } catch (error) {
    res.status(500);
    throw new Error('Could not create Razorpay order');
  }
});

// @desc    Verify Payment Signature
// @route   POST /api/payment/verify
// @access  Public
const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign.toString())
    .digest("hex");

  if (razorpay_signature === expectedSign) {
    res.status(200).json({ success: true, message: "Payment verified successfully" });
  } else {
    res.status(400);
    throw new Error("Invalid signature sent!");
  }
});

module.exports = { createOrder, verifyPayment };
