const twitterService = require('../services/twitter.service');

const getAccountOptions = async (req, res) => {
  const { query } = req.body;

  try {
    const { accounts } = await twitterService.getAccountOptions(query);
    res.status(200).json({ 
      status: 'success', 
      payload: { accounts },
    });
  } catch (e) {
    res.json({ status: 'error', error: e });
  }
};

const getAccountFollowers = async (req, res) => {
  const { cursor = -1 } = req.query;
  const { account } = req.body;

  try {
    if (!account) { throw new Error('Twitter account must be provided'); }
    const { followers, nextCursor } = await twitterService.getAccountFollowers(account, { cursor });
    res.status(200).json({ 
      status: 'success', 
      payload: { followers, nextCursor },
    });
  } catch (e) {
    res.json({ status: 'error', error: e });
  }
};

module.exports = {
  getAccountOptions,
  getAccountFollowers,
};
