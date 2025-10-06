"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockMyMedia, mockBrandMedia } from "@/lib/mock";
import { useFlowStore } from "@/lib/flow-store";
import { COPY } from "@/lib/copy";
import { cn } from "@/lib/utils";
import { FileVideo, Sparkles } from "lucide-react";

type TabId = "my" | "ai" | "branded";

export function MediaTabs() {
  const [activeTab, setActiveTab] = useState<TabId>("my");
  const { selectedSlotId, assignMediaToSlot } = useFlowStore();

  const handleSelectMedia = (source: "mine" | "brand", mediaId: string) => {
    if (!selectedSlotId) return;
    assignMediaToSlot(selectedSlotId, source, mediaId);
  };

  const tabs = [
    { id: "my" as TabId, label: COPY.COMPOSE_MEDIA_TAB_MY_MEDIA },
    { id: "ai" as TabId, label: COPY.COMPOSE_MEDIA_TAB_AI_CAMEO },
    { id: "branded" as TabId, label: COPY.COMPOSE_MEDIA_TAB_BRANDED },
  ];

  return (
    <div className="space-y-4">
      {/* Tab Buttons */}
      <div className="flex gap-2 border-b border-neutral-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-all border-b-2 -mb-px",
              activeTab === tab.id
                ? "border-neutral-900 text-neutral-900"
                : "border-transparent text-neutral-600 hover:text-neutral-900"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px]">
        {/* My Media Tab */}
        {activeTab === "my" && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {mockMyMedia.map((media) => (
              <button
                key={media.id}
                onClick={() => handleSelectMedia("mine", media.id)}
                className="text-left transition-all hover:scale-105"
              >
                <Card className="overflow-hidden hover:shadow-md">
                  <div className="aspect-video bg-neutral-100 flex items-center justify-center">
                    <FileVideo className="h-8 w-8 text-neutral-400" />
                  </div>
                  <CardContent className="p-3">
                    <p className="text-xs font-medium truncate">
                      {media.label}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {media.durationSec}s
                    </p>
                  </CardContent>
                </Card>
              </button>
            ))}
          </div>
        )}

        {/* AI Cameo Tab */}
        {activeTab === "ai" && (
          <div className="flex items-center justify-center py-12">
            <Card className="max-w-md border-2 border-dashed">
              <CardContent className="pt-6 pb-6 px-6 text-center space-y-4">
                <div className="flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-neutral-100 flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-neutral-400" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">
                    {COPY.COMPOSE_AI_CAMEO_BUTTON}
                  </h3>
                  <p className="text-sm text-neutral-600">
                    {COPY.COMPOSE_AI_CAMEO_COMING_SOON}
                  </p>
                </div>
                <Button disabled className="w-full">
                  {COPY.COMPOSE_AI_CAMEO_BUTTON}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Branded Media Tab */}
        {activeTab === "branded" && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {mockBrandMedia.map((media) => {
              const isRecommended = media.recommendedFor === selectedSlotId;

              return (
                <button
                  key={media.id}
                  onClick={() => handleSelectMedia("brand", media.id)}
                  className="text-left transition-all hover:scale-105"
                >
                  <Card
                    className={cn(
                      "overflow-hidden hover:shadow-md",
                      isRecommended && "ring-2 ring-green-500"
                    )}
                  >
                    {isRecommended && (
                      <div className="bg-green-500 px-2 py-1">
                        <Badge
                          variant="secondary"
                          className="bg-white text-green-700 text-xs"
                        >
                          {COPY.MEDIA_PICKER_RECOMMENDED}
                        </Badge>
                      </div>
                    )}
                    <div className="aspect-video bg-neutral-100 flex items-center justify-center">
                      <FileVideo className="h-8 w-8 text-neutral-400" />
                    </div>
                    <CardContent className="p-3">
                      <p className="text-xs font-medium truncate">
                        {media.label}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {media.duration}
                      </p>
                    </CardContent>
                  </Card>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
