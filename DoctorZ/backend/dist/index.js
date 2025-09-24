import path, { dirname, join } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import cors from "cors";
import express, { urlencoded } from "express";
const app = express();
import dbConnect from "./config/dbConfig.js";
import patientRoutes from "./routes/patient.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import clinicRoutes from "./routes/clinic.routes.js";
dbConnect();
const PORT = 3000;
app.use(cors());
// Body parser
app.use(express.json());
dotenv.config();
console.log("MAIL_USER:", process.env.MAIL_USER);
console.log("MAIL_PASS:", process.env.MAIL_PASS ? "Loaded ✅" : "Missing ❌");
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log('Incoming request:', req.method, req.url);
    next();
});
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/patient", patientRoutes);
app.use("/api/clinic", clinicRoutes);
app.use("/api/doctor", doctorRoutes);
app.listen(PORT, () => {
    console.log("Server running at " + PORT);
});
//# sourceMappingURL=index.js.map