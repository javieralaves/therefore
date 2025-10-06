"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { checkGuardrails } from "@/lib/mock";
import { COPY } from "@/lib/copy";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

interface GuardrailsCardProps {
  scriptContent: string;
}

export function GuardrailsCard({ scriptContent }: GuardrailsCardProps) {
  const checks = checkGuardrails(scriptContent);

  const getStatusIcon = (status: "pass" | "warning" | "fail") => {
    switch (status) {
      case "pass":
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case "fail":
        return <XCircle className="w-4 h-4 text-red-600" />;
    }
  };

  const getStatusBadge = (status: "pass" | "warning" | "fail") => {
    switch (status) {
      case "pass":
        return (
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-800 text-xs"
          >
            ✓
          </Badge>
        );
      case "warning":
        return (
          <Badge
            variant="secondary"
            className="bg-amber-100 text-amber-800 text-xs"
          >
            ⚠
          </Badge>
        );
      case "fail":
        return (
          <Badge
            variant="secondary"
            className="bg-red-100 text-red-800 text-xs"
          >
            ✗
          </Badge>
        );
    }
  };

  return (
    <Card className="border-2 border-neutral-300 bg-neutral-50 sticky top-20">
      <CardHeader>
        <CardTitle className="text-lg">{COPY.GUARDRAILS_TITLE}</CardTitle>
        <p className="text-sm text-neutral-600">{COPY.GUARDRAILS_SUBTITLE}</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {checks.map((check) => (
            <li
              key={check.id}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2">
                {getStatusIcon(check.status)}
                <span className="text-sm">{check.label}</span>
              </div>
              {getStatusBadge(check.status)}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
