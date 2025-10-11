import { CreateItemRequest, CreateItemResponse, Item } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export class ItemService {
  static async createItem(request: CreateItemRequest): Promise<CreateItemResponse> {
    const response = await fetch(`${API_BASE_URL}/api/v1/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create item: ${response.statusText} - ${errorText}`);
    }

    return response.json();
  }

  static async getItems(): Promise<Item[]> {
    const response = await fetch(`${API_BASE_URL}/api/v1/items`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch items: ${response.statusText}`);
    }

    return response.json();
  }
}
