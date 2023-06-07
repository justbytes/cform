import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { navigate, useNavigate } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = useCallback((event) => {
    setUsername(event.target.value);
  }, []);

  const handlePasswordChange = useCallback((event) => {
    setPassword(event.target.value);
  }, []);

  console.log(username, password);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log('you clicked login', password, username);

    try {
      const response = await axios.post('api/users/login', {
        username,
        password,
      });
      const { id, success } = response.data;
      console.log('User logged in with id of:', id);
      console.log('login success:', success);

      if (success) navigate('/user-page');
      else console.log('login not successful');
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    console.log('you clicked signup', password, username);
    try {
      const response = await axios.post('/api/users/signup', {
        username,
        password,
      });
      const { id, success } = response.data;
      console.log('User logged in with id of:', id);
      console.log('login success:', success);

      if (success) navigate('/user-page');
      else alert('login unsuccessful');
      console.log('login not successful');
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogoutSubmit = async (e) => {
    e.preventDefault();
    console.log('you clicked logout');
    try {
      await axios.post('/api/users/logout');
      // Assuming the logout was successful
      console.log('Logged out successfully');
      // Perform any additional actions after logout if needed
    } catch (error) {
      console.error(error);
      // Handle any errors that occur during logout
    }
  };

  return (
    <>
      <div>
        <h1 className="login-h1">Login or Signup</h1>
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
          <Button variant="primary" onClick={handleLoginSubmit}>
            Login
          </Button>
          <Button variant="primary" onClick={handleSignupSubmit}>
            Signup
          </Button>
          <Button variant="primary" onClick={handleLogoutSubmit}>
            logout
          </Button>
        </div>
      </Form>
    </>
  );
}

export default Login;
