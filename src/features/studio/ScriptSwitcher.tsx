"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockScriptVariants } from "@/lib/mock";
import { useFlowStore } from "@/lib/flow-store";
import { COPY } from "@/lib/copy";

interface ScriptSwitcherProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ScriptSwitcher({ open, onOpenChange }: ScriptSwitcherProps) {
  const { selectedVariantId, setSlotOverlay, applyScriptVariant } =
    useFlowStore();

  const handleApplyVariant = (variantId: string) => {
    const variant = mockScriptVariants.find((v) => v.id === variantId);
    if (!variant) return;

    // Apply variant to store
    applyScriptVariant(variantId);

    // Update all slot overlay texts
    setSlotOverlay("hook", variant.slots.hook.overlayText);
    setSlotOverlay("body", variant.slots.body.overlayText);
    setSlotOverlay("cta", variant.slots.cta.overlayText);

    // Close the sheet
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-2xl overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle>{COPY.SCRIPT_SWITCHER_TITLE}</SheetTitle>
          <SheetDescription>
            Choose a script variant to apply to your composition
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4 mt-6">
          {mockScriptVariants.map((variant) => (
            <Card
              key={variant.id}
              className={
                selectedVariantId === variant.id
                  ? "border-2 border-neutral-900"
                  : "border border-neutral-300"
              }
            >
              <CardHeader>
                <CardTitle className="text-lg">{variant.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Why this works */}
                <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                  <p className="text-xs font-medium text-neutral-700 mb-1">
                    Why this works:
                  </p>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {variant.why}
                  </p>
                </div>

                {/* Slot previews */}
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-neutral-900 mb-1">Hook:</p>
                    <p className="text-neutral-600 line-clamp-2">
                      {variant.slots.hook.overlayText}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 mb-1">Body:</p>
                    <p className="text-neutral-600 line-clamp-3">
                      {variant.slots.body.overlayText}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 mb-1">CTA:</p>
                    <p className="text-neutral-600 line-clamp-2">
                      {variant.slots.cta.overlayText}
                    </p>
                  </div>
                </div>

                {/* Apply button */}
                <Button
                  onClick={() => handleApplyVariant(variant.id)}
                  className="w-full"
                  variant={
                    selectedVariantId === variant.id ? "secondary" : "default"
                  }
                >
                  {selectedVariantId === variant.id
                    ? "Currently selected"
                    : COPY.SCRIPT_SWITCHER_APPLY}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
