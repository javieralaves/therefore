import { cn } from "@/lib/utils";

interface PlaceholderProps {
  label?: string;
  className?: string;
}

export function Placeholder({
  label = "Placeholder",
  className,
}: PlaceholderProps) {
  return (
    <div
      className={cn(
        "bg-neutral-200/70 text-neutral-500 grid place-items-center rounded-xl border border-neutral-300 min-h-40 text-sm font-medium",
        className
      )}
    >
      {label}
    </div>
  );
}
