"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
} as const;

type AppDialogProps = {
  /** Controlled open state */
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Dialog heading */
  title: React.ReactNode;
  /** Optional subtitle shown beneath the title */
  description?: React.ReactNode;
  /** Buttons / actions rendered in the footer */
  footer?: React.ReactNode;
  /** Main body content (optional for confirm-style dialogs) */
  children?: React.ReactNode;
  size?: keyof typeof sizeMap;
  showCloseButton?: boolean;
  className?: string;
};

/**
 * Single-import dialog that composes all Dialog sub-components.
 *
 * Usage:
 * ```tsx
 * <AppDialog
 *   open={open}
 *   onOpenChange={setOpen}
 *   title="New Category"
 *   description="Fill in the details below."
 *   footer={
 *     <>
 *       <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
 *       <Button type="submit">Save</Button>
 *     </>
 *   }
 * >
 *   <CategoryFormFields />
 * </AppDialog>
 * ```
 */
export function AppDialog({
  open,
  onOpenChange,
  title,
  description,
  footer,
  children,
  size = "md",
  showCloseButton = true,
  className,
}: AppDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={showCloseButton}
        className={cn(sizeMap[size], className)}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>

        {children}

        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
