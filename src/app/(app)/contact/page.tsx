"use client";
import { useState, useEffect } from "react";
import { Sparkles, Mail, Linkedin, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PopupButton } from "react-calendly";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useSearchParams } from "next/navigation";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [calendlyRoot, setCalendlyRoot] = useState<HTMLElement | null>(null);
  const searchParams = useSearchParams();
  const urlParam = searchParams.get("from");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCalendlyRoot(document.getElementById("__next") || document.body);
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 flex flex-col items-center justify-center font-sans px-2 sm:px-4 py-10">
      <div className="w-full max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
        {/* Conditional quota-exceeded message */}
        {urlParam === "quota-exceeded" && (
          <div className="col-span-2 mb-4 p-4 rounded-lg bg-yellow-100 border border-yellow-300 text-yellow-900 text-center font-semibold text-base">
            Your free quota is exceeded. Book a 30min consultation or contact us
            to try more.
          </div>
        )}
        {/* Calendly CTA Card - shadcn/ui */}
        <Card className="flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full -ml-12 -mb-12"></div>

          <CardHeader className="flex flex-row items-center gap-3 pb-4 relative z-10">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shadow-lg">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
              Book a Call in Calendly
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-6 relative z-10 flex-grow justify-center items-center text-center py-8">
            {/* Big "Let's Talk" headline */}
            <div className="space-y-2">
              <h2 className="text-5xl md:text-6xl font-extrabold text-primary leading-tight tracking-tight">
                Let&apos;s Talk!
              </h2>
              <div className="w-24 h-1 bg-primary/30 mx-auto rounded-full"></div>
            </div>

            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              Book a free 30-minute consultation call. Pick a time that works
              for you and let&apos;s discuss how we can help.
            </p>

            <div className="w-full max-w-sm space-y-4">
              <Button size="lg" className="w-full text-lg font-bold shadow-lg ">
                {calendlyRoot && (
                  <PopupButton
                    url="https://calendly.com/himal9626"
                    rootElement={calendlyRoot}
                    text="Schedule Your Meeting"
                    className="w-full"
                  />
                )}
              </Button>

              <p className="text-xs text-muted-foreground">
                📅 Quick & Easy • No Credit Card Required
              </p>
            </div>
          </CardContent>
        </Card>
        {/* Contact Form Card - shadcn/ui */}
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shadow">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
              Or Send a Message
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col flex-1">
            <CardDescription className="text-muted-foreground mb-6 text-sm">
              Prefer email? Fill out the form and we&apos;ll respond within 24
              hours.
            </CardDescription>
            {submitted ? (
              <div className="text-center text-green-600 font-semibold py-8 flex-1 flex items-center justify-center">
                <div>
                  <div className="text-5xl mb-4">✓</div>
                  <div>
                    Thank you for reaching out! We&apos;ll be in touch soon.
                  </div>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 flex-1"
              >
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="text-base"
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="text-base"
                />
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="text-base resize-none flex-1"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  variant="outline"
                  className="mt-2 font-bold text-base"
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
            <div className="border-t border-border/30 pt-6 mt-6 flex flex-col gap-3">
              <p className="text-xs text-muted-foreground mb-2">
                Other ways to connect:
              </p>
              <Link
                href="https://www.linkedin.com/in/himal-b-180b701a5/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:underline text-sm"
              >
                <Linkedin className="w-4 h-4" />
                Connect on LinkedIn
              </Link>
              <Link
                href="mailto:himal@watchwithme.in"
                className="flex items-center gap-2 text-primary hover:underline text-sm"
              >
                <Mail className="w-4 h-4" />
                himal@watchwithme.in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
