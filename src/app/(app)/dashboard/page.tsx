"use client";

import { useState, useEffect } from "react";
import { Sparkles, Mail, FileText, Loader2, List } from "lucide-react";

// Topbar component
function Topbar() {
  return (
    <header className="w-full px-4 py-4 border-b border-border/30 bg-background/80 backdrop-blur-md flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Sparkles className="text-primary" size={28} />
        <span className="font-bold text-xl text-foreground">
          AlignMail Dashboard
        </span>
      </div>
      <nav className="flex gap-4">
        <a
          href="/onboarding"
          className="text-muted-foreground hover:text-primary transition-colors font-medium"
        >
          Onboarding
        </a>
        <a href="/dashboard" className="text-primary font-semibold">
          Dashboard
        </a>
      </nav>
    </header>
  );
}

// UrlInputBox component
interface UrlInputBoxProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (data: { url: string; intent: string; tone: string }) => void;
  error?: string;
  disabled?: boolean;
  isLoading?: boolean;
}
function UrlInputBox({
  value,
  onChange,
  onSubmit,
  error,
  disabled,
  isLoading,
}: UrlInputBoxProps) {
  const [input, setInput] = useState(value || "");
  useEffect(() => {
    setInput(value);
  }, [value]);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ url: input, intent: "", tone: "professional" });
      }}
      className="w-full bg-white/80 dark:bg-card/90 rounded-xl shadow-lg border border-border/30 p-5 flex flex-col gap-4 backdrop-blur-xl"
    >
      <label
        htmlFor="linkedin"
        className="text-lg font-semibold text-left mb-1 text-foreground"
      >
        Paste your LinkedIn profile URL
      </label>
      <div className="flex gap-2">
        <input
          id="linkedin"
          type="url"
          placeholder="https://www.linkedin.com/in/your-profile"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (onChange) onChange(e.target.value);
          }}
          required
          className="flex-1 px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-base bg-background/80"
          autoFocus
          disabled={disabled}
        />
        <button
          type="submit"
          disabled={disabled || !input}
          className="font-bold px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-60 text-base shadow"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            "Generate"
          )}
        </button>
      </div>
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </form>
  );
}

// EmailResultCard component
interface EmailResultCardProps {
  email: string;
  onCopy: () => void;
  onRegenerate: () => void;
  onEdit?: (newEmail: string) => void;
  metadata?: { generatedAt?: string; promptUsed?: string };
}
function EmailResultCard({
  email,
  onCopy,
  onRegenerate,
  metadata,
}: EmailResultCardProps) {
  return (
    <div className="bg-white/80 dark:bg-card/90 rounded-xl shadow-lg border border-border/30 p-5 flex flex-col min-h-[180px] backdrop-blur-xl">
      <div className="flex items-center gap-2 mb-3">
        <Mail className="text-primary" size={20} />
        <span className="font-semibold text-base">Your Custom Email</span>
      </div>
      <pre className="whitespace-pre-wrap text-base text-left text-foreground font-mono bg-muted/10 rounded-lg p-3 mt-1">
        {email}
      </pre>
      <div className="flex gap-2 mt-4">
        <button
          onClick={onCopy}
          className="px-3 py-1 rounded-lg bg-muted hover:bg-primary/10 text-sm font-medium shadow"
        >
          Copy
        </button>
        <button
          onClick={onRegenerate}
          className="px-3 py-1 rounded-lg bg-muted hover:bg-primary/10 text-sm font-medium shadow"
        >
          Regenerate
        </button>
      </div>
      {metadata && (
        <div className="text-xs text-muted-foreground mt-2">
          Generated at: {metadata.generatedAt || "-"}
        </div>
      )}
    </div>
  );
}

