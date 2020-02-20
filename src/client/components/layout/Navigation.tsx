import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

// TODO: Make register/login dynamic based on logged in status
class Navigation extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={NavLink} to ='/'>Volunteering</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/* <Nav.Link as={NavLink} to='/register'>Register</Nav.Link>
            <Nav.Link as={NavLink} to='/login'>Login</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;