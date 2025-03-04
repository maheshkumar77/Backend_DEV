const express = require("express");
const { PatientDoctor, Patient, Doctor } = require("../models");
const auth = require("../middlewares/auth");

const router = express.Router();

// ✅ Assign a doctor to a patient
router.post("/", auth, async (req, res) => {
    const { patientId, doctorId } = req.body;

    try {
        const mapping = await PatientDoctor.create({ patientId, doctorId });
        res.status(201).json({ message: "Doctor assigned to patient", mapping });
    } catch (error) {
        res.status(500).json({ message: "Error assigning doctor", error });
    }
});

// ✅ Get all patient-doctor mappings
router.get("/", auth, async (req, res) => {
    try {
        const mappings = await PatientDoctor.findAll({
            include: [{ model: Patient }, { model: Doctor }]
        });
        res.json(mappings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching mappings", error });
    }
});

// ✅ Get all doctors assigned to a specific patient
router.get("/:patientId", auth, async (req, res) => {
    try {
        const { patientId } = req.params;
        const mappings = await PatientDoctor.findAll({
            where: { patientId },
            include: [{ model: Doctor }]
        });

        if (mappings.length === 0) {
            return res.status(404).json({ message: "No doctors assigned to this patient" });
        }

        res.json(mappings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching mappings", error });
    }
});

// ✅ Remove a doctor from a patient
router.delete("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const mapping = await PatientDoctor.findByPk(id);

        if (!mapping) {
            return res.status(404).json({ message: "Mapping not found" });
        }

        await mapping.destroy();
        res.json({ message: "Doctor removed from patient" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting mapping", error });
    }
});

module.exports = router;
