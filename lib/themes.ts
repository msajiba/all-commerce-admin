/**
 * Theme options shown on the setup page. The `id` values match the frontend
 * theme registry (`theme-a` / `theme-b` / `theme-c`); the labels match the
 * names used in the product spec (THEME_A / THEME_B / THEME_C).
 */

export type ThemeOption = {
  id: "theme-a" | "theme-b" | "theme-c";
  label: string;
  primaryColor: string;
  description: string;
};

export const THEME_OPTIONS: readonly ThemeOption[] = [
  {
    id: "theme-a",
    label: "THEME_A",
    primaryColor: "#ff5500",
    description: "Bold orange storefront",
  },
  {
    id: "theme-b",
    label: "THEME_B",
    primaryColor: "#f97316",
    description: "Warm amber storefront",
  },
  {
    id: "theme-c",
    label: "THEME_C",
    primaryColor: "#0ea5e9",
    description: "Cool sky-blue storefront",
  },
];
