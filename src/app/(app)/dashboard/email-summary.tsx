import { FileText, Mail, Clock, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React from "react";
import { HistoryAndEmailProps } from "./types";

export function HistoryAndEmail({
  profileData,
  generatedEmail,
  history,
  onSelectHistory,
}: HistoryAndEmailProps) {
  return (
    <div className="space-y-8">
      {/* LinkedIn Posts */}
      {profileData && (
        <Card className="bg-card/90 rounded-xl shadow-lg border border-border/30 p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="text-primary" size={20} />
            <h3 className="font-semibold text-lg">Recent LinkedIn Posts</h3>
          </div>
          <div className="max-h-64 overflow-y-auto pr-2">
            <ul className="space-y-3">
              {profileData.posts.map((post, idx) => (
                <li
                  key={idx}
                  className="p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <p className="text-sm font-medium whitespace-pre-line">
                    {post.text}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    By: {post.author} | Posted: {post.posted_at}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      )}
      {/* Generated Email */}
      {generatedEmail && (
        <Card className="bg-card/90 rounded-xl shadow-lg border border-border/30 p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="text-primary" size={20} />
            <h3 className="font-semibold text-lg">Generated Email</h3>
          </div>
          <pre className="whitespace-pre-wrap text-sm font-sans bg-muted/20 rounded-lg p-4 mb-4">
            {generatedEmail}
          </pre>
          <Button
            onClick={() => navigator.clipboard.writeText(generatedEmail)}
            className="font-medium w-full sm:w-auto"
          >
            Copy Email
          </Button>
        </Card>
      )}
      {/* History */}
      {history.length > 0 && (
        <Card className="bg-card/90 rounded-xl shadow-lg border border-border/30 p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="text-primary" size={20} />
            <h3 className="font-semibold text-lg">History</h3>
          </div>
          <ul className="space-y-3">
            {history?.map((item, idx) => (
              <li
                key={idx}
                onClick={() => onSelectHistory(item)}
                className="p-3 bg-muted/30 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer"
              >
                <p className="text-sm font-medium truncate">{item.url}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {item.timestamp}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      )}
      {/* Empty State */}
      {!profileData && !generatedEmail && history.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
          <Sparkles className="w-16 h-16 text-primary/30 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Start Creating</h3>
          <p className="text-muted-foreground">
            Enter a LinkedIn URL to begin crafting personalized emails
          </p>
        </div>
      )}
    </div>
  );
}
