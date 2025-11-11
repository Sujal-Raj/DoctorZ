
// src/pages/LoginPatient.tsx
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginPatient } from "../../Services/patientApi";
import { AuthContext } from "../../Context/AuthContext"; // ✅ Import AuthContext

export default function LoginPatient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
 const { login } = useContext(AuthContext);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   



    try {
      const res = await loginPatient({ email, password });
 login(res.token);
     if (res.user) {
      localStorage.setItem("user", JSON.stringify(res.user));
      console.log("👤 Logged-in user:", res.user);
      localStorage.setItem("userId", res.user._id);
    }

      alert("Login successful");

      // ✅ redirect → context will automatically read token & set user
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid login credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-12">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg p-2 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg p-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}
