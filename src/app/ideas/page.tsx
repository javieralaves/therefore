import { IntentSuggestions } from "@/features/ask/IntentSuggestions";
import { COPY } from "@/lib/copy";

export default function IdeasPage() {
  return (
    <div className="container max-w-screen-xl mx-auto px-6 py-12">
      <div className="flex flex-col space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          {COPY.IDEAS_PAGE_TITLE}
        </h1>
        <p className="text-lg text-neutral-600 max-w-3xl">
          {COPY.IDEAS_PAGE_SUBTITLE}
        </p>
      </div>

      <IntentSuggestions />
    </div>
  );
}
