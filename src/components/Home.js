import React, { useEffect, useState } from 'react';

// Import bootstrap components
import Card from 'react-bootstrap/Card';
import TopThree from './TopThree';

const Home = () => {
  return (
    <>
      <TopThree />
      <Card className="home-content-card">
        <Card.Header>
          <h4>Welcome</h4>
        </Card.Header>
        <Card.Body className="home-content-body">
          <p>
            Your crypto community awaits you! Follow your favorite coins with
            your favorite people. Log in now to view community posts, create
            your own posts, or go check out the top 30 performing
            cryptocurrencies!
          </p>
        </Card.Body>
      </Card>
    </>
  );
};

export default Home;
