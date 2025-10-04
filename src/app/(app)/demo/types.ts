export interface Post {
  text: string;
  author: string;
  posted_at: string;
}

export interface RawPost {
  text: string;
  posted_at: { date: string };
  author: { first_name: string; last_name: string };
}

export interface ProfileData {
  posts: Post[];
}

export interface HistoryItem {
  url: string;
  email: string;
  posts: Post[];
  timestamp: string;
}

export interface StepConfig {
  number: number;
  title: string;
  showConnector: boolean;
}

export interface KeyFeature {
  feature_name: string;
  benefit: string;
}

export interface EmailPreferenceData {
  email: string;
  product_name: string;
  product_description: string;
  key_features: KeyFeature[];
  usp: string;
  cta: string;
  sellerName: string;
  sellerTitle: string;
}

export interface HistoryAndEmailProps {
  profileData: { posts: Post[] } | null;
  generatedEmail: GeneratedEmailProps | null;
  history: HistoryItem[];
  onSelectHistory: (item: HistoryItem) => void;
}

export interface GeneratedEmailProps {
  subject: string;
  email: string;
}
