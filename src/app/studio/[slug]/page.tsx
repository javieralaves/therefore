"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProgressRail } from "@/features/studio/ProgressRail";
import { PlanChat } from "@/features/studio/PlanChat";
import { ScriptPane } from "@/features/studio/ScriptPane";
import { MakePane } from "@/features/studio/MakePane";
import { PublishPane } from "@/features/studio/PublishPane";
import { useFlowStore } from "@/lib/flow-store";
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
    setDraftId,
    nextStep,
    previousStep,
  } = useFlowStore();

  // Sync draftId from URL to store on mount
  useEffect(() => {
    if (draftId && draftId !== storeDraftId) {
      setDraftId(draftId);
    }
  }, [draftId, storeDraftId, setDraftId]);

  const handleContinue = () => {
    if (step === "publish") {
      // Navigate to submitted page
      router.push("/submitted");
    } else {
      nextStep();
    }
  };

  const handleBack = () => {
    if (step === "plan") {
      // Go back to challenge brief
      router.push(`/challenge/${params.slug}`);
    } else {
      previousStep();
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
        {/* Step Content - Conditionally rendered based on step */}
        {step === "plan" && <PlanChat />}

        {step === "script" && <ScriptPane />}

        {step === "make" && <MakePane />}

        {step === "publish" && <PublishPane />}
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
          <Button size="lg" onClick={handleContinue} className="px-8">
            {step === "publish" ? COPY.PUBLISH_CTA : COPY.STUDIO_CONTINUE}
          </Button>
        </div>
      </div>
    </div>
  );
}
