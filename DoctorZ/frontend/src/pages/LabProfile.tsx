// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useOutletContext } from "react-router-dom";
// import { Building2, Mail, MapPin, Edit3, Save, CheckCircle2, AlertCircle, X } from "lucide-react";

// interface Lab {
//   name: string;
//   email: string;
//   address: string;
//   city: string;
//   state: string;
//   pincode: string;
// }

// interface LabDashboardContext {
//   labId: string | null;
// }

// interface GetLabResponse {
//   labDetails: Lab;
//   message: string;
// }

// interface UpdateLabResponse {
//   lab: Lab;
//   message: string;
// }

// const LabProfile = () => {
//   const { labId } = useOutletContext<LabDashboardContext>();

//   const [lab, setLab] = useState<Lab>({
//     name: "",
//     email: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);

//   useEffect(() => {
//     if (!labId) return;

//     const fetchLab = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get<GetLabResponse>(
//           `http://localhost:3000/api/lab/getLabById/${labId}`
//         );
//         if (res.data.labDetails) setLab(res.data.labDetails);
//       } catch (err) {
//         console.error("Error fetching lab:", err);
//         showNotification('error', 'Failed to load profile');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLab();
//   }, [labId]);

//   const showNotification = (type: 'success' | 'error', message: string) => {
//     setNotification({ type, message });
//     setTimeout(() => setNotification(null), 4000);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setLab({ ...lab, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!labId) {
//       showNotification('error', 'Lab ID not found');
//       return;
//     }

//     setSaving(true);
//     try {
//       const res = await axios.put<UpdateLabResponse>(
//         `http://localhost:3000/api/lab/updateLabProfile/${labId}`,
//         lab
//       );
//       setLab(res.data.lab);
//       setIsEditing(false);
//       showNotification('success', 'Profile updated successfully!');
//     } catch (err) {
//       console.error("Error updating lab:", err);
//       showNotification('error', 'Failed to update profile');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-[#070738] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-700 font-semibold text-lg">Loading Profile...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
//       {/* Notification */}
//       {notification && (
//         <div className={`fixed top-8 right-8 z-50 flex items-center gap-3 px-8 py-4 rounded-2xl shadow-2xl transform transition-all duration-500 ${
//           notification.type === 'success' 
//             ? 'bg-emerald-600 text-white' 
//             : 'bg-red-600 text-white'
//         }`}>
//           {notification.type === 'success' ? (
//             <CheckCircle2 className="w-6 h-6" />
//           ) : (
//             <AlertCircle className="w-6 h-6" />
//           )}
//           <span className="font-semibold text-lg">{notification.message}</span>
//           <button onClick={() => setNotification(null)} className="ml-3 hover:bg-white/20 rounded-lg p-1.5 transition-colors">
//             <X className="w-5 h-5" />
//           </button>
//         </div>
//       )}

//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-[#070738] via-[#0a0a4a] to-[#070738] rounded-3xl shadow-2xl mb-6 relative overflow-hidden">
//           <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgMTAgMCBNIC01IDUgTCA1IC01IE0gMzUgNDUgTCA0NSAzNSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>
//           <div className="relative px-8 py-6 flex items-center justify-between">
//             <div className="flex items-center gap-5">
//               <div className="bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/20 shadow-2xl">
//                 <Building2 className="w-9 h-9 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-3xl font-bold text-white tracking-tight">Laboratory Profile</h1>
//                 <p className="text-blue-200 text-sm mt-1">Manage your laboratory information</p>
//               </div>
//             </div>
//             {!isEditing && (
//               <button
//                 onClick={() => setIsEditing(true)}
//                 className="bg-white text-[#070738] hover:bg-gray-100 font-bold px-7 py-3 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105"
//               >
//                 <Edit3 className="w-5 h-5" />
//                 Edit Profile
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Main Content */}
//         <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
//           <div className="space-y-6">
//             {/* Lab Name */}
//             <div>
//               <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-widest">
//                 Laboratory Name
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                   <Building2 className={`w-5 h-5 ${isEditing ? 'text-[#070738]' : 'text-gray-400'}`} />
//                 </div>
//                 <input
//                   name="name"
//                   value={lab.name}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                   className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl transition-all outline-none text-gray-900 font-medium ${
//                     isEditing 
//                       ? 'border-gray-300 bg-white focus:border-[#070738] focus:ring-4 focus:ring-[#070738]/10' 
//                       : 'border-gray-200 bg-gray-50 cursor-default'
//                   }`}
//                   placeholder="Enter laboratory name"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-widest">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                   <Mail className={`w-5 h-5 ${isEditing ? 'text-[#070738]' : 'text-gray-400'}`} />
//                 </div>
//                 <input
//                   name="email"
//                   type="email"
//                   value={lab.email}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                   className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl transition-all outline-none text-gray-900 font-medium ${
//                     isEditing 
//                       ? 'border-gray-300 bg-white focus:border-[#070738] focus:ring-4 focus:ring-[#070738]/10' 
//                       : 'border-gray-200 bg-gray-50 cursor-default'
//                   }`}
//                   placeholder="lab@example.com"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Address */}
//             <div>
//               <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-widest">
//                 Street Address
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                   <MapPin className={`w-5 h-5 ${isEditing ? 'text-[#070738]' : 'text-gray-400'}`} />
//                 </div>
//                 <input
//                   name="address"
//                   value={lab.address}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                   className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl transition-all outline-none text-gray-900 font-medium ${
//                     isEditing 
//                       ? 'border-gray-300 bg-white focus:border-[#070738] focus:ring-4 focus:ring-[#070738]/10' 
//                       : 'border-gray-200 bg-gray-50 cursor-default'
//                   }`}
//                   placeholder="Enter street address"
//                   required
//                 />
//               </div>
//             </div>

