import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockPlanConversation, mockPlanSummary } from "@/lib/mock";
import { COPY } from "@/lib/copy";
import { cn } from "@/lib/utils";

export function PlanChat() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Conversation */}
      <div className="space-y-4">
        {mockPlanConversation.map((message, idx) => (
          <div
            key={idx}
            className={cn(
              "flex",
              message.sender === "therefore" ? "justify-start" : "justify-end"
            )}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3",
                message.sender === "therefore"
                  ? "bg-neutral-100 text-neutral-900"
                  : "bg-neutral-900 text-white"
              )}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Plan Summary Card */}
      <Card className="border-2 border-neutral-900 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{COPY.PLAN_SUMMARY_TITLE}</span>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Ready
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <dt className="text-sm font-semibold text-neutral-700 mb-1">
                {COPY.PLAN_SUMMARY_AUDIENCE}
              </dt>
              <dd className="text-sm text-neutral-900">
                {mockPlanSummary.audience}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-neutral-700 mb-1">
                {COPY.PLAN_SUMMARY_ANGLE}
              </dt>
              <dd className="text-sm text-neutral-900">
                {mockPlanSummary.angle}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-neutral-700 mb-1">
                {COPY.PLAN_SUMMARY_TONE}
              </dt>
              <dd className="text-sm text-neutral-900">
                {mockPlanSummary.tone}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-neutral-700 mb-1">
                {COPY.PLAN_SUMMARY_DISCLOSURE}
              </dt>
              <dd className="text-sm text-neutral-900">
                {mockPlanSummary.disclosure}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-neutral-700 mb-1">
                {COPY.PLAN_SUMMARY_DURATION}
              </dt>
              <dd className="text-sm text-neutral-900">
                {mockPlanSummary.duration}
              </dd>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Helper text */}
      <p className="text-center text-sm text-neutral-600">
        Click <strong>Continue</strong> to move to the Script step
      </p>
    </div>
  );
}
