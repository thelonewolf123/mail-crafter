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
  profileData: ProfileData | null;
  generatedEmail: GeneratedEmailProps | null;
  history: HistoryItem[];
  onSelectHistory: (item: HistoryItem) => void;
}

export interface GeneratedEmailProps {
  subject: string;
  content: string;
}
