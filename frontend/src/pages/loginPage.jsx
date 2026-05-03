import React, { useState } from "react";
import { Button, Input } from "@heroui/react";
import { EyeOff, Eye, Loader2 } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import DoctorImg from "../assets/doctorImg.png";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { login, isSigningIn } = useAuthStore();

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      login(formData);
    }
  };

  return (
    <div className="min-h-screen flex bg-linear-to-br from-blue-500 via-purple-500 to-pink-500">

      <div className="hidden md:flex w-[30%] items-center justify-center p-6">
        <img
          src={DoctorImg}
          alt="Doctor"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex w-full md:w-[70%] items-center justify-center p-6">
        
        <div className="w-full max-w-lg bg-white/90 backdrop-blur-lg dark:bg-gray-900 shadow-2xl rounded-3xl p-10">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
              Welcome Back 😀
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Login to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email */}
            <div>
              <label className="text-sm text-gray-700 dark:text-gray-300">
                Email
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="you@example.com"
                className=" w-full mt-1"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-700 dark:text-gray-300">
                Password
              </label>

              <div className="relative mt-1">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="••••••••"
                  className="w-full pr-10"
                />

                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Button */}
            <Button
              type="submit"
              disabled={isSigningIn}
              className="w-full py-3 text-lg rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              {isSigningIn ? (
                <>
                  <Loader2 className="animate-spin mr-2 inline" />
                  Loading...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Don’t have an account?{" "}
            <span
              onClick={() => (window.location.href = "/signup")}
              className="text-indigo-600 cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;