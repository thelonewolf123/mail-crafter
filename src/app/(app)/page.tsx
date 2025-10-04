"use client";
import {
  ArrowRight,
  Mail,
  Megaphone,
  Sparkles,
  UserCheck,
  Trophy,
  FastForward,
  Linkedin,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import useLocalStorage, { User } from "@/hooks/use-localstorage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PopupButton } from "react-calendly";
import { toast } from "sonner";

function LandingPage() {
  const [user, setUser] = useLocalStorage<User>("user", {
    name: "Guest",
    try: 0,
  });
  const router = useRouter();

  const [calendlyRoot, setCalendlyRoot] = useState<HTMLElement | null>(null);
  const [linkdinUrl, setLinkdinUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCalendlyRoot(document.getElementById("__next") || document.body);
    }
  }, []);
  // Modular handler for Try Now Free
  // You can't pass props directly like a component, but you can pass params via query string or state.
  const handleTryNowFree = () => {
    if (!linkdinUrl.includes("linkedin")) {
      toast.error("Please enter LinkeDin Url.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      if (!user || user.onboarding || user.try === 0) {
        setUser({ name: user?.name || "Guest", try: 0 });
        // Pass params via query string
        router.push(`/demo?linkedinUrl=${encodeURIComponent(linkdinUrl)}`);
      } else {
        toast.warning("Please complete onboarding first.");
        router.push("/onboarding");
      }
    }, 2000);
  };

  return (
    <div className="bg-background text-foreground font-sans min-h-screen flex flex-col p-2 sm:p-4">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-30 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center w-full px-2 sm:px-4">
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-card/60 backdrop-blur-sm "></div>
            </div>
            <div className="flex -ml-2">
              <span className="text-left text-1xl font-bold text-foreground flex flex-col">
                Mail
                <span className="text-primary text-2xl -mt-2">Crafter</span>
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="outline"
              className="rounded-full font-semibold"
            >
              <Link href="/login">Login / Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center overflow-hidden min-h-[70vh]">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-60 h-60 sm:w-72 sm:h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-72 h-72 sm:w-96 sm:h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-muted/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <Mail
            className="absolute top-24 left-16 text-primary/20 animate-float"
            size={60}
          />
          <Megaphone
            className="absolute top-1/3 right-20 text-secondary/20 animate-float delay-1000"
            size={80}
          />
          <Sparkles
            className="absolute bottom-40 left-32 text-muted/20 animate-float delay-2000"
            size={70}
          />
          <UserCheck
            className="absolute bottom-1/4 right-10 text-primary/30 animate-float delay-3000"
            size={50}
          />
          <Trophy
            className="absolute top-1/2 left-12 text-accent/20 animate-float delay-1500"
            size={40}
          />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-3xl px-2 sm:px-4 text-center">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Emails That Actually <br /> Get Replies
          </h1>
          <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Craft personalized emails that speak directly to your
            prospect&apos;s pain points, goals, and interests. turning cold
            leads into qualified meetings.
          </p>
          <div className="flex flex-col w-full gap-6 items-center justify-center">
            <div className="flex items-center border-[1px] w-full lg:w-3/4 p-3 text-primary border-primary rounded-full justify-between mt-4 pl-6 shadow-xl shadow-primary/30">
              <div className="flex items-center justify-center">
                <Linkedin className="w-4 h-4 lg:h-6 lg:w-6  animate-spin-slow" />
              </div>
              <input
                placeholder="https://www.linkedin.com/in/himal"
                className="bg-transparent outline-none w-full px-4"
                onChange={(e) => setLinkdinUrl(e.target.value)}
              />
              <Button
                className={`px-2 py-1 lg:py-2 lg:px-4 rounded-2xl transition-all duration-500 ${
                  loading
                    ? "opacity-0 scale-90 pointer-events-none"
                    : "opacity-100 scale-100"
                }`}
                onClick={handleTryNowFree}
                disabled={loading}
              >
                <Sparkles
                  className={`w-4 h-4 lg:h-6 lg:w-6 transition-all duration-500 ${
                    loading ? "animate-spin" : "animate-spin-slow"
                  }`}
                />
                Try Free
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CreditCard className="w-5 h-5 text-primary" />
                <span className="text-sm">No credit card required</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground/50"></div>
              <Button
                size="lg"
                variant={"outline"}
                className="rounded-full px-6"
              >
                {calendlyRoot && (
                  <PopupButton
                    url="https://calendly.com/himal9626"
                    rootElement={calendlyRoot}
                    text="Schedule Your Meeting"
                    className="w-full"
                  />
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
