require('dotenv').config();
const express = require('express');
const path = require('path');
const sequelize = require('./config/connection');
const router = require('./controllers');
const helpers = require('./util/helpers');
const sessionMiddleware = require('./config/session');

const PORT = process.env.PORT || 3001;
const app = express();

// setup app middleware
app.use(sessionMiddleware);
app.use(express.static('public'));
app.use(express.static('build'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect routes
app.use(router);

// Serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Connect to the database and start the server
sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
