"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Placeholder } from "@/components/ui/placeholder";
import { mockUserContext } from "@/lib/mock";
import { COPY } from "@/lib/copy";

export default function ContextPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="container max-w-screen-lg mx-auto px-6 py-12">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          {COPY.CONTEXT_TITLE}
        </h1>

        {/* Improve Context Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">{COPY.CONTEXT_IMPROVE_BUTTON}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{COPY.CONTEXT_IMPROVE_BUTTON}</DialogTitle>
              <DialogDescription>
                Adjust your context settings to get better recommendations.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Track engagement metrics
                </span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Analyze audience sentiment
                </span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Suggest trending topics
                </span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Auto-update my tone</span>
                <Switch />
              </div>
            </div>
            <Button onClick={() => setDialogOpen(false)}>Save Changes</Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        {/* Connected Handles */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {COPY.CONTEXT_CONNECTED_HANDLES}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockUserContext.connectedHandles.map((handle, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 border border-neutral-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center text-sm font-medium">
                      {handle.platform[0]}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{handle.platform}</p>
                      <p className="text-xs text-neutral-600">
                        {handle.handle}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">{handle.followers}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Topics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{COPY.CONTEXT_TOPICS}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {mockUserContext.topics.map((topic, idx) => (
                <Badge key={idx} variant="outline">
                  {topic}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tone */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{COPY.CONTEXT_TONE}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {mockUserContext.toneChips.map((tone, idx) => (
                <Badge key={idx} variant="secondary">
                  {tone}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Posts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {COPY.CONTEXT_RECENT_POSTS}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Array.from({ length: mockUserContext.recentPostsCount }).map(
                (_, idx) => (
                  <Placeholder
                    key={idx}
                    label={COPY.PLACEHOLDER_POST}
                    className="aspect-[9/16]"
                  />
                )
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
