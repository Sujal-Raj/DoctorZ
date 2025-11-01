import EMRModel from "../models/emr.model.js";
import patientModel from "../models/patient.model.js";
import type { Request, Response } from "express";

export const createEMR = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const files = req.files as Express.Multer.File[];

    const { patientId} = body;

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
        ? files.map((f) => `/uploads/reports/${f.filename}`)
        : [];

    // ✅ Create new EMR
    const emr = await EMRModel.create({
      patientId,
     
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
