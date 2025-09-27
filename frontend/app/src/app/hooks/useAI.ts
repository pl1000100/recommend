import { useState, useCallback } from 'react';
import { AIService } from '../services/aiService';
import { AIRequest, AIResponse, AIOutfitRequest, AIOutfitResponse } from '../services/types';

export const useAI = () => {
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateContent = useCallback(async (request: AIRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await AIService.generateContent(request);
      setResponse(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const generateOutfit = useCallback(async (request: AIOutfitRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await AIService.generateOutfit(request);
      setResponse(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearResponse = useCallback(() => {
    setResponse(null);
    setError(null);
  }, []);

  return {
    response,
    isLoading,
    error,
    generateContent,
    generateOutfit,
    clearResponse,
  };
};