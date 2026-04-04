"use client";

import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import StatsCards from "./StatsCards";
import ActiveRides from "./ActiveRides";
import RecentTrips from "./RecentTrips";
import DriverProfile from "./DriverProfile";

export default function Dashboard() {
  const [selectedNav, setSelectedNav] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header setSidebarOpen={setIsSidebarOpen} />
      <div className="flex">
        <Sidebar
          isOpen={isSidebarOpen}
          selectedNav={selectedNav}
          setSelectedNav={setSelectedNav}
        />
        <main
          className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-0" : "ml-0"}`}
        >
          <div className="p-4 md:p-6 space-y-4 md:space-y-6">
            {selectedNav === "dashboard" && (
              <>
                <StatsCards />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                  <div className="lg:col-span-2">
                    <ActiveRides />
                  </div>
                  <div>
                    <DriverProfile />
                  </div>
                </div>
                <RecentTrips />
              </>
            )}
            {selectedNav === "rides" && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6">
                <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">
                  Active Rides
                </h2>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-2">
                  Manage all your active rides here
                </p>
              </div>
            )}
            {selectedNav === "earnings" && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6">
                <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">
                  Earnings
                </h2>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-2">
                  View your earnings and payouts
                </p>
              </div>
            )}
            {selectedNav === "settings" && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6">
                <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">
                  Settings
                </h2>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-2">
                  Manage your preferences
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
