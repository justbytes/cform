import React, { useState, useCallback } from 'react';
import axios from 'axios';

// Navigates after login or logout
import { navigate, useNavigate } from 'react-router-dom';

// Import bootstrap
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Login() {
  // Initialize state vars
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // set username to input field
  const handleUsernameChange = useCallback((event) => {
    setUsername(event.target.value);
  }, []);

  // set password to input field
  const handlePasswordChange = useCallback((event) => {
    setPassword(event.target.value);
  }, []);

  // Login handler
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if ((username === '') | (password === ''))
      alert('Please enter a username and password');

    try {
      const response = await axios.post(
        'https://cform.herokuapp.com/api/users/login',
        {
          username,
          password,
        }
      );
      const { id, success } = response.data;
      // Redirect on success
      if (success) navigate('/user-page');
      else alert('Login attempt failed');
    } catch (error) {
      console.error(error);
    }
  };
  // Signup handler
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://cform.herokuapp.com//api/users/signup',
        {
          username,
          password,
        }
      );
      const { id, success } = response.data;

      // Redirect on success
      if (success) navigate('/user-page');
      else alert('Signup unsuccessful');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="row1 login-h1 ">
        <div className="col s12 m6">
          <Card>
            <Card.Body>
              <Card.Title>
                <h3>LOGIN / SIGNUP</h3>
              </Card.Title>
            </Card.Body>
          </Card>
        </div>
      </div>

      <Form className="login-signup">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter username"
            value={username}
            onChange={handleUsernameChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Group>
        <div className="login-signup-btn-container">
          <Button
            className="login-btn"
            variant="primary"
            onClick={handleLoginSubmit}
          >
            Login
          </Button>
          <Button
            className="signup-btn"
            variant="primary"
            onClick={handleSignupSubmit}
          >
            Signup
          </Button>
        </div>
      </Form>
    </>
  );
}

export default Login;
