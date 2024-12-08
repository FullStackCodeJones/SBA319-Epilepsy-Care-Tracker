//Creating a file to initialze the server and connect to MOngoDb

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
//⬇️This enables CORS(Cross-Origin Resource Sharing Middleware to prevent malicious websites from making requests
// to a different domain than this one).
const cors = require("cors");

// Importing The Patient Routes
const patientRoutes = require("./routes/patientRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware-------------

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//MongoDB Connection-----------
console.log(process.env.MONGO_URI);
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("I Am Connected to MongoDB Atlas!"))
  .catch((error) =>
    console.error("There has been an Error Connecting to MongoDB:", error)
  );

//Default Route-----------

app.get("/", (req, res) => {
  res.send("The Epilepsy Tracker Is Running!");
});

// Use The Patient Routes---------
app.use("/api/patients", patientRoutes);
//This Starts The Server-----------

app.listen(PORT, () => {
  console.log(`Server Is Running on http://localhost:${PORT}`);
});
