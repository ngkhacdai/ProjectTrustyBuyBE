const express = require('express');
const router = express.Router();
const shopControllers = require('../../controllers/shop.controller');
const {asyneHandler} = require('../../auth/checkAuth');

router.post('/register', asyneHandler(shopControllers.register));

module.exports = router;