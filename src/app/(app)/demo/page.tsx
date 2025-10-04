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
import { HistoryAndEmail } from "./email-summary";
import useLocalStorage, { User } from "@/hooks/use-localstorage";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  ServerGenerateEmail,
  ServerGetHistory,
  ServerLinkdinScrapper,
} from "@/server/actions";
import {
  GeneratedEmailProps,
  HistoryItem,
  Post,
  ProfileData,
  RawPost,
  StepConfig,
} from "./types";

// Step Component
function TimelineStep({
  step,
  currentStep,
  isLoading,
  children,
}: {
  step: StepConfig;
  currentStep: number;
  isLoading: boolean;
  children: React.ReactNode;
}) {
  const isActive = currentStep >= step.number;
  const isCurrentLoading = isLoading && currentStep === step.number - 1;

  return (
    <div className="relative">
      <div className="flex items-start gap-6">
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
            isActive
              ? "bg-primary text-black"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {isCurrentLoading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : isActive ? (
            <Check size={20} />
          ) : (
            step.number
          )}
        </div>
        <div className={`flex-1 ${step.showConnector ? "pb-10" : ""}`}>
          <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
          {children}
        </div>
      </div>
      {step.showConnector && isActive && (
        <div className="absolute left-5 top-12 w-0.5 h-full bg-border"></div>
      )}
    </div>
  );
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
  const [generatedEmail, setGeneratedEmail] =
    useState<GeneratedEmailProps | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showEmailPref, setShowEmailPref] = useState(false);
  const [user, setUser] = useLocalStorage<User>("user", {
    name: "Guest",
    try: 0,
  });
  const router = useRouter();

  const hasEmailPref = !!user?.emailPreference;
  const userTries = user?.try || 0;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlParam = params.get("linkedinUrl");

      if (urlParam?.includes("linkedin")) {
        setUrl(urlParam);
        setTimeout(() => handleUrlSubmit(urlParam), 100);
      }
    }
  }, []);
  // useEffect(() => {
  //   const fetchHistory = async () => {
  //     const response = await ServerGetHistory();
  //     if (!response.success) {
  //       toast.error(response.data);
  //       setIsLoading(false);
  //       return;
  //     }
  //     console.log(response);

  //     setHistory([response.data]);
  //   };
  //   fetchHistory();
  // }, []);

  const checkQuotaAndOnboarding = () => {
    if (userTries === 1 && !user?.onboarding?.completed) {
      toast.warning("Please complete onboarding first.");
      setTimeout(() => router.push("/onboarding"), 1500);
      return false;
    }

    if (userTries >= 3) {
      toast.warning("you reached free 3 quota...");
      return false;
    }

    return true;
  };

  const transformPosts = (data: RawPost[]): Post[] => {
    return data.map((post) => ({
      text: post.text,
      author: `${post.author.first_name} ${post.author.last_name}`,
      posted_at: post.posted_at.date,
    }));
  };

  async function handleUrlSubmit(submitUrl?: string) {
    const urlToUse = submitUrl ?? url;
    if (!urlToUse.includes("linkedin")) {
      toast.error("Please enter LinkeDin Url.");
      return;
    }
    if (userTries > 0 && !checkQuotaAndOnboarding()) return;

    setIsLoading(true);

    const res = await ServerLinkdinScrapper(urlToUse);
    if (!res.success) {
      toast.error(res.data);
      setIsLoading(false);
      return;
    }

    const posts = transformPosts(res.data);
    setProfileData({ posts });
    setUser({ ...user, try: userTries + 1 });
    setCurrentStep(1);
    setIsLoading(false);
    setCurrentStep(2);
  }

  const handleGenerateEmail = async () => {
    setIsLoading(true);
    setCurrentStep(3);
    const data = { ...user.emailPreference, linkedin: url };
    const response = await ServerGenerateEmail(data);
    if (!response.success) {
      toast.error(response.data);
      setIsLoading(false);
      return;
    }

    setGeneratedEmail(response.data.response.output);
    setIsLoading(false);
    setCurrentStep(4);

    const newHistoryItem: HistoryItem = {
      url,
      email: response.data.response.output,
      posts: profileData?.posts || [],
      timestamp: new Date().toLocaleString(),
    };
    setHistory((prev) => [newHistoryItem, ...prev]);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setUrl("");
    setProfileData(null);
    setGeneratedEmail(null);
  };

  const handleSelectHistory = (item: HistoryItem) => {
    setUrl(item.url);
    setProfileData({ posts: item.posts });
    // If item.email is a string, we can't extract subject. We'll set subject as empty string.
    setGeneratedEmail({ subject: "", email: item.email });
    setCurrentStep(4);
  };

  const handleEmailPrefSave = () => {
    setShowEmailPref(false);
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
              <TimelineStep
                step={{
                  number: 1,
                  title: "Enter LinkedIn Profile URL",
                  showConnector: true,
                }}
                currentStep={currentStep}
                isLoading={isLoading}
              >
                <div className="space-y-4">
                  <Input
                    type="url"
                    placeholder="https://www.linkedin.com/in/username"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    disabled={currentStep > 0}
                    onKeyDown={(e) => e.key === "Enter" && handleUrlSubmit()}
                  />
                  {currentStep === 0 && (
                    <Button
                      onClick={() => handleUrlSubmit()}
                      disabled={!url}
                      className="w-full sm:w-auto"
                    >
                      Analyze Profile
                    </Button>
                  )}
                </div>
              </TimelineStep>

              {/* Step 2: Analyzing */}
              {currentStep >= 1 && (
                <TimelineStep
                  step={{
                    number: 2,
                    title: "Analyzing Profile",
                    showConnector: true,
                  }}
                  currentStep={currentStep}
                  isLoading={isLoading}
                >
                  <p className="text-muted-foreground">
                    {isLoading && currentStep === 1
                      ? "Fetching LinkedIn posts and profile data..."
                      : "✓ Profile analyzed successfully"}
                  </p>
                </TimelineStep>
              )}

              {/* Step 3: Customize Email */}
              {currentStep >= 2 && (
                <TimelineStep
                  step={{
                    number: 3,
                    title: "Product Details",
                    showConnector: true,
                  }}
                  currentStep={currentStep}
                  isLoading={isLoading}
                >
                  <div className="space-y-5">
                    <Button
                      onClick={() => setShowEmailPref(true)}
                      variant="default"
                      className={`mb-2 w-full sm:w-auto font-semibold flex items-center gap-2 shadow rounded-lg px-4 py-2 text-base ${
                        !hasEmailPref ? "animate-pulse" : ""
                      }`}
                    >
                      {hasEmailPref ? (
                        <>
                          <Pencil size={18} className="mr-1" />
                          Edit Product Details
                        </>
                      ) : (
                        <>
                          <Plus size={18} className="mr-1" />
                          Enter Your Product Details
                        </>
                      )}
                    </Button>

                    {currentStep === 2 &&
                      (hasEmailPref ? (
                        <Button
                          onClick={handleGenerateEmail}
                          variant="default"
                          className="flex items-center gap-2 w-full sm:w-auto font-bold"
                        >
                          Create Personalized Email <ArrowRight size={18} />
                        </Button>
                      ) : (
                        <p className="text-sm text-destructive font-semibold mt-2">
                          Please click to enter your product details to generate
                          an email.
                        </p>
                      ))}
                  </div>
                </TimelineStep>
              )}

              {/* Step 4: Email Generated */}
              {currentStep >= 3 && (
                <TimelineStep
                  step={{
                    number: 4,
                    title: "Email Generated",
                    showConnector: false,
                  }}
                  currentStep={currentStep}
                  isLoading={isLoading}
                >
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
                </TimelineStep>
              )}
            </Card>

            {/* Mobile-only: Results & History below timeline */}
            <div className="block lg:hidden">
              <HistoryAndEmail
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
            <HistoryAndEmail
              profileData={profileData}
              generatedEmail={generatedEmail}
              history={history}
              onSelectHistory={handleSelectHistory}
            />
          </div>
        </div>

        <EmailPreferenceDialog
          open={showEmailPref}
          onClose={() => setShowEmailPref(false)}
          onSaved={handleEmailPrefSave}
        />
      </main>
    </div>
  );
}
