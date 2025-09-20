import { useContext } from "react";
import { CartContext } from "./CartContext";

// inside component
const { fetchCartCount } = useContext(CartContext);

const handleAddToCart = async (productId) => {
  try {
    await axios.post(`http://localhost:8081/api/cart`, {
      productId,
      quantity: 1
    });
    fetchCartCount(); // refresh count after adding
    alert("Item added to cart!");
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};
