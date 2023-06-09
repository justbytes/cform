const session = require('express-session');
const sequelize = require('./connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Check for SECRET env var and throw an error if it isn't set.
if (!process.env.SECRET) {
  throw new Error('SECRET environmental variable must be set.');
}

// Configure session options
const sess = {
  secret: process.env.SECRET,
  cookie: {
    // cookies expire after 1 day (time in milliseconds)
    maxAge: 8.64e7,
  },
  resave: false,
  // Wait to save session until the user logs in
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

if (!process.env.SECRET) {
  console.error('SECRET environmental variable must be set.');
  process.exit(1);
}

// Exports session middleware. Import and pass to app.use() at startup.
module.exports = session(sess);
