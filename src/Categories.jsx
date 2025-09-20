import React from 'react'
import { Link } from 'react-router-dom';
import './Categories.css'; 
import down1 from './images/down1.png';
// import down2 from './images/down2.jpeg';
// import down3 from './images/down3.png';
// import down4 from './images/down4.jpg';
import down5 from './images/down5.jpg';
import down6 from './images/down6.png';
const Categories = () => {
  return (
    <div className='categories-container'>
        <div className='category-container'>
            <img src={down1} alt="" />
            <div className='category-info'>
                <h1>FALL COLLECTIONS</h1>
               <Link to="/productdetails"> <button>Shop Now</button></Link>
            </div>
        </div>
        <div  className='category-container'>
            <img src={down6} alt="" />
            <div className='category-info'>
                <h1>SUMMER COLLECTIONS</h1>
               <Link to="/productdetails"> <button>Shop Now</button></Link>
            </div>
        </div>
        <div  className='category-container'>
            <img src={down5} alt="" />
            <div className='category-info'>
                <h1>SUMMER COLLECTIONS</h1>
               <Link to="/productdetails"> <button>Shop Now</button></Link>
            </div>
        </div>
    </div>
  )
}

export default Categories;
