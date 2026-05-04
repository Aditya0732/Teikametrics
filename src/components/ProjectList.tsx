import type { Project } from "@/types";
import { ProjectCard } from "./ProjectCard";

interface ProjectListProps {
  projects: Project[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function ProjectList({
  projects,
  selectedId,
  onSelect,
}: ProjectListProps) {
  return (
    <div className="space-y-2">
      <div aria-live="polite" className="sr-only">
        {projects.length} project{projects.length !== 1 ? "s" : ""} found
      </div>
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          isSelected={project.id === selectedId}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
