const mongoose = require('mongoose');
const Ride = require('./models/Ride');
require('dotenv').config();

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  const ridesByStatus = await Ride.aggregate([
    {
      $project: {
        status: {
          $cond: {
            if: {
              $and: [
                { $eq: ["$status", "completed"] },
                { $ne: ["$paymentStatus", "completed"] }
              ]
            },
            then: "started",
            else: "$status"
          }
        },
        fare: 1
      }
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
        totalFare: { $sum: "$fare" },
      },
    },
  ]);
  console.log("RidesByStatus:", ridesByStatus);
  
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11);
  twelveMonthsAgo.setDate(1);
  twelveMonthsAgo.setHours(0, 0, 0, 0);

  const revenueAndRidesLast12Months = await Ride.aggregate([
    {
      $match: {
        createdAt: { $gte: twelveMonthsAgo },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
        revenue: {
          $sum: {
            $cond: [
              { $in: ["$status", ["completed", "started"]] },
              "$fare",
              0,
            ],
          },
        },
        ridesCount: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  console.log("Last12Months:", revenueAndRidesLast12Months);
  process.exit();
}
run();
