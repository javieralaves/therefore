import { Progress } from "@/components/ui/progress";
import type { StudioStep } from "@/lib/types";

interface ProgressRailProps {
  currentStep: StudioStep;
}

const stepToProgress: Record<StudioStep, number> = {
  plan: 33,
  compose: 66,
  publish: 100,
};

const stepLabels: Record<StudioStep, string> = {
  plan: "Plan",
  compose: "Compose",
  publish: "Publish",
};

export function ProgressRail({ currentStep }: ProgressRailProps) {
  const progress = stepToProgress[currentStep];

  return (
    <div className="w-full space-y-3">
      <Progress value={progress} className="h-2" />
      <div className="flex items-center justify-between text-xs text-neutral-600">
        {(Object.keys(stepLabels) as StudioStep[]).map((step) => (
          <span
            key={step}
            className={
              currentStep === step ? "font-semibold text-neutral-900" : ""
            }
          >
            {stepLabels[step]}
          </span>
        ))}
      </div>
    </div>
  );
}
