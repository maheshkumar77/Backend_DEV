const express = require("express");
const { Patient } = require("../models");
const auth = require("../middlewares/auth");
const router = express.Router();

// ✅ Add a Patient
router.post("/", auth, async (req, res) => {
    const { name, age, disease } = req.body;
    const patient = await Patient.create({ name, age, disease, userId: req.user.id });
    res.json(patient);
});

// ✅ Get All Patients
router.get("/", auth, async (req, res) => {
    const patients = await Patient.findAll({ where: { userId: req.user.id } });
    res.json(patients);
});

// ✅ Get Patient by ID
router.get("/:id", auth, async (req, res) => {
    const patient = await Patient.findByPk(req.params.id);
    res.json(patient);
});

// ✅ Update Patient
router.put("/:id", auth, async (req, res) => {
    await Patient.update(req.body, { where: { id: req.params.id } });
    res.json({ message: "Updated successfully" });
});

// ✅ Delete Patient
router.delete("/:id", auth, async (req, res) => {
    await Patient.destroy({ where: { id: req.params.id } });
    res.json({ message: "Deleted successfully" });
});

module.exports = router;
