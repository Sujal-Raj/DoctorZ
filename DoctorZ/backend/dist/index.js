// import path, { dirname, join } from "path";
// import { fileURLToPath } from "url";
// import dotenv from "dotenv";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// import cors from "cors";
// import type { Express } from "express";
// import express, { urlencoded } from "express";
// const app :Express = express();
// import dbConnect from "./config/dbConfig.js"
// import bookingRoutes from "./routes/booking.routes.js";
// import patientRoutes from "./routes/patient.routes.js";
// import doctorRoutes from "./routes/doctor.routes.js";
// import clinicRoutes from "./routes/clinic.routes.js";
// import timeSlotsRoutes from "./routes/timeSlots.routes.js";
// import adminRoutes from "./routes/admin.routes.js";
// import labRoutes from "./routes/lab.routes.js";
// import emrRoutes from "./routes/emr.routes.js";
// dbConnect();
// const PORT = 3000;
// app.use(cors({
//     origin: "http://localhost:5173",  
//     credentials: true,  
// }));
// // Body parser
// app.use(express.json());
// dotenv.config();
// app.use(express.urlencoded({ extended: true })); 
// app.use((req, res, next) => {
//   console.log('Incoming request:', req.method, req.url);
//   next();
// });
// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
// app.use("/api/admin",adminRoutes)
// app.use("/api/patient",patientRoutes)
// app.use("/api/clinic",clinicRoutes)
// app.use("/api/doctor",doctorRoutes)
// app.use("/api/availability",timeSlotsRoutes)
// app.use("/api/booking",bookingRoutes)
// app.use("/api/lab", labRoutes);
// app.use("/api/emr",emrRoutes)
// app.listen(PORT,()=>{
//     console.log("Server running at " + PORT)
// })
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from "cors";
import express, {} from "express";
import dbConnect from "./config/dbConfig.js";
import bookingRoutes from "./routes/booking.routes.js";
import patientRoutes from "./routes/patient.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import clinicRoutes from "./routes/clinic.routes.js";
import timeSlotsRoutes from "./routes/timeSlots.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import labRoutes from "./routes/lab.routes.js";
import emrRoutes from "./routes/emr.routes.js";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;
// ✅ Connect to DB
dbConnect();
// ✅ Middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ✅ Log incoming requests
app.use((req, res, next) => {
    console.log("Incoming request:", req.method, req.url);
    next();
});
// ✅ Serve uploaded files from backend/uploads
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
console.log("Serving uploads from:", path.join(__dirname, "../uploads"));
// ✅ API Routes
app.use("/api/admin", adminRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/clinic", clinicRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/availability", timeSlotsRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/lab", labRoutes);
app.use("/api/emr", emrRoutes);
// ✅ Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map