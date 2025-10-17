// import type { Request, Response } from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { LabModel, LabTestBookingModel, TestModel } from "../models/lab.model.js";
// import mongoose from "mongoose";

// const labRegister = async (req: Request, res: Response) => {
//   try {
//     console.log("Lab Register Request body:", req.body);
//     const {
//       name,
//       email,
//       password,
//       state,
//       address,
//       city,
//       pincode,
     
//       timings,
//       status,
//     } = req.body;

//     if (
//       !name ||
//       !email ||
//       !password ||
//       !state ||
//       !address ||
//       !city ||
//       !pincode ||
     
//       !timings
//     ) {
//       return res.status(400).json({
//         message: "Lab Registration Failed",
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const lab = new LabModel({
//       name,
//       email,
//       password: hashedPassword,
//       state,
//       address,
//       city,
//       pincode,
     
//       timings,
//       status: "pending",
//     });

//     await lab.save();

//     return res.status(200).json({
//       message: "Lab Registered Successfully",
//       lab,
//     });
//   } catch (error) {
//     console.error("Lab Register Error:", error);
//     return res.status(500).json({
//       message: "Lab Register Failed",
//     });
//   }
// };

// const labLogin = async (req: Request, res: Response) => {
//   try {
//      console.log("Login request received:", req.body);
//     const {labId, password} = req.body;

//     const lab = await LabModel.findOne({ labId });
//     if (!lab) {
//       return res.status(400).json({
//         message: "Lab not found",
//       });
//     }

//     if (lab.status !== "approved") {
//       return res.status(403).json({
//         message: "Lab not approved yet",
//       });
//     }

//     const isMatch = await bcrypt.compare(password, lab.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       {
//         id: lab._id,
//         labId: lab.labId,
//         email: lab.email,
//         role: "lab",
//       },
//       process.env.JWT_SECRET as string,
//       { expiresIn: "7d" }
//     );

//     return res.status(200).json({
//       message: "Login Successful",
//       token,
//       lab: {
//         _id: lab._id,
//         labId: lab.labId,
//         name: lab.name,
//         email: lab.email,
//       },
//     });
//   } catch (error) {
//     console.error("Error logging in lab:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };






// // ------------------ GET ALL LAB TESTS ------------------
// const getAllLabTests = async (req: Request, res: Response) => {
//   try {
//     // ✅ Find all approved labs first
//     const approvedLabs = await LabModel.find({ status: "approved" }).select("_id name");

//     // ✅ Get the list of approved lab IDs
//     const approvedLabIds = approvedLabs.map((lab) => lab._id);

//     // ✅ Fetch all tests that belong to approved labs
//     const tests = await TestModel.find({ labId: { $in: approvedLabIds } })
//       .populate("labId", "name") // only populate lab name
//       .lean();

//     // ✅ Format the data before sending
//     const formattedTests = tests.map((test) => ({
//       _id: test._id,
//       testName: test.testName,
//       description: test.description,
//       price: test.price,
//       precaution: test.precaution,
//       category: test.category,
//       customCategory: test.customCategory || "",
//       labName: (test.labId as any)?.name || "Unknown Lab",
//       labId: (test.labId as any)?._id,
//     }));

//     return res.status(200).json(formattedTests);
//   } catch (error) {
//     console.error("Error fetching all lab tests:", error);
//     return res.status(500).json({ message: "Failed to fetch tests" });
//   }
// };

// // ------------------ BOOK A TEST ------------------
// const addTestBooking = async (req: Request, res: Response) => {
//   try {
//     const { test: testId, patientId } = req.body;

//     if (!testId || !patientId) {
//       return res.status(400).json({ message: "Missing test or patientId" });
//     }

//     // Find the Test first
//     const testDoc = await TestModel.findById(testId);
//     if (!testDoc) return res.status(404).json({ message: "Test not found" });

//     // Find the Lab using labId from the test
//     const lab = await LabModel.findById(testDoc.labId);
//     if (!lab) return res.status(404).json({ message: "Lab not found" });

//     // Create booking
//     const booking = new LabTestBookingModel({
//       labId: lab._id,
//       userId: patientId,
//       testName: testDoc.testName,
//       status: "pending",
//     });

//     await booking.save();
//     return res.status(200).json({ message: "Test booked successfully", booking });
//   } catch (error) {
//     console.error("Error booking test:", error);
//     return res.status(500).json({ message: "Failed to book test" });
//   }
// };


// //-------GET LAB PATIENTS

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


// //-------add Test--------
// const addTest = async (req: Request, res: Response) => {
//   try {
//     const tests = req.body;
//     if (!Array.isArray(tests) || tests.length === 0)
//       return res.status(400).json({ message: "No tests provided" });

//     for (const test of tests) {
//       if (!test.testName || !test.category || !test.price)
//         return res.status(400).json({ message: "Missing required fields in one of the tests" });

//       if (test.category === "Other" && !test.customCategory)
//         return res.status(400).json({ message: "Please provide customCategory for 'Other'" });
//     }

//     const testsToInsert = tests.map(test => ({
//       testName: test.testName,
//       description: test.description,
//       category: test.category === "Other" ? test.customCategory : test.category,
//       precaution: test.precaution,
//       price: test.price,
//       labId: test.labId
//     }));

//     const savedTests = await TestModel.insertMany(testsToInsert);

//     return res.status(200).json({ message: "Tests Added Successfully", tests: savedTests });
//   } catch (err: unknown) {
//     console.error("Error Adding Tests:", err);
//     const errorMessage = err instanceof Error ? err.message : "Error Adding Tests";
//     return res.status(500).json({ message: errorMessage });
//   }
// };

// //-------Get Lab Data BY LabID------
// const getLabById = async (req: Request, res: Response) => {
//   try {
//     const { labId } = req.params;
//     console.log(labId);
    
//     const labDetails = await LabModel.findById(labId);

//     if (!labDetails) {
//       return res.status(404).json({ message: "Lab not found" });
//     }

//     return res.status(200).json({ labDetails });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Server Error" });
//   }
// };


// //-------UPDATE LAB PROFILE-----


// const updateLabProfile = async (req: Request, res: Response) => {
//   try {
//     const { labId } = req.params;
//     const updateData = req.body;

//     // Validate labId
//     if (!labId || !mongoose.Types.ObjectId.isValid(labId)) {
//       return res.status(400).json({ message: "Invalid labId" });
//     }

    
    
    
//     const updatedLab = await LabModel.findByIdAndUpdate(
//       labId,
//       { $set: updateData },
//       { new: true, runValidators: true } // return the updated document & validate
//     );

//     if (!updatedLab) {
//       return res.status(404).json({ message: "Lab not found" });
//     }

//     return res.status(200).json({
//       message: "Lab profile updated successfully",
//       lab: updatedLab,
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Server Error" });
//   }
// };



// //------GET ALL LAB TEST BY LABID-------

// const getAllTestByLabId = async (req: Request, res: Response) => {
//   try {
//     const { labId } = req.params;

//     const tests = await TestModel.find({ labId }); // ✅ filter by labId field

//     if (!tests || tests.length === 0) {
//       return res.status(404).json({ message: "No tests found for this lab" });
//     }

//     return res.status(200).json({
//       message: "Tests retrieved successfully",
//       testData: tests
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Server Error" });
//   }
// };

// const updateLabTest = async (req: Request, res: Response) => {
//   try {
//     const { testId } = req.params; // Test ID from URL
//     const updateData = req.body;   // Updated fields (testName, price, etc.)

//     // Find and update test by ID
//     const updatedTest = await TestModel.findByIdAndUpdate(
//       testId,
//       updateData,
//       { new: true, runValidators: true } // Return updated doc and validate
//     );

//     if (!updatedTest) {
//       return res.status(404).json({ message: "Test not found" });
//     }

//     return res.status(200).json({
//       message: "Test updated successfully",
//       updatedTest,
//     });
//   } catch (err) {
//     console.error("Error updating test:", err);
//     return res.status(500).json({
//       message: "Server Error",
//     });
//   }
// };

// //-----Delete Lab test-------------

// const deleteLabTest = async (req: Request, res: Response) => {
//   try {
//     const { testId } = req.params; // testId from URL

  
//     const deletedTest = await TestModel.findByIdAndDelete(testId);

//     if (!deletedTest) {
//       return res.status(404).json({ message: "Test not found" });
//     }

//     return res.status(200).json({
//       message: "Test deleted successfully",
//       deletedTest,
//     });
//   } catch (err) {
//     console.error("Error deleting test:", err);
//     return res.status(500).json({ message: "Server Error" });
//   }
// };





// export default { labRegister, labLogin ,addTestBooking,addTest,getLabById,updateLabProfile,getAllLabTests,getAllTestByLabId,deleteLabTest,updateLabTest,getLabPatients };

// import type { Request, Response } from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { LabModel, LabTestBookingModel, TestModel } from "../models/lab.model.js";
// import mongoose from "mongoose";
// export type TestCategory =
//   | "Liver"
//   | "Kidney"
//   | "Diabetes"
//   | "Fever"
//   | "Vitamin"
//   | "Pregnancy"
//   | "Heart"
//   | "Other";

// export interface Test {
//   testName: string;
//   price: number;
//   description:string,
//   precaution:string,
//     category: TestCategory;
//   customCategory?: string;
//   labId: mongoose.Types.ObjectId;           
// }

// // ------------------ LAB REGISTER ------------------
// const labRegister = async (req: Request, res: Response) => {
//   try {
//     const {
//       name, email, password, state, address, city, pincode, timings, status,
//     } = req.body;

//     if (!name || !email || !password || !state || !address || !city || !pincode || !timings) {
//       return res.status(400).json({ message: "Lab Registration Failed" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const lab = new LabModel({
//       name, email, password: hashedPassword, state, address, city, pincode, timings, status: "pending"
//     });

//     await lab.save();

//     return res.status(200).json({ message: "Lab Registered Successfully", lab });
//   } catch (err: unknown) {
//     console.error("Lab Register Error:", err);
//     const errorMessage = err instanceof Error ? err.message : "Lab Register Failed"; // ✅ TS-safe error
//     return res.status(500).json({ message: errorMessage });
//   }
// };

// // ------------------ LAB LOGIN ------------------
// const labLogin = async (req: Request, res: Response) => {
//   try {
//     const { labId, password } = req.body;
//     const lab = await LabModel.findOne({ labId });

//     if (!lab) return res.status(400).json({ message: "Lab not found" });
//     if (lab.status !== "approved") return res.status(403).json({ message: "Lab not approved yet" });

//     const isMatch = await bcrypt.compare(password, lab.password);
//     if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ id: lab._id, labId: lab.labId, email: lab.email, role: "lab" }, process.env.JWT_SECRET as string, { expiresIn: "7d" });

//     return res.status(200).json({
//       message: "Login Successful",
//       token,
//       lab: { _id: lab._id, labId: lab.labId, name: lab.name, email: lab.email },
//     });
//   } catch (err: unknown) {
//     console.error("Error logging in lab:", err);
//     const errorMessage = err instanceof Error ? err.message : "Server error"; // ✅ TS-safe
//     return res.status(500).json({ message: errorMessage });
//   }
// };

// // ------------------ GET ALL LAB TESTS ------------------
// const getAllLabTests = async (req: Request, res: Response) => {
//   try {
//     const approvedLabs = await LabModel.find({ status: "approved" }).select("_id name");
//     const approvedLabIds = approvedLabs.map((lab) => lab._id);
//     const tests = await TestModel.find({ labId: { $in: approvedLabIds } }).populate("labId", "name").lean();

//     const formattedTests = tests.map((test) => ({
//       _id: test._id,
//       testName: test.testName,
//       description: test.description,
//       price: test.price,
//       precaution: test.precaution,
//       category: test.category,
//       customCategory: test.customCategory || "",
//       labName: (test.labId as any)?.name || "Unknown Lab",
//       labId: (test.labId as any)?._id,
//     }));

//     return res.status(200).json(formattedTests);
//   } catch (err: unknown) {
//     console.error("Error fetching all lab tests:", err);
//     const errorMessage = err instanceof Error ? err.message : "Failed to fetch tests"; // ✅ TS-safe
//     return res.status(500).json({ message: errorMessage });
//   }
// };

// // ------------------ BOOK A TEST ------------------

// const addTestBooking = async (req: Request, res: Response) => {
//   try {
//     console.log("🧾 Received lab booking:", req.body);

//     const { test, patientId } = req.body;

//     // ✅ Basic validation
//     if (!test || !patientId) {
//       return res.status(400).json({ message: "Missing test or patientId" });
//     }

//     if (!test.labId || !test.name) {
//       return res.status(400).json({ message: "Invalid test data — labId and name required" });
//     }

//     // ✅ Validate ObjectIds
//     if (!mongoose.Types.ObjectId.isValid(test.labId)) {
//       return res.status(400).json({ message: "Invalid labId" });
//     }

//     if (!mongoose.Types.ObjectId.isValid(patientId)) {
//       return res.status(400).json({ message: "Invalid patientId" });
//     }

//     // ✅ Find lab by _id
//     const lab = await LabModel.findById(test.labId);
//     if (!lab) {
//       return res.status(404).json({ message: "Lab not found" });
//     }

//     // ✅ Create booking document
//     const booking = await LabTestBookingModel.create({
//       labId: lab._id,
//       userId: new mongoose.Types.ObjectId(patientId),
//       testName: test.name,
//       category: test.category || "General",
//       price: test.price || 0,
//       status: "pending",
//       bookedAt: new Date(),
//     });

//     console.log("✅ Booking saved:", booking);

//     return res.status(200).json({
//       message: "Test booked successfully",
//       booking,
//     });
//   } catch (err: unknown) {
//     console.error("❌ Error booking test:", err);
//     const errorMessage = err instanceof Error ? err.message : "Failed to book test";
//     return res.status(500).json({ message: errorMessage });
//   }
// };

// // ------------------ ADD LAB TEST ------------------

// const addTest = async (req: Request, res: Response) => {
//   try {
//     const tests = req.body;
//     if (!Array.isArray(tests) || tests.length === 0)
//       return res.status(400).json({ message: "No tests provided" });

//     for (const test of tests) {
//       if (!test.testName || !test.category || !test.price)
//         return res.status(400).json({ message: "Missing required fields in one of the tests" });

//       if (test.category === "Other" && !test.customCategory)
//         return res.status(400).json({ message: "Please provide customCategory for 'Other'" });
//     }

//     const testsToInsert = tests.map(test => ({
//       testName: test.testName,
//       description: test.description,
//       category: test.category === "Other" ? test.customCategory : test.category,
//       precaution: test.precaution,
//       price: test.price,
//       labId: test.labId
//     }));

//     const savedTests = await TestModel.insertMany(testsToInsert);

//     return res.status(200).json({ message: "Tests Added Successfully", tests: savedTests });
//   } catch (err: unknown) {
//     console.error("Error Adding Tests:", err);
//     const errorMessage = err instanceof Error ? err.message : "Error Adding Tests";
//     return res.status(500).json({ message: errorMessage });
//   }
// };


// // ------------------ GET LAB BY ID ------------------
// const getLabById = async (req: Request, res: Response) => {
//   try {
//     const { labId } = req.params;
//     const labDetails = await LabModel.findById(labId);

//     if (!labDetails) return res.status(404).json({ message: "Lab not found" });
//     return res.status(200).json({ labDetails });
//   } catch (err: unknown) {
//     console.error(err);
//     const errorMessage = err instanceof Error ? err.message : "Server Error"; // ✅ TS-safe
//     return res.status(500).json({ message: errorMessage });
//   }
// };

// // ------------------ UPDATE LAB PROFILE ------------------
// const updateLabProfile = async (req: Request, res: Response) => {
//   try {
//     const { labId } = req.params;
//     const updateData = req.body;

//     if (!labId || !mongoose.Types.ObjectId.isValid(labId)) return res.status(400).json({ message: "Invalid labId" });

//     const updatedLab = await LabModel.findByIdAndUpdate(labId, { $set: updateData }, { new: true, runValidators: true });

//     if (!updatedLab) return res.status(404).json({ message: "Lab not found" });
//     return res.status(200).json({ message: "Lab profile updated successfully", lab: updatedLab });
//   } catch (err: unknown) {
//     console.error(err);
//     const errorMessage = err instanceof Error ? err.message : "Server Error"; // ✅ TS-safe
//     return res.status(500).json({ message: errorMessage });
//   }
// };

// // ------------------ GET ALL TESTS BY LABID ------------------
// const getAllTestByLabId = async (req: Request, res: Response) => {
//   try {
//     const { labId } = req.params;
//     const tests = await TestModel.find({ labId });

//     if (!tests || tests.length === 0) return res.status(404).json({ message: "No tests found for this lab" });
//     return res.status(200).json({ message: "Tests retrieved successfully",  tests });
//   } catch (err: unknown) {
//     console.error(err);
//     const errorMessage = err instanceof Error ? err.message : "Server Error"; // ✅ TS-safe
//     return res.status(500).json({ message: errorMessage });
//   }
// };

// // ------------------ UPDATE TEST ------------------
// const updateLabTest = async (req: Request, res: Response) => {
//   try {
//     const { testId } = req.params;
//     const updateData = req.body;

//     const updatedTest = await TestModel.findByIdAndUpdate(testId, updateData, { new: true, runValidators: true });
//     if (!updatedTest) return res.status(404).json({ message: "Test not found" });

//     return res.status(200).json({ message: "Test updated successfully", updatedTest });
//   } catch (err: unknown) {
//     console.error("Error updating test:", err);
//     const errorMessage = err instanceof Error ? err.message : "Server Error"; // ✅ TS-safe
//     return res.status(500).json({ message: errorMessage });
//   }
// };

// // ------------------ DELETE TEST ------------------
// const deleteLabTest = async (req: Request, res: Response) => {
//   try {
//     const { testId } = req.params;
//     const deletedTest = await TestModel.findByIdAndDelete(testId);

//     if (!deletedTest) return res.status(404).json({ message: "Test not found" });
//     return res.status(200).json({ message: "Test deleted successfully", deletedTest });
//   } catch (err: unknown) {
//     console.error("Error deleting test:", err);
//     const errorMessage = err instanceof Error ? err.message : "Server Error"; // ✅ TS-safe
//     return res.status(500).json({ message: errorMessage });
//   }
// };

// //-------GET LAB PATIENTS

// const getLabPatients = async (req: Request, res: Response) => {
//   try {
//     const { labId } = req.params;

//     const bookings = await LabTestBookingModel.find({ labId })
//       .populate("userId", "fullName email") // ✅ populate patient fullName and email
//       .lean();

//     return res.status(200).json({ labPatients: bookings });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Server Error" });
//   }
// };

// // const getLabPatients=async(req:Request,res:Response)=>{
// //  try{
// //      const {labId}=req.params;
// //      const patients=await LabTestBookingModel.find({labId});
// //       if (!patients || patients.length === 0) {
// //       return res.status(404).json({ message: "No patients found for this lab" });
// //     }
// //      return res.status(200).json({
// //       message:"patients retrieved ",
// //       labPatients:patients
// //      })
// //  }catch(err){
// //   console.log(err);
// //   return res.status(500).json({
// //     message:"Server Error"
// //   })

// //  }
// // }

// export default {
//   labRegister,
//   labLogin,
//   addTestBooking,
//   addTest,
//   getLabById,
//   updateLabProfile,
//   getAllLabTests,
//   getAllTestByLabId,
//   deleteLabTest,
//   updateLabTest,
//   getLabPatients
// };

///////////////////// Manish Works ///////////////////////


import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { LabModel, LabTestBookingModel, TestModel, LabPackageModel } from "../models/lab.model.js";

// ------------------ LAB REGISTER ------------------
const labRegister = async (req: Request, res: Response) => {
  try {
    const { name, email, password, state, address, city, pincode, timings } = req.body;

    if (!name || !email || !password || !state || !address || !city || !pincode || !timings) {
      return res.status(400).json({ message: "Lab Registration Failed" });
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
      timings,
      status: "pending",
    });

    await lab.save();

    return res.status(200).json({ message: "Lab Registered Successfully", lab });
  } catch (err: unknown) {
    console.error("Lab Register Error:", err);
    const errorMessage = err instanceof Error ? err.message : "Lab Register Failed";
    return res.status(500).json({ message: errorMessage });
  }
};

// ------------------ LAB LOGIN ------------------
const labLogin = async (req: Request, res: Response) => {
  try {
    const { labId, password } = req.body;
    const lab = await LabModel.findOne({ labId });

    if (!lab) return res.status(400).json({ message: "Lab not found" });
    if (lab.status !== "approved") return res.status(403).json({ message: "Lab not approved yet" });

    const isMatch = await bcrypt.compare(password, lab.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: lab._id, labId: lab.labId, email: lab.email, role: "lab" },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login Successful",
      token,
      lab: { _id: lab._id, labId: lab.labId, name: lab.name, email: lab.email },
    });
  } catch (err: unknown) {
    console.error("Error logging in lab:", err);
    const errorMessage = err instanceof Error ? err.message : "Server error";
    return res.status(500).json({ message: errorMessage });
  }
};

