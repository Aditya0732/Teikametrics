import { useRef, useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { Button, Text } from "@/ui-stub";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  debounceMs?: number;
}

export function SearchInput({
  value,
  onChange,
  debounceMs = 300,
}: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedValue = useDebounce(localValue, debounceMs);

  // Sync debounced value upstream
  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  // Sync external value changes (e.g., URL restore, clear filters)
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div className="relative">
      <label htmlFor="project-search" className="sr-only">
        Search projects
      </label>
      {/* Search icon */}
      <svg
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
      <input
        ref={inputRef}
        id="project-search"
        type="text"
        placeholder="Search projects…"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 transition-colors focus-visible:border-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-100"
        aria-describedby="search-hint"
      />
      {/* Keyboard shortcut hint */}
      {!localValue && (
        <span className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[10px] text-slate-400 sm:inline-block">
          /
        </span>
      )}
      {/* Clear button */}
      {localValue && (
        <Button
          variant="ghost"
          onClick={() => setLocalValue("")}
          className="!absolute !right-3 !top-1/2 !-translate-y-1/2 !rounded-full !p-0.5 !text-slate-400 hover:!bg-slate-100 hover:!text-slate-600"
          aria-label="Clear search"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </Button>
      )}
      <Text as="span" tone="muted" id="search-hint" className="!sr-only">
        Results update after a short delay
      </Text>
    </div>
  );
}

/** Expose ref getter so parent can imperatively focus the search input */
SearchInput.focusId = "project-search";
