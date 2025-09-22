import Sidebar from "./sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout-container">
      {/* Header */}
      <header className="layout-header bg-background border-b border-border p-4">
        <h1 className="text-2xl font-bold text-foreground">
          Your App Name
        </h1>
      </header>

      {/* Left Sidebar */}
      <aside className="layout-sidebar">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="layout-main p-6 overflow-auto">
        {children}
      </main>

    </div>
  );
}