// ScrapeList component
interface ScrapeListProps {
  items: { title?: string }[];
  onExpand?: (idx: number) => void;
}
function ScrapeList({ items, onExpand }: ScrapeListProps) {
  return (
    <div className="bg-white/80 dark:bg-card/90 rounded-xl shadow-lg border border-border/30 p-5 flex flex-col min-h-[120px] backdrop-blur-xl">
      <div className="flex items-center gap-2 mb-3">
        <List className="text-primary" size={20} />
        <span className="font-semibold text-base">Crawled LinkedIn Posts</span>
      </div>
      {items && items.length > 0 ? (
        <ul className="list-disc pl-5 space-y-2 text-left text-foreground">
          {items.map((post: { title?: string }, idx: number) => (
            <li
              key={idx}
              className="hover:bg-primary/10 rounded px-2 py-1 transition-colors cursor-pointer text-sm"
              onClick={() => onExpand && onExpand(idx)}
            >
              {post.title || "Untitled Post"}
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-muted-foreground">No posts found.</div>
      )}
    </div>
  );
}

// HistoryPanel component
interface HistoryItem {
  url: string;
  email: string;
  intent: string;
  tone: string;
  metadata?: { generatedAt?: string; promptUsed?: string };
}
interface HistoryPanelProps {
  onSelectGeneration: (generation: HistoryItem) => void;
  history: HistoryItem[];
}
function HistoryPanel({ onSelectGeneration, history }: HistoryPanelProps) {
  return (
    <div className="bg-card/90 rounded-lg border border-border/30 p-4 shadow">
      <div className="font-semibold mb-2 flex items-center gap-2 text-base">
        <FileText className="w-4 h-4 text-primary" />
        History
      </div>
      {history && history.length > 0 ? (
        <ul className="text-sm space-y-1">
          {history.map((item: HistoryItem, idx: number) => (
            <li key={idx}>
              <button
                className="hover:underline text-primary"
                onClick={() => onSelectGeneration(item)}
              >
                {item.url}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-muted-foreground text-sm">No history yet.</div>
      )}
    </div>
  );
}

// EmailTemplates component
interface EmailTemplate {
  name: string;
  tone: string;
  description: string;
}
interface EmailTemplatesProps {
  onSelectTemplate: (template: EmailTemplate) => void;
}
function EmailTemplates({ onSelectTemplate }: EmailTemplatesProps) {
  const templates = [
    {
      name: "Connection",
      tone: "friendly",
      description: "Connect with a new contact.",
    },
    {
      name: "Follow Up",
      tone: "professional",
      description: "Follow up after a meeting.",
    },
    {
      name: "Pitch",
      tone: "persuasive",
      description: "Pitch your product or service.",
    },
  ];
  return (
    <div className="bg-card/90 rounded-lg border border-border/30 p-4 shadow">
      <div className="font-semibold mb-2 flex items-center gap-2 text-base">
        <Mail className="w-4 h-4 text-primary" />
        Templates
      </div>
      <div className="flex gap-2 flex-wrap">
        {templates.map((tpl, i) => (
          <button
            key={i}
            onClick={() => onSelectTemplate && onSelectTemplate(tpl)}
            className="px-3 py-1 rounded-lg bg-muted hover:bg-primary/10 text-sm font-medium shadow"
          >
            {tpl.name}
          </button>
        ))}
      </div>
    </div>
  );
}

// EmailGenerationSkeleton component
function EmailGenerationSkeleton() {
  return (
    <div className="bg-muted/30 animate-pulse rounded-lg h-32 w-full shadow" />
  );
}
// ScrapeListSkeleton component
function ScrapeListSkeleton() {
  return (
    <div className="bg-muted/30 animate-pulse rounded-lg h-32 w-full shadow" />
  );
}
// EmptyState component
interface EmptyStateProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}
function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center bg-card/90 rounded-lg border border-border/30 p-8 shadow">
      <Icon className="w-8 h-8 text-primary mb-2" />
      <div className="font-semibold text-base mb-1">{title}</div>
      <div className="text-muted-foreground text-sm text-center">
        {description}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [url, setUrl] = useState<string>("");
  const [intent, setIntent] = useState<string>("");
  const [tone, setTone] = useState<string>("professional");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<{
    email: string;
    metadata: { generatedAt?: string; promptUsed?: string };
    scraped: { title?: string }[];
  } | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleGenerate = async (data: {
    url: string;
    intent: string;
    tone: string;
  }) => {
    setError("");
    setIsLoading(true);
    setResult(null);
    setIntent(data.intent);
    setTone(data.tone);
    setTimeout(() => {
      const mockEmail = `Hi there,\n\nI came across your LinkedIn profile and was impressed by your recent work. I'd love to connect and explore how we can collaborate or add value to each other's networks.\n\nBest,\nAlignMail Team`;
      const mockPosts = [
        { title: "How AI is transforming B2B outreach in 2024" },
        { title: "5 tips for writing cold emails that get replies" },
        { title: "Celebrating 1,000+ connections!" },
        { title: "Excited to announce our new product launch" },
      ];
      const mockResult = {
        email: mockEmail,
        metadata: {
          generatedAt: new Date().toLocaleString(),
          promptUsed: "Mock",
        },
        scraped: mockPosts,
      };
      setResult(mockResult);
      setHistory((prev) => [
        {
          url: data.url,
          email: mockEmail,
          intent: data.intent,
          tone: data.tone,
          metadata: mockResult.metadata,
        },
        ...prev,
      ]);
      setIsLoading(false);
    }, 1500);
  };

  const handleCopy = () => {
    if (result?.email) navigator.clipboard.writeText(result.email);
  };
  const handleRegenerate = () => {
    if (url) {
      handleGenerate({ url, intent, tone });
    }
  };
  const handleEdit = (newEmail: string) => {
    if (result) {
      setResult({ ...result, email: newEmail });
    }
  };
  const handleExpandPost = (idx: number) => {
    alert("Expand post: " + idx);
  };
  const handleSelectGeneration = (generation: HistoryItem) => {
    setUrl(generation.url);
    setIntent(generation.intent);
    setTone(generation.tone);
    setResult({
      email: generation.email,
      metadata: generation.metadata || {},
      scraped: [],
    });
  };
  const handleSelectTemplate = (template: EmailTemplate) => {
    setTone(template.tone);
    setIntent(
      `Generate a ${template.name.toLowerCase()} email. ${template.description}`
    );
    alert(
      `${template.name} template applied. Enter a LinkedIn URL to generate.`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 flex flex-col font-sans">
      <Topbar />
      <main className="container mx-auto px-2 sm:px-6 py-8 max-w-7xl flex-1 min-w-0">
        <div className="mb-10 animate-fade-in-up min-w-0">
          <div className="flex items-center gap-3 mb-2 min-w-0 flex-wrap">
            <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center shadow-md min-w-0">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground min-w-0">
              Email Crafter
            </h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl min-w-0">
            Generate personalized emails from LinkedIn profiles using AI.
          </p>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 min-w-0">
          {/* Left column - Input */}
          <div className="space-y-8 animate-fade-in-up flex flex-col min-w-0 flex-1">
            <UrlInputBox
              value={url}
              onChange={setUrl}
              onSubmit={handleGenerate}
              error={error}
              disabled={isLoading}
              isLoading={isLoading}
            />
            <div className="grid grid-cols-1 gap-6 min-w-0">
              <HistoryPanel
                onSelectGeneration={handleSelectGeneration}
                history={history}
              />
              <EmailTemplates onSelectTemplate={handleSelectTemplate} />
            </div>
          </div>
          {/* Right column - Results */}
          <div className="space-y-8 animate-slide-in-right flex flex-col min-w-0 flex-1">
            {isLoading ? (
              <>
                <EmailGenerationSkeleton />
                <ScrapeListSkeleton />
              </>
            ) : result ? (
              <>
                <EmailResultCard
                  email={result.email}
                  onCopy={handleCopy}
                  onRegenerate={handleRegenerate}
                  onEdit={handleEdit}
                  metadata={result.metadata}
                />
                <ScrapeList
                  items={result.scraped || []}
                  onExpand={handleExpandPost}
                />
              </>
            ) : (
              <>
                <EmptyState
                  icon={Mail}
                  title="Ready to generate emails"
                  description="Enter a LinkedIn profile URL on the left to create your first personalized email."
                />
                <EmptyState
                  icon={FileText}
                  title="LinkedIn posts will appear here"
                  description="After generating an email, you'll see the LinkedIn posts that were analyzed to create your personalized message."
                />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
