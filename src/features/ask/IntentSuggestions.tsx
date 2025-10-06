import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockIntentSuggestions } from "@/lib/mock";
import { COPY } from "@/lib/copy";

export function IntentSuggestions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {mockIntentSuggestions.map((suggestion) => (
        <Link
          key={suggestion.id}
          href={
            suggestion.challengeSlug
              ? `/challenge/${suggestion.challengeSlug}`
              : "#"
          }
          className="group"
        >
          <Card className="h-full transition-all hover:shadow-lg hover:border-neutral-400">
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg leading-tight group-hover:text-neutral-700 transition-colors">
                  {suggestion.title}
                </CardTitle>
                {suggestion.isSponsored && (
                  <Badge
                    variant="secondary"
                    className="shrink-0 bg-neutral-900 text-white hover:bg-neutral-800"
                  >
                    {COPY.ASK_SPONSORED_BADGE}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {suggestion.description}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
