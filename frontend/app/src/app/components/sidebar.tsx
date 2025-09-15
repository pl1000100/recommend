"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/", icon: "🏠" },
//   { name: "Recommendations", href: "/recommendations", icon: "��" },
//   { name: "Settings", href: "/settings", icon: "⚙️" },
//   { name: "Profile", href: "/profile", icon: "👤" },
//   { name: "Analytics", href: "/analytics", icon: "��" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="bg-sidebar-bg border-r border-border p-4">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold mb-4 text-foreground">
          Navigation
        </h2>
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-foreground hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}