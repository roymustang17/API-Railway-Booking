const express = require('express');
const router = express.Router();
const Train = require('../models/Train');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
      let { source, destination } = req.query;

      source = source.trim();
      destination = destination.trim();
  
      if (!source || !destination) {
        return res.status(400).json({ message: 'Source or destination is missing. Both required', success: false });
      }
  
      const trains = await Train.findAll({
        where: {
          source,
          destination,
        },
      });
  
      if (trains.length === 0) {
        return res.status(404).json({ message: 'No trains found for the given route', success: false });
      }
  
      
      const formattedTrains = trains.map(train => ({
        trainName: train.trainName,
        trainId: train.trainId,
        source: train.source,
        destination: train.destination,
        totalSeats: train.totalSeats,
        createdAt: train.createdAt,
        updatedAt: train.updatedAt,
      }));
  
      return res.status(200).json({
        message: 'Trains fetched successfully',
        success: true,
        data: formattedTrains,
      });
    } catch (error) {
      console.error('Error fetching trains:', error);
      return res.status(500).json({ message: error.message, success: false });
    }
  });

module.exports = router;
