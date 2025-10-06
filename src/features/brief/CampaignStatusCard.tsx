import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { COPY } from "@/lib/copy";
import { budgetProgress, formatClosesIn } from "@/lib/mock";
import type { Opportunity } from "@/lib/types";

interface CampaignStatusCardProps {
  opportunity: Opportunity;
}

export function CampaignStatusCard({ opportunity }: CampaignStatusCardProps) {
  const { percent: budgetPercent, spent: budgetSpent } = budgetProgress(
    opportunity.budgetTotalUsd,
    opportunity.budgetRemainingUsd
  );
  const closesText = formatClosesIn(opportunity.closesAt);

  // Determine if closing is urgent (4 days or less)
  const isUrgent =
    closesText.includes("today") ||
    closesText.includes("tomorrow") ||
    closesText.includes("2 days") ||
    closesText.includes("3 days") ||
    closesText.includes("4 days");

  return (
    <Card className="relative">
      {/* Closes pill - top right */}
      <div className="absolute top-4 right-4">
        <Badge
          variant="outline"
          className={
            isUrgent
              ? "border-amber-300 bg-amber-50 text-amber-800"
              : "border-neutral-300 text-neutral-700"
          }
        >
          {closesText}
        </Badge>
      </div>

      <CardContent className="pt-6 pb-6">
        <h3 className="text-lg font-semibold mb-6">
          {COPY.BRIEF_CAMPAIGN_STATUS}
        </h3>

        {/* Desktop: Side by side, Mobile: Stacked */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CPM */}
          <div className="space-y-2">
            <p className="text-sm text-neutral-600">{COPY.BRIEF_CPM_LABEL}</p>
            <p className="text-3xl font-semibold text-neutral-900">
              ${opportunity.cpmUsd}
            </p>
            <p className="text-xs text-neutral-500">per 1,000 views</p>
          </div>

          {/* Budget Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-neutral-600">
                {COPY.BRIEF_BUDGET_PROGRESS_LABEL}
              </p>
              <p className="text-sm font-semibold text-neutral-900">
                {budgetPercent}%
              </p>
            </div>
            <Progress value={budgetPercent} className="h-2" />
            <p className="text-xs text-neutral-500">
              ${budgetSpent.toLocaleString()} {COPY.BRIEF_BUDGET_SPENT_OF} $
              {opportunity.budgetTotalUsd.toLocaleString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
