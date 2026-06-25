"use client";

import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { FilterConfig } from "./types";

type TableToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filters?: FilterConfig[];
  filterValues?: Record<string, string>;
  onFilterChange?: (key: string, value: string) => void;
  onCreate?: () => void;
  createLabel?: string;
  totalCount: number;
  filteredCount: number;
};

export function TableToolbar({
  search,
  onSearchChange,
  searchPlaceholder = "Search…",
  filters = [],
  filterValues = {},
  onFilterChange,
  onCreate,
  createLabel = "Create",
  totalCount,
  filteredCount,
}: TableToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
      {/* Left: search + filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>

        {filters.map((filter) => (
          <select
            key={filter.key}
            value={filterValues[filter.key] ?? filter.options[0]?.value ?? ""}
            onChange={(e) => onFilterChange?.(filter.key, e.target.value)}
            aria-label={filter.label}
            className="h-9 rounded-lg border border-input bg-background px-3 py-1 text-sm text-foreground shadow-xs transition-colors focus-visible:outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {filter.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ))}

        {filteredCount !== totalCount && (
          <span className="text-xs text-muted-foreground">
            {filteredCount} of {totalCount}
          </span>
        )}
      </div>

      {/* Right: create action */}
      {onCreate && (
        <Button onClick={onCreate} size="sm" className="gap-1.5">
          <Plus className="size-4" />
          {createLabel}
        </Button>
      )}
    </div>
  );
}
