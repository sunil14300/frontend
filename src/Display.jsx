import React, { useState, useEffect } from 'react';

const Display = () => {
  const [Product, setProduct] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/products');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {Product.map((prod) => (
          <li key={prod.id}>
            <strong>{prod.title}</strong><br />
            <img src={prod.image} style={{ width: '100px' }} />
            <p>{prod.description}</p>
            <p>Price: ${prod.price}</p>
            <p>Category: {prod.category}</p>
            <p>Discount: {prod.discount}%</p>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Display;
