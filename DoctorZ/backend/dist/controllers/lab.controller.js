// import type { Request, Response } from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { LabModel, LabTestBookingModel, TestModel } from "../models/lab.model.js";
// import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { LabModel, LabTestBookingModel, TestModel } from "../models/lab.model.js";
import mongoose from "mongoose";
// ------------------ LAB REGISTER ------------------
const labRegister = async (req, res) => {
    try {
        const { name, email, password, state, address, city, pincode, timings, status, } = req.body;
        if (!name || !email || !password || !state || !address || !city || !pincode || !timings) {
            return res.status(400).json({ message: "Lab Registration Failed" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const lab = new LabModel({
            name, email, password: hashedPassword, state, address, city, pincode, timings, status: "pending"
        });
        await lab.save();
        return res.status(200).json({ message: "Lab Registered Successfully", lab });
    }
    catch (err) {
        console.error("Lab Register Error:", err);
        const errorMessage = err instanceof Error ? err.message : "Lab Register Failed"; // ✅ TS-safe error
        return res.status(500).json({ message: errorMessage });
    }
};
// ------------------ LAB LOGIN ------------------
const labLogin = async (req, res) => {
    try {
        const { labId, password } = req.body;
        const lab = await LabModel.findOne({ labId });
        if (!lab)
            return res.status(400).json({ message: "Lab not found" });
        if (lab.status !== "approved")
            return res.status(403).json({ message: "Lab not approved yet" });
        const isMatch = await bcrypt.compare(password, lab.password);
        if (!isMatch)
            return res.status(401).json({ message: "Invalid credentials" });
        const token = jwt.sign({ id: lab._id, labId: lab.labId, email: lab.email, role: "lab" }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return res.status(200).json({
            message: "Login Successful",
            token,
            lab: { _id: lab._id, labId: lab.labId, name: lab.name, email: lab.email },
        });
    }
    catch (err) {
        console.error("Error logging in lab:", err);
        const errorMessage = err instanceof Error ? err.message : "Server error"; // ✅ TS-safe
        return res.status(500).json({ message: errorMessage });
    }
};
// ------------------ GET ALL LAB TESTS ------------------
const getAllLabTests = async (req, res) => {
    try {
        const approvedLabs = await LabModel.find({ status: "approved" }).select("_id name");
        const approvedLabIds = approvedLabs.map((lab) => lab._id);
        const tests = await TestModel.find({ labId: { $in: approvedLabIds } }).populate("labId", "name").lean();
        const formattedTests = tests.map((test) => ({
            _id: test._id,
            testName: test.testName,
            description: test.description,
            price: test.price,
            precaution: test.precaution,
            category: test.category,
            customCategory: test.customCategory || "",
            labName: test.labId?.name || "Unknown Lab",
            labId: test.labId?._id,
        }));
        return res.status(200).json(formattedTests);
    }
    catch (err) {
        console.error("Error fetching all lab tests:", err);
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch tests"; // ✅ TS-safe
        return res.status(500).json({ message: errorMessage });
    }
};
// ------------------ BOOK A TEST ------------------
const addTestBooking = async (req, res) => {
    try {
        console.log("🧾 Received lab booking:", req.body);
        const { test, patientId } = req.body;
        // ✅ Basic validation
        if (!test || !patientId) {
            return res.status(400).json({ message: "Missing test or patientId" });
        }
        if (!test.labId || !test.name) {
            return res.status(400).json({ message: "Invalid test data — labId and name required" });
        }
        // ✅ Validate ObjectIds
        if (!mongoose.Types.ObjectId.isValid(test.labId)) {
            return res.status(400).json({ message: "Invalid labId" });
        }
        if (!mongoose.Types.ObjectId.isValid(patientId)) {
            return res.status(400).json({ message: "Invalid patientId" });
        }
        // ✅ Find lab by _id
        const lab = await LabModel.findById(test.labId);
        if (!lab) {
            return res.status(404).json({ message: "Lab not found" });
        }
        // ✅ Create booking document
        const booking = await LabTestBookingModel.create({
            labId: lab._id,
            userId: new mongoose.Types.ObjectId(patientId),
            testName: test.name,
            category: test.category || "General",
            price: test.price || 0,
            status: "pending",
            bookedAt: new Date(),
        });
        console.log("✅ Booking saved:", booking);
        return res.status(200).json({
            message: "Test booked successfully",
            booking,
        });
    }
    catch (err) {
        console.error("❌ Error booking test:", err);
        const errorMessage = err instanceof Error ? err.message : "Failed to book test";
        return res.status(500).json({ message: errorMessage });
    }
};
// ------------------ ADD LAB TEST ------------------
const addTest = async (req, res) => {
    try {
        const tests = req.body;
        if (!Array.isArray(tests) || tests.length === 0)
            return res.status(400).json({ message: "No tests provided" });
        for (const test of tests) {
            if (!test.testName || !test.category || !test.price)
                return res.status(400).json({ message: "Missing required fields in one of the tests" });
            if (test.category === "Other" && !test.customCategory)
                return res.status(400).json({ message: "Please provide customCategory for 'Other'" });
        }
        const testsToInsert = tests.map(test => ({
            testName: test.testName,
            description: test.description,
            category: test.category === "Other" ? test.customCategory : test.category,
            precaution: test.precaution,
            price: test.price,
            labId: test.labId
        }));
        const savedTests = await TestModel.insertMany(testsToInsert);
        return res.status(200).json({ message: "Tests Added Successfully", tests: savedTests });
    }
    catch (err) {
        console.error("Error Adding Tests:", err);
        const errorMessage = err instanceof Error ? err.message : "Error Adding Tests";
        return res.status(500).json({ message: errorMessage });
    }
};
// ------------------ GET LAB BY ID ------------------
const getLabById = async (req, res) => {
    try {
        const { labId } = req.params;
        const labDetails = await LabModel.findById(labId);
        if (!labDetails)
            return res.status(404).json({ message: "Lab not found" });
        return res.status(200).json({ labDetails });
    }
    catch (err) {
        console.error(err);
        const errorMessage = err instanceof Error ? err.message : "Server Error"; // ✅ TS-safe
        return res.status(500).json({ message: errorMessage });
    }
};
// ------------------ UPDATE LAB PROFILE ------------------
const updateLabProfile = async (req, res) => {
    try {
        const { labId } = req.params;
        const updateData = req.body;
        if (!labId || !mongoose.Types.ObjectId.isValid(labId))
            return res.status(400).json({ message: "Invalid labId" });
        const updatedLab = await LabModel.findByIdAndUpdate(labId, { $set: updateData }, { new: true, runValidators: true });
        if (!updatedLab)
            return res.status(404).json({ message: "Lab not found" });
        return res.status(200).json({ message: "Lab profile updated successfully", lab: updatedLab });
    }
    catch (err) {
        console.error(err);
        const errorMessage = err instanceof Error ? err.message : "Server Error"; // ✅ TS-safe
        return res.status(500).json({ message: errorMessage });
    }
};
// ------------------ GET ALL TESTS BY LABID ------------------
const getAllTestByLabId = async (req, res) => {
    try {
        const { labId } = req.params;
        const tests = await TestModel.find({ labId });
        if (!tests || tests.length === 0)
            return res.status(404).json({ message: "No tests found for this lab" });
        return res.status(200).json({ message: "Tests retrieved successfully", tests });
    }
    catch (err) {
        console.error(err);
        const errorMessage = err instanceof Error ? err.message : "Server Error"; // ✅ TS-safe
        return res.status(500).json({ message: errorMessage });
    }
};
// ------------------ UPDATE TEST ------------------
const updateLabTest = async (req, res) => {
    try {
        const { testId } = req.params;
        const updateData = req.body;
        const updatedTest = await TestModel.findByIdAndUpdate(testId, updateData, { new: true, runValidators: true });
        if (!updatedTest)
            return res.status(404).json({ message: "Test not found" });
        return res.status(200).json({ message: "Test updated successfully", updatedTest });
    }
    catch (err) {
        console.error("Error updating test:", err);
        const errorMessage = err instanceof Error ? err.message : "Server Error"; // ✅ TS-safe
        return res.status(500).json({ message: errorMessage });
    }
};
// ------------------ DELETE TEST ------------------
const deleteLabTest = async (req, res) => {
    try {
        const { testId } = req.params;
        const deletedTest = await TestModel.findByIdAndDelete(testId);
        if (!deletedTest)
            return res.status(404).json({ message: "Test not found" });
        return res.status(200).json({ message: "Test deleted successfully", deletedTest });
    }
    catch (err) {
        console.error("Error deleting test:", err);
        const errorMessage = err instanceof Error ? err.message : "Server Error"; // ✅ TS-safe
        return res.status(500).json({ message: errorMessage });
    }
};
//-------GET LAB PATIENTS
const getLabPatients = async (req, res) => {
    try {
        const { labId } = req.params;
        const bookings = await LabTestBookingModel.find({ labId })
            .populate("userId", "fullName email") // ✅ populate patient fullName and email
            .lean();
        return res.status(200).json({ labPatients: bookings });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server Error" });
    }
};
// const getLabPatients=async(req:Request,res:Response)=>{
//  try{
//      const {labId}=req.params;
//      const patients=await LabTestBookingModel.find({labId});
//       if (!patients || patients.length === 0) {
//       return res.status(404).json({ message: "No patients found for this lab" });
//     }
//      return res.status(200).json({
//       message:"patients retrieved ",
//       labPatients:patients
//      })
//  }catch(err){
//   console.log(err);
//   return res.status(500).json({
//     message:"Server Error"
//   })
//  }
// }
export default {
    labRegister,
    labLogin,
    addTestBooking,
    addTest,
    getLabById,
    updateLabProfile,
    getAllLabTests,
    getAllTestByLabId,
    deleteLabTest,
    updateLabTest,
    getLabPatients
};
//# sourceMappingURL=lab.controller.js.map