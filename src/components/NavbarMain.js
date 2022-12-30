import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import '../static/css/NavbarMain.css';

const NavbarMain = () => {
  return (
    <Navbar className="navbar navbar-light bg-dark justify-content-between">
      <Nav.Link className="navbar-brand ps-5 text-light">
        &#8730;Mathematic
      </Nav.Link>
      <div className="container__icon__navbar">
        <div className="icon__navbar m-2">
          <i className="fa-brands fa-twitter"></i>
        </div>
        <div className="icon__navbar m-2">
          <i className="fa-brands fa-facebook-f"></i>
        </div>
        <div className="icon__navbar m-2">
          <i className="fa-brands fa-instagram"></i>
        </div>
      </div>
    </Navbar>
  );
};

export default NavbarMain;
