"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GuardrailsPanel } from "@/features/studio/GuardrailsPanel";
import { useFlowStore } from "@/lib/flow-store";
import { checkGuardrails } from "@/lib/mock";
import { COPY } from "@/lib/copy";
import { toast } from "sonner";
import { RotateCcw, ShieldCheck } from "lucide-react";

export function TopBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { resetAll, slots } = useFlowStore();
  const [guardrailsOpen, setGuardrailsOpen] = useState(false);

  // Check if we're in the Studio
  const isStudio = pathname?.startsWith("/studio");

  // Compute guardrails status for badge
  const guardrailsStatus = isStudio
    ? (() => {
        const checks = checkGuardrails({
          brandName: "Notion",
          slots,
          requireHashtagAd: true,
          requireBrandDemo: true,
          minSec: 15,
          maxSec: 60,
        });
        const allPassed = checks.every((g) => g.status === "pass");
        const hasFails = checks.some((g) => g.status === "fail");
        return allPassed ? "pass" : hasFails ? "fail" : "warn";
      })()
    : "pass";

  const handleReset = () => {
    // Clear Zustand store
    resetAll();
    // Clear sessionStorage
    sessionStorage.removeItem("therefore-flow-storage");
    // Navigate to home
    router.push("/");
    // Show toast
    toast.success(COPY.TOPBAR_RESET_TOAST);
  };

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
        <nav className="flex items-center gap-4">
          <Link
            href="/context"
            className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
          >
            {COPY.CONTEXT_TITLE}
          </Link>

          {/* V2: Guardrails button (only in Studio) */}
          {isStudio && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => setGuardrailsOpen(true)}
            >
              <ShieldCheck className="w-4 h-4" />
              {COPY.GUARDRAILS_BUTTON}
              <Badge
                variant="secondary"
                className={
                  guardrailsStatus === "pass"
                    ? "ml-1 bg-green-100 text-green-700 text-xs"
                    : guardrailsStatus === "fail"
                    ? "ml-1 bg-red-100 text-red-700 text-xs"
                    : "ml-1 bg-amber-100 text-amber-700 text-xs"
                }
              >
                {guardrailsStatus === "pass"
                  ? "✓"
                  : guardrailsStatus === "fail"
                  ? "✗"
                  : "⚠"}
              </Badge>
            </Button>
          )}

          {/* V2: Reset prototype link */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="gap-2 text-neutral-600 hover:text-neutral-900"
          >
            <RotateCcw className="w-4 h-4" />
            {COPY.TOPBAR_RESET_LINK}
          </Button>
        </nav>
      </div>

      {/* Guardrails Panel */}
      {isStudio && (
        <GuardrailsPanel
          open={guardrailsOpen}
          onOpenChange={setGuardrailsOpen}
        />
      )}
    </header>
  );
}
