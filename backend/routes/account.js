const express = require('express');

const router = express.Router();

const account = require('../controllers/account');

router.post('/api/account/signup', account.signUp);

router.post('/api/account/login', account.logIn);

router.get('/api/account/logout', account.logOut);

router.get('/api/account/mypage', account.getUserInfo);

module.exports = router;
