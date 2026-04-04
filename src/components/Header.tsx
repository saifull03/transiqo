"use client";

import { useState } from "react";
import { Menu, X, Bell, User, LogOut } from "lucide-react";

interface HeaderProps {
  setSidebarOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
}

export default function Header({ setSidebarOpen }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-30">
      <div className="px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition mr-2"
          >
            <Menu size={20} className="text-gray-700 dark:text-gray-300" />
          </button>
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm md:text-lg">T</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                Transiqo
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Driver Dashboard
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
            <Bell size={18} className="text-gray-700 dark:text-gray-300" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 md:gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 md:px-3 py-2 rounded-lg transition"
            >
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=driver1"
                alt="Driver Avatar"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full"
              />
              <div className="text-left hidden md:block">
                <p className="text-xs md:text-sm font-medium text-gray-900 dark:text-white">
                  Sam Wilson
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Driver
                </p>
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-40 md:w-48 bg-white dark:bg-gray-700 rounded-lg shadow-xl py-2 z-50">
                <button className="flex items-center gap-3 w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">
                  <User size={16} />
                  <span className="text-sm">Profile</span>
                </button>
                <button className="flex items-center gap-3 w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">
                  <LogOut size={16} />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
