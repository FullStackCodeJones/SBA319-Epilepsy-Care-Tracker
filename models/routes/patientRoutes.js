const express = require("express");

//Here I Am Importing from the Patient Model
const Patient = require("../models/Patient");

const router = express.Router();

// Create a new Patient
router.post("/", async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// Get a Patient by its ID
router.put("/:id", async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate;
    if (!patient) {
      return res.status(404).json({ error: "Patient Not Found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a Patient by its ID--------

router.put("/:id", async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!patient) {
      return res.status(404).json({ error: "Patient Not Found " });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
