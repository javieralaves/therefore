"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useFlowStore } from "@/lib/flow-store";
import { COPY } from "@/lib/copy";
import { cn } from "@/lib/utils";
import type { ComposeSlotId } from "@/lib/types";
import { Plus, FileVideo, X } from "lucide-react";

interface SlotCardProps {
  slotId: ComposeSlotId;
  label: string;
  targetSec: number;
  description: string;
}

export function SlotCard({
  slotId,
  label,
  targetSec,
  description,
}: SlotCardProps) {
  const { slots, selectedSlotId, selectSlot, clearMediaFromSlot } =
    useFlowStore();

  const slot = slots[slotId];
  const isSelected = selectedSlotId === slotId;
  const isFilled = slot.mediaBrandIds.length > 0;

  // Get snippet of overlay text (first 50 chars)
  const textSnippet = slot.overlayText
    ? slot.overlayText.substring(0, 50) +
      (slot.overlayText.length > 50 ? "..." : "")
    : "No caption yet";

  const handleSelect = () => {
    selectSlot(slotId);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    clearMediaFromSlot(slotId);
  };

  return (
    <button
      onClick={handleSelect}
      className={cn(
        "w-full text-left transition-all",
        isSelected && "ring-2 ring-neutral-900 rounded-lg"
      )}
    >
      <Card
        className={cn(
          "relative transition-all",
          isFilled
            ? "border-2 border-solid"
            : "border-2 border-dashed border-neutral-300",
          isSelected && "border-neutral-900"
        )}
      >
        <CardContent className="pt-6 pb-4 px-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-sm">{label}</h3>
                <Badge variant="outline" className="text-xs">
                  ~{targetSec}s
                </Badge>
              </div>
              <p className="text-xs text-neutral-600">{description}</p>
            </div>
          </div>

          {/* Empty State */}
          {!isFilled && (
            <div className="flex flex-col items-center justify-center py-8 text-neutral-400">
              <Plus className="h-8 w-8 mb-2" />
              <p className="text-xs">Click to select media</p>
            </div>
          )}

          {/* Filled State */}
          {isFilled && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <FileVideo className="h-4 w-4 text-neutral-600" />
                <span className="font-medium text-neutral-900">
                  {COPY.COMPOSE_SLOT_FILLED}
                </span>
                <span className="text-xs text-neutral-600 flex-1">
                  Media #
                  {slot.mediaBrandIds[0]
                    .replace("my-", "")
                    .replace("media-", "")}
                </span>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSelect}
                  className="flex-1 text-xs"
                >
                  {COPY.COMPOSE_SLOT_REPLACE}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClear}
                  className="text-xs"
                >
                  <X className="h-3 w-3 mr-1" />
                  {COPY.COMPOSE_SLOT_CLEAR}
                </Button>
              </div>
            </div>
          )}

          {/* Caption Preview */}
          <div className="mt-3 pt-3 border-t border-neutral-200">
            <p className="text-xs text-neutral-500 line-clamp-2">
              {textSnippet}
            </p>
          </div>
        </CardContent>
      </Card>
    </button>
  );
}
