"use client";

import { useEffect, useState } from "react";
import { Sparkles, Loader2, Check, ArrowRight, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { EmailPreferenceDialog } from "./email-preference-dialog";
import { HistoryAndEmail } from "./email-summary";
import useLocalStorage, { User } from "@/hooks/use-localstorage";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { serverGenerateEmail, serverLinkedInScrapper } from "@/server/actions";
import { GeneratedEmailProps, StepConfig, ProfileData, Post } from "./types";
import ShimmerButton from "@/components/ui/shimmer-button";

// Define RawPost type inline since it's not imported
interface RawPost {
  content: string;
  postedAt: string;
}

const transformPosts = (data: RawPost[]): Post[] => {
  return data.map((post) => ({
    content: post.content,
    postedAt: post.postedAt,
  }));
};

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

function TopBar() {
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
  const [showEmailPref, setShowEmailPref] = useState(false);
  const [user, setUser] = useLocalStorage<User>("user", {
    name: "Guest",
    try: 0,
  });
  const router = useRouter();
  const searchParams = useSearchParams();

  const hasEmailPref = !!user?.emailPreference;

  const checkQuota = () => {
    if (user.try >= 3) {
      toast.warning("you reached free 3 quota...");
      router.push("/contact?from=quota-exceeded");
      return false;
    }
    return true;
  };

  async function handleUrlSubmit(submitUrl?: string) {
    const urlToUse = submitUrl ?? url;
    if (!urlToUse) return;
    if (!checkQuota()) return;

    setIsLoading(true);
    setCurrentStep(1);
    const res = await serverLinkedInScrapper(urlToUse);
    console.log(res);
    if (!res.success) {
      toast.error(res.data);
      setIsLoading(false);
      return;
    }
    const data = res.data[0];
    // Assume res.data is { name: string, title: string, posts: RawPost[] }
    const posts = transformPosts(data.posts ?? []);
    setProfileData({
      name: data?.name ?? "",
      linkedinUrl: urlToUse,
      title: data?.title ?? "",
      posts,
    });
    setUser((usr) => {
      if (!usr) return { name: "Guest", try: 0 };
      return { ...usr, try: usr.try + 1 };
    });
    setIsLoading(false);
    setCurrentStep(2);
  }

  useEffect(() => {
    const urlParam = searchParams.get("linkedinUrl");
    if (urlParam?.includes("linkedin")) {
      setUrl(urlParam);
      setTimeout(() => handleUrlSubmit(urlParam), 200);

      // Clear URL search parameters
      const url = new URL(window.location.href);
      url.searchParams.delete("linkedinUrl");
      window.history.replaceState({}, "", url.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGenerateEmail = async () => {
    setIsLoading(true);
    setCurrentStep(3);

    const data = {
      ...user.emailPreference,
      linkedin: url,
      linkedin_content: profileData,
    };

    const response = await serverGenerateEmail(data);
    console.log(response);

    if (!response.success) {
      toast.error(response.data);
      setIsLoading(false);
      return;
    }

    setGeneratedEmail(response.data);
    setIsLoading(false);
    setCurrentStep(4);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setProfileData(null);
    setGeneratedEmail(null);
  };

  const handleEmailPrefSave = () => {
    setShowEmailPref(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-primary/5 via-background to-secondary/10 flex flex-col font-sans">
      <TopBar />
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
                      disabled={!url || isLoading || currentStep > 0}
                      className={`w-full sm:w-auto `}
                    >
                      {isLoading && currentStep === 0 ? (
                        <Loader2 size={18} className="animate-spin mr-2" />
                      ) : null}
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
                    {hasEmailPref ? (
                      <Button
                        onClick={() => setShowEmailPref(true)}
                        variant="default"
                        className={`mb-2 w-full sm:w-auto font-semibold flex items-center gap-2 shadow rounded-lg px-4 py-2 text-base`}
                      >
                        <Pencil size={18} className="mr-1" />
                        Edit Product Details
                      </Button>
                    ) : (
                      <ShimmerButton
                        onClick={() => setShowEmailPref(true)}
                        text="Enter Your Product Details"
                        className="mb-2 w-full sm:w-auto font-semibold flex items-center gap-2 shadow rounded-lg px-4 py-2 text-base"
                      />
                    )}
                    {currentStep === 2 &&
                      (hasEmailPref ? (
                        <ShimmerButton
                          onClick={handleGenerateEmail}
                          text="Create Personalized Email"
                          icon={<ArrowRight size={18} />}
                          className="flex items-center gap-2 w-full sm:w-auto font-bold"
                        />
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
            {/* Mobile-only: Results below timeline */}
            <div className="block lg:hidden">
              <HistoryAndEmail
                profileData={profileData}
                generatedEmail={generatedEmail}
              />
            </div>
          </div>
        </div>

        {/* Right Side - Results */}
        <div className="hidden lg:flex lg:w-2/5 border-l border-border/30 bg-background/80 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-8">
            <HistoryAndEmail
              profileData={profileData}
              generatedEmail={generatedEmail}
            />
          </div>
        </div>

        <EmailPreferenceDialog
          open={showEmailPref}
          onClose={() => setShowEmailPref(false)}
          onSaved={handleEmailPrefSave}
          user={user}
          setUser={setUser}
        />
      </main>
    </div>
  );
}
