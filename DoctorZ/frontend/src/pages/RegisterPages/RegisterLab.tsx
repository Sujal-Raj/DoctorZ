import { useState } from "react";
import Swal from "sweetalert2";
import { registerLab } from "../../Services/labApi";
import type { Lab } from "../../Services/labApi";
// import api from "../Services/client";
// import { registerLab } from "../Services/labApi";

interface Timings {
  open: string;
  close: string;
}

interface Lab {
  name: string;
  email: string;
  password: string;
  state: string;
  city: string;
  pincode: string;
  address: string;
  timings: Timings;
}

export default function RegisterLab() {
  const [lab, setLab] = useState<Lab & { certificateNumber?: string }>({
    name: "",
    email: "",
    password: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
    timings: { open: "", close: "" },
    certificateNumber: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "open" || name === "close") {
      setLab((prev) => ({
        ...prev,
        timings: { ...prev.timings, [name]: value },
      }));
    } else {
      setLab((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRegistration = async () => {
    try {
      const response = await registerLab(lab);
      if (response.status === 200) {
        Swal.fire({
          title: "Registration Successful!",
          text: "Your lab details have been submitted for admin approval. You’ll be notified once approved.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => (window.location.href = "/"));
      }
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: error?.response?.data?.message || "Error registering lab",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      {/* ✅ SEO meta tags */}
      <head>
        <title>Register Your Diagnostic Lab | HealthCare Platform</title>
        <meta
          name="description"
          content="Register your diagnostic lab easily on our platform. Get verified and reach patients in your area."
        />
        <meta
          name="keywords"
          content="lab registration, diagnostic center, healthcare platform"
        />
      </head>

      <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50 flex items-center justify-center px-6 py-16">
        <section
          className="w-full max-w-3xl bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 p-10 animate-fade-in"
          aria-label="Lab registration form"
        >
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 tracking-tight">
            Register Your Laboratory
          </h1>
          <p className="text-center text-gray-600 mb-10">
            Join our trusted network of diagnostic centers. Fill in your lab
            details below.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRegistration();
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <Input
              label="Lab Name"
              name="name"
              value={lab.name}
              onChange={handleOnChange}
            />
            <Input
              label="Email"
              type="email"
              name="email"
              value={lab.email}
              onChange={handleOnChange}
            />
            <Input
              label="Password"
              type="password"
              name="password"
              minLength={8}
              value={lab.password}
              onChange={handleOnChange}
            />
            <Input
              label="Certificate Number"
              name="certificateNumber"
              value={lab.certificateNumber}
              onChange={handleOnChange}
            />
            <Input
              label="State"
              name="state"
              value={lab.state}
              onChange={handleOnChange}
            />
            <Input
              label="City"
              name="city"
              value={lab.city}
              onChange={handleOnChange}
            />
            <Input
              label="Address"
              name="address"
              value={lab.address}
              onChange={handleOnChange}
            />
            <Input
              label="Pincode"
              name="pincode"
              value={lab.pincode}
              onChange={handleOnChange}
            />
            <Input
              label="Opening Time"
              name="open"
              value={lab.timings.open}
              onChange={handleOnChange}
              placeholder="e.g. 9:00 AM"
            />
            <Input
              label="Closing Time"
              name="close"
              value={lab.timings.close}
              onChange={handleOnChange}
              placeholder="e.g. 7:00 PM"
            />

            <div className="col-span-2 mt-8">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl shadow-md transition-transform hover:scale-[1.02]"
              >
                Submit Registration
              </button>
            </div>
          </form>

          <p className="text-center text-gray-600 mt-8">
            Already registered?{" "}
            <a
              href="/lab-login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login Here
            </a>
          </p>
        </section>
      </main>
    </>
  );
}

/* ✅ Reusable Input Component for clean UI */
function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  minLength,
}: {
  label: string;
  name: string;
  type?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  minLength?: number;
}) {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        minLength={minLength}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder || label}
        className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-800 bg-white"
        required
      />
    </div>
  );
}
