import type { Project } from "@/types";
import { Button, Card, Text, Stack } from "@/ui-stub";

const STATUS_CONFIG: Record<string, { label: string; dot: string; bg: string; text: string }> = {
  active: { label: "Active", dot: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700" },
  paused: { label: "Paused", dot: "bg-amber-500", bg: "bg-amber-50", text: "text-amber-700" },
  archived: { label: "Archived", dot: "bg-slate-400", bg: "bg-slate-100", text: "text-slate-500" },
};

interface ProjectCardProps {
  project: Project;
  isSelected: boolean;
  onSelect: (id: string) => void;
  compact?: boolean;
  onEdit?: (id: string) => void;
}

export function ProjectCard({
  project,
  isSelected,
  onSelect,
  compact = false,
  onEdit,
}: ProjectCardProps) {
  const statusCfg = STATUS_CONFIG[project.status];
  const formattedDate = new Date(project.updatedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const visibleTags = project.tags.slice(0, 3);
  const extraTagCount = project.tags.length - visibleTags.length;

  return (
    <Card
      className={`relative !p-4 transition-all duration-150 ${
        compact ? "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2" : ""
      } ${
        isSelected
          ? "!border-indigo-500 !bg-indigo-50/50 !shadow-sm"
          : "hover:!border-slate-300 hover:!shadow-sm"
      }`}
      {...(compact ? {
        tabIndex: 0,
        role: "button" as const,
        "aria-pressed": isSelected,
        "aria-label": `View details for ${project.title}`,
        onClick: () => onSelect(project.id),
        onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect(project.id);
          }
        },
      } : {})}
    >
      {/* Selected indicator bar */}
      {isSelected && (
        <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full bg-indigo-500" />
      )}

      {/* Title */}
      <Text as="h2" tone="title" className="!text-[15px] !font-bold !m-0 leading-snug tracking-tight line-clamp-1">
        {project.title}
      </Text>

      {/* Description snippet */}
      <Text as="p" tone="muted" className="mt-1.5 !text-[13px] leading-relaxed line-clamp-2">
        {project.description}
      </Text>

      {/* Tags */}
      <Stack direction="row" className="mt-2.5 !gap-1.5">
        {visibleTags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
          >
            {tag}
          </span>
        ))}
        {extraTagCount > 0 && (
          <span className="text-[11px] text-slate-400">+{extraTagCount}</span>
        )}
      </Stack>

      {/* Meta row: status + owner + date */}
      <Stack direction="row" className="mt-2.5 !gap-2 text-xs text-slate-500">
        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${statusCfg.bg} ${statusCfg.text}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${statusCfg.dot}`} aria-hidden="true" />
          {statusCfg.label}
        </span>
        <span className="text-slate-300">·</span>
        <span className="truncate">{project.owner}</span>
        <span className="text-slate-300">·</span>
        <span className="shrink-0">{formattedDate}</span>
      </Stack>

      {/* View details + Edit — only in expanded (list-only) view */}
      {!compact && (
        <Stack direction="row" className="mt-3 !gap-2">
          <Button
            onClick={() => onSelect(project.id)}
            aria-label={`View details for ${project.title}`}
            className="!inline-flex !items-center !gap-1.5 !rounded-lg !bg-indigo-600 !px-3 !py-1.5 !text-xs !font-semibold !text-white !shadow-sm !border-indigo-600 hover:!bg-indigo-700"
          >
            View details
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Button>
          {onEdit && (
            <Button
              variant="ghost"
              onClick={() => onEdit(project.id)}
              aria-label={`Edit ${project.title}`}
              className="!inline-flex !items-center !gap-1.5 !rounded-lg !border !border-slate-200 !bg-white !px-3 !py-1.5 !text-xs !font-semibold !text-slate-700 !shadow-sm hover:!bg-slate-50"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
              Edit
            </Button>
          )}
        </Stack>
      )}
    </Card>
  );
}
