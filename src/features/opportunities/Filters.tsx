import { Badge } from "@/components/ui/badge";
import { COPY } from "@/lib/copy";

export function Filters() {
  // Mock filter state - non-functional for prototype
  const mockFilters = {
    platform: "Shorts",
    category: "All categories",
    countries: ["US", "CA", "UK"],
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-neutral-50 border border-neutral-200 rounded-xl">
      {/* Platform filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-neutral-700">
          {COPY.OPPORTUNITIES_FILTERS_PLATFORM}:
        </span>
        <Badge variant="secondary" className="bg-neutral-900 text-white">
          {mockFilters.platform}
        </Badge>
      </div>

      {/* Divider */}
      <div className="hidden sm:block h-6 w-px bg-neutral-300" />

      {/* Category filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-neutral-700">
          {COPY.OPPORTUNITIES_FILTERS_CATEGORY}:
        </span>
        <Badge variant="outline">{mockFilters.category}</Badge>
      </div>

      {/* Divider */}
      <div className="hidden sm:block h-6 w-px bg-neutral-300" />

      {/* Country filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-neutral-700">
          {COPY.OPPORTUNITIES_FILTERS_COUNTRY}:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {mockFilters.countries.map((country) => (
            <Badge key={country} variant="outline" className="text-xs">
              {country}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
