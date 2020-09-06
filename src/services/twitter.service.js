import axios from 'axios';

const ENDPOINT = `/api/twitter`;

const getAccounts = query =>
    axios.post(`${ENDPOINT}/accounts`, { query });

const getFollowers = (account, { cursor = -1 } = {}) =>
    axios.post(`${ENDPOINT}/followers?cursor=${cursor}`, { account });

export default {
    getAccounts,
    getFollowers,
};