// Certification details
export interface Certification {
  type: string;
  id: string;
  issuer: string;
}

// Product details
export interface Product {                  // Overall product structure
  id: string;
  name: string;
  category: string;
  score: number;
  status: 'published' | 'draft' | 'needs_attention'; // Current status
  lastUpdated: string;
  description?: string;
  aiAnalysis: AIResponse;            // AI analysis of the product
}

// AI analysis results
export interface AIResponse {
  productName: string;
  score: number;
  explanation: string;
  suggestions: string[];
  flags: string[];
  certifications?: Certification[];  // Optional certifications detected
}

// Form data structure for product submission
export interface FormData {                       // Overall form data  
  basicInfo?: {
    name: string;
    category: string;
    description: string;
  };
  ingredients?: {                // Ingredient details
    items: Array<{
      name: string;
      percentage: number;
      sourcing: string;
    }>;
  };
  certifications?: {                        // Certification details
    items: Array<{
      type: string;
      id: string;
      issuer: string;
    }>;
  };
}
