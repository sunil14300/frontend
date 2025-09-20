import React from "react";
// import "./TopBar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Topbar.css";

const Topbar = () => {
  return (
    <div className="top-bar">
      <span>Sell</span>
      <span>Best Sellers</span>
      <span>Today's Deal</span>
      <span>Buy Again</span>
      <span>Customer Service</span>
      <span>Fashion</span>
    </div>
  );
};

export default Topbar;
