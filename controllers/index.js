const router = require('express').Router();
const homeRouter = require('./home-router');
const apiRouter = require('./api');

router.use('https://cform.herokuapp.com/', homeRouter);
router.use('https://cform.herokuapp.com/api', apiRouter);

module.exports = router;
