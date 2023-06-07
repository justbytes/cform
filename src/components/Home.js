import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Card from 'react-bootstrap/Card';

const Home = () => {
  const [bitcoinPrice, setBitcoinPrice] = useState(null);
  const [etherPrice, setEtherPrice] = useState(null);
  const [bnbPrice, setBnbPrice] = useState(null);

  useEffect(() => {
    axios
      .get('/home')
      .then((response) => {
        console.log(response);
        const { BTC, ETH, BNB } = response.data;
        setBitcoinPrice(BTC.quote.USD.price.toFixed(0));
        setEtherPrice(ETH.quote.USD.price.toFixed(0));
        setBnbPrice(BNB.quote.USD.price.toFixed(0));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Card className="top-three-card">
        <Card.Body className="top-three-body">
          <div className="bitcoin-home">
            <h2>Bitcoin</h2>
            <br />
            <h5>{bitcoinPrice}</h5>
          </div>
          <div className="ether-home">
            <h2>Ethereum</h2>
            <br />
            <h5>{etherPrice}</h5>
          </div>
          <div className="bnb-home">
            <h2>Binance Coin</h2>
            <br />
            <h5>{bnbPrice}</h5>
          </div>
        </Card.Body>
      </Card>
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
