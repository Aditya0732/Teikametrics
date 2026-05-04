import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/types";
import { ProjectCard } from "./ProjectCard";

interface ProjectListProps {
  projects: Project[];
  selectedId: string;
  onSelect: (id: string) => void;
  compact?: boolean;
  onEdit?: (id: string) => void;
}

export function ProjectList({
  projects,
  selectedId,
  onSelect,
  compact = false,
  onEdit,
}: ProjectListProps) {
  return (
    <div className="space-y-2">
      <div aria-live="polite" className="sr-only">
        {projects.length} project{projects.length !== 1 ? "s" : ""} found
      </div>
      <AnimatePresence mode="popLayout">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              duration: 0.2,
              delay: index * 0.03,
              layout: { duration: 0.25 },
            }}
          >
            <ProjectCard
              project={project}
              isSelected={project.id === selectedId}
              onSelect={onSelect}
              compact={compact}
              onEdit={onEdit}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
