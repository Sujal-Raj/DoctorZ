import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import api from "../../Services/mainApi";
import { CalendarDays, Phone, User, FileText } from "lucide-react";
import { Link } from "react-router-dom";

interface Prescription {
  _id: string;
  doctorId: {
    fullName: string;
    MobileNo: string;
  };
  bookingId: {
    dateTime: string;
  };
  pdfUrl: string;
}

const UserPrescription = () => {
  const { user } = useContext(AuthContext);
  const aadhar = user?.aadhar;

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const res = await api.get<{ prescriptions: Prescription[] }>(`/api/patient/getUserPrescription/${aadhar}`);
        setPrescriptions(res.data.prescriptions);
      } catch (err) {
        console.error(err);
      }
    };

    if (aadhar) fetchPrescription();
  }, [aadhar]);

  return (
    <div className="p-5">

      <h2 className="text-xl font-semibold mb-4">My Prescriptions</h2>

      {prescriptions.length === 0 ? (
        <p className="text-gray-500">No prescriptions found.</p>
      ) : (
        <div className="space-y-4">
          {prescriptions.map((item) => (
            <div
              key={item._id}
              className="border p-4 rounded-lg shadow-sm bg-white"
            >
              {/* Doctor Info */}
              <div className="flex items-center gap-3 mb-2">
                <User size={20} className="text-blue-600" />
                <p className="font-medium text-gray-800">
                  Dr. {item.doctorId.fullName}
                </p>
              </div>

              {/* Doctor Mobile */}
              <div className="flex items-center gap-3 mb-2">
                <Phone size={20} className="text-green-600" />
                <p className="text-gray-700">{item.doctorId.MobileNo}</p>
              </div>

              {/* Appointment Date */}
              <div className="flex items-center gap-3 mb-2">
                <CalendarDays size={20} className="text-purple-600" />
                <p className="text-gray-700">
                  {new Date(item.bookingId.dateTime).toLocaleDateString()} —{" "}
                  {new Date(item.bookingId.dateTime).toLocaleTimeString()}
                </p>
              </div>

              {/* View Prescription */}
              <div className="flex flex-col ">
              <Link
                to={item.pdfUrl}
                target="_blank"
                className="inline-flex items-center gap-2 text-blue-600 mt-3 font-medium hover:underline"
              >
                <FileText size={20} />
                View Prescription
              </Link>
              {/* Download Prescription */}

</div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPrescription;
