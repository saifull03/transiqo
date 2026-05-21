const mongoose = require('mongoose');
const Review = require('./models/Review');
const Rider = require('./models/Rider');
require('dotenv').config();

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  const saidul = await Rider.findOne({ email: 'saidul@gmail.com' });
  console.log('Saidul ID:', saidul?._id);
  const reviews = await Review.find({});
  console.log('Total reviews in DB:', reviews.length);
  
  const saidulReviews = await Review.find({ rider: saidul?._id });
  console.log('Reviews for Saidul:', saidulReviews.length);
  if (saidulReviews.length > 0) {
    console.log(saidulReviews[0]);
  }
  process.exit();
}
run();
