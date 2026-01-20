export interface ChatRequest {
  company: string;
  companyId: string;
  message: string;

  timestamp: string;
}

export interface ChatResponse {
  reply: string;

  offers?: Offer[];

  success: boolean;

  error?: string;
}

export interface Offer {
  title: string;

  description: string;

  price?: string;

  url?: string;

  image?: string;

  category?: string;

  discount?: string;
}

export interface WidgetConfig {
  company?: string;

  companyId?: string;

  color?: string;

  apiUrl?: string;

  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";

  theme?: "light" | "dark";
}

export interface ChatMessage {
  role: "user" | "assistant";

  content: string;

  timestamp: Date;
}

export interface IAChatWidgetAPI {
  init: (config?: WidgetConfig) => void;

  destroy: () => void;
}

declare global {
  interface Window {
    IAChatWidget: IAChatWidgetAPI;
  }
}
