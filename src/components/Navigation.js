import React from 'react';
import axios from 'axios';

// Import bootstrap components
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';

function Navigation() {
  const navigation = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post('https://cform.herokuapp.com/api/users/logout');
      alert('Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="/">cForm</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/" onClick={handleLogout}>
              Logout
            </Nav.Link>
            <Nav.Link href="/watchlist">Top 30 list</Nav.Link>
            <Nav.Link href="/user-page">My Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
