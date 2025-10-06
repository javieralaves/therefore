"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { GuardrailsCard } from "./GuardrailsCard";
import { useFlowStore } from "@/lib/flow-store";
import { mockScriptVariants } from "@/lib/mock";
import { COPY } from "@/lib/copy";
import { cn } from "@/lib/utils";

export function ScriptPane() {
  const {
    selectedScriptId,
    scriptEditorContent,
    setSelectedScriptId,
    setScriptEditorContent,
  } = useFlowStore();

  // Auto-select first variant if none selected
  useEffect(() => {
    if (!selectedScriptId && mockScriptVariants.length > 0) {
      setSelectedScriptId(mockScriptVariants[0].id);
    }
  }, [selectedScriptId, setSelectedScriptId]);

  // Load selected variant content into editor
  useEffect(() => {
    if (selectedScriptId && !scriptEditorContent) {
      const variant = mockScriptVariants.find((v) => v.id === selectedScriptId);
      if (variant) {
        const fullScript = `${variant.hook}\n\n${variant.body.join(
          "\n\n"
        )}\n\n${variant.cta}`;
        setScriptEditorContent(fullScript);
      }
    }
  }, [selectedScriptId, scriptEditorContent, setScriptEditorContent]);

  const selectedVariant = mockScriptVariants.find(
    (v) => v.id === selectedScriptId
  );

  const handleVariantSelect = (variantId: string) => {
    setSelectedScriptId(variantId);
    const variant = mockScriptVariants.find((v) => v.id === variantId);
    if (variant) {
      const fullScript = `${variant.hook}\n\n${variant.body.join("\n\n")}\n\n${
        variant.cta
      }`;
      setScriptEditorContent(fullScript);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Variants */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{COPY.SCRIPT_VARIANTS_LABEL}</h2>
        {mockScriptVariants.map((variant) => (
          <Card
            key={variant.id}
            className={cn(
              "cursor-pointer transition-all hover:border-neutral-400",
              selectedScriptId === variant.id
                ? "border-2 border-neutral-900 shadow-md"
                : "border border-neutral-300"
            )}
            onClick={() => handleVariantSelect(variant.id)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{variant.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-xs text-neutral-600 space-y-1">
                <p className="line-clamp-2">
                  <strong>Hook:</strong> {variant.hook}
                </p>
                <p className="line-clamp-1">
                  <strong>Body:</strong> {variant.body.length} sections
                </p>
                <p className="line-clamp-1">
                  <strong>CTA:</strong> {variant.cta.slice(0, 40)}...
                </p>
              </div>
              <div className="pt-2 border-t border-neutral-200">
                <p className="text-xs text-neutral-700 leading-relaxed">
                  <strong>Why this works:</strong> {variant.rationale}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Center Column - Editor */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{COPY.SCRIPT_EDITOR_LABEL}</h2>
          {selectedVariant && (
            <span className="text-sm text-neutral-600">
              {selectedVariant.title}
            </span>
          )}
        </div>

        <Textarea
          value={scriptEditorContent}
          onChange={(e) => setScriptEditorContent(e.target.value)}
          placeholder="Your script will appear here..."
          className="min-h-[500px] font-mono text-sm leading-relaxed resize-none"
        />

        {/* Inline Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" size="sm" className="text-xs">
            {COPY.SCRIPT_ACTION_TIGHTEN}
          </Button>
          <Button variant="ghost" size="sm" className="text-xs">
            {COPY.SCRIPT_ACTION_SHORTEN}
          </Button>
          <Button variant="ghost" size="sm" className="text-xs">
            {COPY.SCRIPT_ACTION_INSERT_CTA}
          </Button>
        </div>
      </div>

      {/* Right Column - Guardrails */}
      <div>
        <GuardrailsCard scriptContent={scriptEditorContent} />
      </div>
    </div>
  );
}
