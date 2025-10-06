import { Progress } from "@/components/ui/progress";
import { StudioStep } from "@/lib/flow-store";

interface ProgressRailProps {
  currentStep: StudioStep;
}

const stepToProgress = {
  plan: 25,
  script: 50,
  make: 75,
  publish: 100,
};

const stepLabels = {
  plan: "Plan",
  script: "Script",
  make: "Make",
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
