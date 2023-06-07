import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
            your favoite people. Log in now to see posts or check out the top 30
            trending cryptocurrencies
          </p>
        </Card.Body>
      </Card>
    </>
  );
};

export default Home;
