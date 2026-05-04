import type { ProjectStatus } from "@/types";
import { SearchInput } from "./SearchInput";
import { StatusFilter } from "./StatusFilter";
import { TagFilter } from "./TagFilter";

interface FilterBarProps {
  query: string;
  onQueryChange: (q: string) => void;
  status: ProjectStatus | "";
  onStatusChange: (s: ProjectStatus | "") => void;
  allTags: string[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

export function FilterBar({
  query,
  onQueryChange,
  status,
  onStatusChange,
  allTags,
  selectedTags,
  onTagsChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
      <div className="flex-1 min-w-0">
        <SearchInput value={query} onChange={onQueryChange} />
      </div>
      <div className="flex items-center gap-2 min-w-0">
        <div className="overflow-x-auto min-w-0 shrink [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <StatusFilter value={status} onChange={onStatusChange} />
        </div>
        <div className="shrink-0">
          <TagFilter
            allTags={allTags}
            selected={selectedTags}
            onChange={onTagsChange}
          />
        </div>
      </div>
    </div>
  );
}
