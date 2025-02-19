const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const Cohort = require("./models/Cohort.model");
const Student = require("./models/Student.model");
require("dotenv").config();
const PORT = 5005;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Successfully connected to MongoDB."))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173" }));

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/api/cohorts", (req, res) => {
  Cohort.find({})
    .then((coh) => {
      console.log("Retrieved cohorts ->", coh);
      res.json(coh);
    })
    .catch((error) => {
      console.error("Error while retrieving books ->", error);
      res.status(500).json({ error: "Failed to retrieve books" });
    });
});

/// Students
app.post("/api/students", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, cohort, projects } = req.body;
    const newStudent = await Student.create({ firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, cohort, projects });
    res.status(200).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: "Error" + error });
  }
});

app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find({}).populate("cohort");
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error:" + error });
  }
});

app.get("/api/students/cohort/:cohortId", async (req, res) => {
  try {
    const cohortId = req.params.cohortId;
    console.log(cohortId);
    const students = await Student.find({ cohort: cohortId }).populate("cohort");
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error:" + error });
  }
});

app.get("/api/students/:studentId", async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const student = await Student.findById(studentId).populate("cohort");
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error:" + error });
  }
});

app.put("/api/students/:studentId", async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const student = await Student.findByIdAndUpdate(studentId, req.body, { new: true });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error:" + error });
  }
});

app.delete("/api/students/:studentId", async (req, res) => {
  try {
    const studentId = req.params.studentId;
    await Student.findByIdAndDelete(studentId);
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ message: "Error:" + error });
  }
});

/// Cohort

app.post("/api/cohorts", async (req, res) => {
  try {
    const { cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours } = req.body;
    const cohort = await Cohort.create({ cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours });
    res.status(200).json(cohort);
  } catch (error) {
    res.status(500).json({ message: "Error" + error });
  }
});

app.get("/api/cohorts", async (req, res) => {
  try {
    const cohorts = await Cohort.find();
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json({ message: "Error:" + error });
  }
});

app.get("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const cohortId = req.params.cohortId;
    const cohort = await Cohort.findById(cohortId);
    res.status(200).json(cohort);
  } catch (error) {
    res.status(500).json({ message: "Error:" + error });
  }
});

app.put("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const cohortId = req.params.cohortId;
    const cohort = await Cohort.findByIdAndDelete(cohortId, req.body, { new: true });
    res.status(200).json(cohort);
  } catch (error) {
    res.status(500).json({ message: "Error:" + error });
  }
});

// DELETE /api/cohorts/:cohortId - Deletes a specific cohort by id

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
