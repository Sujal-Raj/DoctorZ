import dotenv from "dotenv";
dotenv.config();

import path, { dirname, join } from "path";
import { fileURLToPath } from "url";
// import dotenv from "dotenv";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import cors from "cors";
import type { Express } from "express";
import express, { urlencoded } from "express";
const app :Express = express();
// const {createServer} = require("http")
// const {Server} = require("socket.io")
import { createServer } from "http";
import { Server } from "socket.io";
import dbConnect from "./config/dbConfig.js"
import bookingRoutes from "./routes/booking.routes.js";
import patientRoutes from "./routes/patient.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import clinicRoutes from "./routes/clinic.routes.js";
import timeSlotsRoutes from "./routes/timeSlots.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import labRoutes from "./routes/lab.routes.js";
import emrRoutes from "./routes/emr.routes.js";
// dotenv.config();
 dbConnect();
const PORT = 3000;


const server = createServer(app);

app.use(cors({
    origin: "http://localhost:5173",  
    credentials: true,  
}));

const io = new Server(server, {
  cors: {
    origin: "*", // Set your frontend URL here for production
    methods: ["GET", "POST"]
  }
});


// Body parser
app.use(express.json());

app.use(express.urlencoded({ extended: true })); 
app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.url);
  next();
});


const onlineUsers = new Map();

// Interfaces
interface MessageData {
  roomId: string;
  senderId: string;
  message: string;
}

interface ServerToClientEvents {
  receiveMessage: (data: { senderId: string; message: string }) => void;
}

interface ClientToServerEvents {
  register: (userId: string) => void;
  joinRoom: (roomId: string) => void;
  sendMessage: (data: MessageData) => void;
  disconnect: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  userId: string;
}
//@ts-ignore
io.on("connection", (socket: Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>) => {
  console.log("User connected:", socket.id);

  // Step 1: Register user
  socket.on("register", (userId: string) => {
    onlineUsers.set(userId, socket.id);
    console.log(`User ${userId} registered`);
  });

  // Step 2: Join chat room
  socket.on("joinRoom", (roomId: string) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  // Step 3: Send message
  socket.on("sendMessage", (data: MessageData) => {
    const { roomId, senderId, message } = data;
    io.to(roomId).emit("receiveMessage", { senderId, message });
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    for (const [userId, id] of onlineUsers.entries()) {
      if (id === socket.id) onlineUsers.delete(userId);
    }
    console.log("User disconnected:", socket.id);
  });
});

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/admin",adminRoutes)
app.use("/api/patient",patientRoutes)
app.use("/api/clinic",clinicRoutes)
app.use("/api/doctor",doctorRoutes)
app.use("/api/availability",timeSlotsRoutes)
app.use("/api/booking",bookingRoutes)
app.use("/api/lab", labRoutes);
app.use("/api/emr",emrRoutes)

server.listen(PORT,()=>{
    console.log("Server running at " + PORT);
    console.log("Socket also started");

})





