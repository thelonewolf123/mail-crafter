"use client";
import { useState } from "react";
import { Sparkles, Mail, Linkedin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
      <div className="w-full max-w-lg mx-auto bg-white/80 dark:bg-card/90 rounded-2xl shadow-2xl border border-border/30 p-8 sm:p-10 backdrop-blur-xl flex flex-col gap-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shadow">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Contact Us
          </h1>
        </div>
        <p className="text-muted-foreground mb-4 text-base sm:text-lg">
          We&apos;d love to hear from you! Fill out the form below and
          we&apos;ll get back to you soon.
        </p>
        {submitted ? (
          <div className="text-center text-green-600 font-semibold py-8">
            Thank you for reaching out! We&apos;ll be in touch soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              rows={5}
              className="text-base resize-none"
            />
            <Button
              type="submit"
              disabled={loading}
              className="mt-2 font-bold text-base"
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        )}
        <div className="border-t border-border/30 pt-6 mt-2 flex flex-col gap-3 items-center">
          <Link
            href="https://www.linkedin.com/in/himal-b-180b701a5/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary hover:underline text-base"
          >
            <Linkedin className="w-5 h-5" />
            LinkedIn
          </Link>
          <Link
            href="mailto:your@email.com"
            className="flex items-center gap-2 text-primary hover:underline text-base"
          >
            <Mail className="w-5 h-5" />
            himal@watchwithme.in
          </Link>
        </div>
      </div>
    </div>
  );
}
