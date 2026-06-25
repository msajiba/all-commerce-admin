"use client";

import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FormItemProps = {
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
};

/**
 * Wraps a form field with a label and validation error message.
 * Must be used inside a <GenericForm> (FormProvider context).
 *
 * The child input should use `useFormContext` and `register(name)` or Controller.
 */
export function FormItem({
  name,
  label,
  description,
  required,
  className,
  children,
}: FormItemProps) {
  const {
    formState: { errors },
  } = useFormContext();

  const error = errors[name];
  const errorMessage =
    error && typeof error.message === "string" ? error.message : null;

  return (
    <div data-slot="form-item" className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <Label
          htmlFor={name}
          className={cn(error && "text-destructive")}
        >
          {label}
          {required && (
            <span className="ml-0.5 text-destructive" aria-hidden="true">
              *
            </span>
          )}
        </Label>
      )}

      {children}

      {description && !errorMessage && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}

      {errorMessage && (
        <p
          id={`${name}-error`}
          role="alert"
          className="text-xs font-medium text-destructive"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
}
