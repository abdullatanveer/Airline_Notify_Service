// const { StatusCodes } = require('http-status-codes');
// const { BookingService } = require('../services/booking-service');
// const { SuccessResponse, ErrorResponse } = require('../utils/common');


// const inMemDb = {};

// async function  createBooking(req, res) {
//     try {
//         const response = await BookingService.createBooking({
//             flightId: req.body.flightId,
//             userId: req.body.userId,
//             noofSeats: req.body.noofSeats
//         });
//         SuccessResponse.data = response;
//         return res
//                 .status(StatusCodes.OK)
//                 .json(SuccessResponse);
//     } catch(error) {
//         ErrorResponse.error = error;
//         return res
//                 .status(StatusCodes.INTERNAL_SERVER_ERROR)
//                 .json(ErrorResponse);
//     }
// }


// async function makePayment(req, res) {
//     try {
//         const idempotencyKey = req.headers['x-idempotency-key'];
//         if(!idempotencyKey ) {
//             return res
//                 .status(StatusCodes.BAD_REQUEST)
//                 .json({message: 'idempotency key missing'});
//         }
//         if(inMemDb[idempotencyKey]) {
//             return res
//                 .status(StatusCodes.BAD_REQUEST)
//                 .json({message: 'Cannot retry on a successful payment'});
//         } 
//         const response = await BookingService.makePayment({
//             totalCost: req.body.totalCost,
//             userId: req.body.userId,
//             bookingId: req.body.bookingId
//         });
//         inMemDb[idempotencyKey] = idempotencyKey;
//         SuccessResponse.data = response;
//         return res
//                 .status(StatusCodes.OK)
//                 .json(SuccessResponse);
//     } catch(error) {
//         console.log(error);
//         ErrorResponse.error = error;
//         return res
//                 .status(StatusCodes.INTERNAL_SERVER_ERROR)
//                 .json(ErrorResponse);
//     }
// }

// module.exports = {
//     createBooking,
//     makePayment
// }
const { StatusCodes } = require('http-status-codes');
const BookingService = require('../services/booking-service');

const inMemDb = {};

async function createBooking(req, res) {
    try {
        const response = await BookingService.createBooking({
            flightId: req.body.flightId,
            userId: req.body.userId,
            noofSeats: req.body.noofSeats,
            totalCost:req.body.totalCost

        });
        console.log('Booking created successfully:', response);
        return res.status(StatusCodes.OK).json({
            success: true,
            data: response
        });
    } catch (error) {
        console.log('Error creating booking:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: error.message
        });
    }
}

async function makePayment(req, res) {
    try {
        const idempotencyKey = req.headers['x-idempotency-key'];
        if (!idempotencyKey) {
            console.log('Idempotency key missing');
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Idempotency key missing'
            });
        }
        if (inMemDb[idempotencyKey]) {
            console.log('Cannot retry on a successful payment');
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Cannot retry on a successful payment'
            });
        }
        const response = await BookingService.makePayment({
            totalCost: req.body.totalCost,
            userId: req.body.userId,
            bookingId: req.body.bookingId
        });
        inMemDb[idempotencyKey] = idempotencyKey;
        console.log('Payment made successfully:', response);
        return res.status(StatusCodes.OK).json({
            success: true,
            data: response
        });
    } catch (error) {
        console.log('Error making payment:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: error.message
        });
    }
}

module.exports = {
    createBooking,
    makePayment
};
