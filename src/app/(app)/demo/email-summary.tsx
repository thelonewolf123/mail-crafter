"use client";
import { FileText, Mail, Sparkles, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import ShimmerButton from "@/components/ui/shimmer-button";
import React, { useState } from "react";
import { ProfileData, GeneratedEmailProps } from "./types";

interface EmailSummaryProps {
  profileData: ProfileData | null;
  generatedEmail: GeneratedEmailProps | null;
}

export function HistoryAndEmail({
  profileData,
  generatedEmail,
}: EmailSummaryProps) {
  // Add state for copy animation
  const [copied, setCopied] = useState(false);

  return (
    <div className="space-y-8">
      {/* LinkedIn Profile & Posts */}
      {profileData && (
        <Card className="bg-card/90 rounded-xl shadow-lg border border-border/30 p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="text-primary" size={20} />
            <h3 className="font-semibold text-lg">Recent LinkedIn Posts</h3>
          </div>
          <div className="mb-2">
            <p className="text-base font-semibold text-foreground">
              {profileData.name}
            </p>
            <p className="text-sm text-muted-foreground">{profileData.title}</p>
            <a
              href={profileData.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary underline"
            >
              View LinkedIn Profile
            </a>
          </div>
          <div className="max-h-64 overflow-y-auto pr-2">
            <ul className="space-y-3">
              {profileData.posts.map((post, idx) => (
                <li
                  key={idx}
                  className="p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <p className="text-sm font-medium whitespace-pre-line">
                    {post.content}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Posted: {new Date(post.postedAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      )}
      {/* Generated Email */}
      {generatedEmail && (
        <Card className="bg-card/90 rounded-xl  shadow-lg border border-border/30 p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="text-primary" size={20} />
            <h3 className="font-semibold text-lg">Generated Email</h3>
          </div>
          <div className="mb-2">
            <span className="block text-xs font-semibold text-muted-foreground mb-1">
              Subject
            </span>
            <div className="bg-muted/10 rounded-md px-3 py-2 text-sm font-medium mb-2 border border-border/20">
              {generatedEmail.subject}
            </div>
          </div>
          <span className="block text-xs font-semibold text-muted-foreground -mb-2">
            Email
          </span>
          <pre className="whitespace-pre-wrap text-sm font-sans bg-muted/20 rounded-lg p-4 mb-0 border border-border/10">
            {generatedEmail.content}
          </pre>
          {/* Use ShimmerButton for Copy Email after email is created */}
          <ShimmerButton
            onClick={async () => {
              await navigator.clipboard.writeText(
                `Subject: ${generatedEmail.subject}\n\n${generatedEmail.content}`
              );
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            text={copied ? "Copied!" : "Copy Email"}
            icon={copied ? <Check /> : undefined}
            className={`w-full font-medium relative transition-all duration-300 py-4 text-base ${
              copied ? "bg-green-500 scale-105" : ""
            }`}
            disabled={copied}
          />
        </Card>
      )}
      {/* Empty State */}
      {!profileData && !generatedEmail && (
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
