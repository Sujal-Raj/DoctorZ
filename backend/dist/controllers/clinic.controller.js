import bcrypt from "bcryptjs";
import clinicModel from "../models/clinic.model.js";
export const clinicRegister = async (req, res) => {
    try {
        const { clinicName, clinicType, specialties, operatingHours, clinicLicenseNumber, aadharNumber, staffName, staffEmail, staffPassword } = req.body;
        const { state, district, pincode } = req.body.address;
        const { phone, email } = req.body.contact;
        if (!clinicName || !clinicType || !specialties || !clinicLicenseNumber || !aadharNumber) {
            return res.status(400).json(console.log("All required fields must be filled."));
        }
        const hashedPassword = await bcrypt.hash(staffPassword, 10);
        const clinic = new clinicModel({
            clinicName,
            clinicType,
            specialties,
            operatingHours,
            clinicLicenseNumber,
            aadharNumber,
            staffName,
            staffEmail,
            staffPassword: hashedPassword,
            address: {
                state,
                district,
                pincode
            },
            contact: {
                phone,
                email
            }
        });
        await clinic.save();
        return res.status(201).json({
            message: "Clinic Registered"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error,
            message: "Something went wrong"
        });
    }
};
export const updateClinic = async (req, res) => {
    try {
        const { id } = req.params;
        const { clinicName, clinicType, specialties, operatingHours, clinicLicenseNumber, aadharNumber, staffName, staffEmail, staffPassword } = req.body;
        const { state, district, pincode } = req.body.address;
        const { phone, email } = req.body.contact;
        const updateData = {
            clinicName,
            clinicType,
            specialties,
            operatingHours,
            clinicLicenseNumber,
            aadharNumber,
            staffName,
            staffEmail,
            address: { state, district, pincode },
            contact: { phone, email },
        };
        if (staffPassword) {
            updateData.staffPassword = await bcrypt.hash(staffPassword, 10);
        }
        const updatedClinic = await clinicModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedClinic) {
            return res.status(404).json({ message: "Clinic not found" });
        }
        return res.status(200).json({ message: "Clinic updated", clinic: updatedClinic });
    }
    catch (error) {
        return res.json({
            message: "Something went wrong"
        });
    }
};
export const deleteClinic = async (req, res) => {
    try {
        const { id } = req.params;
        await clinicModel.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Clinic deleted successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};
export const searchClinic = async (req, res) => {
    try {
        const { q } = req.query;
        if (typeof q !== "string") {
            return res.status(400).json({ message: "Search query is required" });
        }
        const array = q.split(" ").filter(a => a.trim() !== "");
        const query = {
            $or: array.map(a => ({
                $or: [
                    { clinicName: { $regex: a, $options: "i" } },
                    { specialties: { $regex: a, $options: "i" } }
                ]
            }))
        };
        const clinics = await clinicModel.find(query);
        if (clinics.length === 0) {
            return res.status(404).json({ message: "No clinics found" });
        }
        return res.status(200).json(clinics);
    }
    catch (error) {
        console.error("Error searching clinics:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
export const getAllClinic = async (req, res) => {
    try {
        const clinic = await clinicModel.find();
        return res.status(200).json({
            clinic: clinic,
            message: "successfully fetched all clinic"
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};
//# sourceMappingURL=clinic.controller.js.map