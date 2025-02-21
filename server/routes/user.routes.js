const router = require("express").Router();
const User = require("../models/User.model");

router.get("/:id", async (req, res) => {
  try {
    const { email } = req.body;
    // const foundUser = await User.find();
    const foundUser = await User.findOne({ email });
    console.log("foundd", foundUser);
  } catch (error) {
    res.status(401).json({ message: "User not found." });
    return;
  }
});

module.exports = router;
