// src/pages/LoginPatient.tsx
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { loginPatient } from "../Services/patientApi";
import { AuthContext } from "../Context/AuthContext"; // ✅ Import AuthContext

export default function LoginPatient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login } = useContext(AuthContext); // ✅ use the login method from context

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginPatient({ email, password });

      // ✅ Store token in cookie (optional)
      Cookies.set("patientToken", res.token, { expires: 7 });

      // ✅ Store in context/localStorage so that Navbar updates
    login(res.token, {
  id: res.user._id ,      // ✅ Convert _id to id
  email: res.user.email,
});

      console.log("Token stored in cookie:", document.cookie);
      alert("Login successful");

      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      alert("Invalid login");
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
