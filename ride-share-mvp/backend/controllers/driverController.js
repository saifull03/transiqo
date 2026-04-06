const Driver = require("../models/Driver");

const setAvailability = async (req, res, next) => {
  try {
    const { isAvailable } = req.body;
    const driver = await Driver.findOneAndUpdate(
      { userId: req.user.id },
      { isAvailable: Boolean(isAvailable) },
      { new: true },
    );
    if (!driver) {
      return res.status(404).json({ message: "Driver profile not found" });
    }
    return res.json({ driver });
  } catch (err) {
    next(err);
  }
};

const updateLocation = async (req, res, next) => {
  try {
    const { lat, lng } = req.body;
    if (typeof lat !== "number" || typeof lng !== "number") {
      return res
        .status(400)
        .json({ message: "lat and lng are required numbers" });
    }
    const driver = await Driver.findOneAndUpdate(
      { userId: req.user.id },
      { location: { type: "Point", coordinates: [lng, lat] } },
      { new: true },
    );
    if (!driver) {
      return res.status(404).json({ message: "Driver profile not found" });
    }
    return res.json({ driver });
  } catch (err) {
    next(err);
  }
};

module.exports = { setAvailability, updateLocation };
