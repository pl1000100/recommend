'use client';

import { useState } from 'react';
import { useItemCreation } from '../hooks/useItemCreation';

interface CreateItemFormData {
  name: string;
  description: string;
  category: string;
}

export default function AddItems() {
  const [formData, setFormData] = useState<CreateItemFormData>({
    name: '',
    description: '',
    category: ''
  });
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const { isCreating, error, createItem, clearError, resetState } = useItemCreation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear any existing error when user starts typing
    if (error) {
      clearError();
    }
    if (submitMessage) {
      setSubmitMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitMessage(null);
    clearError();

    const result = await createItem({
      name: formData.name,
      description: formData.description,
      category: formData.category
    });

    if (result) {
      setSubmitMessage({
        type: 'success',
        text: `Item "${result.name}" has been created successfully with ID: ${result.id}!`
      });

      // Reset form
      setFormData({
        name: '',
        description: '',
        category: ''
      });

      // Reset the creation state to ensure button is clickable again
      resetState();
    } else {
      setSubmitMessage({
        type: 'error',
        text: error || 'Failed to create item. Please try again.'
      });
    }
  };

  const categories = [
    'Electronics',
    'Clothing',
    'Books',
    'Home & Garden',
    'Sports & Outdoors',
    'Beauty & Health',
    'Toys & Games',
    'Automotive',
    'Other'
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Add New Item
        </h1>
        <p className="text-foreground/70">
          Create a new item to add to your collection.
        </p>
      </div>

      <div className="bg-background border border-border rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Item Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
              Item Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-background text-foreground"
              placeholder="Enter item name"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-background text-foreground resize-vertical"
              placeholder="Enter item description"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-background text-foreground"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isCreating || !formData.name.trim() || !formData.category}
              className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isCreating ? 'Creating...' : 'Create Item'}
            </button>
          </div>
        </form>

        {/* Error Message from Hook */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
            {error}
          </div>
        )}

        {/* Success/Error Message */}
        {submitMessage && (
          <div className={`mt-4 p-4 rounded-md ${
            submitMessage.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-700' 
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {submitMessage.text}
          </div>
        )}
      </div>
    </div>
  );
}
