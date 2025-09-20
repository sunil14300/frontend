// BuyNowPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./BuyNowPage.css";

function BuyNowPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");

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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://backend-3-5sxs.onrender.com/api/products/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

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

  // Handle Razorpay payment
  const handlePayment = async () => {
    if (!address) {
      alert("Please enter your delivery address.");
      return;
    }

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert("Failed to load Razorpay SDK. Check your internet connection.");
      return;
    }

    try {
      // Create order in backend
      const orderResponse = await fetch("https://backend-3-5sxs.onrender.com/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: product.price * quantity * 100 }), // paise
      });

      const order = await orderResponse.json();

      // Razorpay options
      const options = {
        key: "rzp_test_RC0ysgKGP4SkcQ", // Your Test Key
        amount: order.amount,
        currency: order.currency,
        name: "My Test Shop",
        description: product.title,
        order_id: order.id,
        handler: function (response) {
          alert("✅ Payment Successful!");
          alert("Payment ID: " + response.razorpay_payment_id);
          alert("Order ID: " + response.razorpay_order_id);
          alert("Signature: " + response.razorpay_signature);
        },
        prefill: {
          name: "Sunil Singh",
          email: "sunil@example.com",
          contact: "9876543210",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong while initiating payment.");
    }
  };

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <>
      <Navbar />
      <div className="buy-now-container">
        <div className="product-info">
          <img src={product.imageUrl} alt={product.title} />
          <div>
            <h2>{product.title}</h2>
            <p>₹{product.price}</p>
            <label>
              Quantity:
              <input
                type="number"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </label>
            <h3>Total: ₹{product.price * quantity}</h3>
          </div>
        </div>

        <div className="address-form">
          <h3>Enter Delivery Address</h3>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your delivery address"
          ></textarea>

          <button onClick={detectLocation} className="location-btn">
            📍 Use My Location
          </button>

          <button onClick={handlePayment} className="buy-btn">
            Pay with Razorpay
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BuyNowPage;


