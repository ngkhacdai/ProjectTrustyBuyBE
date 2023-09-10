const express = require('express');
const router = express.Router();
const accessController = require('../../controllers/access.controller');
const {asyneHandler} = require('../../auth/checkAuth');
router.post('/signup',asyneHandler(accessController.signUp))
router.post('/login',asyneHandler(accessController.logIn))

module.exports = router;