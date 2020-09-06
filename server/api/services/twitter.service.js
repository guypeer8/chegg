const Twit = require('twit')
const has = require('lodash/has');
const set = require('lodash/set');
const pick = require('lodash/pick');
const isEmpty = require('lodash/isEmpty');

const PICK_FOLLOWER_FIELDS = ['id', 'name', 'screen_name', 'profile_image_url'];

const T = new Twit({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET_KEY,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_TOKEN_SECRET,
  timeout_ms: 60 * 1000,  
});

const cache = { followers: {}, accounts: {} };

const setExpiryInMinutes = (minutes = 10) => {
    return Date.now() + (minutes * 60 * 1000);
};

const getAccountFollowers = async (screen_name, { cursor = -1 } = {}) => {
    return new Promise((resolve, reject) => {
        if (
            has(cache.followers, `${screen_name}.${cursor}`) 
            && !isEmpty(cache.followers[screen_name][cursor]) 
            && Date.now() < cache.followers[screen_name][cursor].expiry
        ) {
            return resolve({
                followers: cache.followers[screen_name][cursor].followers,
                nextCursor: cache.followers[screen_name][cursor].nextCursor,
            });
        }
    
        const params = { cursor, screen_name, skip_status: 1 };

        T.get('followers/list', params, (err, data) => {
            if (err) { return reject(err); }

            const { users, next_cursor } = data;

            set(cache.followers, `${screen_name}.${cursor}`, {
                followers: users.map(user => pick(user, PICK_FOLLOWER_FIELDS)),
                nextCursor: next_cursor,
                expiry: setExpiryInMinutes(),
            });

            resolve({
                followers: cache.followers[screen_name][cursor].followers,
                nextCursor: cache.followers[screen_name][cursor].nextCursor,
            });
        });
    });
};

const getAccountOptions = async q => {
    return new Promise((resolve, reject) => {
        if (!isEmpty(cache.accounts[q]) && Date.now() < cache.accounts[q].expiry) {
            return resolve({ accounts: cache.accounts[q].accounts });
        }

        T.get('users/search', { q, include_entities: false }, (err, accounts) => {
            if (err) { return reject(err); }

            cache.accounts[q] = { 
                accounts: accounts.map(account => pick(account, ['screen_name'])), 
                expiry: setExpiryInMinutes(),
            };
            
            resolve({ accounts: cache.accounts[q].accounts });
        });
    });
};

module.exports = {
    getAccountOptions,
    getAccountFollowers,
};