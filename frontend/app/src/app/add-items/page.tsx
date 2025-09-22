export default function AddItems() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome to Your App
        </h1>
        <p className="text-foreground/70">
          This is your main content area. Users will see this content.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-background border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Feature 1
          </h3>
          <p className="text-foreground/70">
            Description of your first feature.
          </p>
        </div>

        <div className="bg-background border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Feature 2
          </h3>
          <p className="text-foreground/70">
            Description of your second feature.
          </p>
        </div>

        <div className="bg-background border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Feature 3
          </h3>
          <p className="text-foreground/70">
            Description of your third feature.
          </p>
        </div>
      </div>
    </div>
  );
}
