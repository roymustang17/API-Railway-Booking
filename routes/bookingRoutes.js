const express = require('express');
const { Op } = require('sequelize');
const Booking = require('../models/Booking');
const Train = require('../models/Train');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();
router.use(authMiddleware);



//allow to book one or more tickets , booking id is returned for each seat
router.post('/book', async (req, res) => {
  // console.log("start1");

  const { trainId, source, destination, seatsRequired } = req.body;
  if(seatsRequired<=0){
    return res.status(400).json({ status: 'ERROR', message: 'Give positive value of seats required.' });
  }
  if (!trainId || !source || !destination) {
    return res.status(400).json({ status: 'ERROR', message: 'Missing required fields' });
  }

  //mutual exclusion implemented 
  let transaction;

  try {
   
    transaction = await Train.sequelize.transaction();


    const train = await Train.findOne({
      where: { trainId, source, destination },
      lock: transaction.LOCK.UPDATE,
      transaction,
    });

    if (!train) {
      await transaction.rollback();
      return res.status(404).json({ status: 'ERROR', message: 'Train not found' });
    }

    if (train.totalSeats - seatsRequired <= 0) {
      await transaction.rollback();
      return res.status(400).json({ status: 'NO_SEATS', message: `Only ${train.totalSeats} are available, please book optimally`  });
    }

    train.totalSeats -= seatsRequired;
    await train.save({ transaction });

    //to store booking id
    let bookingIDs = [];
    for(let i=0 ; i<seatsRequired; i++){
      let booking =await Booking.create(
        {
          trainId,
          seatStatus: 'booked',
          source,
          destination,
        },
        { transaction }
      );
  
      bookingIDs.push(booking.bookingId);
    }
    

    await transaction.commit();

    return res.status(201).json({ status: 'SUCCESS', bookingIds: bookingIDs });
  } catch (error) {
    if (transaction) await transaction.rollback();
    return res.status(500).json({ status: 'ERROR', message: error.message });
  }
});

// authentication implemented
router.use(authMiddleware);
//finding the booking details
router.get('/:bookingId', async (req, res) => {
    const { bookingId } = req.params;
  
    try {
      const booking = await Booking.findByPk(bookingId, {
        include: [{ model: Train, attributes: ['trainName', 'trainId'] }], 
      });
  
      if (!booking) {
        return res.status(404).json({ status: 'ERROR', message: 'Booking not found' });
      }
  
      const { source, destination, seatStatus } = booking;
      const { trainName, trainId } = booking.Train;
  
      const bookingDetails = {
        source,
        destination,
        trainName,
        trainId,
        status: seatStatus,
      };
  
      return res.status(200).json({ status: 'SUCCESS', bookingDetails });
    } catch (error) {
      return res.status(500).json({ status: 'ERROR', message: error.message });
    }
  });


module.exports = router;
