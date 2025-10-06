"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useFlowStore } from "@/lib/flow-store";
import { checkGuardrails } from "@/lib/mock";
import { COPY } from "@/lib/copy";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

interface GuardrailsPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  brandName?: string;
}

export function GuardrailsPanel({
  open,
  onOpenChange,
  brandName = "Notion",
}: GuardrailsPanelProps) {
  const { slots } = useFlowStore();

  // Run guardrail checks
  const guardrails = checkGuardrails({
    brandName,
    slots,
    requireHashtagAd: true,
    requireBrandDemo: true,
    minSec: 15,
    maxSec: 60,
  });

  const allPassed = guardrails.every((g) => g.status === "pass");
  const hasFails = guardrails.some((g) => g.status === "fail");

  const getStatusIcon = (status: "pass" | "warn" | "fail") => {
    switch (status) {
      case "pass":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "warn":
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case "fail":
        return <XCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusBadge = (status: "pass" | "warn" | "fail") => {
    switch (status) {
      case "pass":
        return (
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-700 text-xs"
          >
            ✓
          </Badge>
        );
      case "warn":
        return (
          <Badge
            variant="secondary"
            className="bg-amber-100 text-amber-700 text-xs"
          >
            ⚠
          </Badge>
        );
      case "fail":
        return (
          <Badge
            variant="secondary"
            className="bg-red-100 text-red-700 text-xs"
          >
            ✗
          </Badge>
        );
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{COPY.GUARDRAILS_PANEL_TITLE}</SheetTitle>
          <SheetDescription>{COPY.GUARDRAILS_PANEL_SUBTITLE}</SheetDescription>
        </SheetHeader>

        {/* Overall status */}
        <div className="mt-6 p-4 rounded-lg border-2">
          {allPassed ? (
            <div className="flex items-center gap-3 text-green-700">
              <CheckCircle2 className="w-6 h-6" />
              <div>
                <p className="font-semibold">{COPY.GUARDRAILS_ALL_PASS}</p>
                <p className="text-xs text-green-600">Ready for brand review</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-neutral-700">
              {hasFails ? (
                <XCircle className="w-6 h-6 text-red-600" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              )}
              <div>
                <p className="font-semibold">
                  {hasFails
                    ? "Required changes needed"
                    : "Suggestions available"}
                </p>
                <p className="text-xs text-neutral-600">Review checks below</p>
              </div>
            </div>
          )}
        </div>

        {/* Guardrail checks list */}
        <div className="mt-6 space-y-3">
          {guardrails.map((guardrail) => (
            <div
              key={guardrail.id}
              className="p-4 border border-neutral-200 rounded-lg space-y-2"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  {getStatusIcon(guardrail.status)}
                  <div className="flex-1">
                    <p className="font-medium text-sm text-neutral-900">
                      {guardrail.label}
                    </p>
                    {guardrail.message && (
                      <p className="text-xs text-neutral-600 mt-1">
                        {guardrail.message}
                      </p>
                    )}
                  </div>
                </div>
                {getStatusBadge(guardrail.status)}
              </div>

              {/* Fix suggestion */}
              {guardrail.fix && (
                <div className="mt-2 p-2 bg-neutral-50 border border-neutral-200 rounded text-xs text-neutral-700">
                  <span className="font-medium">Suggestion:</span>{" "}
                  {guardrail.fix}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Apply fixes button (disabled for prototype) */}
        <div className="mt-6">
          <Button
            className="w-full"
            disabled
            title="Auto-fix feature coming soon"
          >
            {COPY.GUARDRAILS_APPLY_FIXES}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
