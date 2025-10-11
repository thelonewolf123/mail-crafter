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
