import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

// TODO: Make register/login dynamic based on logged in status

class Navigation extends Component {
  loggedOutNavbar = () => (
    <Nav className="mr-auto">
      <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
      <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
    </Nav>
  )

  loggedInNavbar = () => (
    <Nav className="mr-auto">
      <Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
    </Nav>
  )

  getNavbar = (auth) => {
    if (auth.isAuthenticated) {
      return this.loggedInNavbar();
    }
    return this.loggedOutNavbar();
  }

  render() {
    const { auth } = this.props;
    return (
      <Navbar bg="primary" variant="dark" expand="lg">
        <Navbar.Brand as={NavLink} to="/">Volunteering</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {this.getNavbar(auth)}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navigation);
