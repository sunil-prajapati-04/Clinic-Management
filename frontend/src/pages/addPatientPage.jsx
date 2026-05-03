import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Loader2,
  Phone,
  Pill,
  Plus,
  Search,
  Stethoscope,
  Trash2,
  User,
} from "lucide-react";
import Navbar from "../components/navbar";
import { useMedStore } from "../store/medStore";
import { usePatientStore } from "../store/patientStore";

function AddPatientPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const existingPatient = location.state?.existingPatient;
  const { allMedicine, getMed, isSearchingMedicine } = useMedStore();
  const { addPat, isAddingPat } = usePatientStore();

  const [formData, setFormData] = useState({
    name: existingPatient?.name || "",
    phone: existingPatient?.phone || "",
    disease: "",
  });
  const [medQuery, setMedQuery] = useState("");
  const [medicineDraft, setMedicineDraft] = useState(null);
  const [prescription, setPrescription] = useState([]);

  const selectedMedicineIds = useMemo(
    () => new Set(prescription.map((medicine) => medicine._id || medicine.name)),
    [prescription]
  );

  const availableMedicine = useMemo(
    () =>
      allMedicine.filter(
        (medicine) => !selectedMedicineIds.has(medicine._id || medicine.name)
      ),
    [allMedicine, selectedMedicineIds]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMedicineSearch = (event) => {
    event.preventDefault();
    if (!medQuery.trim()) return toast.error("Medicine name required");
    getMed(medQuery.trim());
  };

  const selectMedicine = (medicine) => {
    const medicineKey = medicine._id || medicine.name;
    if (selectedMedicineIds.has(medicineKey)) {
      return toast.error("Medicine already added");
    }

    setMedicineDraft({
      _id: medicine._id,
      name: medicine.name,
      salt: medicine.salt,
      frequency: "",
      days: "",
      instruction: "",
    });
  };

  const updateMedicineDraft = (field, value) => {
    setMedicineDraft((prev) => ({ ...prev, [field]: value }));
  };

  const addMedicineToPrescription = () => {
    if (!medicineDraft) return toast.error("Medicine select karein");

    setPrescription((prev) => [
      ...prev,
      medicineDraft,
    ]);
    setMedicineDraft(null);
  };

  const removeMedicine = (index) => {
    setPrescription((prev) => prev.filter((_, medIndex) => medIndex !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim()) return toast.error("Patient name required");
    if (!/^[0-9]{10}$/.test(formData.phone)) {
      return toast.error("Valid 10 digit phone number required");
    }
    if (!formData.disease.trim()) return toast.error("Disease name required");
    if (prescription.length === 0) {
      return toast.error("At least one medicine add karein");
    }

    await addPat({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      disease: formData.disease.trim(),
      prescription: prescription.map(({ name, salt, frequency, days, instruction }) => ({
        name,
        salt,
        frequency,
        days,
        instruction,
      })),
    });

    setFormData({ name: "", phone: "", disease: "" });
    setPrescription([]);
    setMedicineDraft(null);
    setMedQuery("");
    navigate("/add-patient", { replace: true, state: null });
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Patient Management
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">
            Add Patient Case
          </h1>
          <p className="mt-2 text-slate-600">
            {existingPatient
              ? "Existing patient ke liye naya case add karein."
              : "Patient profile aur prescription ek case ke andar save hoga."}
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr_1fr]">
          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-5 text-lg font-semibold text-slate-950">
              {existingPatient ? "Existing Patient" : "Patient Details"}
            </h2>

            {existingPatient && (
              <div className="mb-5 rounded-lg bg-indigo-50 p-4 text-sm text-indigo-800">
                <p className="font-semibold">{existingPatient.name}</p>
                <p>{existingPatient.phone}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  Patient Name
                </span>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 text-slate-400" size={18} />
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    readOnly={Boolean(existingPatient)}
                    placeholder="Enter patient name"
                    className="h-12 w-full rounded-lg border border-slate-300 bg-slate-50 pl-10 pr-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 read-only:cursor-not-allowed read-only:bg-slate-100"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  Phone Number
                </span>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 text-slate-400" size={18} />
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    readOnly={Boolean(existingPatient)}
                    placeholder="10 digit phone number"
                    className="h-12 w-full rounded-lg border border-slate-300 bg-slate-50 pl-10 pr-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 read-only:cursor-not-allowed read-only:bg-slate-100"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  Disease / Case
                </span>
                <div className="relative">
                  <Stethoscope
                    className="absolute left-3 top-3.5 text-slate-400"
                    size={18}
                  />
                  <input
                    name="disease"
                    value={formData.disease}
                    onChange={handleChange}
                    placeholder="Fever, cough, diabetes..."
                    className="h-12 w-full rounded-lg border border-slate-300 bg-slate-50 pl-10 pr-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  />
                </div>
              </label>

              <button
                type="submit"
                disabled={isAddingPat}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isAddingPat ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Saving...
                  </>
                ) : (
                  "Save Patient Case"
                )}
              </button>
            </form>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-5 text-lg font-semibold text-slate-950">
              Search Medicine
            </h2>

            <form onSubmit={handleMedicineSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3.5 text-slate-400" size={18} />
                <input
                  value={medQuery}
                  onChange={(event) => setMedQuery(event.target.value)}
                  placeholder="Medicine name"
                  className="h-12 w-full rounded-lg border border-slate-300 bg-slate-50 pl-10 pr-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
              </div>
              <button
                type="submit"
                disabled={isSearchingMedicine}
                className="flex h-12 items-center justify-center rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-70"
              >
                {isSearchingMedicine ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  "Search"
                )}
              </button>
            </form>

            <div className="mt-5 max-h-[560px] space-y-3 overflow-auto pr-1">
              {availableMedicine.length === 0 && (
                <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
                  Medicine search karein
                </div>
              )}

              {availableMedicine.map((medicine) => (
                <article
                  key={medicine._id || medicine.name}
                  className="rounded-lg border border-slate-200 p-4 transition hover:border-indigo-200 hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-slate-950">
                        {medicine.name}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        {medicine.salt || "Salt not available"}
                      </p>
                      {medicine.brand && (
                        <p className="mt-1 text-xs font-medium text-indigo-600">
                          {medicine.brand}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => selectMedicine(medicine)}
                      className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-600 hover:text-white"
                    >
                      <Plus size={18} />
                      Select
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {medicineDraft && (
              <div className="mt-5 rounded-lg border border-indigo-200 bg-indigo-50 p-4">
                <h3 className="font-semibold text-indigo-950">
                  {medicineDraft.name}
                </h3>
                <p className="mt-1 text-sm text-indigo-700">
                  {medicineDraft.salt || "Salt not available"}
                </p>

                <div className="mt-4 grid gap-2">
                  <input
                    value={medicineDraft.frequency}
                    onChange={(event) =>
                      updateMedicineDraft("frequency", event.target.value)
                    }
                    placeholder="Frequency: 1-0-1"
                    className="h-10 rounded-md border border-indigo-200 bg-white px-3 text-sm outline-none focus:border-indigo-500"
                  />
                  <input
                    value={medicineDraft.days}
                    onChange={(event) =>
                      updateMedicineDraft("days", event.target.value)
                    }
                    placeholder="Days: 5"
                    className="h-10 rounded-md border border-indigo-200 bg-white px-3 text-sm outline-none focus:border-indigo-500"
                  />
                  <input
                    value={medicineDraft.instruction}
                    onChange={(event) =>
                      updateMedicineDraft("instruction", event.target.value)
                    }
                    placeholder="Instruction: after food"
                    className="h-10 rounded-md border border-indigo-200 bg-white px-3 text-sm outline-none focus:border-indigo-500"
                  />
                </div>

                <button
                  type="button"
                  onClick={addMedicineToPrescription}
                  className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  <Plus size={17} />
                  Add Medicine
                </button>
              </div>
            )}
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold text-slate-950">
              <Pill size={20} />
              Prescription
            </h2>

            <div className="max-h-[640px] space-y-4 overflow-auto pr-1">
              {prescription.length === 0 && (
                <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
                  Selected medicines yahan add honge.
                </div>
              )}

              {prescription.map((medicine, index) => (
                <div
                  key={`${medicine.name}-${index}`}
                  className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 p-4"
                >
                  <div>
                    <h3 className="font-semibold text-slate-950">
                      {medicine.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeMedicine(index)}
                    className="shrink-0 text-slate-400 transition hover:text-rose-600"
                    aria-label="Remove medicine"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default AddPatientPage;
