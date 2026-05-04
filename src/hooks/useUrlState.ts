import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { ProjectStatus } from "@/types";

export interface UrlFilterState {
  query: string;
  status: ProjectStatus | "";
  tags: string[];
  selectedId: string;
}

const PARAM = {
  QUERY: "q",
  STATUS: "status",
  TAG: "tag",
  SELECTED: "selected",
} as const;

const VALID_STATUSES = new Set<string>(["active", "paused", "archived"]);

function parseStatus(value: string | null): ProjectStatus | "" {
  return value && VALID_STATUSES.has(value) ? (value as ProjectStatus) : "";
}

/**
 * Two-way sync between URL search params and filter state.
 * Uses replaceState (not pushState) to avoid polluting history.
 */
export function useUrlState() {
  const [searchParams, setSearchParams] = useSearchParams();

  const state: UrlFilterState = useMemo(
    () => ({
      query: searchParams.get(PARAM.QUERY) ?? "",
      status: parseStatus(searchParams.get(PARAM.STATUS)),
      tags: searchParams.getAll(PARAM.TAG),
      selectedId: searchParams.get(PARAM.SELECTED) ?? "",
    }),
    [searchParams],
  );

  const setFilters = useCallback(
    (updates: Partial<UrlFilterState>) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);

          if ("query" in updates) {
            if (updates.query) {
              next.set(PARAM.QUERY, updates.query);
            } else {
              next.delete(PARAM.QUERY);
            }
          }

          if ("status" in updates) {
            if (updates.status) {
              next.set(PARAM.STATUS, updates.status);
            } else {
              next.delete(PARAM.STATUS);
            }
          }

          if ("tags" in updates) {
            next.delete(PARAM.TAG);
            updates.tags?.forEach((t) => next.append(PARAM.TAG, t));
          }

          if ("selectedId" in updates) {
            if (updates.selectedId) {
              next.set(PARAM.SELECTED, updates.selectedId);
            } else {
              next.delete(PARAM.SELECTED);
            }
          }

          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  return { ...state, setFilters } as const;
}
