import React from "react";
import { X } from "lucide-react";

interface FormData {
  name: string;
  age: string;
  gender: string;
  aadhar: string;
  contact: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  loading?: boolean;
  initialData?: Partial<FormData>; // Added for pre-filling form
}

const AppointmentFormModal: React.FC<Props> = ({ 
  open, 
  onClose, 
  onSubmit, 
  loading = false,
  initialData 
}) => {
  const [formData, setFormData] = React.useState<FormData>({
    name: "",
    age: "",
    gender: "Male",
    aadhar: "",
    contact: "",
  });

  const [errors, setErrors] = React.useState<Partial<FormData>>({});

  // Reset form when modal opens/closes or when initialData changes
  React.useEffect(() => {
    if (open) {
      setFormData(prev => ({
        name: initialData?.name || prev.name,
        age: initialData?.age || prev.age,
        gender: initialData?.gender || prev.gender,
        aadhar: initialData?.aadhar || prev.aadhar,
        contact: initialData?.contact || prev.contact,
      }));
      setErrors({});
    }
  }, [open, initialData]);

  // Close on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Age validation
    if (!formData.age) {
      newErrors.age = "Age is required";
    } else {
      const ageNum = parseInt(formData.age);
      if (ageNum < 1 || ageNum > 120) {
        newErrors.age = "Age must be between 1 and 120";
      }
    }

    // Aadhar validation (12 digits)
    if (!formData.aadhar) {
      newErrors.aadhar = "Aadhar number is required";
    } else if (!/^\d{12}$/.test(formData.aadhar.replace(/\s/g, ''))) {
      newErrors.aadhar = "Aadhar must be 12 digits";
    }

    // Contact validation (10 digits)
    if (!formData.contact) {
      newErrors.contact = "Contact number is required";
    } else if (!/^\d{10}$/.test(formData.contact.replace(/\s/g, ''))) {
      newErrors.contact = "Contact must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Format Aadhar number (add spaces for readability)
    if (name === "aadhar") {
      const cleaned = value.replace(/\D/g, '').slice(0, 12);
      const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
      setFormData(prev => ({ ...prev, [name]: formatted }));
    }
    // Format contact number
    else if (name === "contact") {
      const cleaned = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: cleaned }));
    }
    // For age, only allow numbers
    else if (name === "age") {
      const cleaned = value.replace(/\D/g, '').slice(0, 3);
      setFormData(prev => ({ ...prev, [name]: cleaned }));
    }
    else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Remove formatting spaces before submitting
      const submitData = {
        ...formData,
        aadhar: formData.aadhar.replace(/\s/g, ''),
        contact: formData.contact.replace(/\s/g, '')
      };
      onSubmit(submitData);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto relative animate-in fade-in-90 zoom-in-90 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">
            Appointment Details
          </h2>
          <button
            onClick={onClose}
            disabled={loading}
            className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 transition-colors rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              id="name"
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              placeholder="Enter your full name"
              className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#28328C] focus:border-[#28328C] outline-none transition-colors ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } ${loading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Age and Gender */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                Age *
              </label>
              <input
                id="age"
                type="text"
                name="age"
                required
                value={formData.age}
                onChange={handleChange}
                disabled={loading}
                placeholder="Age"
                className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#28328C] focus:border-[#28328C] outline-none transition-colors ${
                  errors.age ? 'border-red-500' : 'border-gray-300'
                } ${loading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
              />
              {errors.age && (
                <p className="text-red-500 text-xs mt-1">{errors.age}</p>
              )}
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                Gender *
              </label>
              <select
                id="gender"
                name="gender"
                required
                value={formData.gender}
                onChange={handleChange}
                disabled={loading}
                className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#28328C] focus:border-[#28328C] outline-none transition-colors ${
                  loading ? 'bg-gray-100 cursor-not-allowed' : 'border-gray-300'
                }`}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>

          {/* Aadhar Field */}
          <div>
            <label htmlFor="aadhar" className="block text-sm font-medium text-gray-700 mb-1">
              Aadhar Number *
            </label>
            <input
              id="aadhar"
              type="text"
              name="aadhar"
              required
              value={formData.aadhar}
              onChange={handleChange}
              disabled={loading}
              placeholder="1234 5678 9012"
              maxLength={14}
              className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#28328C] focus:border-[#28328C] outline-none transition-colors ${
                errors.aadhar ? 'border-red-500' : 'border-gray-300'
              } ${loading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />
            {errors.aadhar && (
              <p className="text-red-500 text-xs mt-1">{errors.aadhar}</p>
            )}
          </div>

          {/* Contact Field */}
          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number *
            </label>
            <input
              id="contact"
              type="text"
              name="contact"
              required
              value={formData.contact}
              onChange={handleChange}
              disabled={loading}
              placeholder="9876543210"
              maxLength={10}
              className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#28328C] focus:border-[#28328C] outline-none transition-colors ${
                errors.contact ? 'border-red-500' : 'border-gray-300'
              } ${loading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />
            {errors.contact && (
              <p className="text-red-500 text-xs mt-1">{errors.contact}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition-all flex items-center justify-center ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#28328C] hover:bg-[#1e2675] transform hover:scale-[1.02] active:scale-[0.98]"
            }`}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Booking Appointment...
              </>
            ) : (
              "Book Appointment"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentFormModal;