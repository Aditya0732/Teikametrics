import type { Project } from "@/types";

const STATUS_CONFIG: Record<string, { label: string; dot: string; bg: string; text: string }> = {
  active: { label: "Active", dot: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700" },
  paused: { label: "Paused", dot: "bg-amber-500", bg: "bg-amber-50", text: "text-amber-700" },
  archived: { label: "Archived", dot: "bg-slate-400", bg: "bg-slate-100", text: "text-slate-500" },
};

interface ProjectCardProps {
  project: Project;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onEdit?: (id: string) => void;
}

export function ProjectCard({
  project,
  isSelected,
  onSelect,
}: ProjectCardProps) {
  const statusCfg = STATUS_CONFIG[project.status];
  const formattedDate = new Date(project.updatedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const visibleTags = project.tags.slice(0, 3);
  const extraTagCount = project.tags.length - visibleTags.length;

  return (
    <div
      className={`relative cursor-pointer rounded-lg border p-4 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 ${
        isSelected
          ? "border-indigo-500 bg-indigo-50/50 shadow-sm"
          : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
      }`}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
      aria-label={`View details for ${project.title}`}
      onClick={() => onSelect(project.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(project.id);
        }
      }}
    >
      {/* Selected indicator bar */}
      {isSelected && (
        <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full bg-indigo-500" />
      )}

      {/* Title */}
      <h2 className="text-sm font-semibold text-slate-900 leading-snug line-clamp-1">
        {project.title}
      </h2>

      {/* Description snippet */}
      <p className="mt-1 text-xs leading-relaxed text-slate-500 line-clamp-2">
        {project.description}
      </p>

      {/* Tags */}
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        {visibleTags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600"
          >
            {tag}
          </span>
        ))}
        {extraTagCount > 0 && (
          <span className="text-[10px] text-slate-400">+{extraTagCount}</span>
        )}
      </div>

      {/* Meta row: status + owner + date */}
      <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-slate-500">
        <span className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 ${statusCfg.bg} ${statusCfg.text}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${statusCfg.dot}`} aria-hidden="true" />
          {statusCfg.label}
        </span>
        <span className="text-slate-300">·</span>
        <span className="truncate">{project.owner}</span>
        <span className="text-slate-300">·</span>
        <span className="shrink-0">{formattedDate}</span>
      </div>
    </div>
  );
}
