const express = require('express');
const router = express.Router();
const accessController = require('../../controllers/access.controller');
const { asyneHandler } = require('../../auth/checkAuth');
const { authentication } = require('../../auth/authUtils')

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
router.get('/', asyneHandler(accessController.get))
router.post('/signup', asyneHandler(accessController.signUp))
router.post('/login', asyneHandler(accessController.logIn))
router.use(authentication);
router.put('/update', upload.single('user_avatar'), asyneHandler(accessController.updateAccount))
router.put('/updateAddress', asyneHandler(accessController.updateAddress))


module.exports = router;