const express = require('express');
const router = express.Router();
const systemController = require('../controllers/systemController');

router.get('/systemInfo', systemController.getInfo);

module.exports = router;