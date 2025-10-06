import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { COPY } from "@/lib/copy";

interface BrandGuardrailsProps {
  bullets: string[];
  showSubtitle?: boolean;
}

export function BrandGuardrails({
  bullets,
  showSubtitle = false,
}: BrandGuardrailsProps) {
  return (
    <Card className="border-2 border-neutral-300 bg-neutral-50">
      <CardHeader>
        <CardTitle className="text-lg">{COPY.GUARDRAILS_TITLE}</CardTitle>
        {showSubtitle && (
          <p className="text-sm text-neutral-600">{COPY.GUARDRAILS_SUBTITLE}</p>
        )}
      </CardHeader>
      <CardContent>
        <ul className="space-y-2.5">
          {bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm">
              <span className="text-neutral-400 mt-0.5">•</span>
              <span className="leading-relaxed">{bullet}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
