const express = require('express');
const router = express.Router();

const newsController = require('../app/controllers/NewsController')

// newsController.main
router.get('/:slug', newsController.showDetail)
router.get('/', newsController.main)

module.exports = router;