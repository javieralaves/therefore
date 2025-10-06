"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { mockFlows, mockUser } from "@/lib/mock";
import { COPY } from "@/lib/copy";
import { Sparkles, Briefcase, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    {
      label: COPY.SIDEBAR_NAV_NEW_FLOW,
      href: "/",
      icon: Sparkles,
    },
    {
      label: COPY.SIDEBAR_NAV_BRAND_DEALS,
      href: "/opportunities",
      icon: Briefcase,
    },
    {
      label: COPY.SIDEBAR_NAV_IDEAS,
      href: "/ideas",
      icon: Lightbulb,
    },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(href);
  };

  return (
    <aside
      className={cn(
        "flex h-full w-[280px] flex-col border-r border-neutral-200 bg-neutral-50",
        className
      )}
    >
      {/* Logo */}
      <div className="flex h-14 items-center border-b border-neutral-200 px-6">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight transition-colors hover:text-neutral-600"
        >
          {COPY.SIDEBAR_LOGO}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                active
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}

        {/* Flows Section */}
        <div className="pt-6">
          <div className="mb-2 px-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              {COPY.SIDEBAR_FLOWS_LABEL}
            </p>
          </div>
          <div className="space-y-0.5">
            {mockFlows.map((flow) => (
              <div
                key={flow.id}
                className="cursor-default rounded-lg px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-100"
              >
                <p className="truncate font-medium">{flow.title}</p>
                <p className="text-xs text-neutral-500">
                  {new Date(flow.lastEdited).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Profile Row - Sticky Bottom */}
      <Link
        href="/context"
        className="border-t border-neutral-200 px-4 py-4 transition-colors hover:bg-neutral-100"
      >
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 bg-neutral-900 text-white">
            <span className="text-lg">{mockUser.avatar}</span>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-neutral-900">
              {mockUser.name}
            </p>
            <p className="truncate text-xs text-neutral-600">
              {mockUser.handle}
            </p>
          </div>
        </div>
      </Link>
    </aside>
  );
}
