const express = require('express');
const router = express.Router();
const {service, deleteService, getServices} = require('../controllers/service');
router.post('/service', service);
router.post('/deleteservice', deleteService);
router.post('/getServices', getServices);
module.exports = router;




