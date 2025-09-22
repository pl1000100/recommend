"use client";

import { useState } from "react";

export default function AISidebar() {
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAIAction = async () => {
    setIsLoading(true);
    // Simulate AI response
    setTimeout(() => {
      setAiResponse("AI response generated!");
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="bg-ai-sidebar-bg border-l border-border p-4 w-80 flex-shrink-0">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          AI Assistant
        </h2>
        
        {/* AI Configuration */}
        <div className="space-y-3">
          <h3 className="font-medium text-foreground">Configuration</h3>
          <div className="space-y-2">
            <label className="block text-sm text-foreground">
              Model
            </label>
            <select className="w-full p-2 border border-border rounded bg-background text-foreground">
              <option>GPT-4</option>
              <option>GPT-3.5</option>
              <option>Claude</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm text-foreground">
              Temperature
            </label>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1" 
              className="w-full"
            />
          </div>
        </div>

        {/* AI Actions */}
        <div className="space-y-3">
          <h3 className="font-medium text-foreground">Actions</h3>
          <button
            onClick={handleAIAction}
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? "Processing..." : "Generate Response"}
          </button>
        </div>

        {/* AI Response */}
        {aiResponse && (
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Response</h3>
            <div className="p-3 bg-background border border-border rounded text-sm text-foreground">
              {aiResponse}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}