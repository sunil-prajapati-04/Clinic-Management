import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FlaskConical, Loader2, Pill, Plus, Tags } from "lucide-react";
import Navbar from "../components/navbar";
import { useMedStore } from "../store/medStore";

function AddMedicinePage() {
  const { addMed, isAddingMedicine } = useMedStore();
  const [formData, setFormData] = useState({
    name: "",
    salt: "",
    brand: "",
    uses: "",
    searchName: "",
  });

  const generatedSearchName = useMemo(
    () => formData.name.trim().toLowerCase(),
    [formData.name]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "name" && !prev.searchName
        ? { searchName: value.trim().toLowerCase() }
        : {}),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim()) return toast.error("Medicine name required");
    if (!formData.salt.trim()) return toast.error("Salt required");
    if (!formData.brand.trim()) return toast.error("Brand required");
    if (!formData.uses.trim()) return toast.error("Uses required");

    await addMed({
      name: formData.name.trim(),
      salt: formData.salt.trim(),
      brand: formData.brand.trim(),
      uses: formData.uses.trim(),
      searchName: (formData.searchName || generatedSearchName).trim().toLowerCase(),
    });

    setFormData({
      name: "",
      salt: "",
      brand: "",
      uses: "",
      searchName: "",
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Medicine Management
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">
            Add Medicine
          </h1>
        </div>

        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="grid gap-5">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Medicine Name
              </span>
              <div className="relative">
                <Pill className="absolute left-3 top-3.5 text-slate-400" size={18} />
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Paracetamol 500mg"
                  className="h-12 w-full rounded-lg border border-slate-300 bg-slate-50 pl-10 pr-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Salt
              </span>
              <div className="relative">
                <FlaskConical className="absolute left-3 top-3.5 text-slate-400" size={18} />
                <input
                  name="salt"
                  value={formData.salt}
                  onChange={handleChange}
                  placeholder="Paracetamol"
                  className="h-12 w-full rounded-lg border border-slate-300 bg-slate-50 pl-10 pr-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Brand
              </span>
              <div className="relative">
                <Tags className="absolute left-3 top-3.5 text-slate-400" size={18} />
                <input
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="Brand name"
                  className="h-12 w-full rounded-lg border border-slate-300 bg-slate-50 pl-10 pr-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Uses
              </span>
              <textarea
                name="uses"
                value={formData.uses}
                onChange={handleChange}
                placeholder="Fever, pain relief..."
                rows={4}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
            </label>

            <button
              type="submit"
              disabled={isAddingMedicine}
              className="flex h-12 items-center justify-center gap-2 rounded-lg bg-indigo-600 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isAddingMedicine ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Adding...
                </>
              ) : (
                <>
                  <Plus size={18} />
                  Add Medicine
                </>
              )}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default AddMedicinePage;
