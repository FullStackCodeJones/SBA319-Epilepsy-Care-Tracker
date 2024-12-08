const express = require("express");
const router = express.Router();
//Here I Am Importing from the Patient Model
const Patient = require("../models/Patient");

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
router.get("/:id", async (req, res) => {
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

// Delete a Patient by its ID

router.delete("/:id", async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).json({ error: "Patient Not Found" });
    }
    res.status(200).json({ message: "Patient Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Route to get all Patient's information
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

//Route to get a single Patient's information BY ID
router.get("/:id", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: "Patient Not Found" });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