// ------------------ GET ALL LAB TESTS ------------------
const getAllLabTests = async (req: Request, res: Response) => {
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
      labName: (test.labId as any)?.name || "Unknown Lab",
      labId: (test.labId as any)?._id,
    }));

    return res.status(200).json(formattedTests);
  } catch (err: unknown) {
    console.error("Error fetching all lab tests:", err);
    const errorMessage = err instanceof Error ? err.message : "Failed to fetch tests";
    return res.status(500).json({ message: errorMessage });
  }
};

// ------------------ BOOK A TEST ------------------
const addTestBooking = async (req: Request, res: Response) => {
  try {
    const { test, patientId } = req.body;

    if (!test || !patientId) {
      return res.status(400).json({ message: "Missing test or patientId" });
    }

    if (!test.labId || !test.name) {
      return res.status(400).json({ message: "Invalid test data" });
    }

    const lab = await LabModel.findById(test.labId);
    if (!lab) return res.status(404).json({ message: "Lab not found" });

    const booking = await LabTestBookingModel.create({
      labId: lab._id,
      userId: new mongoose.Types.ObjectId(patientId),
      testName: test.name,
      category: test.category || "General",
      price: test.price || 0,
      status: "pending",
      bookedAt: new Date(),
    });

    return res.status(200).json({ message: "Test booked successfully", booking });
  } catch (err: unknown) {
    console.error("Error booking test:", err);
    const errorMessage = err instanceof Error ? err.message : "Failed to book test";
    return res.status(500).json({ message: errorMessage });
  }
};

