import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/products");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = ["Kids", "Girls", "Women", "Men"];

  return (
    <div className="container-fluid my-4">
      {categories.map((category) => (
        <div key={category} className="shadow p-3 mb-5 bg-white rounded">
  <NavLink to={`/category/${category.toLowerCase()}`} className="text-decoration-none">
    <h2 className="mb-4 text-dark">{category} Collections</h2>
  </NavLink>
  <div className="d-flex justify-content-between flex-wrap">
    {products
      .filter(prod => prod.category === category)
      .slice(0, 5)
      .map(prod => (
        <div className="card m-2 product-card" key={prod._id}>
          <NavLink to={`/category/${category.toLowerCase()}`}>
            <img
              src={prod.imageUrl}
              className="card-img-top product-image"
              alt={prod.title}
            />
          </NavLink>
          <div className="card-body text-center">
            <h5 className="card-title">{prod.title}</h5>
            <p className="card-text">Up to {prod.discount}% Off</p>
          </div>
        </div>
      ))}
  </div>
</div>

      ))}
    </div>
  );
};

export default Products;
