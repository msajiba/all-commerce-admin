import type { Metadata } from "next";
import { CategoriesClient } from "@/components/categories/CategoriesClient";
import { INITIAL_CATEGORIES } from "@/lib/mock/categories";

export const metadata: Metadata = {
  title: "Categories — Admin",
};

/**
 * Server Component: loads initial mock data server-side and passes it
 * to CategoriesClient which handles all interactive state.
 */
export default function CategoriesPage() {
  return <CategoriesClient initialData={INITIAL_CATEGORIES} />;
}
