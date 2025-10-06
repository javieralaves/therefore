import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Opportunity } from "@/lib/types";
import { formatClosesIn } from "@/lib/mock";
import { COPY } from "@/lib/copy";

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const closesText = formatClosesIn(opportunity.closesAt);

  return (
    <Link href={`/challenge/${opportunity.slug}`} className="group">
      <Card className="h-full transition-all hover:shadow-lg hover:border-neutral-400">
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-xl font-semibold group-hover:text-neutral-700 transition-colors">
              {opportunity.brand}
            </CardTitle>
            <Badge
              variant="secondary"
              className="shrink-0 bg-green-100 text-green-800 hover:bg-green-200"
            >
              ${opportunity.cpmUsd} CPM
            </Badge>
          </div>

          {/* Closes badge */}
          <div>
            <Badge
              variant="outline"
              className={
                closesText.includes("today") || closesText.includes("tomorrow")
                  ? "border-amber-300 bg-amber-50 text-amber-800"
                  : "border-neutral-300 text-neutral-700"
              }
            >
              {closesText}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* Why you */}
          <p className="text-sm text-neutral-600 leading-relaxed">
            {opportunity.whyYou}
          </p>

          {/* Countries */}
          <div className="flex flex-wrap gap-1.5">
            <span className="text-xs text-neutral-500">
              {COPY.OPPORTUNITIES_AVAILABLE_PREFIX}
            </span>
            {opportunity.countries.map((country, idx) => (
              <span key={country} className="text-xs text-neutral-700">
                {country}
                {idx < opportunity.countries.length - 1 ? "," : ""}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
