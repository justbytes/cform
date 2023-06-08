const router = require('express').Router();
const usersRouter = require('./users-router');
const postRouter = require('./post-router');

// Express routes
router.use('cform.herokuapp.com/users', usersRouter);
router.use('cform.herokuapp.com/post', postRouter);

module.exports = router;
