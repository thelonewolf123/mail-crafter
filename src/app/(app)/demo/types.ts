import { z } from "zod";

export interface Post {
  content: string;
  postedAt: string;
}

export interface ProfileData {
  name: string;
  linkedinUrl: string;
  title: string;
  posts: Post[];
}

export interface HistoryItem {
  url: string;
  email: string;
  posts: Post[];
  timestamp: string;
  name?: string;
  title?: string;
}

export interface StepConfig {
  number: number;
  title: string;
  showConnector: boolean;
}

// Zod schema for key feature
export const keyFeatureSchema = z.object({
  feature_name: z.string().min(1, "Feature name is required"),
  benefit: z.string().min(1, "Benefit is required")
});

// Zod schema for email preferences
export const emailPreferenceSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  product_name: z.string().min(1, "Product name is required"),
  product_description: z.string().min(1, "Product description is required"),
  key_features: z
    .array(keyFeatureSchema)
    .min(1, "At least one key feature is required")
    .refine(
      (features) =>
        features.every((f) => f.feature_name.trim() && f.benefit.trim()),
      "All features must have both name and benefit filled"
    ),
  usp: z.string().min(1, "Unique selling proposition is required"),
  cta: z.string().min(1, "Call to action is required"),
  sellerName: z.string().min(1, "Your name is required"),
  sellerTitle: z.string().min(1, "Your title is required")
});

// TypeScript types inferred from Zod schemas
export type KeyFeature = z.infer<typeof keyFeatureSchema>;
export type EmailPreferenceData = z.infer<typeof emailPreferenceSchema>;

export interface HistoryAndEmailProps {
  profileData: ProfileData | null;
  generatedEmail: GeneratedEmailProps | null;
  history: HistoryItem[];
  onSelectHistory: (item: HistoryItem) => void;
}

export interface GeneratedEmailProps {
  subject: string;
  content: string;
}
