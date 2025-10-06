"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Placeholder } from "@/components/ui/placeholder";
import { GuardrailsCard } from "./GuardrailsCard";
import { useFlowStore } from "@/lib/flow-store";
import { mockBrollItems } from "@/lib/mock";
import { COPY } from "@/lib/copy";
import { cn } from "@/lib/utils";
import { Upload, Sparkles, Video } from "lucide-react";

export function MakePane() {
  const {
    aRollMode,
    selectedBrollIds,
    autoCaptions,
    brandStyleCaptions,
    scriptEditorContent,
    setArollMode,
    toggleBrollSelection,
    setAutoCaptions,
    setBrandStyleCaptions,
  } = useFlowStore();

  return (
    <div className="space-y-8">
      {/* Timeline Columns */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">{COPY.MAKE_TITLE}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Hook */}
          <Card className="border-2 border-blue-200 bg-blue-50/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center justify-between">
                <span>{COPY.MAKE_TIMELINE_HOOK}</span>
                <span className="text-xs font-normal text-neutral-600">
                  {COPY.MAKE_TIMELINE_HOOK_DURATION}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-neutral-700">
                Grab attention immediately with a compelling opening
              </p>
            </CardContent>
          </Card>

          {/* Body */}
          <Card className="border-2 border-green-200 bg-green-50/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center justify-between">
                <span>{COPY.MAKE_TIMELINE_BODY}</span>
                <span className="text-xs font-normal text-neutral-600">
                  {COPY.MAKE_TIMELINE_BODY_DURATION}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-neutral-700">
                Deliver value and keep viewers engaged with your content
              </p>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="border-2 border-amber-200 bg-amber-50/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center justify-between">
                <span>{COPY.MAKE_TIMELINE_CTA}</span>
                <span className="text-xs font-normal text-neutral-600">
                  {COPY.MAKE_TIMELINE_CTA_DURATION}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-neutral-700">
                Clear call-to-action with link and disclosure
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - A-roll & B-roll */}
        <div className="lg:col-span-2 space-y-6">
          {/* A-roll Section */}
          <Card>
            <CardHeader>
              <CardTitle>{COPY.MAKE_AROLL_TITLE}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Mode Selector */}
              <div className="flex flex-col gap-3">
                <Button
                  variant={aRollMode === "upload" ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => setArollMode("upload")}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {COPY.MAKE_AROLL_UPLOAD}
                </Button>
                <Button
                  variant={aRollMode === "ai" ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => setArollMode("ai")}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {COPY.MAKE_AROLL_AI}
                </Button>
                <Button
                  variant={aRollMode === "record-later" ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => setArollMode("record-later")}
                >
                  <Video className="w-4 h-4 mr-2" />
                  {COPY.MAKE_AROLL_RECORD_LATER}
                </Button>
              </div>

              {/* A-roll Placeholder */}
              <Placeholder
                label={COPY.PLACEHOLDER_AROLL}
                className="aspect-[9/16] max-h-[300px]"
              />
            </CardContent>
          </Card>

          {/* B-roll Section */}
          <Card>
            <CardHeader>
              <CardTitle>{COPY.MAKE_BROLL_TITLE}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {mockBrollItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggleBrollSelection(item.id)}
                    className={cn(
                      "relative aspect-[9/16] rounded-lg border-2 transition-all overflow-hidden",
                      selectedBrollIds.includes(item.id)
                        ? "border-neutral-900 ring-2 ring-neutral-900 ring-offset-2"
                        : "border-neutral-300 hover:border-neutral-400"
                    )}
                  >
                    <Placeholder
                      label={item.label}
                      className="h-full border-0 rounded-md"
                    />
                    {selectedBrollIds.includes(item.id) && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-neutral-900 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        ✓
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2 right-2 bg-black/70 text-white text-[10px] rounded px-2 py-1 text-center">
                      {item.duration}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Caption Toggles */}
          <Card>
            <CardHeader>
              <CardTitle>Captions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-captions" className="cursor-pointer">
                  {COPY.MAKE_CAPTIONS_AUTO}
                </Label>
                <Switch
                  id="auto-captions"
                  checked={autoCaptions}
                  onCheckedChange={setAutoCaptions}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="brand-captions" className="cursor-pointer">
                  {COPY.MAKE_CAPTIONS_BRAND_STYLE}
                </Label>
                <Switch
                  id="brand-captions"
                  checked={brandStyleCaptions}
                  onCheckedChange={setBrandStyleCaptions}
                />
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>{COPY.MAKE_PREVIEW_TITLE}</CardTitle>
            </CardHeader>
            <CardContent>
              <Placeholder
                label={COPY.PLACEHOLDER_PREVIEW}
                className="aspect-[9/16] max-h-[400px]"
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Guardrails */}
        <div>
          <GuardrailsCard scriptContent={scriptEditorContent} />
        </div>
      </div>
    </div>
  );
}
