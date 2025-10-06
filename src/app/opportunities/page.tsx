import { OpportunityCard } from "@/features/opportunities/OpportunityCard";
import { Filters } from "@/features/opportunities/Filters";
import { mockOpportunities } from "@/lib/mock";
import { COPY } from "@/lib/copy";

export default function OpportunitiesPage() {
  return (
    <div className="container max-w-screen-xl mx-auto px-6 py-12">
      {/* Page header */}
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          {COPY.OPPORTUNITIES_PAGE_TITLE}
        </h1>
        <p className="text-lg text-neutral-600">
          Browse all available brand partnerships
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <Filters />
      </div>

      {/* Opportunities grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockOpportunities.map((opportunity) => (
          <OpportunityCard key={opportunity.slug} opportunity={opportunity} />
        ))}
      </div>

      {/* Empty state helper (if no results - not needed for prototype) */}
      {mockOpportunities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-neutral-500">No opportunities available</p>
        </div>
      )}
    </div>
  );
}
