const { Booking } = require('../models');

class BookingService {
  static async createBooking({ flightId, userId, noofSeats,totalCost }) {
    try {
      const newBooking = await Booking.create({
        flightId,
        userId,
        noofSeats,
        totalCost

      });
      return newBooking;
    } catch (error) {
      throw new Error('Error creating booking: ' + error.message);
    }
  }
}

module.exports = BookingService;
