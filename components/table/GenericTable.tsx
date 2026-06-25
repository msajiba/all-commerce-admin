"use client";

import { useState, useMemo, useCallback } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { TableToolbar } from "./TableToolbar";
import type { GenericTableProps } from "./types";
import { cn } from "@/lib/utils";

const DEFAULT_PAGE_SIZE = 10;

export function GenericTable<T extends { id: string }>({
  data,
  columns,
  searchKeys = [],
  searchPlaceholder,
  filters = [],
  onCreate,
  createLabel,
  rowActions = [],
  selectable = false,
  onSelectionChange,
  pageSize = DEFAULT_PAGE_SIZE,
  emptyMessage = "No records found.",
  caption,
}: GenericTableProps<T>) {
  const [search, setSearch] = useState("");
  const [filterValues, setFilterValues] = useState<Record<string, string>>(
    () => Object.fromEntries(filters.map((f) => [f.key, f.options[0]?.value ?? ""]))
  );
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  // Driven by <Pagination onPageChange>; Pagination owns the page-navigation logic.
  const [currentPage, setCurrentPage] = useState(1);

  // ── Filtering ──────────────────────────────────────────────────────────────

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return data.filter((row) => {
      const matchesSearch =
        !q ||
        searchKeys.some((key) =>
          String(row[key] ?? "").toLowerCase().includes(q)
        );
      if (!matchesSearch) return false;

      return filters.every((filter) => {
        const active = filterValues[filter.key];
        const first  = filter.options[0]?.value ?? "";
        if (!active || active === first) return true;
        return String(row[filter.key as keyof T] ?? "") === active;
      });
    });
  }, [data, search, searchKeys, filters, filterValues]);

  // ── Slice current page ─────────────────────────────────────────────────────
  // Pagination's resetKey resets the page when search/filters change, so we
  // don't need to call setCurrentPage(1) here manually.

  const paginated = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // ── Selection ──────────────────────────────────────────────────────────────

  const pageIds = useMemo(() => new Set(paginated.map((r) => r.id)), [paginated]);
  const allPageSelected =
    pageIds.size > 0 && [...pageIds].every((id) => selectedIds.has(id));
  const somePageSelected =
    !allPageSelected && [...pageIds].some((id) => selectedIds.has(id));

  const toggleAll = useCallback(() => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allPageSelected) {
        pageIds.forEach((id) => next.delete(id));
      } else {
        pageIds.forEach((id) => next.add(id));
      }
      onSelectionChange?.([...next]);
      return next;
    });
  }, [allPageSelected, pageIds, onSelectionChange]);

  const toggleRow = useCallback(
    (id: string) => {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) { next.delete(id); } else { next.add(id); }
        onSelectionChange?.([...next]);
        return next;
      });
    },
    [onSelectionChange]
  );

  // ── Filter / search handlers ───────────────────────────────────────────────

  const handleFilterChange = useCallback((key: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setCurrentPage(1);
  }, []);

  // ── Render ─────────────────────────────────────────────────────────────────

  const hasActions = rowActions.length > 0;
  const colCount = (selectable ? 1 : 0) + columns.length + (hasActions ? 1 : 0);

  return (
    <div className="flex flex-col gap-0">
      <TableToolbar
        search={search}
        onSearchChange={handleSearchChange}
        searchPlaceholder={searchPlaceholder}
        filters={filters}
        filterValues={filterValues}
        onFilterChange={handleFilterChange}
        onCreate={onCreate}
        createLabel={createLabel}
        totalCount={data.length}
        filteredCount={filtered.length}
      />

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            {caption && <caption className="sr-only">{caption}</caption>}

            <thead>
              <tr className="border-b border-border bg-muted/40">
                {selectable && (
                  <th className="w-10 px-4 py-3">
                    <Checkbox
                      checked={allPageSelected}
                      indeterminate={somePageSelected}
                      onCheckedChange={toggleAll}
                      aria-label="Select all rows on this page"
                    />
                  </th>
                )}
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={cn(
                      "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground",
                      col.headerClassName
                    )}
                  >
                    {col.header}
                  </th>
                ))}
                {hasActions && (
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={colCount}
                    className="py-12 text-center text-sm text-muted-foreground"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                paginated.map((row) => {
                  const isSelected = selectedIds.has(row.id);
                  return (
                    <tr
                      key={row.id}
                      className={cn(
                        "transition-colors hover:bg-muted/30",
                        isSelected && "bg-primary/5"
                      )}
                    >
                      {selectable && (
                        <td className="w-10 px-4 py-3">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => toggleRow(row.id)}
                            aria-label={`Select row ${row.id}`}
                          />
                        </td>
                      )}
                      {columns.map((col) => (
                        <td
                          key={col.key}
                          className={cn("px-4 py-3 text-foreground", col.className)}
                        >
                          {col.render
                            ? col.render(row)
                            : String((row as Record<string, unknown>)[col.key] ?? "")}
                        </td>
                      ))}
                      {hasActions && (
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            {rowActions
                              .filter((action) => !action.hidden?.(row))
                              .map((action) => (
                                <Button
                                  key={action.label}
                                  variant={action.variant === "destructive" ? "destructive" : "ghost"}
                                  size="icon-sm"
                                  onClick={() => action.onClick(row)}
                                  aria-label={`${action.label} row`}
                                >
                                  {action.icon && <action.icon className="size-3.5" />}
                                </Button>
                              ))}
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination — all display/navigation logic lives in the component */}
        <Pagination
          currentPage={currentPage}
          totalItems={filtered.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
