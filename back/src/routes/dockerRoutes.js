const express = require('express');
const router = express.Router();
const containerController = require('../controllers/containerController');

router.get('/dockerInfo', containerController.getContainers);

module.exports = router;