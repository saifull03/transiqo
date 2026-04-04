"use client";

import {
  LayoutDashboard,
  Navigation2,
  TrendingUp,
  Settings,
  BarChart3,
  MapPin,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  selectedNav: string;
  setSelectedNav: (nav: string) => void;
}

export default function Sidebar({
  isOpen,
  selectedNav,
  setSelectedNav,
}: SidebarProps) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "rides", label: "Active Rides", icon: Navigation2 },
    { id: "earnings", label: "Earnings", icon: TrendingUp },
    { id: "stats", label: "Statistics", icon: BarChart3 },
    { id: "map", label: "Maps", icon: MapPin },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside
      className={`w-64 bg-gray-900 text-white transition-all duration-300 ${
        isOpen ? "block" : "hidden"
      } fixed lg:relative left-0 top-16 md:top-14 h-[calc(100vh-64px)] md:h-[calc(100vh-56px)] lg:top-0 lg:h-screen lg:block z-40`}
    >
      <nav className="p-4 md:p-6 space-y-2 h-full flex flex-col">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = selectedNav === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedNav(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition font-medium ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto p-4 md:p-6 border-t border-gray-700">
        <div className="bg-gray-800 rounded-lg p-3 md:p-4">
          <p className="text-xs md:text-sm font-medium text-gray-200 mb-2">
            Trip Balance
          </p>
          <p className="text-xl md:text-2xl font-bold text-green-400">
            $1,245.50
          </p>
          <button className="mt-2 md:mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-xs md:text-sm font-medium transition">
            Withdraw
          </button>
        </div>
      </div>
    </aside>
  );
}
