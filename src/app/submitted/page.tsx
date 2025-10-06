import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { COPY } from "@/lib/copy";
import { CheckCircle2 } from "lucide-react";

export default function SubmittedPage() {
  return (
    <div className="container max-w-screen-md mx-auto px-6 py-16">
      <Card className="border-2 border-green-200 bg-green-50/30">
        <CardContent className="pt-12 pb-12 text-center space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-semibold tracking-tight">
            {COPY.SUBMITTED_TITLE}
          </h1>

          {/* Message */}
          <p className="text-neutral-700 leading-relaxed max-w-md mx-auto">
            {COPY.SUBMITTED_MESSAGE}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button variant="outline" size="lg" disabled>
              {COPY.SUBMITTED_VIEW_SUBMISSIONS}
            </Button>
            <Link href="/">
              <Button size="lg">{COPY.SUBMITTED_BACK_HOME}</Button>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="pt-6 border-t border-green-200 max-w-md mx-auto">
            <p className="text-sm text-neutral-600">
              <strong>What happens next?</strong>
              <br />
              The Notion team will review your short and provide feedback. If
              approved, it will be scheduled for publication and you&apos;ll
              start earning based on performance.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* V2: Stripe Payout Nudge */}
      <Card className="mt-6 border-2 border-blue-200 bg-blue-50/30">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <span className="text-xl">💰</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">
                {COPY.SUBMITTED_PAYOUT_NUDGE_TITLE}
              </h3>
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                {COPY.SUBMITTED_PAYOUT_NUDGE_MESSAGE}
              </p>
              <Button variant="outline" size="sm" disabled>
                Connect Stripe account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
