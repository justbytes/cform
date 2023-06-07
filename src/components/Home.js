import React, { useEffect, useState } from 'react';

// Import bootstrap components
import Card from 'react-bootstrap/Card';
import TopThree from './TopThree';

const Home = () => {
  return (
    <>
      <TopThree />
      <Card className="home-content-card">
        <Card.Header>Welcome</Card.Header>
        <Card.Body className="home-content-body">
          <p>
            Your crypto community awaits you! Follow your favoite coins with
            your favoite people. Log in now and start posting or go check out
            the top 30 performing cryptocurrencies!
          </p>
        </Card.Body>
      </Card>
    </>
  );
};

export default Home;
