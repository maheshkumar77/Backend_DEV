const express = require("express");
const authRoutes = require("./routes/auth");
const patientRoutes = require("./routes/patients");
const doctorRoutes = require("./routes/doctors");
const mappingRoutes = require("./routes/mappings");

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/mappings", mappingRoutes);





app.listen(5001, () => {
    console.log("Server is running at http://localhost:5003");
});
