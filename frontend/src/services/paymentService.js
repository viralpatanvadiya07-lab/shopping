import axios from 'axios';
import toast from 'react-hot-toast';

export const displayRazorpay = async (amount, cartItems, clearCart, navigate) => {
  try {
    // In a real app, you would call your backend to create an order
    // const { data } = await axios.post('/api/payment/razorpay', { amount });
    
    // For demo purposes, we'll simulate a successful payment
    const loadingToast = toast.loading('Initializing payment gateway...');
    
    setTimeout(() => {
      toast.dismiss(loadingToast);
      
      const options = {
        key: 'rzp_test_demo', // Replace with real key
        amount: amount * 100, // Amount in paise
        currency: 'INR',
        name: 'ShopVerse',
        description: 'Thank you for your purchase!',
        image: 'https://cdn-icons-png.flaticon.com/512/1162/1162499.png',
        handler: function (response) {
          toast.success('Payment Successful! Order SV-' + Math.floor(Math.random() * 1000000));
          clearCart();
          navigate('/orders');
        },
        prefill: {
          name: 'Demo User',
          email: 'user@shopverse.com',
          contact: '9999999999',
        },
        theme: {
          color: '#7c3aed',
        },
      };

      // If Razorpay is not loaded, show a fallback
      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        toast.error('Razorpay SDK failed to load. Are you online?');
        // Simulated success for dev environment if SDK is missing
        setTimeout(() => {
          toast.success('Demo: Payment processed successfully!');
          clearCart();
          navigate('/orders');
        }, 2000);
      }
    }, 1500);
  } catch (error) {
    toast.error('Payment initialization failed');
    console.error(error);
  }
};
