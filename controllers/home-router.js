const fetch = require('node-fetch');
const router = require('express').Router();

// Get models
const { User, Post } = require('../models');

//Gets Bitcoin, Ether, and Binance coin prices from coin market cap api
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

    const responseBNB = await fetch(
      'https://pro-api.coinmarketcap.com/v1/tools/price-conversion?CMC_PRO_API_KEY=' +
        process.env.DB_APIKEY +
        '&amount=1&symbol=BNB&convert=USD'
    );
    const { data: BNB } = await responseBNB.json();
    // Send the data as JSON to frontend
    res.send({ BTC, ETH, BNB });
  } catch (error) {
    console.error(error);
    res.status(500).send('⛔ Uh oh! An unexpected error occurred.');
  }
});

// Gets all posts and renders to My Profile
router.get('/userpage', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    // Check to see if user is logged in
    let user = null;
    if (req.session.isLoggedIn) {
      user = await User.findByPk(req.session.userId, {
        exclude: ['password'],
        raw: true,
      });
    }
    // send current user and posts to frontend
    res.json({ user, posts });
  } catch (error) {
    console.error(error);
    res.status(500).send('⛔ Uh oh! An unexpected error occurred.');
  }
});

// Gets top 30 performing cryptos from coin market cap api
router.get('/top30', async (req, res) => {
  try {
    const responseCoin = await fetch(
      'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=' +
        process.env.DB_APIKEY +
        '&start=1&limit=30&convert=USD'
    );
    const { data: coins } = await responseCoin.json();
    const responseData = {
      title: 'Top 30',
      coins,
    };
    if (req.session.isLoggedIn) {
      responseData.isLoggedIn = true;
    }
    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).send('⛔ Uh oh! An unexpected error occurred.');
  }
});

module.exports = router;
