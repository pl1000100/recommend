import { useState, useEffect } from 'react';
import { ItemService } from '../services/itemService';
import { Item } from '../services/types';

export const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch items from backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const items = await ItemService.getItems();
        setItems(items);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        // Fallback data for development
        setItems([
          { id: '1', name: 'White T-Shirt', description: 'This is a sample item', category: 'Electronics' },
          { id: '2', name: 'Black T-Shirt', description: 'Another sample item', category: 'Books' },
          { id: '3', name: 'Jeans', description: 'Yet another sample item', category: 'Clothing' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleItemToggle = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map(item => item.id));
    }
  };

  return {
    items,
    selectedItems,
    loading,
    error,
    handleItemToggle,
    handleSelectAll,
  };
};