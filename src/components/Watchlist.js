import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

const Watchlist = () => {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/top30');
        const data = await response.json();
        console.log(data);
        setCoins(data.coins);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <div className="row1">
        <div className="col s12 m6">
          <Card className="blue-white darken-1">
            <Card.Body>
              <Card.Title>TOP 30 PERFORMING CRYPTOCURRENCIES</Card.Title>
            </Card.Body>
          </Card>
        </div>
      </div>

      <div className="container5 postBox" id="existingPosts"></div>

      <div className="row center box blah">
        {coins.map((coin, index) => (
          <div key={index} className="col s12 indBox2">
            <Card className="top30-cards">
              <Card.Body className="top30-cards-content">
                <Card.Title>{coin.name}</Card.Title>
                <Card.Text>Price: {coin.quote.USD.price}</Card.Text>
                <Card.Text>Total Supply: {coin.total_supply}</Card.Text>
                <Card.Text>
                  Circulating Supply: {coin.circulating_supply}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Watchlist;
