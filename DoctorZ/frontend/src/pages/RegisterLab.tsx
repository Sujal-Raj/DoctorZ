import { useState } from "react";
import Swal from "sweetalert2";
import api from "../Services/client";


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
  const [lab, setLab] = useState<Lab>({
    name: "",
    email: "",
    password: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
    timings: { open: "", close: "" }
   
  });

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setLab((prev) => ({ ...prev, [name]: value }));
  };


 
  const handleRegistration = async (): Promise<void> => {
    

    try {
     

     const response=await api.post("/api/lab/register", { ...lab },{
      headers: {"Content-Type": "application/json" }
     })
      
    
      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
         text: "Your lab details have been sent for admin approval. You’ll receive login access once approved.",
          icon: "success",

          confirmButtonText: "Ok",
        }).then(() => {
          window.location.href = "/";
        });
        
      } 
    } catch (error: any) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        text: error?.response?.data?.message || "Error registering lab",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-10">
    <div className="w-full max-w-2xl bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
         Lab Registration
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="name"
          type="text"
          onChange={handleOnChange}
          placeholder="Lab Name"
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-gray-50"
        />
        <input
          name="email"
          type="email"
          onChange={handleOnChange}
          placeholder="Email"
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-gray-50"
        />
        <input
          name="password"
          type="password"
          onChange={handleOnChange}
          minLength={8}
          placeholder="Password"
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-gray-50"
        />
        <input
          name="state"
          type="text"
          onChange={handleOnChange}
          placeholder="State"
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-gray-50"
        />
        <input
          name="city"
          type="text"
          onChange={handleOnChange}
          placeholder="City"
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-gray-50"
        />
        <input
          name="address"
          type="text"
          onChange={handleOnChange}
          placeholder="Address"
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-gray-50"
        />
        <input
          name="pincode"
          type="text"
          onChange={handleOnChange}
          placeholder="Pincode"
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-gray-50"
        />
        <input
          name="open"
          type="text"
          placeholder="Opening Time (e.g. 9 AM)"
          value={lab.timings.open}
          onChange={(e) =>
            setLab((prev) => ({
              ...prev,
              timings: { ...prev.timings, open: e.target.value },
            }))
          }
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-gray-50"
        />
        <input
          name="close"
          type="text"
          placeholder="Closing Time (e.g. 7 PM)"
          value={lab.timings.close}
          onChange={(e) =>
            setLab((prev) => ({
              ...prev,
              timings: { ...prev.timings, close: e.target.value },
            }))
          }
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-gray-50"
        />
      </div>

      
      <div className="flex justify-center">
        <button
          onClick={handleRegistration}
          className="mt-8 w-full sm:w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow transition"
        >
          Register
        </button>
      </div>

      <p className="text-center text-gray-600 mt-6">
        Already have an account?{" "}
        <a href="/labsLogin" className="text-blue-500 hover:underline">
          Login
        </a>
      </p>
    </div>
  </div>
);
 
}
