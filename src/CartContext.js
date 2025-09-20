import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  // Fetch cart count
  const fetchCartCount = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/cart");
      console.log("Fetched cart items:", res.data); // Log the fetched items
      setCartCount(res.data.length); // Count number of items
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  // Call once on mount
  useEffect(() => {
    fetchCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
 