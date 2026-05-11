import axios from 'axios';

const API_URL = 'http://localhost:5000/api/payment';

export const displayRazorpay = async (amount, onSuccess) => {
  try {
    // 1. Create order on backend
    const { data: order } = await axios.post(`${API_URL}/order`, { amount });

    const options = {
      key: "rzp_test_example_id", // Replace with your actual key
      amount: order.amount,
      currency: order.currency,
      name: "ShopVerse",
      description: "Purchase Transaction",
      order_id: order.id,
      handler: async function (response) {
        // 2. Verify payment on backend
        try {
          const { data } = await axios.post(`${API_URL}/verify`, response);
          if (data.success) {
            onSuccess(data);
          }
        } catch (error) {
          alert("Payment verification failed!");
        }
      },
      prefill: {
        name: "User Name",
        email: "user@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "ShopVerse Corporate Office",
      },
      theme: {
        color: "#7c3aed",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  } catch (error) {
    console.error("Razorpay error:", error);
    alert("Could not initialize Razorpay. Is the backend running?");
  }
};
