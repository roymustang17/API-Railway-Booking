const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const trainRoutes = require("./routes/trainRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const sequelize = require("./config/database");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/trains", trainRoutes);
app.use("/api/bookings", bookingRoutes);

sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log("Database connected.");
    });
  })
  .catch((err) => {
    console.error("Database down, ERROR: ", err);
  });
