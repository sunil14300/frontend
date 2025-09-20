import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

function PhoneLogin() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const navigate = useNavigate();

  // 🔹 Send OTP
  const sendOtp = async () => {
    console.log("Sending OTP to:", phone);

    try {
      // ✅ Correct RecaptchaVerifier syntax (Firebase v9+)
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible", // "invisible" or "normal"
            callback: (response) => {
              console.log("Recaptcha verified ✅");
            },
            "expired-callback": () => {
              console.warn("Recaptcha expired. Please try again.");
            },
          }
        );
      }

      const appVerifier = window.recaptchaVerifier;

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phone,
        appVerifier
      );
      setConfirmation(confirmationResult);
      alert("OTP sent!");
    } catch (err) {
      console.error("Error sending OTP:", err);
      alert("Error sending OTP. Check console for details.");
    }
  };

  // 🔹 Verify OTP
  const verifyOtp = async () => {
    if (!confirmation) {
      alert("Please request OTP first!");
      return;
    }

    try {
      const result = await confirmation.confirm(otp);
      const user = result.user;
      const token = await user.getIdToken();

      // Save user data in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("loggedInUser", user.phoneNumber || "User");

      alert("Login successful!");
      navigate("/"); // Redirect to home page
    } catch (err) {
      console.error("Error verifying OTP:", err);
      alert("Invalid OTP");
    }
  };

  return (
    <div>
      <h2>Login with Phone</h2>
      <input
        type="text"
        placeholder="Enter phone (+91...)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      
      {/* 🔹 This is where reCAPTCHA will be rendered */}
      <div id="recaptcha-container"></div>

      <button onClick={sendOtp}>Send OTP</button>
      <br /><br />

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={verifyOtp}>Verify OTP</button>
    </div>
  );
}

export default PhoneLogin;
