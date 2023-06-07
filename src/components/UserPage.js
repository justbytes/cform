import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import TopThree from './TopThree';
import PostModal from './PostModal';

const UserPage = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(true);
  const [userID, setUserID] = useState('');
  const [username, setUsername] = useState('');
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/userpage');
        const { user, posts } = response.data;
        setUser(user);
        setUserID(user.id);
        setUsername(user.username);
        setPosts(
          posts.sort(
            (a, b) => new Date(b.date_created) - new Date(a.date_created)
          )
        );
        console.log(posts);
        console.log(user);

        // Format the dates
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

  const toggle = () => {
    setModal(!modal);
  };

  const createPost = (e) => {
    e.preventDefault();
    toggle();
  };

  return (
    <Container>
      <TopThree />
      {user ? (
        <div>
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
        <div>
          <h3>Login to make a post!</h3>
        </div>
      )}

      <h3>Posts:</h3>
      <ListGroup>
        {posts.map((post) => (
          <ListGroup.Item key={post.id}>
            <p>{post.description}</p>
            <p>Created by: {post.name}</p>
            <p>Create on: {post.formattedDate}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default UserPage;
