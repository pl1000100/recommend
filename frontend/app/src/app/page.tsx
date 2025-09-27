'use client';

import AISidebar from './components/aisidebar';
import { useItems } from './hooks/useItems';

export default function Home() {
  const { items, selectedItems, loading, error, handleItemToggle, handleSelectAll } = useItems();

  if (loading) {
    return (
      <div className="flex h-full">
        {/* Main Content */}
        <div className="flex-1 space-y-6 pr-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Add Items
            </h1>
            <p className="text-foreground/70">
              Select items to add to your collection.
            </p>
          </div>
          <div className="flex items-center justify-center py-8">
            <div className="text-foreground/70">Loading items...</div>
          </div>
        </div>

        {/* AI Sidebar - Only on home page */}
        <AISidebar selectedItems={selectedItems} items={items} />
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {/* Main Content */}
      <div className="flex-1 space-y-6 pr-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Add Items
          </h1>
          <p className="text-foreground/70">
            Select items to add to your collection.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">Error: {error}</p>
          </div>
        )}

        <div className="bg-background border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Available Items ({items.length})
            </h2>
            <button
              onClick={handleSelectAll}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              {selectedItems.length === items.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>

          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <input
                  type="checkbox"
                  id={`item-${item.id}`}
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleItemToggle(item.id)}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <div className="flex-1 min-w-0">
                  <label
                    htmlFor={`item-${item.id}`}
                    className="block text-sm font-medium text-foreground cursor-pointer"
                  >
                    {item.name}
                  </label>
                  {item.description && (
                    <p className="text-sm text-foreground/70 mt-1">
                      {item.description}
                    </p>
                  )}
                  {item.category && (
                    <span className="inline-block mt-1 px-2 py-1 text-xs bg-muted text-muted-foreground rounded">
                      {item.category}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Sidebar - Only on home page */}
      <AISidebar selectedItems={selectedItems} items={items} />
    </div>
  );
}
