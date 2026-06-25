"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { GenericTable } from "@/components/table/GenericTable";
import { GenericForm } from "@/components/form/GenericForm";
import { Button } from "@/components/ui/button";
import { AppDialog } from "@/components/ui/app-dialog";
import { CategoryFormFields } from "./CategoryFormFields";
import { categoryColumns } from "./categoryColumns";
import { categorySchema, type CategoryFormData } from "@/lib/schemas/category";
import type { Category } from "@/lib/mock/categories";
import type { RowAction, FilterConfig } from "@/components/table/types";

const STATUS_FILTERS: FilterConfig[] = [
  {
    key: "status",
    label: "Status",
    options: [
      { label: "All statuses", value: "all" },
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
  },
];

type CategoriesClientProps = {
  initialData: Category[];
};

type ModalMode = "create" | "edit";

export function CategoriesClient({ initialData }: CategoriesClientProps) {
  const [categories, setCategories] = useState<Category[]>(initialData);

  // ── Create / Edit modal ────────────────────────────────────────────────────
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>("create");
  const [editTarget, setEditTarget] = useState<Category | null>(null);

  // ── Delete confirm modal ───────────────────────────────────────────────────
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  // ── Handlers ───────────────────────────────────────────────────────────────

  function openCreate() {
    setModalMode("create");
    setEditTarget(null);
    setModalOpen(true);
  }

  function openEdit(category: Category) {
    setModalMode("edit");
    setEditTarget(category);
    setModalOpen(true);
  }

  function openDelete(category: Category) {
    setDeleteTarget(category);
    setDeleteOpen(true);
  }

  function handleFormSubmit(data: CategoryFormData) {
    if (modalMode === "create") {
      setCategories((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          name: data.name,
          slug: data.slug,
          status: data.status,
          productsCount: 0,
          createdAt: new Date().toISOString(),
        },
      ]);
    } else if (editTarget) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editTarget.id
            ? { ...c, name: data.name, slug: data.slug, status: data.status }
            : c
        )
      );
    }
    setModalOpen(false);
  }

  function handleConfirmDelete() {
    if (deleteTarget) {
      setCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    }
    setDeleteOpen(false);
    setDeleteTarget(null);
  }

  // ── Row actions ────────────────────────────────────────────────────────────

  const rowActions: RowAction<Category>[] = [
    { label: "Edit",   icon: Pencil, onClick: openEdit },
    { label: "Delete", icon: Trash2, variant: "destructive", onClick: openDelete },
  ];

  // Using `key` forces GenericForm to remount when switching targets so
  // react-hook-form picks up the fresh defaultValues each time.
  const formKey = editTarget?.id ?? "create";
  const formDefaults: Partial<CategoryFormData> = editTarget
    ? { name: editTarget.name, slug: editTarget.slug, status: editTarget.status }
    : { name: "", slug: "", status: "active" };

  return (
    <>
      {/* ── Page header ───────────────────────────────────────────────────── */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground">Categories</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Manage your store&apos;s product categories
        </p>
      </div>

      {/* ── Table ─────────────────────────────────────────────────────────── */}
      <GenericTable<Category>
        data={categories}
        columns={categoryColumns}
        searchKeys={["name", "slug"]}
        searchPlaceholder="Search by name or slug…"
        filters={STATUS_FILTERS}
        onCreate={openCreate}
        createLabel="Add Category"
        rowActions={rowActions}
        selectable
        pageSize={10}
        emptyMessage="No categories found. Create your first one."
        caption="Categories table"
      />

      {/* ── Create / Edit dialog ──────────────────────────────────────────── */}
      <AppDialog
        open={modalOpen}
        onOpenChange={setModalOpen}
        title={modalMode === "create" ? "New Category" : "Edit Category"}
        description={
          modalMode === "create"
            ? "Add a new product category to your store."
            : `Editing "${editTarget?.name}"`
        }
        footer={
          <>
            <Button variant="outline" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" form="category-form">
              {modalMode === "create" ? "Create" : "Save changes"}
            </Button>
          </>
        }
      >
        <GenericForm<CategoryFormData>
          key={formKey}
          schema={categorySchema}
          onSubmit={handleFormSubmit}
          defaultValues={formDefaults}
          id="category-form"
        >
          <CategoryFormFields isEdit={modalMode === "edit"} />
        </GenericForm>
      </AppDialog>

      {/* ── Delete confirmation dialog ────────────────────────────────────── */}
      <AppDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title={<>Delete &ldquo;{deleteTarget?.name}&rdquo;?</>}
        description="This will permanently remove the category. This action cannot be undone."
        size="sm"
        showCloseButton={false}
        footer={
          <>
            <Button variant="outline" type="button" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </>
        }
      />
    </>
  );
}
