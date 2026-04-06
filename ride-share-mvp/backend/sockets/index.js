const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const Driver = require("../models/Driver");
const Ride = require("../models/Ride");

const userSockets = new Map();
const driverSockets = new Map();
let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    const token = socket.handshake.auth?.token;
    if (token) {
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = payload;
        userSockets.set(payload.id, socket.id);
      } catch (err) {
        socket.disconnect(true);
        return;
      }
    }

    socket.on("register-user", ({ userId }) => {
      if (userId) {
        userSockets.set(userId, socket.id);
      }
    });

    socket.on("driver-online", async ({ driverId }) => {
      if (!driverId) return;
      driverSockets.set(driverId, socket.id);
      await Driver.findOneAndUpdate(
        { userId: driverId },
        { isAvailable: true, socketId: socket.id },
      );
    });

    socket.on("update-location", async ({ driverId, lat, lng }) => {
      if (!driverId || typeof lat !== "number" || typeof lng !== "number")
        return;
      await Driver.findOneAndUpdate(
        { userId: driverId },
        { location: { type: "Point", coordinates: [lng, lat] } },
      );
    });

    socket.on("accept-ride", async ({ rideId, driverId }) => {
      if (!rideId || !driverId) return;
      const ride = await Ride.findById(rideId);
      if (!ride || ride.status !== "pending") {
        return socket.emit("ride-error", { message: "Ride is not available" });
      }
      ride.status = "accepted";
      ride.driverId = driverId;
      await ride.save();
      notifyUser(ride.userId.toString(), "ride-accepted", {
        rideId: ride._id,
        driverId,
        status: ride.status,
      });
      socket.emit("ride-accepted", { ride });
    });

    socket.on("disconnect", async () => {
      for (const [driverId, id] of driverSockets.entries()) {
        if (id === socket.id) {
          driverSockets.delete(driverId);
          await Driver.findOneAndUpdate(
            { userId: driverId },
            { isAvailable: false, socketId: null },
          );
          break;
        }
      }
      for (const [userId, id] of userSockets.entries()) {
        if (id === socket.id) {
          userSockets.delete(userId);
          break;
        }
      }
    });
  });

  return io;
};

const notifyNearbyDrivers = (drivers, ride) => {
  if (!io) return;
  drivers.forEach((driver) => {
    const socketId =
      driver.socketId || driverSockets.get(driver.userId.toString());
    if (socketId) {
      io.to(socketId).emit("new-ride", { ride });
    }
  });
};

const notifyUser = (userId, event, payload) => {
  if (!io) return;
  const socketId = userSockets.get(userId);
  if (socketId) {
    io.to(socketId).emit(event, payload);
  }
};

module.exports = { initSocket, notifyNearbyDrivers, notifyUser };
