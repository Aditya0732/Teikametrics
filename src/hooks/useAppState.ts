import { useCallback, useState } from "react";
import type { Project } from "@/types";
import { useUrlState } from "@/hooks/useUrlState";
import { useProjects } from "@/hooks/useProjects";
import { createProject, updateProject } from "@/services/projectService";

export type SlideoverMode = "closed" | "create" | "edit";

export function useAppState() {
  const { query, status, tags, selectedId, setFilters } = useUrlState();

  const { projects, allTags, isLoading, error, retry } = useProjects({
    query,
    status,
    tags,
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
    (id: string) => setFilters({ selectedId: id === selectedId ? "" : id }),
    [setFilters, selectedId],
  );
  const handleClearFilters = useCallback(() => {
    setFilters({ query: "", status: "", tags: [], selectedId: "" });
  }, [setFilters]);

  const closeDetail = useCallback(() => {
    setFilters({ selectedId: "" });
  }, [setFilters]);

  // --- CRUD ---
  const [slideoverMode, setSlideoverMode] = useState<SlideoverMode>("closed");
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
    retry();
  }

  const selectedProject = projects.find((p) => p.id === selectedId) ?? null;
  const hasActiveFilters = !!(query || status || tags.length > 0);

  return {
    // Filter state
    query, status, tags, selectedId,
    projects, allTags, isLoading, error,
    selectedProject, hasActiveFilters,
    // Filter handlers
    handleQueryChange, handleStatusChange, handleTagsChange,
    handleSelect, handleClearFilters, closeDetail,
    // CRUD
    slideoverMode, setSlideoverMode, editingProject,
    handleOpenCreate, handleOpenEdit, handleFormSubmit,
    // Misc
    retry,
  };
}
