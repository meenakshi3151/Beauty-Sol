const express = require('express');
const router = express.Router();
const { displayParlours } = require('../controllers/displayParlours')
router.post('/displayParlours',displayParlours);
module.exports = router;
