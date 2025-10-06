import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IntentSuggestions } from "@/features/ask/IntentSuggestions";
import { OpportunityCard } from "@/features/opportunities/OpportunityCard";
import { mockOpportunities } from "@/lib/mock";
import { COPY } from "@/lib/copy";

export default function Home() {
  // Show first 3-4 opportunities on home page
  const featuredOpportunities = mockOpportunities.slice(0, 3);

  return (
    <div className="container max-w-screen-xl mx-auto px-6 py-12">
      {/* Centered Ask Section */}
      <div className="flex flex-col items-center justify-center text-center space-y-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          {COPY.ASK_HEADLINE}
        </h1>
        <p className="text-lg text-neutral-600 max-w-2xl">
          {COPY.ASK_SUBHEADLINE}
        </p>

        {/* Large disabled input for prototype */}
        <div className="w-full max-w-2xl pt-4">
          <Input
            placeholder={COPY.ASK_PLACEHOLDER}
            disabled
            className="h-14 text-lg px-6 cursor-not-allowed opacity-60"
          />
        </div>
      </div>

      {/* Brand Opportunities Section - V2: Now First */}
      <div className="space-y-6 mb-16">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-neutral-900">
            {COPY.OPPORTUNITIES_SECTION_TITLE}
          </h2>
          <Link href="/opportunities">
            <Button variant="outline">{COPY.OPPORTUNITIES_VIEW_ALL}</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredOpportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.slug} opportunity={opportunity} />
          ))}
        </div>
      </div>

      {/* Intent Suggestions - V2: Now Secondary */}
      <div className="space-y-6">
        <h2 className="text-xl font-medium text-neutral-700">
          Ideas & suggestions
        </h2>
        <IntentSuggestions />
      </div>
    </div>
  );
}
