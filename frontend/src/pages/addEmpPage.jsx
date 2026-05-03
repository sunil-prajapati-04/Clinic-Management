import React, { useState } from "react";
import { Input } from "@heroui/react";
import { Button } from "@heroui/react";
import { useAdminStore } from "../store/adminStore";
import toast from "react-hot-toast";
import { EyeOff, Eye, Loader2, User, Mail, Phone, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AddEmployee() {
  const { addEmp, isAddingEmp } = useAdminStore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    destination: "",
    degree: "",
    phone: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    if (!formData.name.trim()) return toast.error("Name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    if (!/^[0-9]{10}$/.test(formData.phone))
      return toast.error("Invalid phone number");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      addEmp(formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-indigo-900 to-purple-900 px-4">
      
      <div className="w-full max-w-lg backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">
            Add Employee 👨‍💼
          </h2>
          <p className="text-gray-300 text-sm mt-2">
            Fill details to onboard new employee
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Full Name"
              className="pl-10 w-full bg-white/20 border-none text-white placeholder-gray-300 focus:ring-2 focus:ring-indigo-500"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <Input
              type="email"
              placeholder="Email Address"
              className="pl-10 w-full bg-white/20 border-none text-white placeholder-gray-300 focus:ring-2 focus:ring-indigo-500"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="pr-10 w-full bg-white/20 border-none text-white placeholder-gray-300 focus:ring-2 focus:ring-indigo-500"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Role */}
          <div className="relative">
            <Briefcase className="absolute  left-3 top-3 text-gray-400" size={18} />
            <select
              className="w-full pl-10 w-full p-2.5 rounded-lg bg-white/20 text-white border-none focus:ring-2 focus:ring-indigo-500"
              value={formData.destination}
              onChange={(e) =>
                setFormData({ ...formData, destination: e.target.value })
              }
            >
              <option className="text-black" value="">Select Role</option>
              <option className="text-black" value="doctor">Doctor</option>
              <option className="text-black" value="nurse">Nurse</option>
              <option className="text-black" value="compounder">Compounder</option>
              <option className="text-black" value="receptionist">Receptionist</option>
            </select>
          </div>

          {/* Degree */}
          <Input
            type="text"
            placeholder="Degree (e.g. MBBS)"
            className="bg-white/20 w-full border-none text-white placeholder-gray-300 focus:ring-2 focus:ring-indigo-500"
            value={formData.degree}
            onChange={(e) =>
              setFormData({ ...formData, degree: e.target.value })
            }
          />

          {/* Phone */}
          <div className="relative">
            <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
            <Input
              type="tel"
              placeholder="Phone Number"
              className="pl-10 w-full bg-white/20 border-none text-white placeholder-gray-300 focus:ring-2 focus:ring-indigo-500"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isAddingEmp}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 transition-all font-semibold"
          >
            {isAddingEmp ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin" size={18} />
                Adding...
              </div>
            ) : (
              "Add Employee"
            )}
          </Button>
        </form>

      </div>
    </div>
  );
}

export default AddEmployee;