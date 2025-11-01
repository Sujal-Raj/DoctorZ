// // src/pages/LoginPatient.tsx
// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// // import api from "../Services/client";
// import Cookies from "js-cookie";
// import { loginPatient } from "../Services/patientApi";
// import { AuthContext } from "../Context/AuthContext"; // ✅ Import AuthContext

// export interface LoginResponse {
//   token: string;
//   user: {
//     _id: string;
//     email: string;
//     fullName?: string;
//   };
// }


// export default function LoginPatient() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const { login } = useContext(AuthContext); // ✅ use the login method from context


//   const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   try {
//     const res = await loginPatient({ email, password });

//     console.log("Full login response:", res);

//     // ✅ Adjust this part based on actual response structure
//     const userData = res.user || res.data?.user; // <-- handles both possible cases

//     if (!userData?._id) {
//       console.error("User ID missing in response:", userData);
//       alert("Error: User ID not found in response");
//       return;
//     }

//     Cookies.set("patientToken", res.token || res.data?.token, { expires: 7 });

//     // ✅ Store in context/localStorage so Navbar can access it
//     login(res.token || res.data?.token, {
//       id: userData._id, // ✅ now defined
//       email: userData.email,
//     });

//     localStorage.setItem("userId", userData._id); // ✅ ensure fallback for profile page

//     console.log("Token stored:", document.cookie);
//     console.log("User ID stored:", userData._id);

//     alert("Login successful");
//     navigate(`/`);
//   } catch (err) {
//     console.error("Login failed:", err);
//     alert("Invalid login");
//   }
// };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     try {
// //       const res = await loginPatient({ email, password });

// //       // ✅ Store token in cookie (optional)
// //       Cookies.set("patientToken", res.token, { expires: 7 });

// //       // ✅ Store in context/localStorage so that Navbar updates
// //     login(res.token, {
// //   id: res.user._id ,      // ✅ Convert _id to id
// //   email: res.user.email,
// // });
// // localStorage.setItem("userId", res.user._id);

// //       console.log("Token stored in cookie:", document.cookie);
// //       alert("Login successful");

// //       navigate(`/`);
// //     } catch (err) {
// //       console.error("Login failed:", err);
// //       alert("Invalid login");
// //     }
// //   };

//   return (
//     <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-12">
//       <h2 className="text-2xl font-bold mb-4 text-blue-700">Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full border rounded-lg p-2 mb-4"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full border rounded-lg p-2 mb-4"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }


// src/pages/LoginPatient.tsx
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { loginPatient } from "../Services/patientApi";
import { AuthContext } from "../Context/AuthContext";

export interface LoginResponse {
  token: string;
  user: {
    id?: string;     // ✅ optional since backend might send id or _id
    _id?: string;
    email: string;
    fullName?: string;
  };
}

export default function LoginPatient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 🔹 API call
      const res: LoginResponse = await loginPatient({ email, password });
      console.log("Full login response:", res);

      const userData = res.user;
      const userId = userData._id || userData.id; // ✅ handle both

      if (!userId) {
        console.error("User ID missing in response:", userData);
        alert("Error: User ID not found in response");
        return;
      }

      // 🔹 Store token securely
      Cookies.set("patientToken", res.token, { expires: 7 });

      // 🔹 Update context and localStorage
      login(res.token, { id: userId, email: userData.email });
      localStorage.setItem("userId", userId);

      console.log("Token stored:", res.token);
      console.log("User ID stored:", userId);

      alert("Login successful");
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
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
