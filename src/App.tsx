/**
 * Project Hub Lite — main application shell.
 * Master-detail layout with URL-synced filters, debounced search,
 * keyboard shortcuts, and optional CRUD via slideovers.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "./types";
import { useUrlState } from "@/hooks/useUrlState";
import { useProjects } from "@/hooks/useProjects";
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";
import { FilterBar } from "@/components/FilterBar";
import { ProjectList } from "@/components/ProjectList";
import { ProjectDetail } from "@/components/ProjectDetail";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { EmptyState } from "@/components/EmptyState";
import { CopyLinkButton } from "@/components/CopyLinkButton";
import { Slideover } from "@/components/Slideover";
import { ProjectForm } from "@/components/ProjectForm";
import { createProject, updateProject } from "@/services/projectService";
import "./App.css";

export default function App() {
  const { query, status, tags, selectedId, setFilters } = useUrlState();

  const { projects, allTags, isLoading, error, retry } = useProjects({
    query,
    status,
    tags,
  });

  const detailRef = useRef<HTMLDivElement>(null);

  // Find selected project
  const selectedProject = useMemo(
    () => projects.find((p) => p.id === selectedId) ?? null,
    [projects, selectedId],
  );

  // Focus management: move focus to detail on selection change
  useEffect(() => {
    if (selectedProject && detailRef.current) {
      detailRef.current.focus({ preventScroll: true });
      // Ensure detail panel starts at top
      const scrollContainer = detailRef.current.closest("[data-detail-scroll]");
      if (scrollContainer && typeof scrollContainer.scrollTo === "function") {
        scrollContainer.scrollTo(0, 0);
      }
    }
  }, [selectedProject]);

  // --- Keyboard shortcuts ---
  const focusSearch = useCallback(() => {
    document.getElementById("project-search")?.focus();
  }, []);

  const closeDetail = useCallback(() => {
    setFilters({ selectedId: "" });
  }, [setFilters]);

  // Ctrl+K or "/" → focus search
  useKeyboardShortcut({ key: "k", ctrl: true, handler: focusSearch, global: true });
  useKeyboardShortcut({ key: "/", handler: focusSearch });

  // Escape → close detail (only when not in slideover)
  useKeyboardShortcut({
    key: "Escape",
    handler: closeDetail,
    global: true,
  });

  // --- Filter handlers ---
  const handleQueryChange = useCallback(
    (q: string) => setFilters({ query: q }),
    [setFilters],
  );
  const handleStatusChange = useCallback(
    (s: typeof status) => setFilters({ status: s }),
    [setFilters],
  );
  const handleTagsChange = useCallback(
    (t: string[]) => setFilters({ tags: t }),
    [setFilters],
  );
  const handleSelect = useCallback(
    (id: string) =>
      setFilters({ selectedId: id === selectedId ? "" : id }),
    [setFilters, selectedId],
  );

  const handleClearFilters = useCallback(() => {
    setFilters({ query: "", status: "", tags: [], selectedId: "" });
  }, [setFilters]);

  // --- CRUD (stretch) ---
  const [slideoverMode, setSlideoverMode] = useState<
    "closed" | "create" | "edit"
  >("closed");
  const [editingProject, setEditingProject] = useState<Project | undefined>();

  function handleOpenCreate() {
    setEditingProject(undefined);
    setSlideoverMode("create");
  }

  function handleOpenEdit(id: string) {
    const p = projects.find((proj) => proj.id === id);
    if (p) {
      setEditingProject(p);
      setSlideoverMode("edit");
    }
  }

  async function handleFormSubmit(data: Omit<Project, "id" | "updatedAt">) {
    if (slideoverMode === "create") {
      await createProject(data);
    } else if (slideoverMode === "edit" && editingProject) {
      await updateProject(editingProject.id, data);
    }
    setSlideoverMode("closed");
    retry(); // Re-fetch to pick up changes
  }

  // --- Rendering helpers ---
  const hasActiveFilters = query || status || tags.length > 0;

  function renderListContent() {
    if (isLoading) return <LoadingState />;
    if (error) return <ErrorState message={error} onRetry={retry} />;
    if (projects.length === 0) return <EmptyState />;
    return (
      <ProjectList
        projects={projects}
        selectedId={selectedId}
        onSelect={handleSelect}
      />
    );
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-50">
      {/* Top bar */}
      <header className="z-30 shrink-0 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
            </div>
            <h1 className="text-base font-semibold text-slate-900">
              Project Hub
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <CopyLinkButton />
            <button
              type="button"
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              New project
            </button>
          </div>
        </div>
      </header>

      {/* Filter bar — fixed, non-scrollable */}
      <div className="shrink-0 border-b border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 pt-3 pb-2 sm:px-6">
          <section aria-label="Project filters">
            <FilterBar
              query={query}
              onQueryChange={handleQueryChange}
              status={status}
              onStatusChange={handleStatusChange}
              allTags={allTags}
              selectedTags={tags}
              onTagsChange={handleTagsChange}
            />
          </section>

          {/* Active filter chips + count */}
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-slate-500">
              {isLoading ? "Loading…" : `${projects.length} project${projects.length !== 1 ? "s" : ""}`}
            </span>
            {hasActiveFilters && (
              <>
                <span className="h-3 w-px bg-slate-200" aria-hidden="true" />
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-800 focus-visible:outline-none focus-visible:underline"
                >
                  Clear filters
                </button>
              </>
            )}
            {/* Keyboard hint — subtle, right-aligned */}
            <span className="ml-auto hidden text-[11px] text-slate-400 sm:inline-flex sm:items-center sm:gap-1">
              <kbd className="rounded border border-slate-200 bg-slate-50 px-1 py-0.5 font-mono text-[10px]">/</kbd>
              search
              {selectedProject && (
                <>
                  <span className="mx-1">·</span>
                  <kbd className="rounded border border-slate-200 bg-slate-50 px-1 py-0.5 font-mono text-[10px]">Esc</kbd>
                  close
                </>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Main content — fills remaining height, no page scroll */}
      <main
        aria-labelledby="app-title"
        className={`mx-auto flex w-full max-w-6xl flex-1 gap-5 overflow-hidden px-4 pt-3 pb-2 sm:px-6 ${
          selectedProject ? "lg:grid lg:grid-cols-[380px_1fr]" : "flex flex-col"
        }`}
      >
        {/* List column — independently scrollable */}
        <section
          aria-label="Project list"
          className="min-h-0 flex-1 overflow-y-auto pr-1 [scrollbar-gutter:stable]"
        >
          {renderListContent()}
        </section>

        {/* Detail column — independently scrollable */}
        {selectedProject && (
          <aside data-detail-scroll className="min-h-0 overflow-y-auto rounded-xl border border-slate-200 bg-white p-6 shadow-sm [scrollbar-gutter:stable]">
            <ProjectDetail
              ref={detailRef}
              project={selectedProject}
              onClose={closeDetail}
              onEdit={handleOpenEdit}
            />
          </aside>
        )}
      </main>

      {/* Slideover (create/edit) */}
      <Slideover
        open={slideoverMode !== "closed"}
        onClose={() => setSlideoverMode("closed")}
        title={slideoverMode === "create" ? "Create Project" : "Edit Project"}
      >
        <ProjectForm
          initial={slideoverMode === "edit" ? editingProject : undefined}
          onSubmit={handleFormSubmit}
          onCancel={() => setSlideoverMode("closed")}
        />
      </Slideover>
    </div>
  );
}
