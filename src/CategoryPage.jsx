import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import './CategoryPage.css';

function CategoryPage() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await axios.get(
          `https://backend-3-5sxs.onrender.com/api/products/category/${categoryName}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching category products:', error);
      }
    };

    fetchCategoryProducts();
  }, [categoryName]);

  // Handle Add to Cart
  const handleAddToCart = async (productId) => {
    try {
      await axios.post(`https://backend-3-5sxs.onrender.com/api/cart`, {
        productId,
        quantity: 1,
      });
      alert('Item added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Navigate to ProductDetails page
  const goToProductDetails = (productId) => {
    navigate(`/productDetails/${productId}`);
  };

  return (
    <>
      <Navbar />
      <div className="category-container">
        <div className="category-product-grid">
          {products.map((product) => (
            <div key={product._id} className="category-product-card">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="category-product-image"
              />
              <h3>{product.title}</h3>
              <p>₹{product.price}</p>

              <div className="product-buttons">
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product._id)}
                >
                  Add to Cart
                </button>

                <button
                  className="view-details-btn"
                  onClick={() => goToProductDetails(product._id)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CategoryPage;


