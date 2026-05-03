import React from "react";
import { UserRound } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

function ProfileTab({ className }) {
  const { authUser } = useAuthStore();

  return (
    <NavLink to="/profile" className={className}>
      <UserRound size={17} />
      <span>Profile</span>
      {authUser?.name && (
        <span className="hidden max-w-24 truncate rounded bg-white/70 px-2 py-0.5 text-xs text-slate-500 sm:inline">
          {authUser.name}
        </span>
      )}
    </NavLink>
  );
}

export default ProfileTab;
