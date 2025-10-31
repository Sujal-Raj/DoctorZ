// // src/pages/LabManagementV2.tsx
// import React, { useEffect, useState } from "react";
// import { useOutletContext } from "react-router-dom";
// import axios from "axios";

// /**
//  * LabManagementV2.tsx
//  * - Light-theme professional layout
//  * - Tabbed Tests / Packages
//  * - Add/Edit modal (floating button)
//  * - Show first 4 items with horizontal scroll, View All toggles full grid
//  * - Fully wired to backend endpoints (see API constants)
//  */

// /* ---------- Types ---------- */
// interface LabDashboardContext {
//   labId: string | null;
// }

// interface Test {
//   _id?: string;
//   testName: string;
//   price: number;
//   precaution?: string;
//   description?: string;
//   category?: string;
//   customCategory?: string;
// }

// interface Package {
//   _id?: string;
//   packageName: string;
//   description?: string;
//   totalPrice: number;
//   tests: (string | Test)[];
// }

// /* ---------- API ---------- */
// const API_BASE = "http://localhost:3000/api/lab";
// const API = {
//   getTestsByLab: (labId: string) => `${API_BASE}/getAllTestByLabId/${labId}`,
//   addTest: () => `${API_BASE}/addTest`,
//   updateTest: (testId: string) => `${API_BASE}/updateLabTest/${testId}`,
//   deleteTest: (testId: string) => `${API_BASE}/deleteLabTest/${testId}`,

//   addPackage: () => `${API_BASE}/addPackage`,
//   getPackagesByLab: (labId: string) => `${API_BASE}/getAllPackagesByLabId/${labId}`,
//   updatePackage: (packageId: string) => `${API_BASE}/updatePackage/${packageId}`,
//   deletePackage: (packageId: string) => `${API_BASE}/deletePackage/${packageId}`,
// };

// /* ---------- Category options ---------- */
// const categories = [
//   "Liver",
//   "Kidney",
//   "Diabetes",
//   "Fever",
//   "Vitamin",
//   "Pregnancy",
//   "Heart",
//   "Other",
// ];

// /* ---------- Component ---------- */
// const LabManagementV2: React.FC = () => {
//   const { labId } = useOutletContext<LabDashboardContext>();

//   const [activeTab, setActiveTab] = useState<"tests" | "packages">("tests");

//   const [tests, setTests] = useState<Test[]>([]);
//   const [packages, setPackages] = useState<Package[]>([]);
//   const [loading, setLoading] = useState(false);

//   // Modal / form state
//   const [modalOpen, setModalOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingId, setEditingId] = useState<string | null>(null); // testId or packageId

//   // Test form
//   const [testForm, setTestForm] = useState<Partial<Test>>({
//     testName: "",
//     price: 0,
//     description: "",
//     precaution: "",
//     category: "",
//     customCategory: "",
//   });

//   // Package form
//   const [packageForm, setPackageForm] = useState<Partial<Package>>({
//     packageName: "",
//     description: "",
//     totalPrice: 0,
//     tests: [],
//   });

//   // View all / collapsed states
//   const [showAllTests, setShowAllTests] = useState(false);
//   const [showAllPackages, setShowAllPackages] = useState(false);

//   /* ------------------ Fetch data ------------------ */
//   useEffect(() => {
//     if (!labId) return;
//     fetchAll();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [labId]);

//   const fetchAll = async () => {
//     if (!labId) return;
//     setLoading(true);
//     try {
//       const [testsRes, packagesRes] = await Promise.all([
//         axios.get<{ tests: Test[] }>(API.getTestsByLab(labId)),
//         axios.get<{ packages: Package[] }>(API.getPackagesByLab(labId)),
//       ]);
//       setTests(testsRes.data.tests || []);
//       setPackages(packagesRes.data.packages || []);
//     } catch (err) {
//       console.error("Fetch error:", err);
//       alert("Could not fetch tests or packages from backend.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= Tests CRUD ================= */
//   const openAddTestModal = () => {
//     setActiveTab("tests");
//     setIsEditing(false);
//     setEditingId(null);
//     setTestForm({
//       testName: "",
//       price: 0,
//       description: "",
//       precaution: "",
//       category: "",
//       customCategory: "",
//     });
//     setModalOpen(true);
//   };

//   const openEditTestModal = (t: Test) => {
//     setActiveTab("tests");
//     setIsEditing(true);
//     setEditingId(t._id || null);
//     setTestForm({
//       testName: t.testName,
//       price: Number(t.price || 0),
//       description: t.description || "",
//       precaution: t.precaution || "",
//       category: t.category || "",
//       customCategory: t.customCategory || "",
//     });
//     setModalOpen(true);
//   };

//   const handleTestFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setTestForm((s) => ({ ...s, [name]: name === "price" ? Number(value) : value }));
//   };

//   const submitTest = async (e?: React.FormEvent) => {
//     e?.preventDefault();
//     if (!labId) return alert("Lab ID missing.");
//     if (!testForm.testName || testForm.price === undefined) return alert("Test name and price are required.");

//     try {
//       if (isEditing && editingId) {
//         const payload = {
//           testName: testForm.testName,
//           price: Number(testForm.price),
//           description: testForm.description || "",
//           precaution: testForm.precaution || "",
//           category: testForm.category === "Other" ? testForm.customCategory || "Other" : testForm.category,
//         };
//         await axios.put(API.updateTest(editingId), payload);
//         setTests((prev) => prev.map((t) => (t._id === editingId ? ({ ...(t as any), ...payload }) : t)));
//         alert("Test updated");
//       } else {
//         const payload = [
//           {
//             testName: testForm.testName,
//             price: Number(testForm.price),
//             description: testForm.description || "",
//             precaution: testForm.precaution || "",
//             category: testForm.category === "Other" ? testForm.customCategory || "Other" : testForm.category,
//             labId,
//           },
//         ];
//         const res = await axios.post(API.addTest(), payload);
//         const newTests = res.data.tests || [];
//         setTests((prev) => [...newTests, ...prev]);
//         alert("Test added");
//       }
//       setModalOpen(false);
//       fetchAll();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save test.");
//     }
//   };

