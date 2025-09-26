import path, { dirname, join } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import cors from "cors";
import type { Express } from "express";
import express, { urlencoded } from "express";
const app :Express = express();
import dbConnect from "./config/dbConfig.js"
import patientRoutes from "./routes/patient.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import clinicRoutes from "./routes/clinic.routes.js";
import timeSlotsRoutes from "./routes/timeSlots.routes.js";
import adminRoutes from "./routes/admin.routes.js";
dbConnect();
const PORT = 3000;

app.use(cors({
    origin: "http://localhost:5173",  
    credentials: true,  
}));


// Body parser
app.use(express.json());
dotenv.config();

app.use(express.urlencoded({ extended: true })); 
app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.url);
  next();
});

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));



app.use("/api/admin",adminRoutes)
app.use("/api/patient",patientRoutes)
app.use("/api/clinic",clinicRoutes)
app.use("/api/doctor",doctorRoutes)
app.use("/api/availability",timeSlotsRoutes)

app.listen(PORT,()=>{
    console.log("Server running at " + PORT)
})