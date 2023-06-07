import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

import TopThree from './TopThree';

const UserPage = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/userpage');
        const { user, posts } = response.data;
        setUser(user);
        setPosts(posts);
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

  return (
    <Container>
      <TopThree />
      {user ? (
        <div>
          <h2>Welcome, {user.username}!</h2>
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
