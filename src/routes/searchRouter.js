const express = require('express');
const search = require('../app/helpers/search');

const router = express.Router();

router.post('/', search);
router.get('/', search);

module.exports = router;
