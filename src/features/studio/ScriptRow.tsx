"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockScriptVariants } from "@/lib/mock";
import { useFlowStore } from "@/lib/flow-store";
import { cn } from "@/lib/utils";
import type { ComposeSlotId } from "@/lib/types";

export function ScriptRow() {
  const { selectedVariantId, applyScriptVariant, setSlotOverlay } =
    useFlowStore();

  // Auto-select first variant on mount if none selected
  useEffect(() => {
    if (!selectedVariantId && mockScriptVariants.length > 0) {
      handleSelectVariant(mockScriptVariants[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectVariant = (variantId: string) => {
    // Find the variant
    const variant = mockScriptVariants.find((v) => v.id === variantId);
    if (!variant) return;

    // Apply the variant ID
    applyScriptVariant(variantId);

    // Update slot overlay text for each slot (but don't clear media)
    const slotIds: ComposeSlotId[] = ["hook", "body", "cta"];
    slotIds.forEach((slotId) => {
      setSlotOverlay(slotId, variant.slots[slotId].overlayText);
    });
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2">
      {mockScriptVariants.map((variant) => {
        const isSelected = selectedVariantId === variant.id;

        return (
          <button
            key={variant.id}
            onClick={() => handleSelectVariant(variant.id)}
            className={cn(
              "flex-shrink-0 w-[320px] text-left transition-all",
              isSelected && "ring-2 ring-neutral-900 rounded-lg"
            )}
          >
            <Card
              className={cn(
                "h-full hover:shadow-md transition-shadow",
                isSelected && "border-neutral-900"
              )}
            >
              <CardHeader>
                <CardTitle className="text-base">{variant.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {variant.why}
                </p>
              </CardContent>
            </Card>
          </button>
        );
      })}
    </div>
  );
}
