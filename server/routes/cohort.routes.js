const router = require("express").Router();
const Cohort = require("../models/Cohort.model");

router.post("/", async (req, res) => {
  try {
    const { cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours } = req.body;
    const newCohort = {
      cohortSlug,
      cohortName,
      program,
      format,
      campus,
      startDate,
      endDate,
      inProgress,
      programManager,
      leadTeacher,
      totalHours,
    };
    console.log(newCohort);
    const cohort = await Cohort.create({ cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours });
    res.status(200).json(cohort);
  } catch (error) {
    res.status(500).json({ message: "Error" + error });
  }
});

router.get("/", async (req, res) => {
  try {
    const cohorts = await Cohort.find();
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json({ message: "Error:" + error });
  }
});

router.get("/:cohortId", async (req, res) => {
  try {
    const cohortId = req.params.cohortId;
    const cohort = await Cohort.findById(cohortId);
    res.status(200).json(cohort);
  } catch (error) {
    res.status(500).json({ message: "Error:" + error });
  }
});

router.put("/:cohortId", async (req, res) => {
  try {
    const cohortId = req.params.cohortId;
    const cohort = await Cohort.findByIdAndUpdate(cohortId, req.body, { new: true });
    res.status(200).json(cohort);
  } catch (error) {
    res.status(500).json({ message: "Error:" + error });
  }
});

router.delete("/:cohortId", async (req, res) => {
  try {
    const cohortId = req.params.cohortId;
    await Cohort.findByIdAndDelete(cohortId);
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ message: "Error:" + error });
  }
});

module.exports = router;
