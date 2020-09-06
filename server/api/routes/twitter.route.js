const router = require('express').Router();
const TwitterController = require('../controllers/twitter.controller');

router.post('/accounts', TwitterController.getAccountOptions);
router.post('/followers', TwitterController.getAccountFollowers);

module.exports = router;
