
import type { Express } from "express";
import express, { urlencoded } from "express";
const app :Express = express();
import dbConnect from "./config/dbConfig.js"
import patientRoutes from "./routes/patient.routes.js";
dbConnect();
const PORT = 3000;

app.use(express.json())

app.use("/api/patient",patientRoutes)

app.listen(PORT,()=>{
    console.log("Server running at " + PORT)
})