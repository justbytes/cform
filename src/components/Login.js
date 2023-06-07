import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

  const handleLoginSubmit = async (e) => {
    e.prevent.Default();

    try {
      const response = await axios.post('api/users/login', {
        username,
        password,
      });
      const { id } = response.data;
      console.log('User logged in with id of:', id);
      // Assuming the response contains a property called "success" indicating successful login
      if (response.data.success) {
        navigate('/');
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error(error);
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
          <Button
            variant="primary"
            type="submit"
            onSubmit={(e) => handleLoginSubmit}
          >
            Login
          </Button>
          <Button variant="primary" type="submit">
            Signup
          </Button>
        </div>
      </Form>
    </>
  );
}

export default Login;
