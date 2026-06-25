"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FieldValues, DefaultValues, SubmitHandler } from "react-hook-form";
import type { z } from "zod";
import { cn } from "@/lib/utils";

// Bridge between Zod v4's type structure and react-hook-form's FieldValues constraint.
// The `as any` on zodResolver is intentional — the runtime works correctly; only the
// type-level generic parameters differ between Zod v4 and the resolver's declarations.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ZodSchema<T extends FieldValues = FieldValues> = z.ZodType<T, any, any>;

type GenericFormProps<T extends FieldValues> = {
  schema: ZodSchema<T>;
  onSubmit: SubmitHandler<T>;
  defaultValues?: DefaultValues<T>;
  children: React.ReactNode;
  className?: string;
  /** Optional form id so external submit buttons can use `form={id}` */
  id?: string;
};

/**
 * Generic form wrapper that integrates React Hook Form + Zod validation.
 *
 * Wraps children in a FormProvider so any descendant can call
 * `useFormContext()` to access field registration, errors, and form state.
 *
 * Usage:
 * ```tsx
 * <GenericForm<MyFormData> schema={mySchema} onSubmit={onSubmit} defaultValues={...}>
 *   <MyFormFields />
 *   <Button type="submit">Save</Button>
 * </GenericForm>
 * ```
 */
export function GenericForm<T extends FieldValues>({
  schema,
  onSubmit,
  defaultValues,
  children,
  className,
  id,
}: GenericFormProps<T>) {
  const form = useForm<T>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any),
    defaultValues,
  });

  return (
    <FormProvider {...form}>
      <form
        id={id}
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-4", className)}
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  );
}
