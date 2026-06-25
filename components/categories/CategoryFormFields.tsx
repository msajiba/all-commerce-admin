"use client";

import { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormItem } from "@/components/form/FormItem";
import type { CategoryFormData } from "@/lib/schemas/category";

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type CategoryFormFieldsProps = {
  /** When true, slug is pre-filled and auto-generation is disabled by default */
  isEdit?: boolean;
};

/**
 * Form fields for creating / editing a category.
 * Must be rendered inside a <GenericForm schema={categorySchema}>.
 */
export function CategoryFormFields({ isEdit = false }: CategoryFormFieldsProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CategoryFormData>();

  // Auto-slug: enabled by default on create, disabled on edit
  const [autoSlug, setAutoSlug] = useState(!isEdit);
  const nameValue = watch("name");

  useEffect(() => {
    if (autoSlug && nameValue !== undefined) {
      setValue("slug", toSlug(nameValue), { shouldValidate: false });
    }
  }, [nameValue, autoSlug, setValue]);

  return (
    <>
      <FormItem name="name" label="Name" required>
        <Input
          id="name"
          placeholder="e.g. Electronics"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          {...register("name")}
        />
      </FormItem>

      <FormItem
        name="slug"
        label="Slug"
        required
        description="URL-friendly identifier — auto-generated from name."
      >
        <Input
          id="slug"
          placeholder="e.g. electronics"
          className="font-mono text-xs"
          aria-invalid={!!errors.slug}
          aria-describedby={errors.slug ? "slug-error" : undefined}
          {...register("slug", {
            onChange: () => setAutoSlug(false),
          })}
        />
      </FormItem>

      <FormItem name="status" label="Status" required>
        <Controller
          name="status"
          render={({ field }) => (
            <select
              id="status"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              ref={field.ref}
              aria-invalid={!!errors.status}
              className="h-9 w-full rounded-lg border border-input bg-background px-3 py-1 text-sm text-foreground shadow-xs transition-colors focus-visible:outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          )}
        />
      </FormItem>
    </>
  );
}
