const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const getToken = (str) => str.replace('Bearer ', '');
const getUser = (token) => jwt.verify(token, JWT_SECRET);

// Subscription Keys
const UPVOTE_LINK = 'UPVOTE_LINK';

module.exports = { JWT_SECRET, getToken, getUser, UPVOTE_LINK };
