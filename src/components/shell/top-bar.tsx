import Link from "next/link";
import { COPY } from "@/lib/copy";

export function TopBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 text-lg font-semibold tracking-tight transition-colors hover:text-neutral-600"
        >
          <span>{COPY.APP_NAME}</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <Link
            href="/context"
            className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
          >
            {COPY.CONTEXT_TITLE}
          </Link>
        </nav>
      </div>
    </header>
  );
}

