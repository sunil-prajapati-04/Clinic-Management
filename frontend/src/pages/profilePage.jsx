import React from "react";
import {
  Briefcase,
  CalendarClock,
  GraduationCap,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Navbar from "../components/navbar";
import { useAuthStore } from "../store/authStore";

const formatRole = (role) => {
  if (!role) return "Not assigned";
  return role === "reciptionist" ? "Receptionist" : role;
};

const formatDate = (date) => {
  if (!date) return "Not available";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

function ProfileInfo({ icon: Icon, label, value, compact = false }) {
  return (
    <div
      className={`rounded-lg border border-slate-200 p-4 ${
        compact ? "bg-slate-50" : "bg-white shadow-sm"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
          <Icon size={19} />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {label}
          </p>
          <p className="mt-1 truncate text-sm font-semibold text-slate-900">
            {value || "Not available"}
          </p>
        </div>
      </div>
    </div>
  );
}

function ProfilePage() {
  const { authUser } = useAuthStore();
  const role = formatRole(authUser?.destination);
  const initial = authUser?.name?.charAt(0)?.toUpperCase() || "S";

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-indigo-600 text-2xl font-bold text-white shadow-sm">
                {initial}
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                  Employee Profile
                </p>
                <h1 className="mt-1 text-3xl font-bold text-slate-950">
                  {authUser?.name || "Employee"}
                </h1>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="rounded-md bg-indigo-50 px-3 py-1 text-xs font-semibold capitalize text-indigo-700">
                    {role}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">
              <ShieldCheck size={18} className="text-indigo-600" />
              Authenticated Staff
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Contact Details
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <ProfileInfo icon={UserRound} label="Name" value={authUser?.name} />
              <ProfileInfo icon={Mail} label="Email" value={authUser?.email} />
              <ProfileInfo
                icon={Phone}
                label="Phone Number"
                value={authUser?.phoneNumber}
              />
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Professional Details
            </h2>
            <div className="grid gap-4">
              <ProfileInfo icon={Briefcase} label="Role" value={role} />
              <ProfileInfo
                icon={GraduationCap}
                label="Degree"
                value={authUser?.degree}
              />
              <ProfileInfo
                icon={ShieldCheck}
                label="Status"
                value={authUser?.status || "Empolyee"}
              />
            </div>
          </section>
        </div>

        <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
            Account Information
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <ProfileInfo
              compact
              icon={ShieldCheck}
              label="Employee ID"
              value={authUser?._id}
            />
            <ProfileInfo
              compact
              icon={CalendarClock}
              label="Created"
              value={formatDate(authUser?.createdAt)}
            />
            <ProfileInfo
              compact
              icon={CalendarClock}
              label="Last Updated"
              value={formatDate(authUser?.updatedAt)}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProfilePage;