//   const deleteTest = async (testId?: string) => {
//     if (!testId) return;
//     if (!confirm("Delete test? This also removes it from packages.")) return;
//     try {
//       await axios.delete(API.deleteTest(testId));
//       setTests((prev) => prev.filter((t) => t._id !== testId));
//       // remove from packages UI
//       setPackages((prev) => prev.map((p) => ({ ...p, tests: (p.tests || []).filter((tt: any) => (typeof tt === "string" ? tt !== testId : (tt._id !== testId)) ) })));
//       alert("Test deleted");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete test.");
//     }
//   };

//   /* ================= Packages CRUD ================= */
//   const openAddPackageModal = () => {
//     setActiveTab("packages");
//     setIsEditing(false);
//     setEditingId(null);
//     setPackageForm({
//       packageName: "",
//       description: "",
//       totalPrice: 0,
//       tests: [],
//     });
//     setModalOpen(true);
//   };

//   const openEditPackageModal = (p: Package) => {
//     setActiveTab("packages");
//     setIsEditing(true);
//     setEditingId(p._id || null);
//     // Normalize tests to ids
//     const testIds = (p.tests || []).map((t: any) => (typeof t === "string" ? t : t._id));
//     setPackageForm({
//       packageName: p.packageName,
//       description: p.description || "",
//       totalPrice: Number(p.totalPrice || 0),
//       tests: testIds,
//     });
//     setModalOpen(true);
//   };

//   const handlePackageFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setPackageForm((s) => ({ ...s, [name]: name === "totalPrice" ? Number(value) : value }));
//   };

//   const togglePackageTest = (testId: string) => {
//     setPackageForm((s) => {
//       const current = (s.tests as string[]) || [];
//       const exists = current.includes(testId);
//       return { ...s, tests: exists ? current.filter((id) => id !== testId) : [...current, testId] };
//     });
//   };

//   const submitPackage = async (e?: React.FormEvent) => {
//     e?.preventDefault();
//     if (!labId) return alert("Lab ID missing.");
//     if (!packageForm.packageName || packageForm.totalPrice === undefined) return alert("Name and price required.");
//     if (!packageForm.tests || (packageForm.tests as string[]).length === 0) return alert("Select at least one test.");

//     try {
//       const payload = {
//         packageName: packageForm.packageName,
//         description: packageForm.description || "",
//         totalPrice: Number(packageForm.totalPrice),
//         testIds: (packageForm.tests || []).map((t: any) => (typeof t === "string" ? t : t._id)),
//         labId,
//       };

//       if (isEditing && editingId) {
//         await axios.put(API.updatePackage(editingId), payload);
//         alert("Package updated");
//       } else {
//         await axios.post(API.addPackage(), payload);
//         alert("Package created");
//       }
//       setModalOpen(false);
//       fetchAll();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save package.");
//     }
//   };

//   const deletePackage = async (packageId?: string) => {
//     if (!packageId) return;
//     if (!confirm("Delete package?")) return;
//     try {
//       await axios.delete(API.deletePackage(packageId));
//       setPackages((prev) => prev.filter((p) => p._id !== packageId));
//       alert("Package deleted");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete package.");
//     }
//   };

//   /* ----------------- Helpers ----------------- */
//   const getTestName = (t: any) => {
//     if (!t) return "";
//     if (typeof t === "string") {
//       const found = tests.find((x) => x._id === t);
//       return found ? found.testName : "Test";
//     }
//     return t.testName || "Test";
//   };

//   /* ----------------- Render ----------------- */
//   return (
//     <div className="min-h-screen bg-slate-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         <header className="mb-6">
//           <h1 className="text-3xl font-extrabold text-slate-800">Lab Management</h1>
//           <p className="text-slate-600 mt-1">Manage tests and create attractive test packages for your patients.</p>
//         </header>

//         {/* Tabs */}
//         <div className="flex items-center gap-3 mb-6">
//           <button
//             onClick={() => setActiveTab("tests")}
//             className={`px-4 py-2 rounded-lg font-medium ${activeTab === "tests" ? "bg-white shadow" : "bg-transparent text-slate-700"}`}
//           >
//             Tests
//           </button>
//           <button
//             onClick={() => setActiveTab("packages")}
//             className={`px-4 py-2 rounded-lg font-medium ${activeTab === "packages" ? "bg-white shadow" : "bg-transparent text-slate-700"}`}
//           >
//             Packages
//           </button>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left: Overview card */}
//           <div className="lg:col-span-1 bg-white rounded-2xl p-6 shadow border">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h2 className="text-lg font-semibold">Overview</h2>
//                 <p className="text-sm text-slate-500 mt-1">Quick actions & metrics</p>
//               </div>
//             </div>

//             <div className="mt-4 grid grid-cols-2 gap-3">
//               <div className="p-3 bg-slate-50 rounded-lg text-center">
//                 <div className="text-xs text-slate-500">Tests</div>
//                 <div className="font-bold text-lg">{tests.length}</div>
//               </div>
//               <div className="p-3 bg-slate-50 rounded-lg text-center">
//                 <div className="text-xs text-slate-500">Packages</div>
//                 <div className="font-bold text-lg">{packages.length}</div>
//               </div>
//             </div>

