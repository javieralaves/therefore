import { cn } from "@/lib/utils";

interface LoadingShimmerProps {
  className?: string;
}

// Base shimmer component with pulse animation
export function LoadingShimmer({ className }: LoadingShimmerProps) {
  return (
    <div
      className={cn("animate-pulse bg-neutral-200 rounded-lg", className)}
      aria-label="Loading..."
    />
  );
}

// Card-shaped shimmer for replacing cards during loading
export function ShimmerCard({ className }: LoadingShimmerProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-neutral-100 border border-neutral-200 rounded-xl p-6 space-y-4",
        className
      )}
      aria-label="Loading content..."
    >
      <div className="h-4 bg-neutral-200 rounded w-3/4" />
      <div className="h-4 bg-neutral-200 rounded w-1/2" />
      <div className="h-20 bg-neutral-200 rounded" />
    </div>
  );
}

// Line shimmer for text placeholders
export function ShimmerLine({
  className,
  width = "full",
}: LoadingShimmerProps & { width?: "full" | "3/4" | "1/2" | "1/3" }) {
  const widthClass = {
    full: "w-full",
    "3/4": "w-3/4",
    "1/2": "w-1/2",
    "1/3": "w-1/3",
  }[width];

  return (
    <div
      className={cn(
        "animate-pulse h-4 bg-neutral-200 rounded",
        widthClass,
        className
      )}
      aria-label="Loading text..."
    />
  );
}
