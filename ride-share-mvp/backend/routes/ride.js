const express = require("express");
const auth = require("../middleware/auth");
const permitRoles = require("../middleware/role");
const {
  requestRide,
  acceptRide,
  getRides,
} = require("../controllers/rideController");
const router = express.Router();

router.post("/request", auth, permitRoles("user"), requestRide);
router.post("/accept", auth, permitRoles("driver"), acceptRide);
router.get("/", auth, getRides);

module.exports = router;
