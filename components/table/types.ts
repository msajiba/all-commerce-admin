import type { LucideIcon } from "lucide-react";

/** Column definition for GenericTable */
export type Column<T> = {
  /** Unique column identifier */
  key: string;
  /** Column header label */
  header: string;
  /** Custom cell renderer. Falls back to String(row[key]) if omitted. */
  render?: (row: T) => React.ReactNode;
  /** Extra classes on the <td> element */
  className?: string;
  /** Extra classes on the <th> element */
  headerClassName?: string;
};

/** Per-row action (edit, delete, view, etc.) */
export type RowAction<T> = {
  label: string;
  icon?: LucideIcon;
  onClick: (row: T) => void;
  variant?: "default" | "destructive";
  /** Hide this action for specific rows */
  hidden?: (row: T) => boolean;
};

/** A filter rendered in the toolbar */
export type FilterConfig = {
  /** Matches a key in the filterValues record */
  key: string;
  /** Label shown above/in the select */
  label: string;
  options: { label: string; value: string }[];
};

export type GenericTableProps<T extends { id: string }> = {
  data: T[];
  columns: Column<T>[];
  /** Keys to search across (uses String(row[key]).includes(query)) */
  searchKeys?: (keyof T)[];
  searchPlaceholder?: string;
  filters?: FilterConfig[];
  /** Called when Create button is clicked */
  onCreate?: () => void;
  createLabel?: string;
  /** Per-row action buttons rendered in the Actions column */
  rowActions?: RowAction<T>[];
  /** Enable row selection checkboxes */
  selectable?: boolean;
  /** Fired whenever the selected rows change */
  onSelectionChange?: (ids: string[]) => void;
  /** Rows per page (default 10) */
  pageSize?: number;
  emptyMessage?: string;
  /** Optional caption for screen readers */
  caption?: string;
};
