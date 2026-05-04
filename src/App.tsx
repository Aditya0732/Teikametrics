/**
 * Project Hub Lite — main application shell.
 * Thin composition layer: delegates state to useAppState,
 * and renders AppHeader, FilterSection, MainContent, and Slideover.
 */
import { useCallback } from "react";
import { useAppState } from "@/hooks/useAppState";
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";
import { AppHeader } from "@/components/AppHeader";
import { FilterSection } from "@/components/FilterSection";
import { MainContent } from "@/components/MainContent";
import { Slideover } from "@/components/Slideover";
import { ProjectForm } from "@/components/ProjectForm";
import "./App.css";

export default function App() {
  const state = useAppState();

  // --- Keyboard shortcuts ---
  const focusSearch = useCallback(() => {
    document.getElementById("project-search")?.focus();
  }, []);

  useKeyboardShortcut({ key: "k", ctrl: true, handler: focusSearch, global: true });
  useKeyboardShortcut({ key: "/", handler: focusSearch });
  useKeyboardShortcut({ key: "Escape", handler: state.closeDetail, global: true });

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-50">
      <AppHeader onCreateProject={state.handleOpenCreate} />

      <FilterSection
        query={state.query}
        onQueryChange={state.handleQueryChange}
        status={state.status}
        onStatusChange={state.handleStatusChange}
        allTags={state.allTags}
        selectedTags={state.tags}
        onTagsChange={state.handleTagsChange}
        projectCount={state.projects.length}
        isLoading={state.isLoading}
        hasActiveFilters={state.hasActiveFilters}
        onClearFilters={state.handleClearFilters}
        hasSelectedProject={!!state.selectedProject}
      />

      <MainContent
        projects={state.projects}
        selectedProject={state.selectedProject}
        selectedId={state.selectedId}
        isLoading={state.isLoading}
        error={state.error}
        onSelect={state.handleSelect}
        onClose={state.closeDetail}
        onEdit={state.handleOpenEdit}
        onRetry={state.retry}
      />

      <Slideover
        open={state.slideoverMode !== "closed"}
        onClose={() => state.setSlideoverMode("closed")}
        title={state.slideoverMode === "create" ? "Create Project" : "Edit Project"}
      >
        <ProjectForm
          initial={state.slideoverMode === "edit" ? state.editingProject : undefined}
          onSubmit={state.handleFormSubmit}
          onCancel={() => state.setSlideoverMode("closed")}
        />
      </Slideover>
    </div>
  );
}
