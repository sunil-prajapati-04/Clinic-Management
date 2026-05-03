import React from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

function LogoutButton() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-white hover:text-rose-600 hover:shadow-sm"
    >
      <LogOut size={17} />
      Logout
    </button>
  );
}

export default LogoutButton;
