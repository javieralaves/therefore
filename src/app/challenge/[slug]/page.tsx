import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BrandGuardrails } from "@/features/brief/BrandGuardrails";
import { ExamplesCarousel } from "@/features/brief/ExamplesCarousel";
import { mockChallengeBrief } from "@/lib/mock";
import { COPY } from "@/lib/copy";

interface ChallengePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ChallengePage({ params }: ChallengePageProps) {
  const { slug } = await params;

  // For prototype, only support "notion" challenge
  if (slug !== mockChallengeBrief.slug) {
    notFound();
  }

  const brief = mockChallengeBrief;

  return (
    <div className="container max-w-screen-xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Brand Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-neutral-900 text-white flex items-center justify-center text-2xl font-bold">
                {brief.brandLogo[0]}
              </div>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">
                  {brief.brandName}
                </h1>
                <Badge variant="secondary" className="mt-1">
                  {COPY.ASK_SPONSORED_BADGE}
                </Badge>
              </div>
            </div>
          </div>

          {/* Why Suggested */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {COPY.BRIEF_WHY_SUGGESTED}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-700 leading-relaxed">
                {brief.whySuggested}
              </p>
            </CardContent>
          </Card>

          {/* Payout */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{COPY.BRIEF_PAYOUT}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-semibold text-neutral-900">
                  {brief.payoutAmount}
                </p>
                <p className="text-sm text-neutral-600">{brief.payoutModel}</p>
              </div>
            </CardContent>
          </Card>

          {/* Must Say */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{COPY.BRIEF_MUST_SAY}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {brief.mustSayBullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Examples */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{COPY.BRIEF_EXAMPLES}</h2>
            <ExamplesCarousel count={brief.exampleCount} />
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Link href={`/studio/${brief.slug}?draft=demo-${Date.now()}`}>
              <Button size="lg" className="w-full md:w-auto text-base px-8">
                {COPY.BRIEF_CTA}
              </Button>
            </Link>
          </div>
        </div>

        {/* Sidebar - Right Column */}
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <BrandGuardrails
              bullets={brief.mustSayBullets}
              showSubtitle={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
