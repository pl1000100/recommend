"use client";

import { useState } from "react";
import { useAI } from "../hooks/useAI";
import { AIOutfitRequest } from "../services/types";

interface AISidebarProps {
  selectedItems: string[];
  items: Array<{ id: string; name: string; description?: string; category?: string }>;
}

export default function AISidebar({ selectedItems, items }: AISidebarProps) {
  const [model, setModel] = useState("gemini");
  const [userPrompt, setUserPrompt] = useState("");
  
  const { response, isLoading, error, generateOutfit, clearResponse } = useAI();

  const handleGenerate = async () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one item");
      return;
    }

    const request: AIOutfitRequest = {
      aiprovider: model,
      selectedItems: selectedItemsData.map(item => item.name),
      additionalInstructions: userPrompt,
    };

    await generateOutfit(request);
  };

  const selectedItemsData = items.filter(item => selectedItems.includes(item.id));

  return (
    <div className="bg-ai-sidebar-bg border-l border-border p-4 w-80 flex-shrink-0">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          AI Assistant
        </h2>
        
        {/* Selected Items Summary */}
        <div className="space-y-2">
          <h3 className="font-medium text-foreground">Selected Items ({selectedItems.length})</h3>
          <div className="text-sm text-foreground/70 max-h-32 overflow-y-auto">
            {selectedItemsData.length > 0 ? (
              selectedItemsData.map(item => (
                <div key={item.id} className="truncate">• {item.name}</div>
              ))
            ) : (
              <div className="text-foreground/50 italic">No items selected</div>
            )}
          </div>
        </div>
        
        {/* AI Configuration */}
        <div className="space-y-3">
          <h3 className="font-medium text-foreground">Configuration</h3>
          <div className="space-y-2">
            <label className="block text-sm text-foreground">Model</label>
            <select 
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full p-2 border border-border rounded bg-background text-foreground"
            >
              <option value="gemini">Gemini</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm text-foreground">
              Additional Instructions (Optional)
            </label>
            <textarea
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              placeholder="Add any specific instructions..."
              className="w-full p-2 border border-border rounded bg-background text-foreground text-sm"
              rows={3}
            />
          </div>
        </div>

        {/* AI Actions */}
        <div className="space-y-3">
          <h3 className="font-medium text-foreground">Actions</h3>
          <button
            onClick={handleGenerate}
            disabled={isLoading || selectedItems.length === 0}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? "Generating..." : "Generate AI Response"}
          </button>
          
          {response && (
            <button
              onClick={clearResponse}
              className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Clear Response
            </button>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-600">
            Error: {error}
          </div>
        )}

        {/* AI Response */}
        {response && (
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">AI Response</h3>
            <div className="p-3 bg-background border border-border rounded text-sm text-foreground whitespace-pre-wrap max-h-64 overflow-y-auto">
              {response.response}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}