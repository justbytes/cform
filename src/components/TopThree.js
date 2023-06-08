import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Import bootstrap components
import Card from 'react-bootstrap/Card';

const TopThree = () => {
  // Initialize state vars
  const [bitcoinPrice, setBitcoinPrice] = useState(null);
  const [etherPrice, setEtherPrice] = useState(null);
  const [bnbPrice, setBnbPrice] = useState(null);

  // Get BTC, ETHER, BNB current price and set to state var
  useEffect(() => {
    axios
      .get('cform.herokuapp.com/home')
      .then((response) => {
        const { BTC, ETH, BNB } = response.data;
        // Format so there is no decimal
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
            <h6>Current Price</h6>
            <h5>${bitcoinPrice}</h5>
          </div>
          <div className="ether-home">
            <h2>Ethereum</h2>
            <h6>Current Price</h6>
            <h5>${etherPrice}</h5>
          </div>
          <div className="bnb-home">
            <h2>Binance Coin</h2>
            <h6>Current Price</h6>
            <h5>${bnbPrice}</h5>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default TopThree;