// ------------------ ADD LAB TEST ------------------
const addTest = async (req: Request, res: Response) => {
  try {
    const tests = req.body;
    if (!Array.isArray(tests) || tests.length === 0)
      return res.status(400).json({ message: "No tests provided" });

    const testsToInsert = tests.map((test) => ({
      testName: test.testName,
      description: test.description,
      category: test.category === "Other" ? test.customCategory : test.category,
      precaution: test.precaution,
      price: test.price,
      labId: test.labId,
    }));

    const savedTests = await TestModel.insertMany(testsToInsert);

    return res.status(200).json({ message: "Tests Added Successfully", tests: savedTests });
  } catch (err: unknown) {
    console.error("Error Adding Tests:", err);
    const errorMessage = err instanceof Error ? err.message : "Error Adding Tests";
    return res.status(500).json({ message: errorMessage });
  }
};

// ------------------ GET LAB BY ID ------------------
const getLabById = async (req: Request, res: Response) => {
  try {
    const { labId } = req.params;
    const labDetails = await LabModel.findById(labId);

    if (!labDetails) return res.status(404).json({ message: "Lab not found" });
    return res.status(200).json({ labDetails });
  } catch (err: unknown) {
    console.error(err);
    const errorMessage = err instanceof Error ? err.message : "Server Error";
    return res.status(500).json({ message: errorMessage });
  }
};

