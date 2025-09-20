import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa'; 
import "./Navbar.css"; 
import { CartContext } from './CartContext';
import { useAuth } from './AuthContext';
import nav from "./images/nav.png"

const Navbar = () => {
  const navigate = useNavigate();
  const { cartCount, fetchCartCount } = useContext(CartContext);
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg px-4" style={{ backgroundColor: "#131921" }}>
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/" style={{ color: "white" }}><img src={nav} alt="Logo" style={{ width: '60px', height: '40px' }} /></NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
                <NavLink className="nav-link active" to="/" style={{ color: "white" }}>Home</NavLink>
              </li> */}
              <li className="nav-item">
                <NavLink className="nav-link active" to="/" style={{ color: "white" }}>Men/Women</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" to="/festival" style={{ color: "white" }}>Festival</NavLink>
              </li>
            </ul>

            {/* Center search bar */}
            <form className="d-flex mx-auto" style={{ width: '50%' }}>
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-secondary" type="submit" style={{ color: "white" }}>Search</button>
            </form>

            {/* Right side */}
            <ul className="navbar-nav mb-lg">
              {isAuthenticated ? (
                <li className="nav-item dropdown">
                  <button className="btn btn-dark dropdown-toggle d-flex align-items-center" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    <FaUserCircle size={22} className="me-2" />
                    {user?.phoneNumber || "User"}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    <li><NavLink className="dropdown-item" to="/profile">My Profile</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/orders">Orders</NavLink></li>
                    <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Login" style={{ color: "white" }}>Login</NavLink>
                </li>
              )}

              {/* Cart with count */}
              <li className="nav-item ms-3">
                <NavLink to="/cart" className="cart-link d-flex align-items-center">
                  <FaShoppingCart size={20} />
                  <span className="cart-count">{cartCount}</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
