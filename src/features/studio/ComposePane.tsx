"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScriptSwitcher } from "./ScriptSwitcher";
import { MediaPicker } from "./MediaPicker";
import { mockScriptVariants } from "@/lib/mock";
import { useFlowStore } from "@/lib/flow-store";
import { COPY } from "@/lib/copy";
import type { ComposeSlotId } from "@/lib/types";
import { Play, Upload, Sparkles, FileVideo } from "lucide-react";
import { cn } from "@/lib/utils";

export function ComposePane() {
  const { slots, selectedVariantId, setSlotOverlay, setSlotARollMode } =
    useFlowStore();

  const [scriptSwitcherOpen, setScriptSwitcherOpen] = useState(false);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [activeSlotForMedia, setActiveSlotForMedia] =
    useState<ComposeSlotId>("hook");

  const selectedVariant = mockScriptVariants.find(
    (v) => v.id === selectedVariantId
  );
  const variantTitle = selectedVariant?.title || "Default";

  // Hook suggestions (use the 3 variants as hook alternatives)
  const hookSuggestions = mockScriptVariants.map((v) => ({
    id: v.id,
    title: v.title,
    text: v.slots.hook.overlayText,
  }));

  const handleApplyHookSuggestion = (hookText: string) => {
    setSlotOverlay("hook", hookText);
  };

  const handleOpenMediaPicker = (slotId: ComposeSlotId) => {
    setActiveSlotForMedia(slotId);
    setMediaPickerOpen(true);
  };

  const slotConfigs = [
    {
      id: "hook" as ComposeSlotId,
      label: COPY.COMPOSE_SLOT_HOOK_LABEL,
      description: COPY.COMPOSE_SLOT_HOOK_DESCRIPTION,
      color: "border-blue-200 bg-blue-50/50",
    },
    {
      id: "body" as ComposeSlotId,
      label: COPY.COMPOSE_SLOT_BODY_LABEL,
      description: COPY.COMPOSE_SLOT_BODY_DESCRIPTION,
      color: "border-green-200 bg-green-50/50",
    },
    {
      id: "cta" as ComposeSlotId,
      label: COPY.COMPOSE_SLOT_CTA_LABEL,
      description: COPY.COMPOSE_SLOT_CTA_DESCRIPTION,
      color: "border-amber-200 bg-amber-50/50",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Left Rail - Hook Suggestions */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-neutral-700">
          {COPY.COMPOSE_OPENERS_TITLE}
        </h3>
        <div className="space-y-2">
          {hookSuggestions.map((suggestion) => (
            <button
              key={suggestion.id}
              onClick={() => handleApplyHookSuggestion(suggestion.text)}
              className="w-full text-left p-3 text-xs border border-neutral-200 rounded-lg hover:border-neutral-400 hover:bg-neutral-50 transition-all"
            >
              <p className="font-medium text-neutral-900 mb-1">
                {suggestion.title}
              </p>
              <p className="text-neutral-600 line-clamp-2">{suggestion.text}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Center - Compose Canvas */}
      <div className="lg:col-span-3 space-y-6">
        {/* Top bar - Script variant selector */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-600">
              {COPY.COMPOSE_SCRIPT_PREFIX}
            </span>
            <span className="font-medium text-neutral-900">{variantTitle}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setScriptSwitcherOpen(true)}
          >
            {COPY.COMPOSE_VIEW_VARIANTS}
          </Button>
        </div>

        {/* Timeline Slots */}
        <div className="space-y-4">
          {slotConfigs.map((config) => {
            const slot = slots[config.id];

            return (
              <Card key={config.id} className={cn("border-2", config.color)}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">
                        {config.label}
                      </CardTitle>
                      <p className="text-xs text-neutral-600 mt-1">
                        {config.description} • Target: ~{slot.targetSec}s
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {slot.targetSec}s
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Overlay text */}
                  <Textarea
                    value={slot.overlayText}
                    onChange={(e) => setSlotOverlay(config.id, e.target.value)}
                    placeholder={COPY.COMPOSE_OVERLAY_PLACEHOLDER}
                    className="min-h-[80px] text-sm resize-none"
                  />

                  {/* A-roll mode + Media picker */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* A-roll mode buttons */}
                    <div className="flex items-center gap-1 border border-neutral-200 rounded-lg p-1">
                      <Button
                        variant={
                          slot.aRollMode === "upload" ? "secondary" : "ghost"
                        }
                        size="sm"
                        onClick={() => setSlotARollMode(config.id, "upload")}
                        className="text-xs h-7"
                      >
                        <Upload className="w-3 h-3 mr-1" />
                        {COPY.COMPOSE_AROLL_UPLOAD}
                      </Button>
                      <Button
                        variant={
                          slot.aRollMode === "ai" ? "secondary" : "ghost"
                        }
                        size="sm"
                        onClick={() => setSlotARollMode(config.id, "ai")}
                        className="text-xs h-7"
                      >
                        <Sparkles className="w-3 h-3 mr-1" />
                        {COPY.COMPOSE_AROLL_AI}
                      </Button>
                    </div>

                    {/* Select media button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenMediaPicker(config.id)}
                      className="text-xs h-7"
                    >
                      <FileVideo className="w-3 h-3 mr-1" />
                      {COPY.COMPOSE_SELECT_MEDIA}
                      {slot.mediaBrandIds.length > 0 && (
                        <Badge
                          variant="secondary"
                          className="ml-2 bg-green-100 text-green-700 text-xs"
                        >
                          {slot.mediaBrandIds.length}
                        </Badge>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Preview (disabled for prototype) */}
        <Card className="border-2 border-neutral-200">
          <CardHeader>
            <CardTitle className="text-base">
              {COPY.COMPOSE_PREVIEW_DISABLED}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-[9/16] max-h-[400px] mx-auto bg-neutral-100 rounded-lg flex items-center justify-center">
              <div className="text-center text-neutral-400">
                <Play className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Preview disabled in prototype</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Script Switcher Sheet */}
      <ScriptSwitcher
        open={scriptSwitcherOpen}
        onOpenChange={setScriptSwitcherOpen}
      />

      {/* Media Picker Sheet */}
      <MediaPicker
        open={mediaPickerOpen}
        onOpenChange={setMediaPickerOpen}
        slotId={activeSlotForMedia}
      />
    </div>
  );
}
