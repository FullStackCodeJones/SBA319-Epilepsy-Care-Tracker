const express = require("express");
const router = express.Router();
//Here I Am Importing from the Patient Model
const Patient = require("../models/Patient");
const Contact = require("../models/contact");
const Seizure = require("../models/seizure");
const Medication = require("../models/medication");

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
// Add a New Emergency Contact
router.post("/contacts", async (req, res) => {
  try {
    const { name, relationship, phoneNumber, email, address } = req.body;
    const newContact = new Contact({
      name,
      relationship,
      phoneNumber,
      email,
      address,
    });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST: Log a new seizure
router.post("/seizures", async (req, res) => {
  try {
    const { duration, type, notes } = req.body;
    const newSeizure = new Seizure({ duration, type, notes });
    await newSeizure.save();
    res.status(201).json(newSeizure);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST: Add a new medication
router.post("/medications", async (req, res) => {
  try {
    const { name, dosage, schedule, notes } = req.body;
    const newMedication = new Medication({ name, dosage, schedule, notes });
    await newMedication.save();
    res.status(201).json(newMedication);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    console.error("Error In GET /:id route:", error.message);
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

// Route to Get Patients Older than A Specific Age
router.get("/age/above/:age", async (req, res) => {
  try {
    const patients = await Patient.find({ age: { $gt: req.params.age } });
    if (patients.length === 0) {
      return res
        .status(404)
        .json({ error: "NO Patients Found Above This Age" });
    }
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Route to Get Patients by Medication
// Get Patients by Medication
router.get("/medication/:medication", async (req, res) => {
  try {
    const patients = await Patient.find({ medication: req.params.medication });
    if (patients.length === 0) {
      return res
        .status(404)
        .json({ error: "No patients found taking this medication" });
    }
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/condition/:condition", async (req, res) => {
  try {
    const patients = await Patient.find({ condition: req.params.condition });
    if (patients.length === 0) {
      return res
        .status(400)
        .json({ error: "No Patients Found with This Condition" });
    }
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Retrieve all emergency contacts
router.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: Retrieve all seizures
router.get("/seizures", async (req, res) => {
  try {
    const seizures = await Seizure.find();
    res.status(200).json(seizures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: Retrieve all medications
router.get("/medications", async (req, res) => {
  try {
    const medications = await Medication.find();
    res.status(200).json(medications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT: Update an emergency contact (using an ID)
router.put("/contacts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT: Update a seizure record (using an ID)
router.put("/seizures/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSeizure = await Seizure.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedSeizure);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT: Update a medication record (using an ID)
router.put("/medications/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMedication = await Medication.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedMedication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE: Remove an emergency contact
router.delete("/contacts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE: Remove a seizure record
router.delete("/seizures/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Seizure.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE: Remove a medication record
router.delete("/medications/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Medication.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
