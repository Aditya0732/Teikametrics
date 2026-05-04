import type { Project } from "@/types";
import rawProjects from "@/data/projects.json";

const SIMULATED_DELAY_MS = 800;

let inMemoryProjects: Project[] = [...(rawProjects as Project[])];

/**
 * Simulated async fetch — resolves with all projects after a delay.
 * Supports an optional signal-like abort via a `shouldReject` flag
 * for testing error states.
 */
export function fetchProjects(options?: {
  simulateError?: boolean;
}): Promise<Project[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (options?.simulateError) {
        reject(new Error("Failed to fetch projects. Please try again."));
      } else {
        resolve([...inMemoryProjects]);
      }
    }, SIMULATED_DELAY_MS);
  });
}

/** Add a new project to in-memory store. */
export function createProject(
  project: Omit<Project, "id" | "updatedAt">,
): Promise<Project> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newProject: Project = {
        ...project,
        id: crypto.randomUUID(),
        updatedAt: new Date().toISOString(),
      };
      inMemoryProjects = [newProject, ...inMemoryProjects];
      resolve(newProject);
    }, 400);
  });
}

/** Update an existing project in the in-memory store. */
export function updateProject(
  id: string,
  updates: Partial<Omit<Project, "id">>,
): Promise<Project> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const idx = inMemoryProjects.findIndex((p) => p.id === id);
      if (idx === -1) {
        reject(new Error(`Project "${id}" not found.`));
        return;
      }
      const updated: Project = {
        ...inMemoryProjects[idx],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      inMemoryProjects[idx] = updated;
      resolve(updated);
    }, 400);
  });
}

/** Reset in-memory store to original data (useful for tests). */
export function resetProjects(): void {
  inMemoryProjects = [...(rawProjects as Project[])];
}