// ------------------ UPDATE LAB PROFILE ------------------
const updateLabProfile = async (req: Request, res: Response) => {
  try {
    const { labId } = req.params;
    const updateData = req.body;

    const updatedLab = await LabModel.findByIdAndUpdate(labId, { $set: updateData }, { new: true });
    if (!updatedLab) return res.status(404).json({ message: "Lab not found" });

    return res.status(200).json({ message: "Lab profile updated successfully", lab: updatedLab });
  } catch (err: unknown) {
    console.error(err);
    const errorMessage = err instanceof Error ? err.message : "Server Error";
    return res.status(500).json({ message: errorMessage });
  }
};

// ------------------ GET ALL TESTS BY LABID ------------------
const getAllTestByLabId = async (req: Request, res: Response) => {
  try {
    const { labId } = req.params;
    const tests = await TestModel.find({ labId });

    if (!tests || tests.length === 0) return res.status(404).json({ message: "No tests found" });
    return res.status(200).json({ tests });
  } catch (err: unknown) {
    console.error(err);
    const errorMessage = err instanceof Error ? err.message : "Server Error";
    return res.status(500).json({ message: errorMessage });
  }
};

// ------------------ UPDATE TEST ------------------
const updateLabTest = async (req: Request, res: Response) => {
  try {
    const { testId } = req.params;
    const updateData = req.body;

    const updatedTest = await TestModel.findByIdAndUpdate(testId, updateData, { new: true });
    if (!updatedTest) return res.status(404).json({ message: "Test not found" });

    return res.status(200).json({ message: "Test updated successfully", updatedTest });
  } catch (err: unknown) {
    console.error("Error updating test:", err);
    const errorMessage = err instanceof Error ? err.message : "Server Error";
    return res.status(500).json({ message: errorMessage });
  }
};

