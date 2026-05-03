import React from "react";
import { Briefcase, CalendarDays, Phone, Pill, Plus, UserRound } from "lucide-react";

function SearchResult({ item, type, onAddCase }) {
  const title =
    item.name || item.paitentName || item.MedicineName || item.medicineName;
  const subtitle =
    item.role ||
    item.destination ||
    item.Composition ||
    item.composition ||
    item.doctorName ||
    "Clinic record";
  const phone = item.phone || item.paitentPhone;
  const image = item["Image URL"] || item.image;
  const cases = item.cases || [];
  const Icon = type === "medicine" ? Pill : type === "employee" ? Briefcase : UserRound;

  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:border-indigo-200 hover:shadow-md">
      <div className="flex gap-4 p-4">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-16 w-16 shrink-0 rounded-lg border border-slate-100 object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <Icon size={28} />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-slate-950">
            {title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-500">
            {subtitle}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {phone && (
              <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                <Phone size={13} />
                {phone}
              </span>
            )}
            {cases.length > 0 && (
              <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
                <CalendarDays size={13} />
                {cases.length} case{cases.length > 1 ? "s" : ""}
              </span>
            )}
            {item.Manufacturer && (
              <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                {item.Manufacturer}
              </span>
            )}
          </div>

          {onAddCase && (
            <button
              type="button"
              onClick={() => onAddCase(item)}
              className="mt-4 inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700"
            >
              <Plus size={14} />
              Add Case
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default SearchResult;
