import { Input } from "@/components/ui/input";
import { IntentSuggestions } from "@/features/ask/IntentSuggestions";
import { COPY } from "@/lib/copy";

export default function Home() {
  return (
    <div className="container max-w-screen-xl mx-auto px-6 py-12">
      {/* Centered Ask Section */}
      <div className="flex flex-col items-center justify-center text-center space-y-8 mb-16">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          {COPY.ASK_HEADLINE}
        </h1>

        {/* Large disabled input for prototype */}
        <div className="w-full max-w-2xl">
          <Input
            placeholder={COPY.ASK_PLACEHOLDER}
            disabled
            className="h-14 text-lg px-6 cursor-not-allowed opacity-60"
          />
        </div>
      </div>

      {/* Intent Suggestions Grid */}
      <div className="space-y-6">
        <h2 className="text-xl font-medium text-neutral-700">
          Suggestions for you
        </h2>
        <IntentSuggestions />
      </div>
    </div>
  );
}
