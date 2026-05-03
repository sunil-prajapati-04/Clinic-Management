import React from "react";
import { Home, LayoutDashboard } from "lucide-react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./logoutButton";
import ProfileTab from "./profileTab";

function Navbar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition hover:bg-white hover:text-indigo-600 hover:shadow-sm ${
      isActive
        ? "bg-white text-indigo-600 shadow-sm"
        : "text-slate-700"
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-lg font-bold text-white shadow-sm">
            S
          </div>
          <span className="text-xl font-semibold text-slate-900">SBC</span>
        </NavLink>

        <div className="flex flex-wrap items-center justify-end gap-2 rounded-lg bg-slate-100 p-1">
          <NavLink to="/" className={linkClass}>
            <Home size={17} />
            Home
          </NavLink>
          <NavLink to="/dashboard" className={linkClass}>
            <LayoutDashboard size={17} />
            Dashboard
          </NavLink>
          <ProfileTab className={linkClass} />
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
