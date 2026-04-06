const http = require("http");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const authRoutes = require("./routes/auth");
const rideRoutes = require("./routes/ride");
const driverRoutes = require("./routes/driver");
const { initSocket } = require("./sockets");
const { errorHandler } = require("./middleware/errorHandler");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Ride Share Backend is running" });
});

app.use("/auth", authRoutes);
app.use("/ride", rideRoutes);
app.use("/driver", driverRoutes);

app.use(errorHandler);

const server = http.createServer(app);
const io = initSocket(server);

const PORT = process.env.PORT || 5000;
connectDb()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Backend listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });
