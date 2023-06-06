const fetch = require('node-fetch');
const router = require('express').Router();
const { User, Post } = require('../models');
// use withAuth middleware to redirect from protected routes.
// const withAuth = require("../util/withAuth");

// example of a protected route
// router.get("/users-only", withAuth, (req, res) => {
//   // ...
// });

//route to display 3 coins on landing page
router.get('/', async (req, res) => {
  try {
    const responseBTC = await fetch(
      'https://pro-api.coinmarketcap.com/v1/tools/price-conversion?CMC_PRO_API_KEY=' +
        process.env.DB_APIKEY +
        '&amount=1&symbol=BTC&convert=USD'
    );
    const { data: BTC } = await responseBTC.json();

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

    res.render('home', {
      title: 'Home Page',
      BTC,
      ETH,
      USDT,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('⛔ Uh oh! An unexpected error occurred.');
  }
});

//route to display 3 coin prices and all posts IF logged in on userpage
router.get('/userpage', async (req, res) => {
  try {
    const responseBTC = await fetch(
      'https://pro-api.coinmarketcap.com/v1/tools/price-conversion?CMC_PRO_API_KEY=' +
        process.env.DB_APIKEY +
        '&amount=1&symbol=BTC&convert=USD'
    );
    const { data: BTC } = await responseBTC.json();

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

    //code to display all posts
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    let user;
    if (req.session.isLoggedIn) {
      user = await User.findByPk(req.session.userId, {
        exclude: ['password'],
        raw: true,
      });
    }
    console.log(posts);
    res.render('userpage', {
      title: 'User Page',

      isLoggedIn: req.session.isLoggedIn,
      user,
      posts,
      BTC,
      ETH,
      USDT,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('⛔ Uh oh! An unexpected error occurred.');
  }
});

//route for top 30 coins

router.get('/top30', async (req, res) => {
  try {
    const responseCoin = await fetch(
      'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=' +
        process.env.DB_APIKEY +
        '&start=1&limit=30&convert=USD'
    );
    const { data: coins } = await responseCoin.json();

    res.render('top30', {
      title: 'Top 30',

      isLoggedIn: req.session.isLoggedIn,
      coins,
      //history,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('⛔ Uh oh! An unexpected error occurred.');
  }
});

//TO-DO check if we need this code modified?
router.get('/login', (req, res) => {
  res.render('login', { title: 'Log-In Page' });
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/userpage');
    return;
  }

  res.render('home');
});

module.exports = router;