//             <div className="mt-6 space-y-2">
//               <button
//                 onClick={() => { setActiveTab("tests"); openAddTestModal(); }}
//                 className="w-full py-2 rounded-lg bg-sky-600 text-white font-semibold"
//               >
//                 Add Test
//               </button>
//               <button
//                 onClick={() => { setActiveTab("packages"); openAddPackageModal(); }}
//                 className="w-full py-2 rounded-lg bg-amber-500 text-white font-semibold"
//               >
//                 Create Package
//               </button>
//             </div>
//           </div>

//           {/* Middle & Right: Lists */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Tests list */}
//             <section className="bg-white rounded-2xl p-6 shadow border">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-semibold">Tests</h3>
//                 <div className="flex items-center gap-3">
//                   <div className="text-sm text-slate-500 hidden md:block">{tests.length} tests</div>
//                   <button
//                     onClick={() => { setActiveTab("tests"); openAddTestModal(); }}
//                     className="px-3 py-1 rounded-lg bg-sky-600 text-white"
//                   >
//                     + Add
//                   </button>
//                 </div>
//               </div>

//               {loading ? (
//                 <div className="text-slate-500">Loading tests...</div>
//               ) : tests.length === 0 ? (
//                 <div className="text-sm text-slate-500">No tests found — add new tests to create packages.</div>
//               ) : (
//                 <>
//                   {/* horizontal scroll area (first 4 shown) */}
//                   {!showAllTests ? (
//                     <div className="flex gap-4 overflow-x-auto py-2 px-1">
//                       {tests.slice(0, 4).map((t) => (
//                         <div key={t._id} className="min-w-[260px] shrink-0 bg-white border rounded-xl p-4 shadow-sm">
//                           <div className="flex justify-between items-start">
//                             <div>
//                               <div className="font-semibold text-slate-800">{t.testName}</div>
//                               <div className="text-sm text-slate-500">₹{t.price}</div>
//                               <div className="text-xs text-slate-400 mt-2">{t.description}</div>
//                             </div>
//                             <div className="flex flex-col gap-2">
//                               <button onClick={() => openEditTestModal(t)} className="px-2 py-1 rounded bg-amber-400 text-white text-xs">Edit</button>
//                               <button onClick={() => deleteTest(t._id)} className="px-2 py-1 rounded bg-red-500 text-white text-xs">Delete</button>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     // show all in grid
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                       {tests.map((t) => (
//                         <div key={t._id} className="bg-white border rounded-xl p-4 shadow-sm">
//                           <div className="flex justify-between">
//                             <div>
//                               <div className="font-semibold">{t.testName}</div>
//                               <div className="text-sm text-slate-500">₹{t.price}</div>
//                               <div className="text-xs text-slate-400 mt-1">{t.description}</div>
//                             </div>
//                             <div className="flex flex-col gap-2">
//                               <button onClick={() => openEditTestModal(t)} className="px-2 py-1 rounded bg-amber-400 text-white text-xs">Edit</button>
//                               <button onClick={() => deleteTest(t._id)} className="px-2 py-1 rounded bg-red-500 text-white text-xs">Delete</button>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   <div className="mt-3 text-right">
//                     <button
//                       onClick={() => setShowAllTests((s) => !s)}
//                       className="text-sm text-sky-600 hover:underline"
//                     >
//                       {showAllTests ? "View Less" : `View All (${tests.length})`}
//                     </button>
//                   </div>
//                 </>
//               )}
//             </section>

//             {/* Packages list */}
//             <section className="bg-white rounded-2xl p-6 shadow border">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-semibold">Packages</h3>
//                 <div className="flex items-center gap-3">
//                   <div className="text-sm text-slate-500 hidden md:block">{packages.length} packages</div>
//                   <button onClick={() => { setActiveTab("packages"); openAddPackageModal(); }} className="px-3 py-1 rounded-lg bg-amber-500 text-white">
//                     + Create
//                   </button>
//                 </div>
//               </div>

//               {packages.length === 0 ? (
//                 <div className="text-sm text-slate-500">No packages yet. Create a package to bundle tests.</div>
//               ) : (
//                 <>
//                   {!showAllPackages ? (
//                     <div className="flex gap-4 overflow-x-auto py-2 px-1">
//                       {packages.slice(0, 4).map((p) => (
//                         <div key={p._id} className="min-w-[300px] shrink-0 bg-white border rounded-xl p-4 shadow-sm">
//                           <div className="flex justify-between">
//                             <div>
//                               <div className="font-semibold">{p.packageName}</div>
//                               <div className="text-sm text-slate-500">₹{p.totalPrice}</div>
//                               <div className="text-xs text-slate-400 mt-2">{p.description}</div>
//                               <div className="mt-3 flex flex-wrap gap-2">
//                                 {((p.tests || []) as any[]).slice(0, 4).map((t, idx) => (
//                                   <div key={idx} className="text-xs px-2 py-1 bg-slate-50 rounded">{getTestName(t)}</div>
//                                 ))}
//                               </div>
//                             </div>
//                             <div className="flex flex-col gap-2">
//                               <button onClick={() => openEditPackageModal(p)} className="px-2 py-1 rounded bg-amber-400 text-white text-xs">Edit</button>
//                               <button onClick={() => deletePackage(p._id)} className="px-2 py-1 rounded bg-red-500 text-white text-xs">Delete</button>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                       {packages.map((p) => (
//                         <div key={p._id} className="bg-white border rounded-xl p-4 shadow-sm">
//                           <div className="flex justify-between">
//                             <div>
//                               <div className="font-semibold">{p.packageName}</div>
//                               <div className="text-sm text-slate-500">₹{p.totalPrice}</div>
//                               <div className="text-xs text-slate-400 mt-1">{p.description}</div>
//                               <div className="mt-2 flex flex-wrap gap-2">
//                                 {((p.tests || []) as any[]).map((t: any, i: number) => (
//                                   <div key={i} className="text-xs px-2 py-1 bg-slate-50 rounded">{getTestName(t)}</div>
//                                 ))}
//                               </div>
//                             </div>
//                             <div className="flex flex-col gap-2">
//                               <button onClick={() => openEditPackageModal(p)} className="px-2 py-1 rounded bg-amber-400 text-white text-xs">Edit</button>
//                               <button onClick={() => deletePackage(p._id)} className="px-2 py-1 rounded bg-red-500 text-white text-xs">Delete</button>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   <div className="mt-3 text-right">
//                     <button onClick={() => setShowAllPackages((s) => !s)} className="text-sm text-amber-600 hover:underline">
//                       {showAllPackages ? "View Less" : `View All (${packages.length})`}
//                     </button>
//                   </div>
//                 </>
//               )}
//             </section>
//           </div>
//         </div>

//         {/* Floating Add Button (contextual) */}
//         <div className="fixed bottom-6 right-6 z-50">
//           <div className="flex flex-col gap-3 items-end">
//             <button
//               onClick={() => { setActiveTab("tests"); openAddTestModal(); }}
//               className="rounded-full w-14 h-14 bg-sky-600 shadow-lg text-white flex items-center justify-center hover:scale-105 transition"
//               title="Add Test"
//             >
//               +
//             </button>
//             <button
//               onClick={() => { setActiveTab("packages"); openAddPackageModal(); }}
//               className="rounded-full w-14 h-14 bg-amber-500 shadow-lg text-white flex items-center justify-center hover:scale-105 transition"
//               title="Create Package"
//             >
//               📦
//             </button>
//           </div>
//         </div>

//         {/* Modal (Add/Edit for Test & Package) */}
//         {modalOpen && (
//           <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4">
//             <div className="w-full max-w-2xl bg-white rounded-2xl p-6 shadow-lg">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-xl font-semibold">
//                   {activeTab === "tests" ? (isEditing ? "Edit Test" : "Add Test") : (isEditing ? "Edit Package" : "Create Package")}
//                 </h3>
//                 <button onClick={() => setModalOpen(false)} className="text-slate-500">Close</button>
//               </div>

//               {/* Test Form */}
//               {activeTab === "tests" ? (
//                 <form onSubmit={submitTest} className="space-y-3">
//                   <input name="testName" value={testForm.testName || ""} onChange={handleTestFormChange} placeholder="Test name" className="w-full rounded-lg border px-3 py-2" required />
//                   <div className="grid grid-cols-2 gap-3">
//                     <input name="price" type="number" value={testForm.price === undefined ? "" : testForm.price} onChange={handleTestFormChange} placeholder="Price (₹)" className="rounded-lg border px-3 py-2" required />
//                     <select name="category" value={testForm.category || ""} onChange={handleTestFormChange} className="rounded-lg border px-3 py-2">
//                       <option value="">Category</option>
//                       {categories.map((c) => (<option key={c} value={c}>{c}</option>))}
//                     </select>
//                   </div>

//                   {testForm.category === "Other" && (
//                     <input name="customCategory" value={testForm.customCategory || ""} onChange={handleTestFormChange} placeholder="Custom category" className="w-full rounded-lg border px-3 py-2" />
//                   )}

//                   <textarea name="description" value={testForm.description || ""} onChange={handleTestFormChange} placeholder="Description" className="w-full rounded-lg border px-3 py-2" rows={3} />
//                   <input name="precaution" value={testForm.precaution || ""} onChange={handleTestFormChange} placeholder="Precautions" className="w-full rounded-lg border px-3 py-2" />

//                   <div className="flex gap-3 mt-2">
//                     <button type="submit" className="bg-sky-600 text-white px-4 py-2 rounded-lg">{isEditing ? "Update Test" : "Add Test"}</button>
//                     <button type="button" onClick={() => { setModalOpen(false); }} className="bg-white border px-4 py-2 rounded-lg">Cancel</button>
//                   </div>
//                 </form>
//               ) : (
//                 // Package Form
//                 <form onSubmit={submitPackage} className="space-y-3">
//                   <input name="packageName" value={packageForm.packageName || ""} onChange={handlePackageFormChange} placeholder="Package name" className="w-full rounded-lg border px-3 py-2" required />
//                   <textarea name="description" value={packageForm.description || ""} onChange={handlePackageFormChange} placeholder="Short description" className="w-full rounded-lg border px-3 py-2" rows={2} />
//                   <input name="totalPrice" type="number" value={packageForm.totalPrice === undefined ? "" : packageForm.totalPrice} onChange={handlePackageFormChange} placeholder="Total price (₹)" className="w-full rounded-lg border px-3 py-2" required />

//                   <div>
//                     <p className="text-sm font-medium mb-2">Select tests</p>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto border p-2 rounded">
//                       {tests.length === 0 ? (
//                         <div className="text-sm text-slate-500">No tests available. Add tests first.</div>
//                       ) : (
//                         tests.map((t) => {
//                           const checked = ((packageForm.tests || []) as any[]).includes(t._id);
//                           return (
//                             <label key={t._id} className={`flex items-center gap-3 p-2 rounded ${checked ? "bg-slate-50" : ""}`}>
//                               <input type="checkbox" checked={checked} onChange={() => togglePackageTest(t._id!)} className="w-4 h-4" />
//                               <div>
//                                 <div className="font-medium text-sm">{t.testName}</div>
//                                 <div className="text-xs text-slate-500">₹{t.price}</div>
//                               </div>
//                             </label>
//                           );
//                         })
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex gap-3 mt-2">
//                     <button type="submit" className="bg-amber-500 text-white px-4 py-2 rounded-lg">{isEditing ? "Update Package" : "Create Package"}</button>
//                     <button type="button" onClick={() => setModalOpen(false)} className="bg-white border px-4 py-2 rounded-lg">Cancel</button>
//                   </div>
//                 </form>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LabManagementV2;



import React, { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Box, Edit3, Trash2 } from "lucide-react";

/**
 * LabManagementPro.tsx
 * - Professional dashboard layout for Tests & Packages
 * - Light theme, refined typographic scale
 * - Search & filter, stats, modal forms, view all + horizontal showcase
 *
 * Backend Routes used (matches your controller):
 * GET  /api/lab/getAllTestByLabId/:labId
 * POST /api/lab/addTest
 * PUT  /api/lab/updateLabTest/:testId
 * DELETE /api/lab/deleteLabTest/:testId
 *
 * POST /api/lab/addPackage
 * GET  /api/lab/getAllPackagesByLabId/:labId
 * PUT  /api/lab/updatePackage/:packageId
 * DELETE /api/lab/deletePackage/:packageId
 */

/* -------------------- Types -------------------- */
interface LabDashboardContext {
  labId: string | null;
}

interface Test {
  _id?: string;
  testName: string;
  price: number;
  precaution?: string;
  description?: string;
  category?: string;
  customCategory?: string;
}

interface Package {
  _id?: string;
  packageName: string;
  description?: string;
  totalPrice: number;
  tests: (string | Test)[];
}

/* -------------------- API -------------------- */
const API_BASE = "http://localhost:3000/api/lab";
const API = {
  getTestsByLab: (labId: string) => `${API_BASE}/getAllTestByLabId/${labId}`,
  addTest: () => `${API_BASE}/addTest`,
  updateTest: (testId: string) => `${API_BASE}/updateLabTest/${testId}`,
  deleteTest: (testId: string) => `${API_BASE}/deleteLabTest/${testId}`,

  addPackage: () => `${API_BASE}/addPackage`,
  getPackagesByLab: (labId: string) => `${API_BASE}/getAllPackagesByLabId/${labId}`,
  updatePackage: (packageId: string) => `${API_BASE}/updatePackage/${packageId}`,
  deletePackage: (packageId: string) => `${API_BASE}/deletePackage/${packageId}`,
};

/* -------------------- Constants -------------------- */
const categories = [
  "Liver",
  "Kidney",
  "Diabetes",
  "Fever",
  "Vitamin",
  "Pregnancy",
  "Heart",
  "Other",
];

/* -------------------- Component -------------------- */
const LabManagementPro: React.FC = () => {
  const { labId } = useOutletContext<LabDashboardContext>();

  // data
  const [tests, setTests] = useState<Test[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(false);

  // UI
  const [activeTab, setActiveTab] = useState<"tests" | "packages">("tests");
  const [showAllTests, setShowAllTests] = useState(false);
  const [showAllPackages, setShowAllPackages] = useState(false);

  // search & filter
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  // modal + forms
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // forms
  const [testForm, setTestForm] = useState<Partial<Test>>({
    testName: "",
    price: 0,
    description: "",
    precaution: "",
    category: "",
    customCategory: "",
  });

  const [packageForm, setPackageForm] = useState<Partial<Package>>({
    packageName: "",
    description: "",
    totalPrice: 0,
    tests: [],
  });

  /* -------------------- Effects -------------------- */
  useEffect(() => {
    if (!labId) return;
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labId]);

  const loadAll = async () => {
    if (!labId) return;
    setLoading(true);
    try {
      const [tRes, pRes] = await Promise.all([
        axios.get<{ tests: Test[] }>(API.getTestsByLab(labId)),
        axios.get<{ packages: Package[] }>(API.getPackagesByLab(labId)),
      ]);
      setTests(tRes.data.tests || []);
      setPackages(pRes.data.packages || []);
    } catch (err) {
      console.error("Load error:", err);
      alert("Unable to load tests/packages. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- Helpers -------------------- */
  const resetTestForm = () =>
    setTestForm({
      testName: "",
      price: 0,
      description: "",
      precaution: "",
      category: "",
      customCategory: "",
    });

  const resetPackageForm = () =>
    setPackageForm({
      packageName: "",
      description: "",
      totalPrice: 0,
      tests: [],
    });

  const getTestName = (t: any) => {
    if (!t) return "";
    return typeof t === "string" ? tests.find((x) => x._id === t)?.testName ?? "Test" : t.testName ?? "Test";
  };

  /* -------------------- Filtered lists -------------------- */
  const filteredTests = useMemo(() => {
    return tests.filter((t) => {
      const matchQuery =
        query.trim() === "" ||
        t.testName.toLowerCase().includes(query.toLowerCase()) ||
        (t.description || "").toLowerCase().includes(query.toLowerCase());
      const matchCategory = categoryFilter === "" || t.category === categoryFilter;
      return matchQuery && matchCategory;
    });
  }, [tests, query, categoryFilter]);

  const filteredPackages = useMemo(() => {
    return packages.filter((p) => {
      const matchQuery =
        query.trim() === "" ||
        p.packageName.toLowerCase().includes(query.toLowerCase()) ||
        (p.description || "").toLowerCase().includes(query.toLowerCase());
      return matchQuery;
    });
  }, [packages, query]);

  /* -------------------- Test CRUD -------------------- */
  const openAddTest = () => {
    setActiveTab("tests");
    setIsEditMode(false);
    setEditingId(null);
    resetTestForm();
    setModalOpen(true);
  };

  const openEditTest = (t: Test) => {
    setActiveTab("tests");
    setIsEditMode(true);
    setEditingId(t._id || null);
    setTestForm({
      testName: t.testName,
      price: t.price,
      description: t.description,
      precaution: t.precaution,
      category: t.category,
      customCategory: t.customCategory,
    });
    setModalOpen(true);
  };

  const submitTest = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!labId) return alert("Lab ID missing");
    if (!testForm.testName || testForm.price === undefined) return alert("Name and price required");

    try {
      if (isEditMode && editingId) {
        const payload = {
          testName: testForm.testName,
          price: Number(testForm.price),
          description: testForm.description || "",
          precaution: testForm.precaution || "",
          category: testForm.category === "Other" ? testForm.customCategory || "Other" : testForm.category,
        };
        const res = await axios.put<{ updatedTest?: Test }>(API.updateTest(editingId), payload);
        const updated = res.data?.updatedTest ?? ({ ...(payload as any), _id: editingId } as Test);
        setTests((prev) => prev.map((x) => (x._id === editingId ? updated : x)));
        alert("Test updated");
      } else {
        const payload = [
          {
            testName: testForm.testName,
            price: Number(testForm.price),
            description: testForm.description || "",
            precaution: testForm.precaution || "",
            category: testForm.category === "Other" ? testForm.customCategory || "Other" : testForm.category,
            labId,
          },
        ];
        interface AddTestResponse {
          tests: Test[];
        }
        const res = await axios.post<AddTestResponse>(API.addTest(), payload);
        const created = res.data.tests || [];
        setTests((prev) => [...created, ...prev]);
        alert("Test added");
      }
      setModalOpen(false);
      loadAll();
    } catch (err) {
      console.error("Test submit error:", err);
      alert("Failed to save test");
    }
  };

  const removeTest = async (testId?: string) => {
    if (!testId) return;
    if (!confirm("Delete test? This also removes it from any package.")) return;
    try {
      await axios.delete(API.deleteTest(testId));
      setTests((prev) => prev.filter((x) => x._id !== testId));
      // remove references in packages UI
      setPackages((prev) => prev.map((p) => ({ ...p, tests: (p.tests || []).filter((t) => (typeof t === "string" ? t !== testId : (t as any)._id !== testId)) })));
      alert("Deleted");
    } catch (err) {
      console.error("Delete test error:", err);
      alert("Failed to delete test");
    }
  };

  /* -------------------- Package CRUD -------------------- */
  const openAddPackage = () => {
    setActiveTab("packages");
    setIsEditMode(false);
    setEditingId(null);
    resetPackageForm();
    setModalOpen(true);
  };

  const openEditPackage = (p: Package) => {
    setActiveTab("packages");
    setIsEditMode(true);
    setEditingId(p._id || null);
    const testIds = (p.tests || [])
      .map((t) => (typeof t === "string" ? t : (t as Test)._id))
      .filter((id): id is string => id !== undefined);
    setPackageForm({
      packageName: p.packageName,
      description: p.description,
      totalPrice: p.totalPrice,
      tests: testIds,
    });
    setModalOpen(true);
  };

  const togglePackageTest = (testId: string) => {
    setPackageForm((s) => {
      const curr = (s.tests as string[]) || [];
      return { ...s, tests: curr.includes(testId) ? curr.filter((id) => id !== testId) : [...curr, testId] };
    });
  };

  const submitPackage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!labId) return alert("Lab ID missing");
    if (!packageForm.packageName || packageForm.totalPrice === undefined) return alert("Name and price required");
    if (!packageForm.tests || (packageForm.tests as string[]).length === 0) return alert("Select tests");

    try {
      const payload = {
        packageName: packageForm.packageName,
        description: packageForm.description || "",
        totalPrice: Number(packageForm.totalPrice),
        testIds: (packageForm.tests || []).map((t) => (typeof t === "string" ? t : (t as any)._id)),
        labId,
      };

      if (isEditMode && editingId) {
        await axios.put(API.updatePackage(editingId), payload);
        alert("Package updated");
      } else {
        await axios.post(API.addPackage(), payload);
        alert("Package created");
      }
      setModalOpen(false);
      loadAll();
    } catch (err) {
      console.error("Package submit error:", err);
      alert("Failed to save package");
    }
  };

  const removePackage = async (packageId?: string) => {
    if (!packageId) return;
    if (!confirm("Delete package?")) return;
    try {
      await axios.delete(API.deletePackage(packageId));
      setPackages((prev) => prev.filter((p) => p._id !== packageId));
      alert("Deleted package");
    } catch (err) {
      console.error("Delete package error:", err);
      alert("Failed to delete package");
    }
  };

  /* -------------------- JSX -------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800">Lab Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">Professional management for tests & packages.</p>
          </div>

          <div className="flex gap-3 items-center">
            <div className="flex items-center bg-white rounded-full border px-3 py-1 shadow-sm">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tests or packages..."
                className="outline-none text-sm w-64"
              />
            </div>

            <div className="hidden md:flex items-center gap-2">
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="rounded-md border px-2 py-1 text-sm">
                <option value="">All categories</option>
                {categories.map((c) => (
                  <option value={c} key={c}>{c}</option>
                ))}
              </select>
            </div>

            <button onClick={openAddTest} className="bg-sky-600 hover:bg-sky-700 text-white rounded-lg px-4 py-2 inline-flex items-center gap-2 shadow">
              <Plus className="w-4 h-4" /> Add Test
            </button>
            <button onClick={openAddPackage} className="bg-amber-500 hover:bg-amber-600 text-white rounded-lg px-4 py-2 inline-flex items-center gap-2 shadow">
              <Box className="w-4 h-4" /> Create Package
            </button>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow border flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-500">Total Tests</div>
              <div className="text-2xl font-bold text-slate-800">{tests.length}</div>
            </div>
            <div className="text-sky-600 text-2xl">🧪</div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow border flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-500">Total Packages</div>
              <div className="text-2xl font-bold text-slate-800">{packages.length}</div>
            </div>
            <div className="text-amber-600 text-2xl">🎁</div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow border">
            <div className="text-sm text-slate-500">Search & Filters</div>
            <div className="mt-2 text-sm text-slate-600">Use search box or category dropdown to filter lists.</div>
          </div>
        </div>

        {/* Tab Controls */}
        <nav className="flex items-center gap-4 mb-4">
          <button
            onClick={() => setActiveTab("tests")}
            className={`py-2 px-3 rounded-md text-sm font-semibold ${activeTab === "tests" ? "bg-white shadow" : "text-slate-700"}`}
          >
            Tests
          </button>
          <button
            onClick={() => setActiveTab("packages")}
            className={`py-2 px-3 rounded-md text-sm font-semibold ${activeTab === "packages" ? "bg-white shadow" : "text-slate-700"}`}
          >
            Packages
          </button>
        </nav>

        {/* Main content: Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tests showcase */}
          <section className="bg-white rounded-2xl p-5 shadow border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Tests</h3>
              <div className="flex items-center gap-3">
                <div className="text-sm text-slate-500 hidden md:block">{filteredTests.length} results</div>
                <button className="px-3 py-1 rounded-md text-sm text-slate-600" onClick={() => setShowAllTests((s) => !s)}>
                  {showAllTests ? "View Less" : `View All (${filteredTests.length})`}
                </button>
              </div>
            </div>

            {loading ? (
              <div className="text-slate-500">Loading...</div>
            ) : filteredTests.length === 0 ? (
              <div className="text-sm text-slate-500">No tests found.</div>
            ) : (
              <>
                {/* horizontal showroom or grid */}
                {!showAllTests ? (
                  <div className="relative">
                    <div className="absolute left-0 top-0 h-full w-10 pointer-events-none" style={{ background: "linear-gradient(90deg, rgba(255,255,255,1), rgba(255,255,255,0))" }} />
                    <div className="absolute right-0 top-0 h-full w-10 pointer-events-none" style={{ background: "linear-gradient(270deg, rgba(255,255,255,1), rgba(255,255,255,0))" }} />

                    <div className="flex gap-4 overflow-x-auto py-2 px-1 scrollbar-hide">
                      {filteredTests.slice(0, 4).map((t) => (
                        <motion.article
                          key={t._id}
                          className="min-w-[300px] bg-white border rounded-xl p-4 shadow-sm flex flex-col justify-between"
                          whileHover={{ y: -4 }}
                        >
                          <div>
                            <div className="font-semibold text-slate-800">{t.testName}</div>
                            <div className="text-sm text-slate-500">₹{t.price}</div>
                            <div className="text-xs text-slate-400 mt-2">{t.description}</div>
                            <div className="mt-3 text-xs text-slate-500">Category: {t.category}</div>
                          </div>

                          <div className="mt-4 flex justify-end gap-2">
                            <button onClick={() => openEditTest(t)} className="inline-flex items-center gap-2 px-2 py-1 rounded bg-amber-400 text-white text-xs">
                              <Edit3 className="w-3 h-3" /> Edit
                            </button>
                            <button onClick={() => removeTest(t._id)} className="inline-flex items-center gap-2 px-2 py-1 rounded bg-red-500 text-white text-xs">
                              <Trash2 className="w-3 h-3" /> Delete
                            </button>
                          </div>
                        </motion.article>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                    {filteredTests.map((t) => (
                      <motion.article key={t._id} className="bg-white border rounded-xl p-4 shadow-sm" whileHover={{ y: -4 }}>
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-semibold">{t.testName}</div>
                            <div className="text-sm text-slate-500">₹{t.price}</div>
                            <div className="text-xs text-slate-400 mt-1">{t.description}</div>
                            <div className="mt-2 text-xs text-slate-500">Category: {t.category}</div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <button onClick={() => openEditTest(t)} className="px-2 py-1 rounded bg-amber-400 text-white text-xs inline-flex items-center gap-2"><Edit3 className="w-3 h-3" /> Edit</button>
                            <button onClick={() => removeTest(t._id)} className="px-2 py-1 rounded bg-red-500 text-white text-xs inline-flex items-center gap-2"><Trash2 className="w-3 h-3" /> Delete</button>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                )}
              </>
            )}
          </section>

          {/* Packages showcase */}
          <section className="bg-white rounded-2xl p-5 shadow border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Packages</h3>
              <div className="flex items-center gap-3">
                <div className="text-sm text-slate-500 hidden md:block">{filteredPackages.length} results</div>
                <button className="px-3 py-1 rounded-md text-sm text-amber-600" onClick={() => setShowAllPackages((s) => !s)}>
                  {showAllPackages ? "View Less" : `View All (${filteredPackages.length})`}
                </button>
              </div>
            </div>

            {filteredPackages.length === 0 ? (
              <div className="text-sm text-slate-500">No packages created yet.</div>
            ) : (
              <>
                {!showAllPackages ? (
                  <div className="flex gap-4 overflow-x-auto py-2 px-1 scrollbar-hide">
                    {filteredPackages.slice(0, 4).map((p) => (
                      <motion.article key={p._id} className="min-w-[340px] bg-white border rounded-xl p-4 shadow-sm" whileHover={{ y: -4 }}>
                        <div>
                          <div className="font-semibold text-slate-800">{p.packageName}</div>
                          <div className="text-sm text-slate-500">₹{p.totalPrice}</div>
                          <div className="text-xs text-slate-400 mt-1">{p.description}</div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {((p.tests || []) as any[]).slice(0, 5).map((t: any, i: number) => (
                              <span key={i} className="text-xs bg-slate-50 rounded px-2 py-1">{getTestName(t)}</span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4 flex justify-end gap-2">
                          <button onClick={() => openEditPackage(p)} className="inline-flex items-center gap-2 px-2 py-1 rounded bg-amber-400 text-white text-xs"><Edit3 className="w-3 h-3" /> Edit</button>
                          <button onClick={() => removePackage(p._id)} className="inline-flex items-center gap-2 px-2 py-1 rounded bg-red-500 text-white text-xs"><Trash2 className="w-3 h-3" /> Delete</button>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                    {filteredPackages.map((p) => (
                      <motion.article key={p._id} className="bg-white border rounded-xl p-4 shadow-sm" whileHover={{ y: -4 }}>
                        <div className="flex justify-between">
                          <div>
                            <div className="font-semibold">{p.packageName}</div>
                            <div className="text-sm text-slate-500">₹{p.totalPrice}</div>
                            <div className="text-xs text-slate-400 mt-1">{p.description}</div>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {((p.tests || []) as any[]).map((t: any, i: number) => (
                                <span key={i} className="text-xs bg-slate-50 rounded px-2 py-1">{getTestName(t)}</span>
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <button onClick={() => openEditPackage(p)} className="px-2 py-1 rounded bg-amber-400 text-white text-xs inline-flex items-center gap-2"><Edit3 className="w-3 h-3" /> Edit</button>
                            <button onClick={() => removePackage(p._id)} className="px-2 py-1 rounded bg-red-500 text-white text-xs inline-flex items-center gap-2"><Trash2 className="w-3 h-3" /> Delete</button>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                )}
              </>
            )}
          </section>
        </div>

        {/* Modal: Add/Edit Test or Package */}
        <AnimatePresence>
          {modalOpen && (
            <motion.div
              key="modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
            >
              <motion.div initial={{ y: 20, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 10, scale: 0.98 }} className="w-full max-w-2xl bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold">{activeTab === "tests" ? (isEditMode ? "Edit Test" : "Add Test") : (isEditMode ? "Edit Package" : "Create Package")}</h4>
                  <button onClick={() => setModalOpen(false)} className="text-slate-500">Close</button>
                </div>

                {activeTab === "tests" ? (
                  <form onSubmit={submitTest} className="space-y-3">
                    <input name="testName" value={testForm.testName || ""} onChange={(e) => setTestForm((s) => ({ ...s, testName: e.target.value }))} placeholder="Test name" className="w-full rounded-md border px-3 py-2" required />
                    <div className="grid grid-cols-2 gap-3">
                      <input name="price" type="number" value={testForm.price === undefined ? "" : testForm.price} onChange={(e) => setTestForm((s) => ({ ...s, price: Number(e.target.value) }))} placeholder="Price (₹)" className="rounded-md border px-3 py-2" required />
                      <select name="category" value={testForm.category || ""} onChange={(e) => setTestForm((s) => ({ ...s, category: e.target.value }))} className="rounded-md border px-3 py-2">
                        <option value="">Category</option>
                        {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    {testForm.category === "Other" && <input name="customCategory" value={testForm.customCategory || ""} onChange={(e) => setTestForm((s) => ({ ...s, customCategory: e.target.value }))} placeholder="Custom category" className="w-full rounded-md border px-3 py-2" />}
                    <textarea name="description" value={testForm.description || ""} onChange={(e) => setTestForm((s) => ({ ...s, description: e.target.value }))} placeholder="Description (optional)" className="w-full rounded-md border px-3 py-2" rows={3} />
                    <input name="precaution" value={testForm.precaution || ""} onChange={(e) => setTestForm((s) => ({ ...s, precaution: e.target.value }))} placeholder="Precautions (optional)" className="w-full rounded-md border px-3 py-2" />

                    <div className="flex justify-end gap-3">
                      <button type="button" onClick={() => { setModalOpen(false); }} className="px-4 py-2 rounded-md border">Cancel</button>
                      <button type="submit" className="px-4 py-2 rounded-md bg-sky-600 text-white">{isEditMode ? "Update Test" : "Add Test"}</button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={submitPackage} className="space-y-3">
                    <input name="packageName" value={packageForm.packageName || ""} onChange={(e) => setPackageForm((s) => ({ ...s, packageName: e.target.value }))} placeholder="Package name" className="w-full rounded-md border px-3 py-2" required />
                    <textarea name="description" value={packageForm.description || ""} onChange={(e) => setPackageForm((s) => ({ ...s, description: e.target.value }))} placeholder="Short description" className="w-full rounded-md border px-3 py-2" rows={2} />
                    <input name="totalPrice" type="number" value={packageForm.totalPrice === undefined ? "" : packageForm.totalPrice} onChange={(e) => setPackageForm((s) => ({ ...s, totalPrice: Number(e.target.value) }))} placeholder="Total price (₹)" className="w-full rounded-md border px-3 py-2" required />

                    <div>
                      <div className="text-sm font-medium mb-2">Select tests to include</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto border rounded p-2">
                        {tests.length === 0 && <div className="text-sm text-slate-500">No tests — add tests first.</div>}
                        {tests.map((t) => {
                          const checked = ((packageForm.tests || []) as any[]).includes(t._id);
                          return (
                            <label key={t._id} className={`flex items-center gap-3 p-2 rounded ${checked ? "bg-slate-50" : ""}`}>
                              <input type="checkbox" checked={checked} onChange={() => togglePackageTest(t._id!)} className="w-4 h-4" />
                              <div>
                                <div className="font-medium text-sm">{t.testName}</div>
                                <div className="text-xs text-slate-500">₹{t.price}</div>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex justify-end gap-3">
                      <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-md border">Cancel</button>
                      <button type="submit" className="px-4 py-2 rounded-md bg-amber-500 text-white">{isEditMode ? "Update Package" : "Create Package"}</button>
                    </div>
                  </form>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LabManagementPro;

