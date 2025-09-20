import React from 'react'
import { NavLink } from 'react-router-dom';
import down1 from './images/down1.png';
// import down2 from './images/down2.jpeg';

const BestProduct = () => {
  return (
    <div>
      <h2 className='my-4'>Best Products</h2>
    <div className='d-flex justify-content-around flex-wrap '>
      <div className="card mb-4 shadow product-card">
      <NavLink to="/productDetails">
        <img
          src={down1}
          className="card-img-top product-image"
          alt="Summer Dress"
        />
      </NavLink>
      <div className="card-body text-center">
        <h5 className="card-title">Summer Dress</h5>
        <h6 className="card-subtitle mb-3 text-muted">₹1,299</h6>

        <div className="d-flex justify-content-around">
          <NavLink to="/cart" className="btn custom-btn">
            Add to Cart
          </NavLink>
          <NavLink to="/productDetails" className="btn custom-btn">
            View Details
          </NavLink>
        </div>
      </div>
    </div>
    </div>
    
    </div>
    
  )
}

export default BestProduct
