import { useEffect } from "react";

function PaymentPage() {
  const amount = localStorage.getItem("checkoutAmount");
  const address = JSON.parse(localStorage.getItem("checkoutAddress"));

  const handlePayment = async () => {
    const options = {
      key: "YOUR_KEY_ID", // Razorpay Key
      amount: amount * 100, // in paise
      currency: "INR",
      name: "My Shop",
      description: "Test Transaction",
      handler: function (response) {
        alert("Payment successful! ID: " + response.razorpay_payment_id);
        console.log("Address:", address);
      },
      prefill: {
        name: address.name,
        email: "test@example.com", // can ask in address form
        contact: address.phone,
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  useEffect(() => {
    if (!amount) {
      alert("Cart is empty! Redirecting...");
      window.location.href = "/";
    }
  }, [amount]);

  return (
    <div className="payment-container">
      <h2>Payment Page</h2>
      <p>Total Amount: ₹{amount}</p>
      <button onClick={handlePayment}>Pay with Razorpay</button>
    </div>
  );
}

export default PaymentPage;
