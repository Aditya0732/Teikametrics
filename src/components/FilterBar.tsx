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
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
      <div className="flex-1">
        <SearchInput value={query} onChange={onQueryChange} />
      </div>
      <div className="flex items-center gap-2">
        <StatusFilter value={status} onChange={onStatusChange} />
        <TagFilter
          allTags={allTags}
          selected={selectedTags}
          onChange={onTagsChange}
        />
      </div>
    </div>
  );
}
