const Review = require('../models/Review');
const Ride = require('../models/Ride');

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Private
const createReview = async (req, res) => {
  const { rideId, rating, comment, reviewBy } = req.body;

  if (!rideId || !rating || !reviewBy) {
    return res.status(400).json({ message: 'Please provide all required review details' });
  }

  try {
    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    const reviewData = {
      ride: rideId,
      rating,
      comment,
      reviewBy,
    };

    if (reviewBy === 'user') {
      reviewData.user = req.user._id;
      reviewData.rider = ride.rider;
    } else {
      reviewData.rider = req.user._id;
      reviewData.user = ride.user;
    }

    const review = await Review.create(reviewData);

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { createReview };
