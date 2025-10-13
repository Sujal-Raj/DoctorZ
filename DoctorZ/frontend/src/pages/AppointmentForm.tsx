import React, { useState } from "react";

interface AppointmentFormProps {
  onSubmit: (data: {
    name: string;
    age: number;
    gender: "Male" | "Female" | "Other";
    aadhar: string;
    contact: string;
  }) => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState<"Male" | "Female" | "Other">("Male");
  const [aadhar, setAadhar] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !age || !aadhar || !contact) {
      alert("Please fill all required fields.");
      return;
    }

    onSubmit({
      name,
      age: Number(age),
      gender,
      aadhar,
      contact,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 p-6 bg-white rounded-2xl shadow-lg w-full max-w-sm"
    >
      <h1 className="text-2xl font-semibold text-gray-800 text-center mb-3">
        Appointment Form
      </h1>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-600">Patient Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter patient name"
          required
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-600">Age</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter age"
          required
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-600">Gender</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value as any)}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-600">Aadhar Number</label>
        <input
          type="text"
          value={aadhar}
          onChange={(e) => setAadhar(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Aadhar number"
          required
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-600">Contact Number</label>
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter contact number"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium text-lg hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default AppointmentForm;
