// import express from "express"
// import { clinicLogin, clinicRegister, deleteClinic, getAllClinic, getClinicById, searchClinicAndDoctor, updateClinic, getAllClinicPatients } from "../controllers/clinic.controller.js";
// import { upload } from "../middlewares/upload.js";
// const router=express.Router();
// // Route with single file upload
// router.post("/register", upload.single("registrationCert"), clinicRegister);
// router.put("/update/:id",updateClinic);
// router.delete("/delete/:id",deleteClinic);
// router.get("/search",searchClinicAndDoctor);                                                                                                                        
// router.get("/getClinic",getAllClinic);
// router.post("/clinicLogin",clinicLogin);
// router.get("/getClinicById/:id",getClinicById);
// router.get("/getAllClinicPatients/:clinicId",getAllClinicPatients);
// export default router;
import express from "express";
import { clinicLogin, clinicRegister, deleteClinic, getAllClinic, getClinicById, searchClinicAndDoctor, updateClinic, getAllClinicPatients, getClinicStatus } from "../controllers/clinic.controller.js";
import { upload } from "../middlewares/upload.js";
const router = express.Router();
// Route with single file upload
router.post("/register", upload.single("registrationCert"), clinicRegister);
router.put("/update/:id", updateClinic);
router.delete("/delete/:id", deleteClinic);
router.get("/search", searchClinicAndDoctor);
router.get("/getClinic", getAllClinic);
router.post("/clinicLogin", clinicLogin);
router.get("/getClinicById/:id", getClinicById);
router.get("/getAllClinicPatients/:clinicId", getAllClinicPatients);
router.get("/getClinicStats/:clinicId", getClinicStatus);
export default router;
//# sourceMappingURL=clinic.routes.js.map