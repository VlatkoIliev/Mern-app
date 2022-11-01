const express = require('express');
const router = express.Router();
const registerUser = require('../controllers/registerController');
const authUser = require('../controllers/authController');

router.post('/', registerUser);
router.post('/', authUser);

module.exports = router;
