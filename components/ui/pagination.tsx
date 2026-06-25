"use client";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ── Page-range builder ───────────────────────────────────────────────────────

type PageItem = number | "ellipsis";

/**
 * Returns the page numbers (and "ellipsis" placeholders) to render.
 *
 * Example — 15 pages, current 8, siblings 1:
 *   [1, "ellipsis", 7, 8, 9, "ellipsis", 15]
 */
function buildPageRange(
  current: number,
  total: number,
  siblings: number
): PageItem[] {
  if (total <= 1) return [1];

  const leftBound  = Math.max(2, current - siblings);
  const rightBound = Math.min(total - 1, current + siblings);

  const items: PageItem[] = [1];

  if (leftBound > 2)          items.push("ellipsis");
  for (let p = leftBound; p <= rightBound; p++) items.push(p);
  if (rightBound < total - 1) items.push("ellipsis");

  items.push(total);
  return items;
}

// ── Types ────────────────────────────────────────────────────────────────────

export type PaginationProps = {
  /** Active page (1-based, controlled by parent) */
  currentPage: number;
  /** Total items across all pages */
  totalItems: number;
  /** Items per page */
  pageSize: number;
  /** Called when the user navigates to a different page */
  onPageChange: (page: number) => void;
  /** Page-number buttons shown on each side of the active page (default 1) */
  siblingCount?: number;
  className?: string;
};

// ── Component ────────────────────────────────────────────────────────────────

/**
 * Controlled pagination bar.
 *
 * The component handles all display logic — page-range calculation, ellipsis,
 * first/prev/next/last navigation, and the "Showing X–Y of Z" counter.
 * The parent only needs to hold one piece of state: the current page number.
 *
 * Usage:
 * ```tsx
 * const [page, setPage] = useState(1);
 *
 * <Pagination
 *   currentPage={page}
 *   totalItems={items.length}
 *   pageSize={10}
 *   onPageChange={setPage}
 * />
 * ```
 */
export function Pagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  siblingCount = 1,
  className,
}: PaginationProps) {
  // ── Derived values (all logic lives here) ──────────────────────────────────

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  // Clamp incoming page in case totalItems shrank (e.g. rows deleted)
  const safePage   = Math.min(Math.max(1, currentPage), totalPages);

  const firstItem = totalItems === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const lastItem  = Math.min(safePage * pageSize, totalItems);

  const pages = buildPageRange(safePage, totalPages, siblingCount);

  function goTo(page: number) {
    const clamped = Math.max(1, Math.min(totalPages, page));
    if (clamped !== currentPage) onPageChange(clamped);
  }

  if (totalItems === 0) return null;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-4 border-t border-border px-4 py-3",
        className
      )}
    >
      {/* ── Counter ─────────────────────────────────────────────────────── */}
      <p className="text-xs text-muted-foreground">
        Showing{" "}
        <span className="font-medium text-foreground">{firstItem}–{lastItem}</span>{" "}
        of{" "}
        <span className="font-medium text-foreground">{totalItems}</span>{" "}
        {totalItems === 1 ? "result" : "results"}
      </p>

      {/* ── Navigation ──────────────────────────────────────────────────── */}
      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon-xs"
            onClick={() => goTo(1)}
            disabled={safePage <= 1}
            aria-label="First page"
          >
            <ChevronsLeft className="size-3.5" />
          </Button>

          <Button
            variant="outline"
            size="icon-xs"
            onClick={() => goTo(safePage - 1)}
            disabled={safePage <= 1}
            aria-label="Previous page"
          >
            <ChevronLeft className="size-3.5" />
          </Button>

          {pages.map((item, index) =>
            item === "ellipsis" ? (
              <span
                key={`ellipsis-${index}`}
                className="flex size-6 items-center justify-center text-xs text-muted-foreground select-none"
                aria-hidden="true"
              >
                …
              </span>
            ) : (
              <Button
                key={item}
                variant={item === safePage ? "default" : "outline"}
                size="icon-xs"
                onClick={() => goTo(item)}
                aria-label={`Page ${item}`}
                aria-current={item === safePage ? "page" : undefined}
              >
                {item}
              </Button>
            )
          )}

          <Button
            variant="outline"
            size="icon-xs"
            onClick={() => goTo(safePage + 1)}
            disabled={safePage >= totalPages}
            aria-label="Next page"
          >
            <ChevronRight className="size-3.5" />
          </Button>

          <Button
            variant="outline"
            size="icon-xs"
            onClick={() => goTo(totalPages)}
            disabled={safePage >= totalPages}
            aria-label="Last page"
          >
            <ChevronsRight className="size-3.5" />
          </Button>
        </div>
      )}
    </div>
  );
}
