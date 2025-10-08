import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { LabModel, LabTestBookingModel } from "../models/lab.model.js";

const labRegister = async (req: Request, res: Response) => {
  try {
    console.log("Lab Register Request body:", req.body);
    const {
      name,
      email,
      password,
      state,
      address,
      city,
      pincode,
      tests,
      pricing,
      timings,
      status,
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !state ||
      !address ||
      !city ||
      !pincode ||
      !tests ||
      !pricing ||
      !timings
    ) {
      return res.status(400).json({
        message: "Lab Registration Failed",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const lab = new LabModel({
      name,
      email,
      password: hashedPassword,
      state,
      address,
      city,
      pincode,
      tests,
      pricing,
      timings,
      status: "pending",
    });

    await lab.save();

    return res.status(200).json({
      message: "Lab Registered Successfully",
      lab,
    });
  } catch (error) {
    console.error("Lab Register Error:", error);
    return res.status(500).json({
      message: "Lab Register Failed",
    });
  }
};

const labLogin = async (req: Request, res: Response) => {
  try {
     console.log("Login request received:", req.body);
    const {labId, password} = req.body;

    const lab = await LabModel.findOne({ labId });
    if (!lab) {
      return res.status(400).json({
        message: "Lab not found",
      });
    }

    if (lab.status !== "approved") {
      return res.status(403).json({
        message: "Lab not approved yet",
      });
    }

    const isMatch = await bcrypt.compare(password, lab.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: lab._id,
        labId: lab.labId,
        email: lab.email,
        role: "lab",
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login Successful",
      token,
      lab: {
        _id: lab._id,
        labId: lab.labId,
        name: lab.name,
        email: lab.email,
      },
    });
  } catch (error) {
    console.error("Error logging in lab:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


// ------------------ GET ALL LAB TESTS ------------------

const getAllLabTests = async (req: Request, res: Response) => {
  try {
    // Fetch only approved labs
    const labs = await LabModel.find({ status: "approved" });

    // Flatten all tests from all labs
    const allTests = labs.flatMap((lab) =>
      lab.tests.map((t) => ({
        _id: lab._id,
        name: t.name,
        price: t.price,
        labName: lab.name,
        labId: lab.labId,
      }))
    );

    return res.status(200).json(allTests);
  } catch (error) {
    console.error("Error fetching all lab tests:", error);
    return res.status(500).json({ message: "Failed to fetch tests" });
  }
};

// ------------------ BOOK A TEST ------------------
const addTestBooking = async (req: Request, res: Response) => {
  try {
    const { test, patientId } = req.body;
    if (!test || !patientId) {
      return res.status(400).json({ message: "Missing test or patientId" });
    }

    // Find lab by labId (string)
    const lab = await LabModel.findOne({ labId: test.labId });
    if (!lab) return res.status(404).json({ message: "Lab not found" });

    // Create booking
    const booking = new LabTestBookingModel({
      labId: lab._id,
      userId: patientId,
      testName: test.name,
      status: "pending",
    });

    await booking.save();
    return res.status(200).json({ message: "Test booked successfully", booking });
  } catch (error) {
    console.error("Error booking test:", error);
    return res.status(500).json({ message: "Failed to book test" });
  }
};

export default { labRegister, labLogin ,getAllLabTests,addTestBooking };
