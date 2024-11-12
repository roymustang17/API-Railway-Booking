require('dotenv').config(); 

const express = require('express');
const router = express.Router();
const Train = require('../models/Train');
const { authMiddleware, AdminAccessRequired } = require('../middlewares/authMiddleware');

router.use(authMiddleware);
router.use(AdminAccessRequired);

router.post('/trains', async (req, res) => {
  try {
 
    const apiKey = req.headers['admin-api-key'];
    if (apiKey !== process.env.ADMIN_API_KEY) {
      console.log(apiKey);
      console.log(process.env.ADMIN_API_KEY);
      return res.status(401).json({ message: 'Unauthorized acess, api key not matching', success: false });
    }

    const { trainName, trainId, source, destination, totalSeats } = req.body;
    const existingTrain = await Train.findOne({ where: { trainId } });

    if (existingTrain) {
      return res.status(400).json({ message: 'Train already exists. Cant add it.', success: false });
    }

    const newTrain = await Train.create({ trainName, trainId, source, destination, totalSeats });

    return res.status(201).json({
      message: 'NEW TRAIN ADDED.',
      success: true,
      data: newTrain,
    });
  } catch (error) {
    console.error('Error:', error , 'Cant add train');
    return res.status(500).json({ message: error.message, data: error, success: false });
  }
});


router.put('/trains/:trainId', async (req, res) => {
  try {
    const apiKey = req.headers['admin-api-key'];
    console.log(apiKey);
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return res.status(401).json({ message: 'Unauthorized acess, api key not correct', success: false });
    }

    const { trainId } = req.params;
    const { trainName, source, destination, totalSeats } = req.body;
console.log(trainId);
    const existingTrain = await Train.findOne({ where: { trainId } });
    console.log(existingTrain);
    if (!existingTrain) {
      return res.status(404).json({ message: 'Train dont exists.', success: false });
    }
    existingTrain.trainName = trainName || existingTrain.trainName;
    existingTrain.source = source || existingTrain.source;
    existingTrain.destination = destination || existingTrain.destination;
    existingTrain.totalSeats = totalSeats || existingTrain.totalSeats;

    await existingTrain.save();

    return res.status(200).json({
      message: 'Train details updated',
      success: true,
      data: existingTrain,
    });
  } catch (error) {
    console.log(error);
    console.error('Error', error, ' Train not updated');
    return res.status(500).json({ message: error.message, data: error, success: false });
  }
});
module.exports = router;
