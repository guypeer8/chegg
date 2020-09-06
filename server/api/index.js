const router = require('express').Router();

router.use('/twitter', require('./routes/twitter.route'));

module.exports = router;
