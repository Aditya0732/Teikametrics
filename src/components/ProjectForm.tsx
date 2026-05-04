import { useState, useEffect } from "react";
import type { Project, ProjectStatus } from "@/types";
import { Button, Stack } from "@/ui-stub";

interface ProjectFormProps {
  /** Pass existing project to edit, or undefined for create */
  initial?: Project;
  onSubmit: (data: Omit<Project, "id" | "updatedAt">) => void;
  onCancel: () => void;
}

const STATUS_OPTIONS: ProjectStatus[] = ["active", "paused", "archived"];

export function ProjectForm({ initial, onSubmit, onCancel }: ProjectFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [status, setStatus] = useState<ProjectStatus>(initial?.status ?? "active");
  const [owner, setOwner] = useState(initial?.owner ?? "");
  const [tagsInput, setTagsInput] = useState(initial?.tags.join(", ") ?? "");

  // Reset form when initial changes (e.g., switching from create to edit)
  useEffect(() => {
    setTitle(initial?.title ?? "");
    setDescription(initial?.description ?? "");
    setStatus(initial?.status ?? "active");
    setOwner(initial?.owner ?? "");
    setTagsInput(initial?.tags.join(", ") ?? "");
  }, [initial]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    onSubmit({ title, description, status, owner, tags });
  }

  const isValid = title.trim() && owner.trim();

  const inputClasses =
    "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-1";

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="column" className="gap-4">
        {/* Title */}
        <div className="flex flex-col gap-1">
          <label htmlFor="form-title" className="text-sm font-medium text-slate-700">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="form-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Project title"
            required
            className={inputClasses}
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label htmlFor="form-desc" className="text-sm font-medium text-slate-700">
            Description
          </label>
          <textarea
            id="form-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief project description"
            rows={3}
            className={inputClasses}
          />
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1">
          <label htmlFor="form-status" className="text-sm font-medium text-slate-700">
            Status
          </label>
          <select
            id="form-status"
            value={status}
            onChange={(e) => setStatus(e.target.value as ProjectStatus)}
            className={inputClasses}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Owner */}
        <div className="flex flex-col gap-1">
          <label htmlFor="form-owner" className="text-sm font-medium text-slate-700">
            Owner <span className="text-red-500">*</span>
          </label>
          <input
            id="form-owner"
            type="text"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            placeholder="Team or person name"
            required
            className={inputClasses}
          />
        </div>

        {/* Tags */}
        <div className="flex flex-col gap-1">
          <label htmlFor="form-tags" className="text-sm font-medium text-slate-700">
            Tags
          </label>
          <input
            id="form-tags"
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="Comma-separated tags (e.g. ads, reporting)"
            className={inputClasses}
          />
          <span className="text-xs text-slate-400">Separate multiple tags with commas</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button type="submit" variant="primary" disabled={!isValid}>
            {initial ? "Save changes" : "Create project"}
          </Button>
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </Stack>
    </form>
  );
}
