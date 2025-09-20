import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container">
        <div className="row">
          {/* Categories Section */}
          <div className="col-12 col-sm-6 col-md-3 mb-3">
            <h5 className="text-uppercase">Categories</h5>
            <ul className="list-unstyled">
              <li><NavLink to="#" className="text-light text-decoration-none">Running Shoes</NavLink></li>
              <li><NavLink to="#" className="text-light text-decoration-none">Yoga Shoes</NavLink></li>
              <li><NavLink to="#" className="text-light text-decoration-none">Sports Shoes</NavLink></li>
              <li><NavLink to="#" className="text-light text-decoration-none">Casual Shoes</NavLink></li>
            </ul>
          </div>

          {/* Business Section */}
          <div className="col-12 col-sm-6 col-md-3 mb-3">
            <h5 className="text-uppercase">Business</h5>
            <ul className="list-unstyled">
              <li><NavLink to="#" className="text-light text-decoration-none">Company Profile</NavLink></li>
              <li><NavLink to="#" className="text-light text-decoration-none">Social Responsibility</NavLink></li>
              <li><NavLink to="#" className="text-light text-decoration-none">Brand Kit</NavLink></li>
              <li><NavLink to="#" className="text-light text-decoration-none">Board of Directors</NavLink></li>
              <li><NavLink to="#" className="text-light text-decoration-none">Careers</NavLink></li>
            </ul>
          </div>

          {/* Useful Links Section */}
          <div className="col-12 col-sm-6 col-md-3 mb-3">
            <h5 className="text-uppercase">Useful Links</h5>
            <ul className="list-unstyled">
              <li><NavLink to="#" className="text-light text-decoration-none">Return Policies</NavLink></li>
              <li><NavLink to="#" className="text-light text-decoration-none">Announcements</NavLink></li>
              <li><NavLink to="#" className="text-light text-decoration-none">Media Kit</NavLink></li>
              <li><NavLink to="#" className="text-light text-decoration-none">Have Issues?</NavLink></li>
              <li><NavLink to="#" className="text-light text-decoration-none">Numbers Speak</NavLink></li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div className="col-12 col-sm-6 col-md-3 mb-3">
            <h5 className="text-uppercase">Follow Us</h5>
            <div className="d-flex gap-3">
              <NavLink to="https://www.facebook.com/share/14vsWNJw3W/" className="text-light"><i className="fab fa-facebook-f"></i></NavLink>
              <NavLink to="https://x.com/sunilkr_14?t=EWs9D62A778Ew06Mz9Qw4Q&s=09" className="text-light"><i className="fab fa-twitter"></i></NavLink>
              <NavLink to="https://www.instagram.com/sunill__1412?igsh=dGtsMWZtdzBiN2Qx" className="text-light"><i className="fab fa-instagram"></i></NavLink>
              <NavLink to="https://www.linkedin.com/in/sunilsingh2002/" className="text-light"><i className="fab fa-linkedin-in"></i></NavLink>
            </div>
          </div>
        </div>
      </div>
      <hr className="text-secondary my-4" />
      <div className="container text-center">
        <p className="mb-0">&copy; 2025 Your Company. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;