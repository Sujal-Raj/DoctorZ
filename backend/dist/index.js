import express, { urlencoded } from "express";
const app = express();
import dbConnect from "./config/dbConfig.js";
import patientRoutes from "./routes/patient.routes.js";
import clinicRoutes from "./routes/clinic.routes.js";
dbConnect();
const PORT = 3000;
app.use(express.json());
app.use("/api/patient", patientRoutes);
app.use("/api/clinic", clinicRoutes);
app.listen(PORT, () => {
    console.log("Server running at " + PORT);
});
//# sourceMappingURL=index.js.map