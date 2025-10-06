import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { COPY } from "@/lib/copy";
import type { Submission } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { Eye, Heart, MessageCircle, DollarSign } from "lucide-react";

interface SubmissionsGridProps {
  submissions: Submission[];
}

export function SubmissionsGrid({ submissions }: SubmissionsGridProps) {
  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "instagram":
        return "bg-pink-100 text-pink-800";
      case "tiktok":
        return "bg-cyan-100 text-cyan-800";
      case "youtube":
        return "bg-red-100 text-red-800";
      default:
        return "bg-neutral-100 text-neutral-800";
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "under_review":
        return "bg-gray-100 text-gray-700";
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "live":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-neutral-100 text-neutral-700";
    }
  };

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case "under_review":
        return COPY.SUBMISSION_STATUS_UNDER_REVIEW;
      case "approved":
        return COPY.SUBMISSION_STATUS_APPROVED;
      case "rejected":
        return COPY.SUBMISSION_STATUS_REJECTED;
      case "live":
        return COPY.SUBMISSION_STATUS_LIVE;
      default:
        return status;
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {submissions.map((submission) => (
        <Card
          key={submission.id}
          className={submission.isMine ? "ring-2 ring-neutral-900" : ""}
        >
          <CardContent className="p-4 space-y-3">
            {/* Video Placeholder */}
            <div className="aspect-[9/16] bg-neutral-100 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="text-center text-neutral-400">
                <p className="text-xs">{submission.videoPlaceholderLabel}</p>
              </div>
              {/* Mine badge */}
              {submission.isMine && (
                <div className="absolute top-2 left-2">
                  <Badge className="bg-neutral-900 text-white">
                    {COPY.BRIEF_YOUR_SUBMISSION}
                  </Badge>
                </div>
              )}
            </div>

            {/* Title and Platform */}
            <div className="space-y-2">
              <h4 className="font-semibold text-sm line-clamp-2">
                {submission.title}
              </h4>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge
                  variant="secondary"
                  className={getPlatformColor(submission.platform)}
                >
                  {submission.platform}
                </Badge>
                {submission.status && (
                  <Badge
                    variant="secondary"
                    className={getStatusColor(submission.status)}
                  >
                    {getStatusLabel(submission.status)}
                  </Badge>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1 text-neutral-600">
                <Eye className="h-3 w-3" />
                <span>{formatNumber(submission.views)}</span>
              </div>
              <div className="flex items-center gap-1 text-neutral-600">
                <Heart className="h-3 w-3" />
                <span>{formatNumber(submission.likes)}</span>
              </div>
              <div className="flex items-center gap-1 text-neutral-600">
                <MessageCircle className="h-3 w-3" />
                <span>{formatNumber(submission.comments)}</span>
              </div>
              <div className="flex items-center gap-1 text-green-600 font-medium">
                <DollarSign className="h-3 w-3" />
                <span>${submission.earningsUsd.toLocaleString()}</span>
              </div>
            </div>

            {/* Posted date and creator */}
            <div className="pt-2 border-t border-neutral-200 space-y-1">
              <p className="text-xs text-neutral-500">
                {COPY.BRIEF_SUBMISSION_POSTED}{" "}
                {formatDistanceToNow(new Date(submission.postedAt), {
                  addSuffix: true,
                })}
              </p>
              <p className="text-xs text-neutral-600 font-medium">
                {submission.creatorHandle}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
