"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScriptRow } from "./ScriptRow";
import { SlotCard } from "./SlotCard";
import { MediaTabs } from "./MediaTabs";
import { useFlowStore, allSlotsHaveMedia } from "@/lib/flow-store";
import { COPY } from "@/lib/copy";
import { Play, CheckCircle2 } from "lucide-react";

export function ComposePaneV3() {
  const { slots, selectedSlotId } = useFlowStore();

  const allSlotsFilled = allSlotsHaveMedia(slots);

  return (
    <div className="space-y-8">
      {/* Section 1: Script Selection */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{COPY.COMPOSE_SELECT_SCRIPT}</h2>
        <ScriptRow />
      </div>

      {/* Section 2: Clip Slots */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{COPY.COMPOSE_CLIP_SLOTS}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SlotCard
            slotId="hook"
            label={COPY.COMPOSE_SLOT_HOOK_LABEL}
            targetSec={4}
            description={COPY.COMPOSE_SLOT_HOOK_DESCRIPTION}
          />
          <SlotCard
            slotId="body"
            label={COPY.COMPOSE_SLOT_BODY_LABEL}
            targetSec={16}
            description={COPY.COMPOSE_SLOT_BODY_DESCRIPTION}
          />
          <SlotCard
            slotId="cta"
            label={COPY.COMPOSE_SLOT_CTA_LABEL}
            targetSec={4}
            description={COPY.COMPOSE_SLOT_CTA_DESCRIPTION}
          />
        </div>

        {/* Success Message */}
        {allSlotsFilled && (
          <div className="flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <p className="text-sm font-medium text-green-900">
              {COPY.COMPOSE_ALL_SLOTS_FILLED}
            </p>
          </div>
        )}
      </div>

      {/* Section 3: Media Selection (only visible when slot selected) */}
      {selectedSlotId && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">
              {COPY.COMPOSE_SELECT_MEDIA}
            </h2>
            <Badge variant="outline" className="text-xs">
              For {slots[selectedSlotId].label}
            </Badge>
          </div>
          <MediaTabs />
        </div>
      )}

      {/* Section 4: Preview (disabled placeholder) */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          {COPY.COMPOSE_PREVIEW_DISABLED}
        </h2>
        <Card className="border-2 border-neutral-200">
          <CardHeader>
            <CardTitle className="text-base">Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-[9/16] max-h-[500px] mx-auto bg-neutral-100 rounded-lg flex items-center justify-center">
              <div className="text-center text-neutral-400">
                <Play className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Preview disabled in prototype</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
