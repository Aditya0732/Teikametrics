import type { ProjectStatus } from "@/types";

const STATUSES: { label: string; value: ProjectStatus | ""; dot?: string }[] = [
  { label: "All", value: "" },
  { label: "Active", value: "active", dot: "bg-emerald-500" },
  { label: "Paused", value: "paused", dot: "bg-amber-500" },
  { label: "Archived", value: "archived", dot: "bg-slate-400" },
];

interface StatusFilterProps {
  value: ProjectStatus | "";
  onChange: (status: ProjectStatus | "") => void;
}

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <fieldset>
      <legend className="sr-only">Filter by status</legend>
      <div
        className="inline-flex items-center overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        role="radiogroup"
        aria-label="Filter by status"
      >
        {STATUSES.map(({ label, value: sv, dot }) => {
          const isActive = value === sv;
          return (
            <button
              key={sv}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => onChange(sv)}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-1 ${
                isActive
                  ? "bg-white text-slate-900 shadow-[0_1px_3px_rgba(0,0,0,0.12)] border border-slate-200"
                  : "border border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {dot && (
                <span className={`inline-block h-1.5 w-1.5 rounded-full ${dot}`} aria-hidden="true" />
              )}
              {label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
