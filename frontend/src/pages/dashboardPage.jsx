import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import SearchPanel from "../components/search";
import {
  BriefcaseMedical,
  ChevronRight,
  Pill,
  Plus,
  Search,
  Stethoscope,
  Users,
} from "lucide-react";

const menuItems = [
  {
    title: "Employee",
    type: "employee",
    icon: Users,
    actions: [
      { label: "Search Employee", type: "employee", icon: Search },
      { label: "Add Employee", href: "/add-employee", icon: Plus },
    ],
  },
  {
    title: "Patient",
    type: "patient",
    icon: Stethoscope,
    actions: [
      { label: "Search Patient", type: "patient", icon: Search },
      { label: "All Patients", href: "/patients", icon: Users },
      { label: "Add Patient", href: "/add-patient", icon: Plus },
    ],
  },
  {
    title: "Medicine",
    type: "medicine",
    icon: Pill,
    actions: [
      { label: "Search Medicine", type: "medicine", icon: Search },
      { label: "Add Medicine", href: "/add-medicine", icon: Plus },
    ],
  },
];

function DashboardPage() {
  const [activeSearchType, setActiveSearchType] = useState(null);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Navbar />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <aside className="w-72 shrink-0 border-r border-slate-200 bg-white px-4 py-6 shadow-sm">
          <div className="mb-8 rounded-lg bg-indigo-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <BriefcaseMedical size={22} />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-slate-950">
                  Dashboard
                </h1>
                <p className="text-sm text-slate-500">Clinic management</p>
              </div>
            </div>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="group relative">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm font-semibold text-slate-700 transition group-hover:bg-indigo-600 group-hover:text-white"
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={19} />
                      {item.title}
                    </span>
                    <ChevronRight
                      size={17}
                      className="transition group-hover:rotate-90"
                    />
                  </button>

                  <div className="hidden pl-4 pt-2 group-hover:block">
                    <div className="space-y-1 border-l border-indigo-100 pl-3">
                      {item.actions.map((action) => {
                        const ActionIcon = action.icon;
                        const isSearchAction = Boolean(action.type);

                        return isSearchAction ? (
                          <button
                            key={action.label}
                            type="button"
                            onClick={() => setActiveSearchType(action.type)}
                            className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium transition hover:bg-slate-100 hover:text-indigo-600 ${
                              activeSearchType === action.type
                                ? "bg-indigo-50 text-indigo-700"
                                : "text-slate-600"
                            }`}
                          >
                            <ActionIcon size={16} />
                            {action.label}
                          </button>
                        ) : (
                          <Link
                            key={action.label}
                            to={action.href}
                            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600"
                          >
                            <ActionIcon size={16} />
                            {action.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 p-6 lg:p-8">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              Admin Panel
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950">
              Clinic Dashboard
            </h2>
            <p className="mt-2 text-slate-600">
              Employees, patients, and medicines ko ek jagah se manage karein.
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
            <div className="grid gap-5 md:grid-cols-3 xl:grid-cols-1">
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Search aur add options sidebar mein hover par available
                      hain.
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="xl:sticky xl:top-24 xl:self-start">
              {activeSearchType ? (
                <SearchPanel type={activeSearchType} />
              ) : (
                <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center shadow-sm">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <Search size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-950">
                    Search panel
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Sidebar mein kisi bhi Search subtab par click karein, search
                    bar yahan open hogi.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;
