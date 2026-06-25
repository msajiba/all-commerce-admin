import { Badge } from "@/components/ui/badge";
import type { Column } from "@/components/table/types";
import type { Category } from "@/lib/mock/categories";

export const categoryColumns: Column<Category>[] = [
  {
    key: "name",
    header: "Name",
    render: (row) => (
      <span className="font-medium text-foreground">{row.name}</span>
    ),
  },
  {
    key: "slug",
    header: "Slug",
    render: (row) => (
      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
        {row.slug}
      </code>
    ),
  },
  {
    key: "productsCount",
    header: "Products",
    render: (row) => (
      <span className="text-muted-foreground">{row.productsCount}</span>
    ),
    headerClassName: "text-right",
    className: "text-right",
  },
  {
    key: "status",
    header: "Status",
    render: (row) => (
      <Badge variant={row.status === "active" ? "success" : "muted"}>
        {row.status === "active" ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  {
    key: "createdAt",
    header: "Created",
    render: (row) => (
      <span className="text-muted-foreground">
        {new Date(row.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </span>
    ),
  },
];
