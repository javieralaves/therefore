import { Badge } from "@/components/ui/badge";
import type { ApprovedCreator } from "@/lib/types";

interface ApprovedCreatorsProps {
  creators: ApprovedCreator[];
}

const platformLabels = {
  instagram: "IG",
  youtube: "YT",
  tiktok: "TT",
};

const platformColors = {
  instagram: "bg-pink-100 text-pink-700 border-pink-200",
  youtube: "bg-red-100 text-red-700 border-red-200",
  tiktok: "bg-neutral-900 text-white border-neutral-900",
};

export function ApprovedCreators({ creators }: ApprovedCreatorsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {creators.map((creator) => {
        const platformLabel = platformLabels[creator.platform];
        const colorClass = platformColors[creator.platform];

        return (
          <div
            key={creator.id}
            className="flex items-center gap-3 p-3 border border-neutral-200 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors"
          >
            {/* Platform badge */}
            <Badge
              variant="outline"
              className={`shrink-0 text-xs font-bold ${colorClass}`}
            >
              {platformLabel}
            </Badge>

            {/* Creator info */}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-neutral-900 truncate">
                {creator.handle}
              </p>
              <p className="text-xs text-neutral-600">
                {(creator.views / 1000).toFixed(0)}K views
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
