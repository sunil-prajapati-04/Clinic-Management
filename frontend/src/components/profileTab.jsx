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
    </NavLink>
  );
}

export default ProfileTab;
