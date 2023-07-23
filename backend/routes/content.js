const express = require('express');

const router = express.Router();

const content = require('../controllers/content');

router.post('/api/content/uploadpost', content.uploadPost);

router.post('/api/content/uploadcomment', content.uploadComment);

router.get('/api/content/findallcontents', content.findAllContents);

// router.get('/api/content/findcontent', content.findContent);

module.exports = router;