//             {/* City, State, Pincode in Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {/* City */}
//               <div>
//                 <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-widest">
//                   City
//                 </label>
//                 <input
//                   name="city"
//                   value={lab.city}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                   className={`w-full px-4 py-3.5 border-2 rounded-xl transition-all outline-none text-gray-900 font-medium ${
//                     isEditing 
//                       ? 'border-gray-300 bg-white focus:border-[#070738] focus:ring-4 focus:ring-[#070738]/10' 
//                       : 'border-gray-200 bg-gray-50 cursor-default'
//                   }`}
//                   placeholder="City"
//                   required
//                 />
//               </div>

//               {/* State */}
//               <div>
//                 <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-widest">
//                   State
//                 </label>
//                 <input
//                   name="state"
//                   value={lab.state}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                   className={`w-full px-4 py-3.5 border-2 rounded-xl transition-all outline-none text-gray-900 font-medium ${
//                     isEditing 
//                       ? 'border-gray-300 bg-white focus:border-[#070738] focus:ring-4 focus:ring-[#070738]/10' 
//                       : 'border-gray-200 bg-gray-50 cursor-default'
//                   }`}
//                   placeholder="State"
//                   required
//                 />
//               </div>

//               {/* Pincode */}
//               <div>
//                 <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-widest">
//                   Pincode
//                 </label>
//                 <input
//                   name="pincode"
//                   value={lab.pincode}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                   className={`w-full px-4 py-3.5 border-2 rounded-xl transition-all outline-none text-gray-900 font-medium ${
//                     isEditing 
//                       ? 'border-gray-300 bg-white focus:border-[#070738] focus:ring-4 focus:ring-[#070738]/10' 
//                       : 'border-gray-200 bg-gray-50 cursor-default'
//                   }`}
//                   placeholder="Enter pincode"
//                   required
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           {isEditing && (
//             <div className="mt-8 pt-6 border-t-2 border-gray-200 flex gap-4">
//               <button
//                 type="button"
//                 onClick={handleCancel}
//                 className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3"
//               >
//                 <X className="w-5 h-5" />
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={saving}
//                 className="flex-1 bg-gradient-to-r from-[#070738] to-[#0a0a4a] hover:from-[#050520] hover:to-[#070738] text-white font-bold py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100"
//               >
//                 {saving ? (
//                   <>
//                     <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
//                     Saving Changes...
//                   </>
//                 ) : (
//                   <>
//                     <Save className="w-5 h-5" />
//                     Save Changes
//                   </>
//                 )}
//               </button>
//             </div>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LabProfile;

import { useEffect, useState, useCallback, memo } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import {
  Building2,
  Mail,
  MapPin,
  Edit3,
  Save,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";

interface Lab {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

interface LabDashboardContext {
  labId: string | null;
}

interface GetLabResponse {
  labDetails: Lab;
  message: string;
}

interface UpdateLabResponse {
  lab: Lab;
  message: string;
}

const LabProfile = memo(() => {
  const { labId } = useOutletContext<LabDashboardContext>();
  const [lab, setLab] = useState<Lab>({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const showNotification = useCallback((type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  }, []);

  const fetchLab = useCallback(async () => {
    if (!labId) return;
    try {
      const { data } = await axios.get<GetLabResponse>(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/lab/getLabById/${labId}`
      );
      if (data.labDetails) setLab(data.labDetails);
    } catch {
      showNotification("error", "Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, [labId, showNotification]);

  useEffect(() => {
    fetchLab();
  }, [fetchLab]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLab((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!labId) return showNotification("error", "Lab ID not found");
    setSaving(true);

    try {
      const { data } = await axios.put<UpdateLabResponse>(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/lab/updateLabProfile/${labId}`,
        lab
      );
      setLab(data.lab);
      setIsEditing(false);
      showNotification("success", "Profile updated successfully!");
    } catch {
      showNotification("error", "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => setIsEditing(false);

  useEffect(() => {
    document.title = "Lab Profile | DoctorZ";
  }, []);

  if (loading)
    return (
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#070738] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-700 font-medium text-base sm:text-lg">Loading Profile...</p>
        </div>
      </main>
    );

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-6 md:px-10 py-6 md:py-10">
      {/* ✅ Toast Notification */}
      {notification && (
        <div
          className={`fixed top-6 right-4 sm:right-6 z-50 flex flex-wrap sm:flex-nowrap items-center gap-3 px-5 sm:px-6 py-3 rounded-2xl shadow-2xl transition-all duration-500 text-sm sm:text-base ${
            notification.type === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
          )}
          <span className="font-semibold break-words">{notification.message}</span>
          <button
            onClick={() => setNotification(null)}
            className="ml-auto sm:ml-2 hover:bg-white/20 rounded-full p-1 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ✅ Header Section */}
      <header className="bg-gradient-to-r from-[#070738] to-[#0a0a4a] rounded-3xl shadow-2xl mb-10">
        <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-8 gap-5 md:gap-0 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/20 shadow-xl">
              <Building2 className="w-9 h-9 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug">
                Laboratory Profile
              </h1>
              <p className="text-blue-200 text-sm sm:text-base mt-1">
                Manage your laboratory information
              </p>
            </div>
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-white text-[#070738] hover:bg-gray-100 font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105 text-sm sm:text-base"
            >
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </button>
          )}
        </div>
      </header>

      {/* ✅ Profile Form */}
      <section>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-lg p-5 sm:p-8 md:p-10 border border-gray-200 space-y-6 max-w-6xl mx-auto"
        >
          {[
            { label: "Laboratory Name", name: "name", icon: <Building2 /> },
            { label: "Email Address", name: "email", icon: <Mail />, type: "email" },
            { label: "Street Address", name: "address", icon: <MapPin /> },
          ].map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-xs sm:text-sm font-bold text-gray-600 mb-2 uppercase tracking-widest"
              >
                {field.label}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  {field.icon}
                </div>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type || "text"}
                  value={lab[field.name as keyof Lab]}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl text-sm sm:text-base transition-all outline-none text-gray-900 font-medium ${
                    isEditing
                      ? "border-gray-300 bg-white focus:border-[#070738] focus:ring-4 focus:ring-[#070738]/10"
                      : "border-gray-200 bg-gray-50 cursor-default"
                  }`}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  required
                />
              </div>
            </div>
          ))}

          {/* Responsive grid for city/state/pincode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {["city", "state", "pincode"].map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-xs sm:text-sm font-bold text-gray-600 mb-2 uppercase tracking-widest"
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  id={field}
                  name={field}
                  value={lab[field as keyof Lab]}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border-2 rounded-xl text-sm sm:text-base transition-all outline-none text-gray-900 font-medium ${
                    isEditing
                      ? "border-gray-300 bg-white focus:border-[#070738] focus:ring-4 focus:ring-[#070738]/10"
                      : "border-gray-200 bg-gray-50 cursor-default"
                  }`}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  required
                />
              </div>
            ))}
          </div>

          {/* ✅ Buttons */}
          {isEditing && (
            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-4 sm:gap-6">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-gradient-to-r from-[#070738] to-[#0a0a4a] hover:from-[#050520] hover:to-[#070738] text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-2xl transition-all flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          )}
        </form>
      </section>
    </main>
  );
});

export default LabProfile;
