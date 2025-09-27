import { AIRequest, AIResponse, AIOutfitRequest, AIOutfitResponse } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export class AIService {
  static async generateContent(request: AIRequest): Promise<AIResponse> {
    const response = await fetch(`${API_BASE_URL}/api/v1/ai`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    console.log(request)

    if (!response.ok) {
      throw new Error(`AI service error: ${response.statusText}`);
    }

    return response.json();
  }

  static async generateOutfit(request: AIOutfitRequest): Promise<AIOutfitResponse> {
    const response = await fetch(`${API_BASE_URL}/api/v1/ai/outfit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    console.log(request)

    if (!response.ok) {
      throw new Error(`AI service error: ${response.statusText}`);
    }

    return response.json();
  }

  static async getAvailableModels(): Promise<string[]> {
    const response = await fetch(`${API_BASE_URL}/api/v1/ai/providers`);
    if (!response.ok) {
      throw new Error('Failed to fetch models');
    }
    return response.json();
  }
}