"use client";

import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Placeholder } from "@/components/ui/placeholder";
import { mockBrandMedia } from "@/lib/mock";
import { useFlowStore } from "@/lib/flow-store";
import { COPY } from "@/lib/copy";
import type { ComposeSlotId } from "@/lib/types";
import { cn } from "@/lib/utils";

interface MediaPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  slotId: ComposeSlotId;
}

export function MediaPicker({ open, onOpenChange, slotId }: MediaPickerProps) {
  const { slots, toggleSlotBrandMedia } = useFlowStore();
  const currentSlot = slots[slotId];

  const handleToggleMedia = (mediaId: string) => {
    toggleSlotBrandMedia(slotId, mediaId);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-2xl overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle>{COPY.MEDIA_PICKER_TITLE}</SheetTitle>
          <SheetDescription>
            Select branded media clips for your {currentSlot.label} slot
          </SheetDescription>
        </SheetHeader>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {mockBrandMedia.map((media) => {
            const isSelected = currentSlot.mediaBrandIds.includes(media.id);
            const isRecommended = media.recommendedFor === slotId;

            return (
              <button
                key={media.id}
                onClick={() => handleToggleMedia(media.id)}
                className={cn(
                  "relative aspect-[9/16] rounded-lg border-2 transition-all overflow-hidden group",
                  isSelected
                    ? "border-neutral-900 ring-2 ring-neutral-900 ring-offset-2"
                    : "border-neutral-300 hover:border-neutral-400"
                )}
              >
                {/* Placeholder */}
                <Placeholder
                  label={media.label}
                  className="h-full border-0 rounded-md"
                />

                {/* Recommended badge */}
                {isRecommended && (
                  <Badge
                    variant="secondary"
                    className="absolute top-2 left-2 bg-green-100 text-green-700 text-xs"
                  >
                    {COPY.MEDIA_PICKER_RECOMMENDED}
                  </Badge>
                )}

                {/* Selected indicator */}
                {isSelected && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-neutral-900 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                )}

                {/* Duration */}
                <div className="absolute bottom-2 left-2 right-2 bg-black/70 text-white text-[10px] rounded px-2 py-1 text-center">
                  {media.duration}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selection count */}
        <div className="mt-6 p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
          <p className="text-sm text-neutral-700">
            {currentSlot.mediaBrandIds.length} media clip
            {currentSlot.mediaBrandIds.length !== 1 ? "s" : ""} selected for{" "}
            {currentSlot.label}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
