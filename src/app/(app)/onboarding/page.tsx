"use client";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ServerOnboardingData } from "@/server/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useLocalStorage, { User } from "@/hooks/use-localstorage";

export type OnboardingTypes = {
  name: string;
  email: string;
  role: string;
  goal: string;
  emailsPerWeek: string;
  completed?: boolean;
};
function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const router = useRouter();
  const [user, setUser] = useLocalStorage<User>("user", {
    name: "Guest",
    try: 1,
  });

  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      role: "",
      goal: "",
      emailsPerWeek: "",
    },
    mode: "onChange",
  });

  const handleSubmit = async () => {
    const res = await ServerOnboardingData(form);
    if (!res.success) {
      toast.error(res.data);
      return;
    } else {
      setUser({
        ...user,
        onboarding: {
          name: form.name,
          email: form.email,
          role: form.role,
          goal: form.goal,
          emailsPerWeek: form.emailsPerWeek,
          completed: true,
        },
      });
      console.log(res);
      router.push("/demo");
    }
  };

  const form = watch();

  const steps = [
    {
      label: "Tell us about yourself",
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-left">
              Your Name
            </label>
            <Input
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: true })}
              value={form.name}
              onChange={(e) =>
                setValue("name", e.target.value, { shouldValidate: true })
              }
              className="text-base"
            />
            {errors.name && (
              <span className="text-xs text-red-500">Name is required</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-left">
              Email
            </label>
            <Input
              type="email"
              placeholder="himal@watchwithme.in"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              value={form.email}
              onChange={(e) =>
                setValue("email", e.target.value, { shouldValidate: true })
              }
              className="text-base"
            />
            {errors.email && (
              <span className="text-xs text-red-500">
                {errors.email.message || "Email is required"}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-3 text-left">
              Your Role
            </label>
            <div className="flex flex-wrap gap-2">
              {["Sales", "Marketing", "Founder", "Other"].map((role) => (
                <Button
                  key={role}
                  type="button"
                  variant={form.role === role ? "default" : "outline"}
                  className={`px-4 py-2 rounded-full font-semibold transition-colors text-base ${
                    form.role === role
                      ? "bg-primary text-black"
                      : "bg-background hover:bg-primary/10 text-foreground"
                  }`}
                  onClick={() =>
                    setValue("role", role, { shouldValidate: true })
                  }
                >
                  {role}
                </Button>
              ))}
            </div>
            {errors.role && (
              <span className="text-xs text-red-500">Role is required</span>
            )}
          </div>
        </div>
      ),
      isValid:
        !!form.name.trim() && !!form.email && !errors.email && !!form.role,
    },
    {
      label: "What brings you to MailCrafter?",
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-3 text-left">
              Primary Goal
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                "Book more meetings",
                "Nurture leads",
                "Brand awareness",
                "Other",
              ].map((goal) => (
                <Button
                  key={goal}
                  type="button"
                  variant={form.goal === goal ? "default" : "outline"}
                  className={`px-4 py-2 rounded-full font-semibold transition-colors text-base ${
                    form.goal === goal
                      ? "bg-primary text-black"
                      : "bg-background hover:bg-primary/10 text-foreground"
                  }`}
                  onClick={() =>
                    setValue("goal", goal, { shouldValidate: true })
                  }
                >
                  {goal}
                </Button>
              ))}
            </div>
            {errors.goal && (
              <span className="text-xs text-red-500">Goal is required</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-3 text-left">
              Emails Per Week
            </label>
            <div className="flex flex-wrap gap-2">
              {["0-50", "51-200", "201-500", "500+"].map((emails) => (
                <Button
                  key={emails}
                  type="button"
                  variant={
                    form.emailsPerWeek === emails ? "default" : "outline"
                  }
                  className={`px-4 py-2 rounded-full font-semibold transition-colors text-base ${
                    form.emailsPerWeek === emails
                      ? "bg-primary text-black"
                      : "bg-background hover:bg-primary/10 text-foreground"
                  }`}
                  onClick={() =>
                    setValue("emailsPerWeek", emails, { shouldValidate: true })
                  }
                >
                  {emails}
                </Button>
              ))}
            </div>
            {errors.emailsPerWeek && (
              <span className="text-xs text-red-500">
                This field is required
              </span>
            )}
          </div>
        </div>
      ),
      isValid: !!form.goal && !!form.emailsPerWeek,
    },
  ];

  const stepIcons = [
    <Sparkles
      key="sparkles"
      className="mx-auto mb-4 text-primary animate-float"
      size={48}
    />,
    <Sparkles
      key="goal"
      className="mx-auto mb-4 text-secondary animate-float delay-500"
      size={48}
    />,
  ];

  const stepTitles = ["About You", "Your Goals"];

  const isLastStep = step === steps.length - 1;
  const handleNext = () => {
    if (!steps[step].isValid) return;
    if (!isLastStep) {
      setTransitioning(true);
      setTimeout(() => {
        setStep(step + 1);
        setTransitioning(false);
      }, 250);
    }
  };
  const handleBack = () => {
    if (step === 0) return;
    setTransitioning(true);
    setTimeout(() => {
      setStep(step - 1);
      setTransitioning(false);
    }, 250);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-primary/5 via-background to-secondary/10 flex items-center justify-center font-sans p-2 sm:p-4">
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row shadow-2xl rounded-3xl overflow-hidden border border-border/40 bg-card/80 backdrop-blur-xl min-h-[60vh] min-w-0">
        {/* Stepper */}
        <aside className="hidden md:flex flex-col justify-center bg-background/80 px-4 lg:px-8 py-8 lg:py-14 w-full max-w-xs border-r border-border/30 min-w-0">
          <h2 className="text-xl lg:text-2xl font-bold mb-6 lg:mb-10 text-primary">
            Getting Started
          </h2>
          <ol className="space-y-4 lg:space-y-6">
            {stepTitles.map((title, i) => (
              <li key={i} className="flex items-center gap-2 lg:gap-3 min-w-0">
                <span
                  className={`w-7 h-7 flex items-center justify-center rounded-full border-2 text-base lg:text-lg font-bold transition-all duration-300 flex-shrink-0
                    ${
                      i < step
                        ? "text-white border-primary shadow-lg"
                        : i === step
                        ? "text-white border-primary shadow-lg"
                        : "bg-muted text-muted-foreground border-border"
                    }
                  `}
                >
                  {i < step ? <Check size={18} /> : i + 1}
                </span>
                <span
                  className={`truncate text-sm lg:text-base font-medium transition-colors duration-300 ${
                    i === step
                      ? "text-primary"
                      : i < step
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {title}
                </span>
              </li>
            ))}
          </ol>
        </aside>
        {/* Question Card */}
        <main className="flex-1 flex flex-col justify-center items-center px-2 sm:px-4 py-6 md:py-10 min-w-0">
          <Card className="w-full max-w-md mx-auto rounded-2xl shadow-xl border border-border/30 text-center transition-all duration-300 flex flex-col min-h-[32rem] min-w-0 bg-white/90 dark:bg-card/90">
            <CardHeader>
              {stepIcons[step]}
              <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 leading-tight">
                {steps[step].label}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center">
              <div className="mb-8 flex-1 flex items-center justify-center min-w-0">
                <div className="w-full min-w-0">{steps[step].content}</div>
              </div>
              <div className="mt-auto pt-4">
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={step === 0 || transitioning}
                    className="px-6 min-w-[100px]"
                  >
                    Back
                  </Button>
                  {isLastStep ? (
                    <Button
                      onClick={handleSubmit}
                      size="lg"
                      className="px-8 font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all min-w-[120px]"
                      disabled={!steps[step].isValid || transitioning}
                    >
                      Get Started <ArrowRight className="ml-2" size={20} />
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      className="px-8 font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all min-w-[120px]"
                      disabled={!steps[step].isValid || transitioning}
                      onClick={handleNext}
                    >
                      Continue <ArrowRight className="ml-2" size={20} />
                    </Button>
                  )}
                </div>
                <div className="mt-6 flex justify-center gap-2">
                  {steps.map((_, i) => (
                    <span
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        i === step ? "bg-primary" : "bg-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

export default OnboardingPage;
