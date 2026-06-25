"use client";

import { usePathname } from "next/navigation";
import { Menu, Bell, ChevronDown } from "lucide-react";
import { MENU_ITEMS } from "@/lib/menu";

type HeaderProps = {
  onMenuToggle: () => void;
};

export function Header({ onMenuToggle }: HeaderProps) {
  const pathname = usePathname();
  const current = MENU_ITEMS.find((item) => item.slug === pathname);
  const pageTitle = current?.title ?? "Dashboard";

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-zinc-200 bg-white px-4 md:px-6">
      {/* Hamburger — mobile only */}
      <button
        onClick={onMenuToggle}
        className="rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 md:hidden"
        aria-label="Open navigation"
      >
        <Menu className="size-5" />
      </button>

      {/* Page title */}
      <h1 className="flex-1 text-base font-semibold text-zinc-900">{pageTitle}</h1>

      {/* Right actions */}
      <div className="flex items-center gap-1">
        {/* Notification bell */}
        <button
          className="relative rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
          aria-label="Notifications"
        >
          <Bell className="size-5" />
          {/* Unread dot */}
          <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-red-500" />
        </button>

        {/* Divider */}
        <div className="mx-1 h-6 w-px bg-zinc-200" />

        {/* User avatar + name */}
        <button className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-zinc-100">
          <div className="flex size-7 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
            SA
          </div>
          <span className="hidden text-sm font-medium text-zinc-700 sm:block">
            Store Admin
          </span>
          <ChevronDown className="hidden size-3.5 text-zinc-400 sm:block" />
        </button>
      </div>
    </header>
  );
}
