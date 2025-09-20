import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';
import "./Slider.jsx";
import Home from './Home.jsx';
import ProductDetails from './ProductDetails.jsx';
import Footer from './Footer.jsx';
import BestProduct from './BestProduct.jsx';
import Categories from './Categories.jsx';
import ProductForm from './ProductForm.jsx';
import Display from './Display.jsx';
import ViewDetails from './ViewDetails.jsx';
import Products from './Products.jsx';
import CategoryPage from './CategoryPage.jsx';
import CartPage from './CartPage.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import BuyNowPage from './BuynowPage.jsx';

// import Payment from './Payment.jsx';

// import AddressForm from './AddressForm.jsx';
// import PaymentPage from './PaymentPage.jsx';

import Festival from './Festival.jsx';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/productDetails" element={<ProductDetails />} />
            <Route path="/footer" element={<Footer />} />
            <Route path="/BestProduct" element={<BestProduct />} />
            <Route path="/Categories" element={<Categories />} />
            <Route path="/ProductForm" element={<ProductForm />} />
            <Route path="/display" element={<Display />} />
            <Route path="/products" element={<Products />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/viewDetails" element={<ViewDetails />} />
            <Route path="/productDetails/:id" element={<ViewDetails />} />
            
            <Route path="/buyNow/:productId" element={<BuyNowPage />} />
            {/* <Route path="/buyNow/:id" element={<Payment />} /> */}
            {/* <Route path="/payment" element={<Payment />} /> */}

            {/* <Route path="/address" element={<AddressForm />} /> */}
            {/* <Route path="/payment" element={<PaymentPage />} /> */}

            <Route path="/festival" element={<Festival />} />

          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
