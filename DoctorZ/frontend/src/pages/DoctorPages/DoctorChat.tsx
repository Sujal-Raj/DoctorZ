
import React, { useState } from "react";

interface Message {
  id: number;
  sender: "Doctor" | "Patient";
  text: string;
  time: string;
  status?: "delivered" | "seen"; // Only for doctor messages
}

const DoctorChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "Doctor", text: "Hello! How are you feeling today?", time: "10:00 AM", status: "seen" },
    { id: 2, sender: "Patient", text: "Good morning doctor, I’m feeling a bit better.", time: "10:02 AM" },
    { id: 3, sender: "Doctor", text: "That’s great! Did you take your medicines on time?", time: "10:05 AM", status: "delivered" },
    { id: 4, sender: "Patient", text: "Yes, I followed your prescription.", time: "10:06 AM" },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const newMsg: Message = {
      id: messages.length + 1,
      sender: "Doctor",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "delivered",
    };
    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <div className="mb-4 text-gray-700"> Doctor Consultation Room</div>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "Doctor" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg shadow 
                ${msg.sender === "Doctor" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"}`}
            >
              <p className="font-semibold text-sm">{msg.sender}</p>
              <p>{msg.text}</p>
              <div className="text-xs flex items-center justify-end mt-1 opacity-80">
                <span>{msg.time}</span>
                {msg.sender === "Doctor" && (
                  <span className="ml-2">
                    {msg.status === "delivered" ? "✓" : "✓✓"}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-4 bg-white flex items-center border-t">
        <input
          type="text"
          className="flex-1 border rounded-lg px-3 py-2 mr-2"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default DoctorChat;
