const express = require('express');
const router = express.Router();
const { register,login, beautyLogin,beautyRegister  } = require('../controllers/register');
router.post('/register', register);
router.post('/login', login);
router.post('/beautyRegister', beautyRegister);
router.post('/beautyLogin', beautyLogin);
module.exports = router;
