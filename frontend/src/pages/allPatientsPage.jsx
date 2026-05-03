import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Check,
  ChevronDown,
  Edit3,
  Loader2,
  Search,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import Navbar from "../components/navbar";
import { usePatientStore } from "../store/patientStore";

function AllPatientsPage() {
  const {
    allPatient,
    fetchAllPatients,
    searchPat,
    patientProfile,
    isSearchingPat,
    updatePatient,
    updatePatientCase,
    delPatient,
    delPatientCase,
    isUpdatingPat,
    isDelPat,
  } = usePatientStore();

  const [patientQuery, setPatientQuery] = useState("");
  const [openPatientId, setOpenPatientId] = useState(null);
  const [editingPatientId, setEditingPatientId] = useState(null);
  const [editPatientData, setEditPatientData] = useState({ name: "", phone: "" });
  const [editingCaseKey, setEditingCaseKey] = useState(null);
  const [caseDraft, setCaseDraft] = useState({ disease: "", prescription: [] });

  useEffect(() => {
    fetchAllPatients();
  }, [fetchAllPatients]);

  const visiblePatients = patientProfile ? [patientProfile] : allPatient;

  const handlePatientSearch = (event) => {
    event.preventDefault();
    if (!patientQuery.trim()) return toast.error("Patient phone required");
    searchPat(patientQuery.trim());
  };

  const clearSearch = () => {
    setPatientQuery("");
    fetchAllPatients();
    usePatientStore.setState({ patientProfile: null });
  };

  const startEditPatient = (patient) => {
    setEditingPatientId(patient._id);
    setEditPatientData({
      name: patient.paitentName || "",
      phone: patient.paitentPhone || "",
    });
  };

  const savePatientProfile = async (patientId) => {
    if (!editPatientData.name.trim()) return toast.error("Patient name required");
    if (!/^[0-9]{10}$/.test(editPatientData.phone)) {
      return toast.error("Valid 10 digit phone number required");
    }

    await updatePatient(patientId, {
      name: editPatientData.name.trim(),
      phone: editPatientData.phone.trim(),
    });
    setEditingPatientId(null);
  };

  const deletePatientWithConfirm = async (patient) => {
    const ok = window.confirm(
      `Delete patient ${patient.paitentName}? Is patient ke saare cases bhi delete ho jayenge.`
    );
    if (!ok) return;
    await delPatient(patient._id);
  };

  const startEditCase = (patientId, patientCase) => {
    setEditingCaseKey(`${patientId}-${patientCase._id}`);
    setCaseDraft({
      disease: patientCase.disease || "",
      prescription: (patientCase.prescription || []).map((medicine) => ({
        name: medicine.name || "",
        salt: medicine.salt || "",
        frequency: medicine.frequency || "",
        days: medicine.days || "",
        instruction: medicine.instruction || "",
      })),
    });
  };

  const updateCaseMedicine = (index, field, value) => {
    setCaseDraft((prev) => ({
      ...prev,
      prescription: prev.prescription.map((medicine, medIndex) =>
        medIndex === index ? { ...medicine, [field]: value } : medicine
      ),
    }));
  };

  const saveCase = async (patientId, caseId) => {
    if (!caseDraft.disease.trim()) return toast.error("Disease name required");
    await updatePatientCase(patientId, caseId, {
      disease: caseDraft.disease.trim(),
      prescription: caseDraft.prescription,
    });
    setEditingCaseKey(null);
  };

  const deleteCaseWithConfirm = async (patient, patientCase) => {
    const ok = window.confirm(
      `Delete case "${patientCase.disease || "Untitled case"}" from ${patient.paitentName}?`
    );
    if (!ok) return;
    await delPatientCase(patient._id, patientCase._id);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              Patient Management
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-950">
              All Patients
            </h1>
            <p className="mt-2 text-slate-600">
              Search, profile edit/delete, aur cases dropdown se manage karein.
            </p>
          </div>

          <form onSubmit={handlePatientSearch} className="flex w-full gap-2 lg:w-[420px]">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3.5 text-slate-400" size={18} />
              <input
                value={patientQuery}
                onChange={(event) => setPatientQuery(event.target.value)}
                placeholder="Search patient by phone"
                className="h-12 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>
            <button
              type="submit"
              disabled={isSearchingPat}
              className="flex h-12 items-center justify-center rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-70"
            >
              {isSearchingPat ? <Loader2 className="animate-spin" size={18} /> : "Search"}
            </button>
            {patientProfile && (
              <button
                type="button"
                onClick={clearSearch}
                className="h-12 rounded-lg bg-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-300"
              >
                Clear
              </button>
            )}
          </form>
        </div>

        {(isUpdatingPat || isDelPat) && (
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-indigo-700 shadow-sm">
            <Loader2 className="animate-spin" size={17} />
            Updating records...
          </div>
        )}

        <div className="space-y-4">
          {visiblePatients.length === 0 && (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
              No patients found.
            </div>
          )}

          {visiblePatients.map((patient) => {
            const isOpen = openPatientId === patient._id;

            return (
              <article
                key={patient._id}
                className="rounded-lg border border-slate-200 bg-white shadow-sm"
              >
                <div className="flex flex-col gap-4 p-5 md:flex-row md:items-start md:justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                      <UserRound size={24} />
                    </div>

                    {editingPatientId === patient._id ? (
                      <div className="grid gap-2 sm:grid-cols-2">
                        <input
                          value={editPatientData.name}
                          onChange={(event) =>
                            setEditPatientData((prev) => ({
                              ...prev,
                              name: event.target.value,
                            }))
                          }
                          className="h-10 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-indigo-500"
                          placeholder="Patient name"
                        />
                        <input
                          value={editPatientData.phone}
                          onChange={(event) =>
                            setEditPatientData((prev) => ({
                              ...prev,
                              phone: event.target.value,
                            }))
                          }
                          className="h-10 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-indigo-500"
                          placeholder="Phone number"
                        />
                      </div>
                    ) : (
                      <div>
                        <h2 className="text-lg font-semibold text-slate-950">
                          {patient.paitentName}
                        </h2>
                        <p className="text-sm text-slate-500">{patient.paitentPhone}</p>
                        <p className="mt-1 text-xs font-semibold text-indigo-600">
                          {patient.cases?.length || 0} case
                          {(patient.cases?.length || 0) === 1 ? "" : "s"}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {editingPatientId === patient._id ? (
                      <>
                        <button
                          type="button"
                          onClick={() => savePatientProfile(patient._id)}
                          className="inline-flex items-center gap-1 rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700"
                        >
                          <Check size={14} />
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingPatientId(null)}
                          className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
                        >
                          <X size={14} />
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => setOpenPatientId(isOpen ? null : patient._id)}
                          className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          <ChevronDown
                            size={15}
                            className={`transition ${isOpen ? "rotate-180" : ""}`}
                          />
                          Cases
                        </button>
                        <button
                          type="button"
                          onClick={() => startEditPatient(patient)}
                          className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          <Edit3 size={14} />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => deletePatientWithConfirm(patient)}
                          className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-rose-50 hover:text-rose-600"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {isOpen && (
                  <div className="border-t border-slate-200 bg-slate-50 p-5">
                    {(patient.cases || []).length === 0 && (
                      <p className="text-sm text-slate-500">No cases added.</p>
                    )}

                    <div className="grid gap-4 lg:grid-cols-2">
                      {(patient.cases || []).map((patientCase, caseIndex) => {
                        const caseKey = `${patient._id}-${patientCase._id}`;
                        const isEditingCase = editingCaseKey === caseKey;

                        return (
                          <div
                            key={patientCase._id || caseIndex}
                            className="rounded-lg border border-slate-200 bg-white p-4"
                          >
                            {isEditingCase ? (
                              <div className="space-y-3">
                                <input
                                  value={caseDraft.disease}
                                  onChange={(event) =>
                                    setCaseDraft((prev) => ({
                                      ...prev,
                                      disease: event.target.value,
                                    }))
                                  }
                                  className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-indigo-500"
                                  placeholder="Disease"
                                />

                                <div className="space-y-2">
                                  {caseDraft.prescription.map((medicine, medIndex) => (
                                    <div
                                      key={`${medicine.name}-${medIndex}`}
                                      className="rounded-md border border-slate-200 bg-slate-50 p-3"
                                    >
                                      <div className="grid gap-2 md:grid-cols-2">
                                        <input
                                          value={medicine.name}
                                          onChange={(event) =>
                                            updateCaseMedicine(medIndex, "name", event.target.value)
                                          }
                                          className="h-9 rounded-md border border-slate-300 px-2 text-xs outline-none focus:border-indigo-500"
                                          placeholder="Medicine name"
                                        />
                                        <input
                                          value={medicine.salt}
                                          onChange={(event) =>
                                            updateCaseMedicine(medIndex, "salt", event.target.value)
                                          }
                                          className="h-9 rounded-md border border-slate-300 px-2 text-xs outline-none focus:border-indigo-500"
                                          placeholder="Salt"
                                        />
                                        <input
                                          value={medicine.frequency}
                                          onChange={(event) =>
                                            updateCaseMedicine(
                                              medIndex,
                                              "frequency",
                                              event.target.value
                                            )
                                          }
                                          className="h-9 rounded-md border border-slate-300 px-2 text-xs outline-none focus:border-indigo-500"
                                          placeholder="Frequency"
                                        />
                                        <input
                                          value={medicine.days}
                                          onChange={(event) =>
                                            updateCaseMedicine(medIndex, "days", event.target.value)
                                          }
                                          className="h-9 rounded-md border border-slate-300 px-2 text-xs outline-none focus:border-indigo-500"
                                          placeholder="Days"
                                        />
                                      </div>
                                      <input
                                        value={medicine.instruction}
                                        onChange={(event) =>
                                          updateCaseMedicine(
                                            medIndex,
                                            "instruction",
                                            event.target.value
                                          )
                                        }
                                        className="mt-2 h-9 w-full rounded-md border border-slate-300 px-2 text-xs outline-none focus:border-indigo-500"
                                        placeholder="Instruction"
                                      />
                                    </div>
                                  ))}
                                </div>

                                <div className="flex gap-2">
                                  <button
                                    type="button"
                                    onClick={() => saveCase(patient._id, patientCase._id)}
                                    className="inline-flex items-center gap-1 rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700"
                                  >
                                    <Check size={14} />
                                    Save Case
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setEditingCaseKey(null)}
                                    className="inline-flex items-center gap-1 rounded-md bg-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-300"
                                  >
                                    <X size={14} />
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div className="flex items-start justify-between gap-3">
                                  <div>
                                    <h3 className="font-semibold text-slate-950">
                                      Case {caseIndex + 1}: {patientCase.disease || "No disease"}
                                    </h3>
                                    <p className="text-sm text-slate-500">
                                      {patientCase.prescription?.length || 0} medicine
                                      {(patientCase.prescription?.length || 0) === 1 ? "" : "s"}
                                    </p>
                                  </div>
                                  <div className="flex gap-1">
                                    <button
                                      type="button"
                                      onClick={() => startEditCase(patient._id, patientCase)}
                                      className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-slate-600 transition hover:text-indigo-600"
                                      aria-label="Edit case"
                                    >
                                      <Edit3 size={15} />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => deleteCaseWithConfirm(patient, patientCase)}
                                      className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-slate-600 transition hover:text-rose-600"
                                      aria-label="Delete case"
                                    >
                                      <Trash2 size={15} />
                                    </button>
                                  </div>
                                </div>

                                <div className="mt-3 space-y-2">
                                  {(patientCase.prescription || []).map((medicine, medIndex) => (
                                    <div
                                      key={`${medicine.name}-${medIndex}`}
                                      className="rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-600"
                                    >
                                      <p className="font-semibold text-slate-800">
                                        {medicine.name}
                                      </p>
                                      <p>{medicine.salt}</p>
                                      <p>
                                        {medicine.frequency || "-"} | {medicine.days || "-"} days
                                      </p>
                                      {medicine.instruction && <p>{medicine.instruction}</p>}
                                    </div>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default AllPatientsPage;
