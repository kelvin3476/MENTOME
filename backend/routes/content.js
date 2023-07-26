const express = require('express');

const router = express.Router();

const contentController = require('../controllers/content');

router.post('/api/content/uploadpost', contentController.uploadPost);

router.post('/api/content/uploadcomment', contentController.uploadComment);

router.get('/api/content/getallcontents', contentController.getAllContents);

router.get('/api/content/getcontentdetail', contentController.getContentDetail);

module.exports = router;
