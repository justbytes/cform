const express = require('express');
const router = express.Router();

router.get('/home', async (req, res) => {
  try {
    const responseBTC = await fetch(
      'https://pro-api.coinmarketcap.com/v1/tools/price-conversion?CMC_PRO_API_KEY=' +
        process.env.DB_APIKEY +
        '&amount=1&symbol=BTC&convert=USD'
    );
    const { data: BTC } = await responseBTC.json();
    console.log(responseBTC);

    const responseETH = await fetch(
      'https://pro-api.coinmarketcap.com/v1/tools/price-conversion?CMC_PRO_API_KEY=' +
        process.env.DB_APIKEY +
        '&amount=1&symbol=ETH&convert=USD'
    );
    const { data: ETH } = await responseETH.json();

    const responseUSDT = await fetch(
      'https://pro-api.coinmarketcap.com/v1/tools/price-conversion?CMC_PRO_API_KEY=' +
        process.env.DB_APIKEY +
        '&amount=1&symbol=USDT&convert=USD'
    );
    const { data: USDT } = await responseUSDT.json();

    res.send({ BTC, ETH, USDT }); // Send the data as JSON
  } catch (error) {
    console.error(error);
    res.status(500).send('⛔ Uh oh! An unexpected error occurred.');
  }
});

module.exports = router;
