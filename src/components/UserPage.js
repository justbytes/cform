import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Import bootstrap components
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// Import componenets
import TopThree from './TopThree';
import PostModal from './PostModal';

const UserPage = () => {
  // Set state variables
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState('');
  const [username, setUsername] = useState('');
  const [modal, setModal] = useState(false);

  // Gets posts from database, set state variables
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://cform.herokuapp.com/userpage'
        );
        const { user, posts } = response.data;
        setUser(user);
        setUserID(user.id);
        setUsername(user.username);
        // Sort posts so the newest is on top before setting the state variable
        setPosts(
          posts.sort(
            (a, b) => new Date(b.date_created) - new Date(a.date_created)
          )
        );

        // Format the dates for MM/DD/YY
        for (let i = 0; i < posts.length; i++) {
          const dateStr = posts[i].date_created;
          const date = new Date(dateStr);
          const formattedDate = date.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: '2-digit',
          });
          posts[i].formattedDate = formattedDate;
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // Sets modal state var to true
  const toggle = () => {
    setModal(!modal);
  };

  // Toggles the Modal for creating a post
  const createPost = (e) => {
    e.preventDefault();
    toggle();
  };

  return (
    <Container>
      <TopThree />
      {user ? (
        <div className="create-user-post">
          <h2>Welcome, {username}!</h2>
          <Button onClick={createPost}>Create Post</Button>
          {modal && (
            <PostModal
              show={modal}
              username={username}
              userID={userID}
              toggle={toggle}
            />
          )}
        </div>
      ) : (
        <div className="create-user-post">
          <h3>Login to view and create posts!</h3>
        </div>
      )}
      <div className="posts-container">
        {posts.map((post) => (
          <Card key={post.id} className="mb-3">
            <Card.Header>
              <div className="d-flex justify-content-between">
                <div>{post.name}</div>
                <div>{post.formattedDate}</div>
              </div>
            </Card.Header>
            <Card.Body>
              <Card.Text>{post.description}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default UserPage;
