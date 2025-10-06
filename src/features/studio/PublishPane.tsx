"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Placeholder } from "@/components/ui/placeholder";
import { GuardrailsCard } from "./GuardrailsCard";
import { useFlowStore } from "@/lib/flow-store";
import { COPY } from "@/lib/copy";

export function PublishPane() {
  const {
    platformToggles,
    caption,
    hashtags,
    scriptEditorContent,
    togglePlatform,
    setCaption,
    setHashtags,
  } = useFlowStore();

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">{COPY.PUBLISH_TITLE}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Preview & Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>{COPY.PUBLISH_PREVIEW_LABEL}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Placeholder
                  label={COPY.PLACEHOLDER_PREVIEW}
                  className="aspect-[9/16] max-h-[500px]"
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full">
                  With brand frame
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Platforms */}
          <Card>
            <CardHeader>
              <CardTitle>{COPY.PUBLISH_PLATFORMS_LABEL}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="instagram" className="cursor-pointer">
                  {COPY.PUBLISH_PLATFORM_INSTAGRAM}
                </Label>
                <Switch
                  id="instagram"
                  checked={platformToggles.instagram}
                  onCheckedChange={() => togglePlatform("instagram")}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="tiktok" className="cursor-pointer">
                  {COPY.PUBLISH_PLATFORM_TIKTOK}
                </Label>
                <Switch
                  id="tiktok"
                  checked={platformToggles.tiktok}
                  onCheckedChange={() => togglePlatform("tiktok")}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="youtube" className="cursor-pointer">
                  {COPY.PUBLISH_PLATFORM_YOUTUBE}
                </Label>
                <Switch
                  id="youtube"
                  checked={platformToggles.youtube}
                  onCheckedChange={() => togglePlatform("youtube")}
                />
              </div>
            </CardContent>
          </Card>

          {/* Caption */}
          <Card>
            <CardHeader>
              <CardTitle>{COPY.PUBLISH_CAPTION_LABEL}</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder={COPY.PUBLISH_CAPTION_PLACEHOLDER}
                className="min-h-[120px] resize-none"
              />
            </CardContent>
          </Card>

          {/* Hashtags */}
          <Card>
            <CardHeader>
              <CardTitle>{COPY.PUBLISH_HASHTAGS_LABEL}</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
                placeholder={COPY.PUBLISH_HASHTAGS_PLACEHOLDER}
                className="min-h-[80px] resize-none"
              />
            </CardContent>
          </Card>

          {/* Helper Text */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <strong>Ready to submit?</strong> Your short will be reviewed by
              the Notion team within 24 hours. You&apos;ll be notified in-app
              and by email when they respond.
            </p>
          </div>
        </div>

        {/* Right Column - Guardrails */}
        <div>
          <GuardrailsCard scriptContent={scriptEditorContent} />
        </div>
      </div>
    </div>
  );
}
