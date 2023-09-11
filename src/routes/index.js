const express = require('express');
const router = express.Router();
router.use('/v1/api/access',require('./access/index.access'))
router.use('/v1/api/shop',require('./shop/index.shop'))
module.exports = router;