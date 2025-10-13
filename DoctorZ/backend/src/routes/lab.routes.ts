// import mongoose from "mongoose";
// import { Router } from "express";
// // import patientRegister from "../controllers
// import labController from "../controllers/lab.controller.js";
// const router = Router();

// router.post("/register",labController.labRegister);
// router.post("/login",labController.labLogin);

// // router.get("/:id",patientController.getPatientById);
// // router.delete("/:id",patientController.deleteUser)
// router.post("/addTestBooking",labController.addTestBooking);

// router.get("/alllabtests", labController.getAllLabTests);
// router.get("/getLabById/:labId",labController.getLabById);
// router.put("/updateLabProfile/:labId",labController.updateLabProfile);
// router.post("/addTest",labController.addTest);
// router.post("/addTestData", labController.addTestBooking);
// router.get("/getLabPatients/:labId",labController.getLabPatients);
// router.get("/getAllTestByLabId/:labId",labController.getAllTestByLabId);
// router.delete("/deleteLabTest/:testId",labController.deleteLabTest);
// router.put("/updateLabTest/:testId",labController.updateLabTest);

// export default router;


import mongoose from "mongoose";
import { Router } from "express";
// import patientRegister from "../controllers
import labController from "../controllers/lab.controller.js";
const router = Router();

router.post("/register",labController.labRegister);
router.post("/login",labController.labLogin);

// router.get("/:id",patientController.getPatientById);
// router.delete("/:id",patientController.deleteUser)

router.get("/alllabtests", labController.getAllLabTests);
router.get("/getLabById/:labId",labController.getLabById);
router.put("/updateLabProfile/:labId",labController.updateLabProfile);
router.post("/addTest",labController.addTest);
router.post("/bookTest", labController.addTestBooking);
router.get("/getAllTestByLabId/:labId",labController.getAllTestByLabId);
router.delete("/deleteLabTest/:testId",labController.deleteLabTest);
router.put("/updateLabTest/:testId",labController.updateLabTest);
router.get("/getLabPatients/:labId",labController.getLabPatients);

export default router;