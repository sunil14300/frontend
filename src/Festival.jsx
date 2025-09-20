import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Festival = () => {
  return (
    <div
      className="d-flex justify-content-center text-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
        padding: "30px",
      }}
    >
      <div
        className="card shadow-lg p-4 p-md-5 rounded-4 align-self-center w-100"
        style={{ maxWidth: "600px", backgroundColor: "#fff" }}
      >
        <h1 className="fw-bold text-danger mb-3">🎉 Currently Unavailable 🎉</h1>
        <h4 className="text-secondary mb-3">
          We’ll be back after the festival!
        </h4>
        <p className="text-muted mb-4">
          Thank you for your patience and support.
        </p>
        <a href="/" className="btn btn-primary btn-lg px-4 shadow-sm">
          ⬅ Back to Home
        </a>
      </div>
    </div>
  );
};

export default Festival;
