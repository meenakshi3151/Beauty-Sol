const express = require('express');
const router = express.Router();
const {bookingBeauty, bookingUser, cancelBooking,getBookings, allbookings} = require('../controllers/booking');
router.post('/bookingUser', bookingUser);
router.post('/bookingBeauty', bookingBeauty);
router.post('/cancelBooking', cancelBooking);
router.post('/allbookings', allbookings);
router.post('/userBookings', getBookings);
module.exports = router;
