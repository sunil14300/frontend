import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./ViewDetails.css";
import axios from "axios";

const ViewDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/products/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product details");
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error("Error:", err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async (productId) => {
    try {
      await axios.post(`http://localhost:8081/api/cart`, {
        productId,
        quantity: 1,
      });
      alert("✅ Item added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (!product) return <div className="loading">Loading product details...</div>;

  return (
    <>
      <Navbar />
      <div className="product-details-wrapper">
        <div className="product-details-container">
          {/* Left Side - Product Image */}
          <div className="image-container">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="product-image"
            />
          </div>

          {/* Right Side - Product Info */}
          <div className="product-info">
            <h2 className="product-title">{product.title}</h2>
            <p className="product-description">{product.description}</p>

            <div className="price-section">
              <h4 className="product-price">₹{product.price}</h4>
              <span className="discount-tag">Save {product.discount}%</span>
            </div>

            <div className="action-buttons">
              <button
                className="btn add-to-cart"
                onClick={() => handleAddToCart(product._id)}
              >
                🛒 Add to Cart
              </button>

              <NavLink to={`/buyNow/${product._id}`} className="btn btn-buy">
              ⚡ Buy Now
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ViewDetails;
