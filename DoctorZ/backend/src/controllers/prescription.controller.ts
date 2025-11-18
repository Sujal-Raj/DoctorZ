

import type { Request, Response } from "express";

import puppeteer from "puppeteer";
import PrescriptionModel from "../models/prescription.model.js";
import cloudinary from "../config/cloudinary.js";


export const addPrescription = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { bookingId } = req.params;

    const {
      patientAadhar,
      doctorId,
      diagnosis,
      symptoms,
      medicines,
      recommendedTests,
      notes,
      name,
      gender
    } = req.body;
    
    
    if (!doctorId || !patientAadhar || !diagnosis || !medicines) {
      return res.status(400).json({
        message: "doctorId, patientAadhar, diagnosis & medicines are required",
      });
    }
    
    const prescription = await PrescriptionModel.create({
      doctorId,
      patientAadhar,
      bookingId,
      diagnosis,
      symptoms: symptoms || [],
      medicines,
      recommendedTests: recommendedTests || [],
      notes: notes || "",
    });

    // -------------------------
    // STEP 1: Create HTML
    // -------------------------
    const htmlContent = `
      <html>
      <head>
        <style>
          body { font-family: Arial; padding: 20px; }
          h1 { color: #2a4d8f; }
          .section { margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; }
          table, th, td { border: 1px solid black; padding: 8px; }
        </style>
      </head>
      <body>
        <h1>Prescription</h1>
        
        <div class="section">
          <h3>Patient Details</h3>
          <p><strong>Name:</strong> ${name}</p>

          <p><strong>Gender:</strong> ${gender}</p>
           
          <p><strong>Aadhar:</strong> ${patientAadhar}</p>
        
        </div>

        <div class="section">
          <h3>Diagnosis</h3>
          <p>${diagnosis}</p>
        </div>

        <div class="section">
          <h3>Symptoms</h3>
          <ul>
            ${symptoms?.map((s: string) => `<li>${s}</li>`).join("")}
          </ul>
        </div>

        <div class="section">
          <h3>Medicines</h3>
          <table>
            <tr>
              <th>Name</th>
              <th>Dosage</th>
              <th>Quantity</th>
            </tr>
            ${medicines
              ?.map(
                (m: any) =>
                  `
              <tr>
                <td>${m.name}</td>
                <td>${m.dosage}</td>
                <td>${m.quantity || "-"}</td>
              </tr>
            `
              )
              .join("")}
          </table>
        </div>

        <div class="section">
          <h3>Recommended Tests</h3>
          <ul>
            ${(recommendedTests || [])
              .map((t: string) => `<li>${t}</li>`)
              .join("")}
          </ul>
        </div>

        <div class="section">
          <h3>Notes</h3>
          <p>${notes || "None"}</p>
        </div>
      </body>
      </html>
    `;

    // -------------------------
    // STEP 2: Generate PDF (Puppeteer)
    // -------------------------
    const browser = await puppeteer.launch({
      headless: true,
    });
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({ format: "A4" });
    await browser.close();

 
// STEP 3: Upload to Cloudinary 

const cloudResult = await new Promise((resolve, reject) => {
  const uploadStream = cloudinary.uploader.upload_stream(
    {
      resource_type: "raw",
      folder: "prescriptions",
        format: "pdf",   
      public_id: `prescription_${prescription._id}`,
    },
    (error, result) => {
      if (error) {
        console.log("Cloudinary Upload Error:", error);
        reject(error);
      } else {
        resolve(result);
      }
    }
  );

  uploadStream.end(pdfBuffer);
});


// Save URL
prescription.pdfUrl = (cloudResult as any).secure_url;
console.log("Cloudinary Response:", cloudResult);

await prescription.save();

return res.status(201).json({
  message: "Prescription saved with PDF",
  data: prescription,
});


   

  } catch (err) {
    console.error("Prescription Error:", err);
    return res.status(500).json({
      message: "Something went wrong",
      error: err instanceof Error ? err.message : err,
    });
  }
};
