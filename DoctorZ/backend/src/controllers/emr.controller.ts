import EMRModel from "../models/emr.model.js";
import patientModel from "../models/patient.model.js";
import type { Request, Response } from "express";

export const createEMR = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const files = req.files as Express.Multer.File[];

    const { patientId, doctorId} = body;

    if (!patientId) {
      return res.status(400).json({ message: "Patient ID is required" });
    }

    // Arrays
    const allergies = JSON.parse(body.allergies || "[]");
    const diseases = JSON.parse(body.diseases || "[]");
    const pastSurgeries = JSON.parse(body.pastSurgeries || "[]");
    const currentMedications = JSON.parse(body.currentMedications || "[]");

    const reportUrls =
      files?.length > 0
        ? files.map((f) => `/uploads/${f.filename}`)
        : [];

    // ✅ Create new EMR
    const emr = await EMRModel.create({
      patientId,
      doctorId,
      allergies,
      diseases,
      pastSurgeries,
      currentMedications,
      reports: reportUrls,
    });

    // ✅ Push EMR ID into patient.emr[]
    await patientModel.findByIdAndUpdate(patientId, {
      $push: { emr: emr._id },
    });

    return res.status(201).json({
      message: "EMR created successfully",
      emr,
    });
  } catch (error) {
    console.log("Create EMR Error:", error);
    return res.status(500).json({ message: "Error creating EMR" });
  }
};



export const getEMRByPatientId = async (req: Request, res: Response) => {
  try {
    const { patientId } = req.params;

    if (!patientId) {
      return res.status(400).json({ message: "Patient ID is required" });
    }

    const emrs = await EMRModel.find({ patientId }).sort({ createdAt: -1 });

    if (!emrs || emrs.length === 0) {
      return res.status(404).json({ message: "No EMR records found" });
    }

    return res.status(200).json({
      message: "EMR records fetched successfully",
      data: emrs,
    });
  } catch (error) {
    console.log("Error fetching EMR:", error);
    return res.status(500).json({ message: "Error fetching EMR data" });
  }
};





// ✅ Get EMR by emrId
export const getEMRById = async (req: Request, res: Response) => {
  try {
    const { emrId } = req.params;
    if (!emrId) {
      return res.status(400).json({ message: "EMR ID is required" });
    }

    const emr = await EMRModel.findById(emrId);
    if (!emr) {
      return res.status(404).json({ message: "EMR not found" });
    }

    return res.status(200).json({
      message: "EMR fetched successfully",
      data: emr,
    });
  } catch (error) {
    console.error("Error fetching EMR by ID:", error);
    return res.status(500).json({ message: "Error fetching EMR" });
  }
};
