import { Placeholder } from "@/components/ui/placeholder";
import { COPY } from "@/lib/copy";

interface ExamplesCarouselProps {
  count: number;
}

export function ExamplesCarousel({ count }: ExamplesCarouselProps) {
  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="flex gap-4 min-w-max">
        {Array.from({ length: count }).map((_, idx) => (
          <div key={idx} className="w-64 shrink-0">
            <Placeholder
              label={`${COPY.PLACEHOLDER_EXAMPLE} ${idx + 1}`}
              className="aspect-[9/16] h-80"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
