import React, { useState, useCallback } from 'react';
import axios from 'axios';

// Import bootstrap components
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const PostModal = ({ username, userID, toggle }) => {
  // Initialize state variable
  const [description, setDescription] = useState('');

  // Set description state var
  const handleChange = useCallback((event) => {
    setDescription(event.target.value);
  }, []);

  // Closes the modal
  const handleClose = () => {
    toggle();
  };

  // Post the post to the database
  const handlePost = async () => {
    // pass name of user and their post
    const postData = {
      name: username,
      description: description,
    };
    try {
      const response = await axios.post(
        'https://cform.herokuapp.com/api/post/posts',
        postData
      );
      toggle();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create A Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              onChange={handleChange}
              placeholder="Post it to the community..."
              rows={3}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handlePost}>
          Post
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PostModal;
