import type { ProjectStatus } from "@/types";
import { FilterBar } from "@/components/FilterBar";

interface FilterSectionProps {
  query: string;
  onQueryChange: (q: string) => void;
  status: ProjectStatus | "";
  onStatusChange: (s: ProjectStatus | "") => void;
  allTags: string[];
  selectedTags: string[];
  onTagsChange: (t: string[]) => void;
  projectCount: number;
  isLoading: boolean;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  hasSelectedProject: boolean;
}

export function FilterSection({
  query, onQueryChange,
  status, onStatusChange,
  allTags, selectedTags, onTagsChange,
  projectCount, isLoading,
  hasActiveFilters, onClearFilters,
  hasSelectedProject,
}: FilterSectionProps) {
  return (
    <div className={`relative z-20 shrink-0 overflow-visible border-b border-slate-100 bg-slate-50 ${hasSelectedProject ? "hidden lg:block" : ""}`}>
      <div className="mx-auto max-w-6xl px-3 pt-2.5 pb-2 sm:px-6 sm:pt-3">
        <section aria-label="Project filters">
          <FilterBar
            query={query}
            onQueryChange={onQueryChange}
            status={status}
            onStatusChange={onStatusChange}
            allTags={allTags}
            selectedTags={selectedTags}
            onTagsChange={onTagsChange}
          />
        </section>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">
            {isLoading ? "Loading…" : `${projectCount} project${projectCount !== 1 ? "s" : ""}`}
          </span>
          {hasActiveFilters && (
            <>
              <span className="h-3 w-px bg-slate-200" aria-hidden="true" />
              <button
                type="button"
                onClick={onClearFilters}
                className="text-xs font-medium text-indigo-600 hover:text-indigo-800 focus-visible:outline-none focus-visible:underline"
              >
                Clear filters
              </button>
            </>
          )}
          <span className="ml-auto hidden text-[11px] text-slate-400 sm:inline-flex sm:items-center sm:gap-1">
            <kbd className="rounded border border-slate-200 bg-slate-50 px-1 py-0.5 font-mono text-[10px]">/</kbd>
            search
            {hasSelectedProject && (
              <>
                <span className="mx-1">·</span>
                <kbd className="rounded border border-slate-200 bg-slate-50 px-1 py-0.5 font-mono text-[10px]">Esc</kbd>
                close
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
