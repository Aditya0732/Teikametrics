import { useEffect, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import type { Project } from "@/types";
import { ProjectList } from "@/components/ProjectList";
import { ProjectDetail } from "@/components/ProjectDetail";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { EmptyState } from "@/components/EmptyState";

interface MainContentProps {
  projects: Project[];
  selectedProject: Project | null;
  selectedId: string;
  isLoading: boolean;
  error: string | null;
  onSelect: (id: string) => void;
  onClose: () => void;
  onEdit: (id: string) => void;
  onRetry: () => void;
}

export function MainContent({
  projects, selectedProject, selectedId,
  isLoading, error,
  onSelect, onClose, onEdit, onRetry,
}: MainContentProps) {
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedProject && detailRef.current) {
      detailRef.current.focus({ preventScroll: true });
      const scrollContainer = detailRef.current.closest("[data-detail-scroll]");
      if (scrollContainer && typeof scrollContainer.scrollTo === "function") {
        scrollContainer.scrollTo(0, 0);
      }
    }
  }, [selectedProject]);

  function renderListContent() {
    if (isLoading) return <LoadingState />;
    if (error) return <ErrorState message={error} onRetry={onRetry} />;
    if (projects.length === 0) return <EmptyState />;
    return (
      <ProjectList
        projects={projects}
        selectedId={selectedId}
        onSelect={onSelect}
        compact={!!selectedProject}
        onEdit={onEdit}
      />
    );
  }

  return (
    <LayoutGroup>
      <main
        aria-labelledby="app-title"
        className="mx-auto flex w-full max-w-6xl flex-1 gap-4 overflow-hidden px-3 pt-2 pb-2 sm:px-6 sm:pt-3 lg:gap-5"
      >
        <motion.section
          layout
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          aria-label="Project list"
          className={`min-h-0 overflow-y-auto pr-1 [scrollbar-gutter:stable] ${
            selectedProject ? "hidden lg:block lg:w-[380px] lg:shrink-0" : "flex-1"
          }`}
        >
          {renderListContent()}
        </motion.section>

        <AnimatePresence>
          {selectedProject && (
            <motion.aside
              key="detail-panel"
              data-detail-scroll
              layout
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30, transition: { duration: 0.2 } }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="min-h-0 flex-1 overflow-y-auto rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 [scrollbar-gutter:stable]"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedProject.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <ProjectDetail
                    ref={detailRef}
                    project={selectedProject}
                    onClose={onClose}
                    onEdit={onEdit}
                  />
                </motion.div>
              </AnimatePresence>
            </motion.aside>
          )}
        </AnimatePresence>
      </main>
    </LayoutGroup>
  );
}
