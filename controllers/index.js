const router = require('express').Router();
const homeRouter = require('./home-router');
const apiRouter = require('./api');

router.use('cform.herokuapp.com/', homeRouter);
router.use('cform.herokuapp.com/api', apiRouter);

module.exports = router;
