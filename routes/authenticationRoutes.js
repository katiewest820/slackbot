const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authenticationController');

router.post('/verify', authenticationController.verifyToken);

module.exports = router;