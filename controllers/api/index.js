const router = require('express').Router();
const usersRouter = require('./users-router');
const postRouter = require('./post-router');

// Express routes
router.use('/users', usersRouter);
router.use('/post', postRouter);

module.exports = router;
