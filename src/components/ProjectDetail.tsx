import { forwardRef } from "react";
import type { Project } from "@/types";
import { Button, Text, Stack } from "@/ui-stub";

const STATUS_CONFIG: Record<string, { label: string; dot: string; bg: string; text: string }> = {
  active: { label: "Active", dot: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700" },
  paused: { label: "Paused", dot: "bg-amber-500", bg: "bg-amber-50", text: "text-amber-700" },
  archived: { label: "Archived", dot: "bg-slate-400", bg: "bg-slate-100", text: "text-slate-500" },
};

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
  onEdit?: (id: string) => void;
}

export const ProjectDetail = forwardRef<HTMLDivElement, ProjectDetailProps>(
  function ProjectDetail({ project, onClose, onEdit }, ref) {
    const statusCfg = STATUS_CONFIG[project.status];
    const formattedDate = new Date(project.updatedAt).toLocaleDateString(
      "en-US",
      { year: "numeric", month: "long", day: "numeric" },
    );

    return (
      <div
        ref={ref}
        tabIndex={-1}
        role="region"
        aria-label={`Details for ${project.title}`}
        className="focus-visible:outline-none"
      >
        {/* Close button - top right */}
        <Stack direction="row" className="mb-4 !justify-between">
          <Button
            variant="ghost"
            onClick={onClose}
            aria-label="Close detail panel"
            className="!inline-flex !items-center !gap-1.5 !rounded-lg !px-2 !py-1 !text-xs !font-medium !text-slate-500 !border-0 !bg-transparent hover:!bg-slate-100 hover:!text-slate-700"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back
          </Button>
          {onEdit && (
            <Button
              variant="ghost"
              onClick={() => onEdit(project.id)}
              className="!inline-flex !items-center !gap-1.5 !rounded-lg !border !border-slate-200 !bg-white !px-3 !py-1.5 !text-xs !font-medium !text-slate-700 !shadow-sm hover:!bg-slate-50"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
              Edit
            </Button>
          )}
        </Stack>

        {/* Title */}
        <Text as="h2" tone="title" className="!text-2xl !font-extrabold leading-tight tracking-tight sm:!text-[28px]">
          {project.title}
        </Text>

        {/* Meta bar: status + owner + date */}
        <Stack direction="row" className="mt-2 !gap-2 text-sm text-slate-500 sm:mt-3 sm:!gap-3">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${statusCfg.bg} ${statusCfg.text}`}>
            <span className={`h-2 w-2 rounded-full ${statusCfg.dot}`} aria-hidden="true" />
            {statusCfg.label}
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            {project.owner}
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Updated {formattedDate}
          </span>
        </Stack>

        {/* Divider */}
        <hr className="my-4 border-slate-200 sm:my-6" />

        {/* Tags */}
        <div>
          <Text as="h3" tone="muted" className="mb-2 !text-xs !font-semibold uppercase tracking-wider">
            Tags
          </Text>
          <Stack direction="row" className="!gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 shadow-sm"
              >
                {tag}
              </span>
            ))}
          </Stack>
        </div>

        {/* Description */}
        <div className="mt-4 sm:mt-6">
          <Text as="h3" tone="muted" className="mb-1.5 !text-xs !font-semibold uppercase tracking-wider sm:mb-2">
            Description
          </Text>
          <Text as="p" tone="body" className="!text-[15px] leading-relaxed">
            {project.description}
          </Text>
        </div>
      </div>
    );
  },
);
