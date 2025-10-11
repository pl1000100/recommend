export interface AIRequest {
  prompt: string;
  aiprovider: string;
  history?: Array<{ role: string; parts: string[] }>;
}

export interface AIOutfitRequest {
  aiprovider: string;
  selectedItems: string[];
  additionalInstructions: string;
}

export interface AIResponse {
  response: string;
  history: Array<{ role: string; parts: string[] }>;
}

export interface AIOutfitResponse {
  response: string;
  history: Array<{ role: string; parts: string[] }>;
}

export interface Item {
  id: string;
  name: string;
  description?: string;
  category?: string;
}

export interface CreateItemRequest {
  name: string;
  description: string;
  category: string;
}

export interface CreateItemResponse {
  id: number;
  name: string;
  description: string;
  category: string;
}


  