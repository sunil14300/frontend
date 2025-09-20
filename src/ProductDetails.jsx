import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './ProductDetails.css';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';

const ProductDetails = () => {
  const [product, setProduct] = useState([]);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch('https://backend-3-5sxs.onrender.com/api/products');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await axios.post(`http://localhost:8081/api/cart`, {
        productId,
        quantity: 1
      });
      alert("Item added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  return (
    <div>
      <Navbar />
      <h2 className="page-title">Product List</h2>
      <div className="products-grid">
        {product.map((prod) => (
          <div className="product-card" key={prod._id}>
            <NavLink to={`/productDetails/${prod._id}`}>
              <div className="product-image-container">
                <img
                  src={prod.imageUrl}
                  className="product-image"
                  alt={prod.title}
                />
              </div>
            </NavLink>
            <div className="product-info">
              <h3 className="product-title">{prod.title}</h3>
              <p className="product-description">{prod.description}</p>
              <p className="product-price">₹{prod.price}</p>
              <span className="product-discount">Save {prod.discount}%</span>
              <div className="product-actions">
                <button 
                  className="add-to-cart-btn" 
                  onClick={() => handleAddToCart(prod._id)}
                >
                  Add to Cart
                </button>
                <NavLink to={`/productDetails/${prod._id}`} className="view-details-btn">
                  View Details
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;

