import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Slider.css"; // Assuming you have a CSS file for custom styles
import img1 from "./images/OIP (1).jpeg";
import img2 from "./images/OIP (2).jpeg";
import img3 from "./images/OIP.jpeg";


const Slider = () => {
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide custom-carousel"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner mt-3">
        {/* First Slide */}
        <div className="carousel-item active">
          <div className="carousel-content">
            <img
              src={img1}
              className="d-block w-100 carousel-image"
              alt="First Slide"
            />
            {/* <div className="carousel-caption">
              <h5>Introducing New Acer Monitors</h5>
              <p>From ₹6,649 | 1 ms | 120 Hz Refresh Rate</p>
              <button className="btn btn-primary">Shop Now</button>
            </div> */}
          </div>
        </div>
        {/* Second Slide */}
        <div className="carousel-item">
          <div className="carousel-content">
            <img
              src={img2}
              className="d-block w-100 carousel-image"
              alt="Second Slide"
            />
            
          </div>
        </div>
        {/* Third Slide */}
        <div className="carousel-item">
          <div className="carousel-content">
            <img
              src={img3}
              className="d-block w-100 carousel-image"
              alt="Third Slide"
            />
            
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Slider;
