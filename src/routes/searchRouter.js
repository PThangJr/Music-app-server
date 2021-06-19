const express = require('express');
const search = require('../app/helpers/search');

const router = express.Router();

router.get('/', search);
router.post('/', search);

module.exports = router;
