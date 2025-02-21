const router = require("express").Router();
const Student = require("../models/Student.model");

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, cohort, projects } = req.body;
    const newStudent = await Student.create({ firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, cohort, projects });
    res.status(200).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: "Error" + error });
  }
});

router.get("/", async (req, res) => {
  try {
    const students = await Student.find({}).populate("cohort");
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error:" + error });
  }
});

router.get("/cohort/:cohortId", async (req, res) => {
  try {
    const cohortId = req.params.cohortId;
    const students = await Student.find({ cohort: cohortId }).populate("cohort");
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error:" + error });
  }
});

router.get("/:studentId", async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const student = await Student.findById(studentId).populate("cohort");
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error:" + error });
  }
});

router.put("/:studentId", async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const student = await Student.findByIdAndUpdate(studentId, req.body, { new: true });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error:" + error });
  }
});

router.delete("/:studentId", async (req, res) => {
  try {
    const studentId = req.params.studentId;
    await Student.findByIdAndDelete(studentId);
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ message: "Error:" + error });
  }
});

module.exports = router;
