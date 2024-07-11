const express = require('express');

const { InfoController,EmailController,BookingController } = require('../../controllers');

const router = express.Router();

// router.get('/info', InfoController.info);
router.post('/tickets', EmailController.create);
router.post('/booking',  BookingController.createBooking);

module.exports = router;