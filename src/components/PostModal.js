import React, { useState, useCallback } from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const PostModal = ({ username, userID, toggle }) => {
  const [description, setDescription] = useState('');

  const handleChange = useCallback((event) => {
    setDescription(event.target.value);
  }, []);

  const handleClose = () => {
    toggle();
  };

  const handlePost = async () => {
    console.log(username, description);
    const postData = {
      name: username,
      description: description,
      //   user_id: userID,
    };
    try {
      const response = await axios.post('/api/post/posts', postData);
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
              type="text"
              name="description"
              onChange={handleChange}
              placeholder="Post it to the community..."
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handlePost}>
          Post
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PostModal;
