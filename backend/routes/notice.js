const express = require('express');

const router = express.Router();

const noticeController = require('../controllers/notice');

router.post('/api/notice/addcommentnotice/:_id', noticeController.addCommentNotice);

router.post('/api/notice/addinvitenotice/:userid', noticeController.addInviteNotice);

module.exports = router;
