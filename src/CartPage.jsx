import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./CartPage.css";

function CartPage() {
  const [cart, setCart] = useState([]); // always start as array
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState("");

  // Fetch cart items
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("https://backend-3-5sxs.onrender.com/api/cart");
        setCart(response.data || []); // fallback to empty array
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCart([]); // ensure array
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // Safe total calculation
  const total = (cart || []).reduce(
  (sum, item) => sum + (item.product?.price || 0) * (item.quantity || 1),
  0
);


  // Load Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById("razorpay-script")) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.id = "razorpay-script";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Detect user location
  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await res.json();
            setAddress(data.display_name || `Lat: ${latitude}, Lon: ${longitude}`);
          } catch {
            setAddress(`Lat: ${latitude}, Lon: ${longitude}`);
          }
        },
        () => alert("Location access denied.")
      );
    } else alert("Geolocation not supported.");
  };

  // Remove from cart
  const handleRemove = async (id) => {
    try {
      await axios.delete(`https://backend-3-5sxs.onrender.com/api/cart/${id}`);
      setCart(cart.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Razorpay payment
  const handlePayment = async () => {
    if (!address) {
      alert("Please enter your delivery address.");
      return;
    }

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert("Failed to load Razorpay SDK.");
      return;
    }

    try {
      const orderResponse = await fetch("https://backend-3-5sxs.onrender.com/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total * 100 }), // in paise
      });
      const order = await orderResponse.json();

      const options = {
        key: "rzp_test_RC0ysgKGP4SkcQ",
        amount: order.amount,
        currency: order.currency,
        name: "My Test Shop",
        description: "Cart Payment",
        order_id: order.id,
        handler: function (response) {
          alert("✅ Payment Successful!");
          alert("Payment ID: " + response.razorpay_payment_id);
          alert("Order ID: " + response.razorpay_order_id);
          setCart([]); // clear cart after payment
        },
        prefill: {
          name: "Sunil Singh",
          email: "sunil@example.com",
          contact: "9876543210",
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong while initiating payment.");
    }
  };

  if (loading) return <p>Loading cart...</p>;

  return (
    <>
      <Navbar />
      <div className="cart-container">
        {/* Left Section */}
        <div className="left-section">
          <div className="section cart-items-section">
            <h3>🛒 Your Cart</h3>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                 <div key={item._id} className="cart-item">
    <img src={item.product?.imageUrl} alt={item.product?.title} />
    <div className="cart-details">
      <h4>{item.product?.title}</h4>
      <p>₹{item.product?.price} x {item.quantity}</p>
    </div>
    <button onClick={() => handleRemove(item._id)} className="remove-btn">
      ❌ Remove
    </button>
  </div>
              ))
            )}
          </div>

          <div className="section address-section">
            <h3>📍 Delivery Address</h3>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your delivery address"
            />
            <button onClick={detectLocation} className="location-btn">
              Use My Location
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="right-section">
          <div className="section summary-section">
            <h3>💰 Order Summary</h3>
            <p>Items: {cart.length}</p>
            <h3>Total: ₹{total}</h3>
            <button onClick={handlePayment} className="buy-btn">
              Pay with Razorpay
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CartPage;


