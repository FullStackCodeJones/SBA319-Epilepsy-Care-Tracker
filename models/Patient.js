const mongoose = require("mongoose");

//Here I am Defining The Patient Schema-------
const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    default: "",
  },
  medication: {
    type: String,
    required: true,
  },
  doctor: {
    type: String,
    default: "",
  },
});

//Here I am Creating The Model using the defined schema-------

const Patient = mongoose.model("Patient", patientSchema);

//Here I am Exporting the Model for use in other parts of the application-------

module.exports = Patient;
