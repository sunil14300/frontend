import React from 'react'
import Slider from './Slider.jsx'; // Adjust the import path as necessary
import Navbar from './Navbar.jsx';
import Topbar from './Topbar.jsx';
import Products from './Products.jsx';
import Footer from './Footer.jsx';
// import BestProduct from './BestProduct.jsx';
import Categories from './Categories.jsx';

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Topbar/>
      <Slider />
      <Categories/>
      <Products/>

      <Footer/>

    </div>
  )
}


export default Home;
