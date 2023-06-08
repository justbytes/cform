import React, { useEffect, useState } from 'react';

// Import bootstrap components
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

const Watchlist = () => {
  // Initialize state variables
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Gets top 30 cryptos from backend api call sets them to state variable
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/top30');
        const data = await response.json();
        setCoins(data.coins);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Sets loading if loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <div className="row1 t30-title ">
        <div className="col s12 m6">
          <Card className="blue-white darken-1">
            <Card.Body>
              <Card.Title>
                <h3>TOP 30 PERFORMING CRYPTOCURRENCIES</h3>
              </Card.Title>
            </Card.Body>
          </Card>
        </div>
      </div>

      <div className="container5 postBox" id="existingPosts"></div>

      <div className="row center box blah">
        {/* Maps through each coin and puts it into a card */}
        {coins.map((coin, index) => (
          <div key={index} className="col s12 indBox2">
            <Card className="top30-cards">
              <Card.Body className="top30-cards-content">
                <Card.Title>
                  <span className="bold">{coin.name}</span>
                </Card.Title>
                <Card.Text>
                  <span className="bold">Price: </span>
                  {coin.quote.USD.price}
                </Card.Text>
                <Card.Text>
                  <span className="bold">Total Supply: </span>
                  {coin.total_supply}
                </Card.Text>
                <Card.Text>
                  <span className="bold">Circulating Supply: </span>
                  {coin.circulating_supply}
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
