import { useState, useRef, useEffect } from "react";

interface TagFilterProps {
  allTags: string[];
  selected: string[];
  onChange: (tags: string[]) => void;
}

export function TagFilter({ allTags, selected, onChange }: TagFilterProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function toggle(tag: string) {
    if (selected.includes(tag)) {
      onChange(selected.filter((t) => t !== tag));
    } else {
      onChange([...selected, tag]);
    }
  }

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  if (allTags.length === 0) return null;

  return (
    <div ref={containerRef} className="relative">
      <fieldset>
        <legend className="sr-only">Filter by tags</legend>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-haspopup="listbox"
          className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-1 ${
            selected.length > 0
              ? "border-indigo-200 bg-indigo-50 text-indigo-700"
              : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
          }`}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
          </svg>
          Tags
          {selected.length > 0 && (
            <span className="flex h-4 min-w-[16px] items-center justify-center rounded-full bg-indigo-600 px-1 text-[10px] font-bold text-white">
              {selected.length}
            </span>
          )}
          <svg className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </fieldset>

      {/* Dropdown panel */}
      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-1.5 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-lg shadow-slate-200/50"
          role="listbox"
          aria-multiselectable="true"
          aria-label="Select tags"
        >
          <div className="max-h-52 overflow-y-auto">
            {allTags.map((tag) => {
              const isActive = selected.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => toggle(tag)}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none"
                >
                  {/* Checkbox visual */}
                  <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                    isActive
                      ? "border-indigo-600 bg-indigo-600"
                      : "border-slate-300 bg-white"
                  }`}>
                    {isActive && (
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    )}
                  </span>
                  <span className={`text-sm ${isActive ? "font-medium text-slate-900" : "text-slate-600"}`}>
                    {tag}
                  </span>
                </button>
              );
            })}
          </div>
          {selected.length > 0 && (
            <div className="mt-1 border-t border-slate-100 pt-1">
              <button
                type="button"
                onClick={() => onChange([])}
                className="w-full rounded-lg px-2.5 py-1.5 text-left text-xs font-medium text-slate-500 hover:bg-slate-50 focus-visible:outline-none"
              >
                Clear tags
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
