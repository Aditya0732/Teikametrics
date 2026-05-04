import { useState, useEffect, useRef, useCallback } from "react";
import type { Project, ProjectStatus } from "@/types";
import { fetchProjects } from "@/services/projectService";

interface UseProjectsOptions {
  query: string;
  status: ProjectStatus | "";
  tags: string[];
}

interface UseProjectsResult {
  projects: Project[];
  allTags: string[];
  isLoading: boolean;
  error: string | null;
  retry: () => void;
}

function filterProjects(
  all: Project[],
  { query, status, tags }: UseProjectsOptions,
): Project[] {
  const q = query.toLowerCase().trim();

  return all.filter((p) => {
    // Search on title + description
    if (q && !p.title.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q)) {
      return false;
    }
    // Status filter
    if (status && p.status !== status) {
      return false;
    }
    // Tag filter (OR: project must have at least ONE of the selected tags)
    if (tags.length > 0 && !tags.some((t) => p.tags.includes(t))) {
      return false;
    }
    return true;
  });
}

/**
 * Fetches projects with simulated async, applies client-side filtering,
 * and handles loading/error/stale-async states.
 */
export function useProjects(options: UseProjectsOptions): UseProjectsResult {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Stale async: request counter
  const requestIdRef = useRef(0);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  const loadData = useCallback(() => {
    const currentRequestId = ++requestIdRef.current;
    setIsLoading(true);
    setError(null);

    fetchProjects()
      .then((data) => {
        // Stale check: only accept if this is still the latest request
        if (currentRequestId !== requestIdRef.current) return;

        setAllProjects(data);
        // Extract unique tags sorted alphabetically
        const tagSet = new Set<string>();
        data.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
        setAllTags(Array.from(tagSet).sort());
        setIsLoading(false);
      })
      .catch((err: Error) => {
        if (currentRequestId !== requestIdRef.current) return;
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData, fetchTrigger]);

  const retry = useCallback(() => {
    setFetchTrigger((n) => n + 1);
  }, []);

  const filtered = filterProjects(allProjects, options);

  return { projects: filtered, allTags, isLoading, error, retry };
}
