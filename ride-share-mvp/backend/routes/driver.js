const express = require("express");
const auth = require("../middleware/auth");
const permitRoles = require("../middleware/role");
const {
  setAvailability,
  updateLocation,
} = require("../controllers/driverController");
const router = express.Router();

router.post("/availability", auth, permitRoles("driver"), setAvailability);
router.post("/location", auth, permitRoles("driver"), updateLocation);

module.exports = router;
