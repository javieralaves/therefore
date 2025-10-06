"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BrandGuardrails } from "@/features/brief/BrandGuardrails";
import { ExamplesCarousel } from "@/features/brief/ExamplesCarousel";
import { CampaignStatusCard } from "@/features/brief/CampaignStatusCard";
import { SubmissionsGrid } from "@/features/brief/SubmissionsGrid";
import {
  mockChallengeBrief,
  mockOpportunities,
  mockSubmissionsByOpportunity,
} from "@/lib/mock";
import { useFlowStore } from "@/lib/flow-store";
import { COPY } from "@/lib/copy";

interface ChallengePageProps {
  params: Promise<{ slug: string }>;
}

export default function ChallengePage({ params }: ChallengePageProps) {
  const { slug } = use(params);
  const { getMySubmission } = useFlowStore();

  // For prototype, only support "notion" challenge
  if (slug !== mockChallengeBrief.slug) {
    notFound();
  }

  const brief = mockChallengeBrief;

  // V3: Get opportunity data for Campaign Status Card
  const opportunity = mockOpportunities.find((opp) => opp.slug === slug);
  if (!opportunity) {
    notFound();
  }

  // V3: Get submissions for this opportunity
  let submissions = mockSubmissionsByOpportunity[slug] || [];

  // V3: Check if user has submitted and prepend it
  const mySubmission = getMySubmission(slug);
  if (mySubmission) {
    // Remove any existing "mine" submissions and add the current one first
    submissions = [mySubmission, ...submissions.filter((s) => !s.isMine)];
  }

  return (
    <div className="container max-w-screen-xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Brand Header - V3: CTA moved to top right */}
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
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

              {/* V3: CTA Button in Header */}
              <Link href={`/studio/${brief.slug}?draft=demo-${Date.now()}`}>
                <Button size="lg" className="px-8 whitespace-nowrap">
                  {COPY.BRIEF_CTA}
                </Button>
              </Link>
            </div>

            {/* V2: Countries chips */}
            <div className="flex flex-wrap gap-2">
              {brief.countries.map((country) => (
                <Badge key={country} variant="outline" className="text-xs">
                  {country}
                </Badge>
              ))}
            </div>
          </div>

          {/* Why You */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{COPY.BRIEF_WHY_YOU}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-700 leading-relaxed">
                {opportunity.whyYou}
              </p>
            </CardContent>
          </Card>

          {/* V3: Campaign Status Card (replaces separate Payout/Budget cards) */}
          <CampaignStatusCard opportunity={opportunity} />

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

          {/* V3: Submissions Grid (replaces Approved Creators) */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              {COPY.BRIEF_SUBMISSIONS_TITLE}
            </h2>
            <SubmissionsGrid submissions={submissions} />
          </div>

          {/* Examples */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{COPY.BRIEF_EXAMPLES}</h2>
            <ExamplesCarousel count={brief.exampleCount} />
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