// ------------------ DELETE TEST ------------------
const deleteLabTest = async (req: Request, res: Response) => {
  try {
    const { testId } = req.params;
    const deletedTest = await TestModel.findByIdAndDelete(testId);

    if (!deletedTest) return res.status(404).json({ message: "Test not found" });
    return res.status(200).json({ message: "Test deleted successfully", deletedTest });
  } catch (err: unknown) {
    console.error("Error deleting test:", err);
    const errorMessage = err instanceof Error ? err.message : "Server Error";
    return res.status(500).json({ message: errorMessage });
  }
};

// ------------------ GET LAB PATIENTS ------------------
const getLabPatients = async (req: Request, res: Response) => {
  try {
    const { labId } = req.params;
    const bookings = await LabTestBookingModel.find({ labId })
      .populate("userId", "fullName email")
      .lean();

    return res.status(200).json({ labPatients: bookings });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// ------------------ PACKAGE MANAGEMENT ------------------

// ✅ Add new package
const addLabPackage = async (req: Request, res: Response) => {
  try {
    const { labId, packageName, description, testIds, totalPrice } = req.body;

    if (!labId || !packageName || !Array.isArray(testIds) || testIds.length === 0 || !totalPrice) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const lab = await LabModel.findById(labId);
    if (!lab) return res.status(404).json({ message: "Lab not found" });

    const validTests = await TestModel.find({ _id: { $in: testIds }, labId });
    if (validTests.length !== testIds.length)
      return res.status(400).json({ message: "Some tests are invalid or not owned by this lab" });

    const newPackage = new LabPackageModel({
      packageName,
      description,
      labId,
      tests: testIds,
      totalPrice,
    });

    await newPackage.save();
    return res.status(200).json({ message: "Package created successfully", package: newPackage });
  } catch (err: unknown) {
    console.error("Error adding package:", err);
    const errorMessage = err instanceof Error ? err.message : "Failed to add package";
    return res.status(500).json({ message: errorMessage });
  }
};

// ✅ Get all packages by labId
const getAllPackagesByLabId = async (req: Request, res: Response) => {
  try {
    const { labId } = req.params;
    const packages = await LabPackageModel.find({ labId })
      .populate("tests", "testName price category")
      .lean();

    return res.status(200).json({ message: "Packages retrieved", packages });
  } catch (err: unknown) {
    console.error("Error fetching packages:", err);
    const errorMessage = err instanceof Error ? err.message : "Failed to fetch packages";
    return res.status(500).json({ message: errorMessage });
  }
};

// ✅ Update a package
const updateLabPackage = async (req: Request, res: Response) => {
  try {
    const { packageId } = req.params;
    const { packageName, description, testIds, totalPrice } = req.body;

    const updatedPackage = await LabPackageModel.findByIdAndUpdate(
      packageId,
      { packageName, description, tests: testIds, totalPrice },
      { new: true }
    );

    if (!updatedPackage) return res.status(404).json({ message: "Package not found" });
    return res.status(200).json({ message: "Package updated successfully", package: updatedPackage });
  } catch (err: unknown) {
    console.error("Error updating package:", err);
    const errorMessage = err instanceof Error ? err.message : "Failed to update package";
    return res.status(500).json({ message: errorMessage });
  }
};

// ✅ Delete a package
const deleteLabPackage = async (req: Request, res: Response) => {
  try {
    const { packageId } = req.params;
    const deletedPackage = await LabPackageModel.findByIdAndDelete(packageId);

    if (!deletedPackage) return res.status(404).json({ message: "Package not found" });
    return res.status(200).json({ message: "Package deleted successfully" });
  } catch (err: unknown) {
    console.error("Error deleting package:", err);
    const errorMessage = err instanceof Error ? err.message : "Failed to delete package";
    return res.status(500).json({ message: errorMessage });
  }
};
// ✅ Get all available packages (from approved labs)
const getAllPackages = async (req: Request, res: Response) => {
  try {
    // Fetch only approved labs
    const approvedLabs = await LabModel.find({ status: "approved" }).select("_id name city state");
    const approvedLabIds = approvedLabs.map((lab) => lab._id);

    // Fetch all packages from approved labs
    const packages = await LabPackageModel.find({ labId: { $in: approvedLabIds } })
      .populate("labId", "name city state")
      .populate("tests", "testName price category")
      .lean();

    const formattedPackages = packages.map((pkg) => ({
      _id: pkg._id,
      packageName: pkg.packageName,
      description: pkg.description,
      totalPrice: pkg.totalPrice,
      tests: pkg.tests,
      lab: pkg.labId
        ? {
            name: (pkg.labId as any).name,
            city: (pkg.labId as any).city,
            state: (pkg.labId as any).state,
          }
        : null,
    }));

    return res.status(200).json({
      message: "All available packages retrieved successfully",
      packages: formattedPackages,
    });
  } catch (err: unknown) {
    console.error("Error fetching all packages:", err);
    const errorMessage = err instanceof Error ? err.message : "Failed to fetch packages";
    return res.status(500).json({ message: errorMessage });
  }
};



// ------------------ EXPORTS ------------------
export default {
  labRegister,
  labLogin,
  getAllLabTests,
  addTest,
  addTestBooking,
  getLabById,
  updateLabProfile,
  getAllTestByLabId,
  updateLabTest,
  deleteLabTest,
  getLabPatients,
  addLabPackage,
  getAllPackagesByLabId,
  getAllPackages,
  updateLabPackage,
  deleteLabPackage,
};










