"use client";
import {
  ArrowRight,
  Mail,
  Megaphone,
  Sparkles,
  UserCheck,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function LandingPage() {
  return (
    <div className="bg-background text-foreground font-sans min-h-screen flex flex-col p-2 sm:p-4">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-30 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center w-full px-2 sm:px-4">
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-card/60 backdrop-blur-sm rounded-full"></div>
            </div>
            <div className="flex -ml-2">
              <span className="text-left text-1xl font-bold text-foreground flex flex-col">
                Mail
                <span className="text-primary text-2xl -mt-2">Crafter</span>
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" className="font-semibold">
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
            className="absolute bottom-1/4 right-1/3 text-primary/30 animate-float delay-3000"
            size={50}
          />
          <Trophy
            className="absolute top-1/2 left-12 text-accent/20 animate-float delay-1500"
            size={40}
          />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-3xl px-2 sm:px-4 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Emails That Actually Get Replies
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Craft personalized emails that speak directly to your prospect's
            pain points, goals, and interests—turning cold leads into qualified
            meetings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              aria-label="Try Now Free"
              className="inline-flex items-center justify-center px-8 py-4 font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <Link href="/onboarding">
                Try Now Free <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              aria-label="Get in Touch"
              className="inline-flex items-center justify-center px-8 py-4 font-bold rounded-full border-2 border-primary text-primary hover:bg-primary/10 transition-all"
            >
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>

          {/* Avatar Group Section */}
          <div className="flex flex-col items-center mt-12">
            <div className="flex justify-center items-center gap-0.5">
              <div className="flex -space-x-5">
                <Avatar className="ring-2 ring-white border border-primary shadow-md hover:scale-110 transition-transform w-12 h-12">
                  <AvatarImage
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="User 1"
                  />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <Avatar className="ring-2 ring-white border border-primary shadow-md hover:scale-110 transition-transform w-12 h-12">
                  <AvatarImage
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="User 2"
                  />
                  <AvatarFallback>CD</AvatarFallback>
                </Avatar>
                <Avatar className="ring-2 ring-white border border-primary shadow-md hover:scale-110 transition-transform w-12 h-12">
                  <AvatarImage
                    src="https://randomuser.me/api/portraits/men/65.jpg"
                    alt="User 3"
                  />
                  <AvatarFallback>EF</AvatarFallback>
                </Avatar>
                <Avatar className="ring-2 ring-white border border-primary shadow-md hover:scale-110 transition-transform w-12 h-12">
                  <AvatarImage
                    src="https://randomuser.me/api/portraits/women/12.jpg"
                    alt="User 4"
                  />
                  <AvatarFallback>GH</AvatarFallback>
                </Avatar>
                <Avatar className="ring-2 ring-white border border-primary shadow-md hover:scale-110 transition-transform w-12 h-12">
                  <AvatarImage
                    src="https://randomuser.me/api/portraits/men/75.jpg"
                    alt="User 5"
                  />
                  <AvatarFallback>IJ</AvatarFallback>
                </Avatar>
                <Avatar className="ring-2 ring-white border border-primary shadow-md hover:scale-110 transition-transform w-12 h-12">
                  <AvatarImage
                    src="https://randomuser.me/api/portraits/women/23.jpg"
                    alt="User 6"
                  />
                  <AvatarFallback>KL</AvatarFallback>
                </Avatar>
                <Avatar className="ring-2 ring-white border border-primary shadow-md hover:scale-110 transition-transform w-12 h-12">
                  <AvatarImage
                    src="https://randomuser.me/api/portraits/men/41.jpg"
                    alt="User 7"
                  />
                  <AvatarFallback>MN</AvatarFallback>
                </Avatar>
                <Avatar className="ring-2 ring-white border border-primary shadow-md hover:scale-110 transition-transform w-12 h-12">
                  <AvatarImage
                    src="https://randomuser.me/api/portraits/women/36.jpg"
                    alt="User 8"
                  />
                  <AvatarFallback>OP</AvatarFallback>
                </Avatar>
                <div
                  className="flex items-center -mt-1 justify-center w-14 h-14 rounded-full bg-primary text-black font-bold text-lg border-2 border-white shadow-md z-10 hover:scale-110 transition-transform"
                  aria-hidden="true"
                >
                  +99
                </div>
              </div>
            </div>
            <span className="mt-4 text-lg font-semibold text-muted-foreground">
              Join +99 sales professionals!
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
