"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProgressRail } from "@/features/studio/ProgressRail";
import { PlanChat } from "@/features/studio/PlanChat";
import { ComposePaneV3 } from "@/features/studio/ComposePaneV3";
import { PublishPane } from "@/features/studio/PublishPane";
import { ShimmerCard } from "@/components/ui/loading-shimmer";
import { useFlowStore, allSlotsHaveMedia } from "@/lib/flow-store";
import { COPY } from "@/lib/copy";

interface StudioPageProps {
  params: { slug: string };
}

export default function StudioPage({ params }: StudioPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const draftId = searchParams.get("draft");

  const {
    step,
    draftId: storeDraftId,
    slots,
    setDraftId,
    setMySubmission,
    nextStep,
    previousStep,
  } = useFlowStore();

  // Shimmer transition state
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Sync draftId from URL to store on mount
  useEffect(() => {
    if (draftId && draftId !== storeDraftId) {
      setDraftId(draftId);
    }
  }, [draftId, storeDraftId, setDraftId]);

  const handleContinue = () => {
    if (step === "publish") {
      // V3: Create submission before navigating
      setMySubmission(params.slug, {
        id: `my-submission-${params.slug}-${Date.now()}`,
        title: "My Notion workflow",
        platform: "instagram",
        views: 0,
        likes: 0,
        comments: 0,
        earningsUsd: 0,
        postedAt: new Date().toISOString(),
        videoPlaceholderLabel: "Your video",
        creatorHandle: "@alexcreates",
        status: "under_review",
        isMine: true,
      });

      // Navigate to submitted page
      router.push("/submitted");
    } else {
      // Show shimmer, then transition
      setIsTransitioning(true);
      setTimeout(() => {
        nextStep();
        setIsTransitioning(false);
      }, 200);
    }
  };

  const handleBack = () => {
    if (step === "plan") {
      // Go back to challenge brief
      router.push(`/challenge/${params.slug}`);
    } else {
      // Show shimmer, then transition
      setIsTransitioning(true);
      setTimeout(() => {
        previousStep();
        setIsTransitioning(false);
      }, 200);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Progress Rail */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="container max-w-screen-xl mx-auto px-6 py-4">
          <ProgressRail currentStep={step} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 container max-w-screen-xl mx-auto px-6 py-8">
        {/* Show shimmer during transitions */}
        {isTransitioning ? (
          <div className="space-y-6">
            <ShimmerCard className="h-32" />
            <ShimmerCard className="h-64" />
            <ShimmerCard className="h-48" />
          </div>
        ) : (
          <>
            {/* Step Content - V3: 3-step flow with new compose */}
            {step === "plan" && <PlanChat />}

            {step === "compose" && <ComposePaneV3 />}

            {step === "publish" && <PublishPane />}
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-neutral-200 bg-white sticky bottom-0">
        <div className="container max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Back Link */}
          <Button
            variant="ghost"
            onClick={handleBack}
            className="text-neutral-600"
          >
            {COPY.STUDIO_BACK}
          </Button>

          {/* Continue Button */}
          <Button
            size="lg"
            onClick={handleContinue}
            className="px-8"
            disabled={step === "compose" && !allSlotsHaveMedia(slots)}
          >
            {step === "publish" ? COPY.PUBLISH_CTA : COPY.STUDIO_CONTINUE}
          </Button>
        </div>
      </div>
    </div>
  );
}
