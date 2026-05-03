import React, { useMemo, useState } from "react";
import { Loader2, Search as SearchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import SearchResult from "./searchResult";

const placeholders = {
  employee: "Employee name, phone, email ya role search karein",
  patient: "Patient phone number search karein",
  medicine: "Medicine name search karein",
};

const labels = {
  employee: "Employee",
  patient: "Patient",
  medicine: "Medicine",
};

const demoRecords = {
  employee: [
    {
      name: "Dr. Ashok Prajapati",
      role: "Doctor",
      phone: "+91 99999 99999",
      email: "ashok@sbcclinic.com",
    },
    {
      name: "Riya Sharma",
      role: "Receptionist",
      phone: "+91 98765 43210",
      email: "riya@sbcclinic.com",
    },
  ],
  patient: [],
  medicine: [],
};

function Search({ type = "patient" }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const activeLabel = labels[type] || "Record";

  const filteredDemoResults = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();

    if (!cleanQuery) return [];

    return (demoRecords[type] || []).filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(cleanQuery)
      )
    );
  }, [query, type]);

  const searchFromApi = async (cleanQuery) => {
    if (type === "patient") {
      const response = await axiosInstance.get(
        `/patient/search?phone=${encodeURIComponent(cleanQuery)}`
      );
      return response.data ? [response.data] : [];
    }

    if (type === "medicine") {
      const response = await axiosInstance.get(
        `/medicine/search?med=${encodeURIComponent(cleanQuery)}`
      );
      return Array.isArray(response.data) ? response.data : [response.data];
    }

    return filteredDemoResults;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cleanQuery = query.trim();
    if (!cleanQuery) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setIsSearching(true);
    setHasSearched(true);

    try {
      const data = await searchFromApi(cleanQuery);
      setResults(data);
    } catch (error) {
      setResults(filteredDemoResults);
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddCase = (patient) => {
    navigate("/add-patient", {
      state: {
        existingPatient: {
          id: patient._id,
          name: patient.paitentName,
          phone: patient.paitentPhone,
        },
      },
    });
  };

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          Search {activeLabel}
        </p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950">
          Find {activeLabel.toLowerCase()} records
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <SearchIcon
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholders[type] || "Search karein"}
            className="h-12 w-full rounded-lg border border-slate-300 bg-slate-50 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          />
        </div>
        <button
          type="submit"
          disabled={isSearching}
          className="inline-flex h-12 items-center justify-center rounded-lg bg-indigo-600 px-5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSearching ? <Loader2 className="animate-spin" size={18} /> : "Search"}
        </button>
      </form>

      <div className="mt-5 space-y-3">
        {isSearching && (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
            Searching...
          </div>
        )}

        {!isSearching &&
          results.map((item, index) => (
            <SearchResult
              key={item._id || item.email || item.name || index}
              item={item}
              type={type}
              onAddCase={type === "patient" ? handleAddCase : undefined}
            />
          ))}

        {!isSearching && hasSearched && results.length === 0 && (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
            <h3 className="text-sm font-semibold text-slate-800">
              No result found
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Search value check karke dobara try karein.
            </p>
          </div>
        )}

        {!isSearching && !hasSearched && (
          <div className="rounded-lg bg-slate-50 p-5 text-sm leading-6 text-slate-500">
            Search tab select ho gaya hai. Query enter karke records yahin
            beautifully display honge.
          </div>
        )}
      </div>
    </section>
  );
}

export default Search;
