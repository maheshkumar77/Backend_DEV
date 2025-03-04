const express = require("express");
const { Doctor } = require("../models");
const auth = require("../middlewares/auth");
const router = express.Router();

// ✅ Add Doctor
router.post("/", auth, async (req, res) => {
    const doctor = await Doctor.create(req.body);
    res.json(doctor);
});

// ✅ Get All Doctors
router.get("/", async (req, res) => {
    const doctors = await Doctor.findAll();
    res.json(doctors);
});

// ✅ Get Doctor by ID
router.get("/:id", async (req, res) => {
    const doctor = await Doctor.findByPk(req.params.id);
    res.json(doctor);
});

// ✅ Update Doctor
router.put("/:id", auth, async (req, res) => {
    await Doctor.update(req.body, { where: { id: req.params.id } });
    res.json({ message: "Updated successfully" });
});

// ✅ Delete Doctor
router.delete("/:id", auth, async (req, res) => {
    await Doctor.destroy({ where: { id: req.params.id } });
    res.json({ message: "Deleted successfully" });
});

module.exports = router;
