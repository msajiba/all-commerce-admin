import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Tag,
  Layers,
  Package,
  Boxes,
  ShoppingCart,
  Users2,
} from "lucide-react";

export type MenuItem = {
  title: string;
  slug: string;
  icon: LucideIcon;
};

export const MENU_ITEMS: MenuItem[] = [
  { title: "Dashboard",        slug: "/dashboard",                  icon: LayoutDashboard },
  { title: "Categories",       slug: "/dashboard/categories",       icon: Tag },
  { title: "Sub-categories",   slug: "/dashboard/sub-categories",   icon: Layers },
  { title: "Products",         slug: "/dashboard/products",         icon: Package },
  { title: "Product Variants", slug: "/dashboard/product-variants", icon: Boxes },
  { title: "Orders",           slug: "/dashboard/orders",           icon: ShoppingCart },
  { title: "Users",            slug: "/dashboard/users",            icon: Users2 },
];
