// DEPENDENCIES
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// CONFIG
const PORT = 5005;

// MONGOOSE CONNECTION
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Successfully connected to MongoDB."))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// EXPRESS APP INITIALIZATION
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173" }));

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// API Routes
const authRouter = require("./routes/auth.routes");
const studentRouter = require("./routes/student.routes");
const cohortRouter = require("./routes/cohort.routes");
const userRouter = require("./routes/user.routes");
const { isAuthenticated } = require("./middleware/jwt.middleware");

app.use("/api/students", studentRouter);
app.use("/api/cohorts", cohortRouter);
app.use("/api/users", isAuthenticated, userRouter);
app.use("/auth", authRouter);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
