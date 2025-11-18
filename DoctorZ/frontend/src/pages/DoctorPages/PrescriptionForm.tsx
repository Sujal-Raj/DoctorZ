

import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { X } from "lucide-react";
import api from "../../Services/mainApi";
import Swal from "sweetalert2";

interface Medicine {
  name: string;
  dosage: string;
  quantity?: string;
}

const PrescriptionForm = () => {
  const { bookingId, patientAadhar } = useParams();
  const doctorId = localStorage.getItem("doctorId");
    const { state } = useLocation();
      const name = state?.name;
       const gender=state?.gender;



  const [diagnosis, setDiagnosis] = useState("");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [symptomInput, setSymptomInput] = useState("");

  const [tests, setTests] = useState<string[]>([]);
  const [testInput, setTestInput] = useState("");

  // Medicine inputs
  const [medicineName, setMedicineName] = useState("");
  const [medicineDosage, setMedicineDosage] = useState("");
  const [medicineQty, setMedicineQty] = useState("");

  const [medicines, setMedicines] = useState<Medicine[]>([]);

  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  // Add Symptom
  const handleAddSymptom = () => {
    if (!symptomInput.trim()) return;
    setSymptoms([...symptoms, symptomInput.trim()]);
    setSymptomInput("");
  };

  const removeSymptom = (index: number) => {
    setSymptoms(symptoms.filter((_, i) => i !== index));
  };

  // Add Test
  const handleAddTest = () => {
    if (!testInput.trim()) return;
    setTests([...tests, testInput.trim()]);
    setTestInput("");
  };

  const removeTest = (index: number) => {
    setTests(tests.filter((_, i) => i !== index));
  };

  const addMedicineChip = () => {
    if (!medicineName.trim() || !medicineDosage.trim()) return;

    setMedicines([
      ...medicines,
      {
        name: medicineName.trim(),
        dosage: medicineDosage.trim(),
        quantity: medicineQty.trim(),
      },
    ]);

    setMedicineName("");
    setMedicineDosage("");
    setMedicineQty("");
  };

  const removeMedicine = (index: number) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      doctorId,
      patientAadhar,
      diagnosis,
      symptoms,
      medicines,
      recommendedTests: tests,
      notes,
      name,gender
    };

    try {
      await api.post(`/api/prescription/addPrescription/${bookingId}`, payload);
      Swal.fire({
        title: "Prescription Saved Successfully!",

        icon: "success",
      
        showConfirmButton: true,
      });
      // RESET ALL INPUTS
setDiagnosis("");
setSymptoms([]);
setSymptomInput("");

setTests([]);
setTestInput("");

setMedicineName("");
setMedicineDosage("");
setMedicineQty("");
setMedicines([]);

setNotes("");

    
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Prescription Saved Successfully!",

        icon: "error",
        
        confirmButtonText: "TryAgain",
      });
    }

    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-900">
          Create Prescription
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Fill the details to generate your patient's prescription.
        </p>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Diagnosis */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Diagnosis
            </h3>
            <textarea
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              className="w-full border rounded-lg p-3"
              rows={3}
              required
              placeholder="Add Diagnosis"
            />
          </div>

          {/* Symptoms */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Symptoms
            </h3>

            <div className="flex gap-3">
              <input
                type="text"
                value={symptomInput}
                onChange={(e) => setSymptomInput(e.target.value)}
                className="flex-1 border rounded-lg p-3"
                placeholder="Add symptom"
              />
              <button
                type="button"
                onClick={handleAddSymptom}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {symptoms.map((s, i) => (
                <span
                  key={i}
                  className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  {s}
                  <button
                    type="button"
                    onClick={() => removeSymptom(i)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={16} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Medicines */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Medicines
            </h3>

            {/* Input Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                value={medicineName}
                onChange={(e) => setMedicineName(e.target.value)}
                className="border rounded-lg p-3"
                placeholder="Medicine name"
              />
              <input
                value={medicineDosage}
                onChange={(e) => setMedicineDosage(e.target.value)}
                className="border rounded-lg p-3"
                placeholder="Dosage (e.g., 1/day)"
              />
              <input
                value={medicineQty}
                onChange={(e) => setMedicineQty(e.target.value)}
                className="border rounded-lg p-3"
                placeholder="Quantity"
              />
            </div>

            <button
              type="button"
              onClick={addMedicineChip}
              className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              + Add Medicine
            </button>

            {/* Chips */}
            <div className="flex flex-wrap gap-2 mt-4">
              {medicines.map((med, i) => (
                <span
                  key={i}
                  className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                >
                  {med.name} — {med.dosage}
                  {med.quantity && ` — ${med.quantity}`}
                  <button
                    type="button"
                    onClick={() => removeMedicine(i)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={16} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Tests */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Recommended Tests
            </h3>

            <div className="flex gap-3">
              <input
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                className="flex-1 border rounded-lg p-3"
                placeholder="Add test"
              />
              <button
                type="button"
                onClick={handleAddTest}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {tests.map((t, i) => (
                <span
                  key={i}
                  className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  {t}
                  <button
                    type="button"
                    onClick={() => removeTest(i)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={16} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Notes</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border rounded-lg p-3"
              rows={4}
              placeholder="Additional notes"
            />
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 rounded-xl text-lg font-medium text-white ${
                loading ? "bg-gray-500" : "bg-blue-700 hover:bg-blue-800"
              }`}
            >
              {loading ? "Saving..." : "Save Prescription"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PrescriptionForm;
