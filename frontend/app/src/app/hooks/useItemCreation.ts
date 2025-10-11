import { useState, useCallback } from 'react';
import { ItemService } from '../services/itemService';
import { CreateItemRequest, CreateItemResponse } from '../services/types';

export const useItemCreation = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createItem = useCallback(async (request: CreateItemRequest): Promise<CreateItemResponse | null> => {
    try {
      setIsCreating(true);
      setError(null);
      const result = await ItemService.createItem(request);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while creating the item';
      setError(errorMessage);
      return null;
    } finally {
      setIsCreating(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const resetState = useCallback(() => {
    setIsCreating(false);
    setError(null);
  }, []);

  return {
    isCreating,
    error,
    createItem,
    clearError,
    resetState,
  };
};
