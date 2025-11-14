// import React, { useEffect, useState, useRef } from "react";
// import { useParams, useLocation } from "react-router-dom";
// import io from "socket.io-client";
// import api from "../../Services/mainApi";

// // Initialize socket outside component to avoid multiple connections
// const socket = io("http://localhost:3000", {
//   transports: ["websocket"],
//   withCredentials: true,
// });

// const DoctorChat = () => {
//   const { roomId } = useParams(); // gets from path `/doctor-chat/:roomId`
//   const location = useLocation();
//   const { patient, doctorId } = location.state || {};
//   // Set user id: usually from auth context, but fallback for example
//   const userId = doctorId || "doctor"; 

//   const [messages, setMessages] = useState([]);
//   const [msg, setMsg] = useState("");
//   const chatEndRef = useRef(null);

//   // Fetch chat history
//     // useEffect(() => {
//     //   if (roomId) {
//     //     api.get(`/api/message/${roomId}`).then(res => {
//     //       setMessages(res.data.messages || []);
//     //     });
//     //   }
//     // }, [roomId]);

//   // Handle socket events
//   useEffect(() => {
//     if (!roomId) return;

//     socket.emit("joinRoom", roomId);

//     socket.on("receiveMessage", (data) => {
//       setMessages(prev =>
//         [...prev, { ...data, senderId: data.senderId, timestamp: new Date() }]
//       );
//     });

//     return () => {
//       socket.off("receiveMessage");
//       // socket.emit("disconnect");
//     };
//   }, [roomId]);

//   // keep scroll at the bottom on new message
//   useEffect(() => {
//     if (chatEndRef.current) {
//       chatEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   const sendMessage = () => {
//     if (!msg.trim()) return;
//     const messageData = { roomId, senderId: userId, message: msg };
//     socket.emit("sendMessage", messageData);
//     setMessages((prev) => [...prev, { ...messageData, timestamp: new Date() }]);
//     setMsg("");
//   };

//   return (
//     <div className="h-full flex flex-col border rounded max-w-lg mx-auto mt-4 shadow-lg bg-white">
//       <div className="p-4 font-bold border-b bg-gray-100">Chat with Patient</div>
//       <div className="flex-1 overflow-y-auto p-4" style={{ minHeight: "400px" }}>
//         {messages.map((m, i) => (
//           <div
//             key={i}
//             className={`mb-2 flex ${m.senderId === userId ? "justify-end" : "justify-start"}`}
//           >
//             <div
//               className={`px-3 py-2 rounded ${
//                 m.senderId === userId ? "bg-blue-500 text-white" : "bg-gray-200"
//               }`}
//             >
//               {m.message}
//             </div>
//           </div>
//         ))}
//         <div ref={chatEndRef} />
//       </div>
//       <div className="flex p-2 border-t">
//         <input
//           className="flex-1 border p-2 rounded"
//           value={msg}
//           onChange={(e) => setMsg(e.target.value)}
//           placeholder="Type your message..."
//           onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
//         />
//         <button
//           className="ml-2 px-4 py-2 bg-blue-500 text-white rounded shadow"
//           onClick={sendMessage}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DoctorChat;
