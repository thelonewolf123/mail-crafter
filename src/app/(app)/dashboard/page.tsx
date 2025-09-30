"use client";
import { useEffect, useState } from "react";
import {
  Sparkles,
  Loader2,
  Check,
  ArrowRight,
  Plus,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { EmailPreferenceDialog } from "./email-preference-dialog";
import { EmailSummary } from "./email-summary";
import useLocalStorage, { User } from "@/hooks/use-localstorage";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Types
interface Post {
  title: string;
}

interface ProfileData {
  posts: Post[];
}

interface HistoryItem {
  url: string;
  email: string;
  posts: Post[];
  timestamp: string;
}

function Topbar() {
  return (
    <header className="w-full px-6 py-4 border-b border-border/30 bg-background/80 backdrop-blur-md flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Sparkles className="text-primary" size={28} />
        <span className="font-bold text-xl text-foreground">MailCrafter</span>
      </div>
    </header>
  );
}

export default function DashboardPage() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [url, setUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [generatedEmail, setGeneratedEmail] = useState<string>("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showEmailPref, setShowEmailPref] = useState(false);
  const [hasEmailPref, setHasEmailPref] = useState<boolean>(false);
  const [user, setUser] = useLocalStorage<User>("user", {
    name: "Guest",
    try: 1,
  });
  const router = useRouter();

  // Remove redirect on mount
  // Only check if preferences exist in user object
  useEffect(() => {
    setHasEmailPref(!!user?.emailPreference);
  }, [user]);

  const handleUrlSubmit = () => {
    if (!url) return;
    // If user has already tried once, show toast and redirect
    if (user?.try === 1) {
      toast.warning("Finish Onboarding to Try More...");
      setTimeout(() => {
        router.push("/onboarding");
      }, 1500);
      return;
    }
    // Increment try count
    setIsLoading(true);
    setCurrentStep(1);

    setTimeout(() => {
      const mockPosts = [
        { title: "How AI is transforming B2B outreach in 2024" },
        { title: "5 tips for writing cold emails that get replies" },
        { title: "Celebrating 1,000+ connections!" },
        { title: "Excited to announce our new product launch" },
      ];
      setProfileData({ posts: mockPosts });
      setIsLoading(false);
      setCurrentStep(2);
    }, 2000);
    setUser({ ...user, try: (user?.try || 0) + 1 });
  };

  const handleGenerateEmail = () => {
    setIsLoading(true);
    setCurrentStep(3);

    setTimeout(() => {
      const mockEmail = `Hi there,

I came across your LinkedIn profile and was impressed by your recent work on AI-driven B2B outreach strategies. Your insights on cold email best practices really resonated with me.

I'd love to connect and explore how we can collaborate or add value to each other's networks.

Best regards,
MailCrafter Team`;

      setGeneratedEmail(mockEmail);
      setIsLoading(false);
      setCurrentStep(4);

      const newHistoryItem = {
        url,
        email: mockEmail,
        posts: profileData?.posts || [],
        timestamp: new Date().toLocaleString(),
      };
      setHistory((prev) => [newHistoryItem, ...prev]);
    }, 1500);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setUrl("");
    setProfileData(null);
    setGeneratedEmail("");
  };

  const handleSelectHistory = (item: HistoryItem) => {
    setUrl(item.url);
    setProfileData({ posts: item.posts });
    setGeneratedEmail(item.email);
    setCurrentStep(4);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-primary/5 via-background to-secondary/10 flex flex-col font-sans">
      <Topbar />
      <main className="flex-1 flex overflow-hidden">
        {/* Left Side - Timeline */}
        <div className="w-full lg:w-3/5 flex flex-col overflow-y-auto px-4 py-8 lg:px-12 lg:py-12 space-y-10">
          <div className="max-w-2xl mx-auto w-full space-y-10">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">
                Email Crafter
              </h1>
              <p className="text-lg text-muted-foreground">
                Generate personalized emails from LinkedIn profiles
              </p>
            </div>

            {/* Timeline Steps */}
            <Card className="relative space-y-10 bg-card/90 border border-border/30 shadow-xl px-6 py-8 lg:px-10 lg:py-12">
              {/* Step 1: Enter URL */}
              <div className="relative">
                <div className="flex items-start gap-6">
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep >= 1
                        ? "bg-primary text-black"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {currentStep >= 1 ? <Check size={20} /> : "1"}
                  </div>
                  <div className="flex-1 pb-10">
                    <h3 className="text-lg font-semibold mb-3">
                      Enter LinkedIn Profile URL
                    </h3>
                    <div className="space-y-4">
                      <Input
                        type="url"
                        placeholder="https://www.linkedin.com/in/username"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        disabled={currentStep > 0}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleUrlSubmit()
                        }
                      />
                      {currentStep === 0 && (
                        <Button
                          onClick={handleUrlSubmit}
                          disabled={!url}
                          className="w-full sm:w-auto"
                        >
                          Analyze Profile
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                {currentStep >= 1 && (
                  <div className="absolute left-5 top-12 w-0.5 h-full bg-border"></div>
                )}
              </div>
              {/* Step 2: Analyzing */}
              {currentStep >= 1 && (
                <div className="relative">
                  <div className="flex items-start gap-6">
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        currentStep >= 2
                          ? "bg-primary text-black"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isLoading && currentStep === 1 ? (
                        <Loader2 size={20} className="animate-spin" />
                      ) : currentStep >= 2 ? (
                        <Check size={20} />
                      ) : (
                        "2"
                      )}
                    </div>
                    <div className="flex-1 pb-10">
                      <h3 className="text-lg font-semibold mb-2">
                        Analyzing Profile
                      </h3>
                      {isLoading && currentStep === 1 ? (
                        <p className="text-muted-foreground">
                          Fetching LinkedIn posts and profile data...
                        </p>
                      ) : currentStep >= 2 ? (
                        <p className="text-muted-foreground">
                          ✓ Profile analyzed successfully
                        </p>
                      ) : null}
                    </div>
                  </div>
                  {currentStep >= 2 && (
                    <div className="absolute left-5 top-12 w-0.5 h-full bg-border"></div>
                  )}
                </div>
              )}
              {/* Step 3: Customize Email */}
              {currentStep >= 2 && (
                <div className="relative">
                  <div className="flex items-start gap-6">
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        currentStep >= 3
                          ? "bg-primary text-background"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {currentStep >= 3 ? <Check size={20} /> : "3"}
                    </div>
                    <div className="flex-1 pb-10">
                      <h3 className="text-lg font-semibold mb-3 text-foreground">
                        Product Details
                      </h3>
                      <div className="space-y-5">
                        <div>
                          <Button
                            onClick={() => setShowEmailPref(true)}
                            variant="default"
                            className={`mb-2 w-full sm:w-auto font-semibold flex items-center gap-2 shadow rounded-lg px-4 py-2 text-base ${
                              !hasEmailPref ? "animate-pulse" : ""
                            }`}
                          >
                            {hasEmailPref ? (
                              <Pencil size={18} className="mr-1" />
                            ) : (
                              <Plus size={18} className="mr-1" />
                            )}
                            {hasEmailPref
                              ? "Edit Product Details"
                              : "Enter Your Product Details"}
                          </Button>
                        </div>
                        {/* Show Create Personalized Email only if preferences exist */}
                        {hasEmailPref && currentStep === 2 && (
                          <Button
                            onClick={handleGenerateEmail}
                            variant="default"
                            className="flex items-center gap-2 w-full sm:w-auto font-bold"
                          >
                            Create Personalized Email <ArrowRight size={18} />
                          </Button>
                        )}
                        {/* If no preferences, show a hint */}
                        {!hasEmailPref && currentStep === 2 && (
                          <p className="text-sm text-destructive font-semibold mt-2">
                            Please click to enter your product details to
                            generate an email.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  {currentStep >= 3 && (
                    <div className="absolute left-5 top-12 w-0.5 h-full bg-border"></div>
                  )}
                </div>
              )}
              {/* Step 4: Email Generated */}
              {currentStep >= 3 && (
                <div className="relative">
                  <div className="flex items-start gap-6">
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        currentStep >= 4
                          ? "bg-primary text-black"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isLoading && currentStep === 3 ? (
                        <Loader2 size={20} className="animate-spin" />
                      ) : currentStep >= 4 ? (
                        <Check size={20} />
                      ) : (
                        "4"
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">
                        Email Generated
                      </h3>
                      {isLoading && currentStep === 3 ? (
                        <p className="text-muted-foreground">
                          Crafting your personalized email...
                        </p>
                      ) : currentStep >= 4 ? (
                        <div className="space-y-4">
                          <p className="text-muted-foreground">
                            ✓ Your email is ready!
                          </p>
                          <Button
                            onClick={handleReset}
                            variant="outline"
                            className="w-full sm:w-auto"
                          >
                            Create Another Email
                          </Button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Mobile-only: Results & History below timeline */}
            <div className="block lg:hidden">
              <EmailSummary
                profileData={profileData}
                generatedEmail={generatedEmail}
                history={history}
                onSelectHistory={handleSelectHistory}
              />
            </div>
          </div>
        </div>
        {/* Right Side - Results & History */}
        <div className="hidden lg:flex lg:w-2/5 border-l border-border/30 bg-background/80 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-8">
            <EmailSummary
              profileData={profileData}
              generatedEmail={generatedEmail}
              history={history}
              onSelectHistory={handleSelectHistory}
            />
          </div>
        </div>
        <EmailPreferenceDialog
          open={showEmailPref}
          onClose={() => {
            setShowEmailPref(false);
          }}
          onSaved={() => {
            setHasEmailPref(true);
          }}
        />
      </main>
    </div>
  );
}
