"use client";

import { Star, Check, AlertCircle } from "lucide-react";

export default function DriverProfile() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6">
      <h2 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-4">
        Your Profile
      </h2>

      <div className="text-center mb-4 md:mb-6">
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=driver1"
          alt="Driver"
          className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto mb-3 md:mb-4"
        />
        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
          Sam Wilson
        </h3>
        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
          Driver ID: DRV-2024-001
        </p>
      </div>

      <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star
              size={14}
              className="text-yellow-400 fill-yellow-400 flex-shrink-0"
            />
            <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
              Rating
            </span>
          </div>
          <span className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white">
            4.8 / 5.0
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Check size={14} className="text-green-500 flex-shrink-0" />
            <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
              Acceptance
            </span>
          </div>
          <span className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white">
            98%
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle size={14} className="text-blue-500 flex-shrink-0" />
            <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
              Cancellations
            </span>
          </div>
          <span className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white">
            2%
          </span>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 md:p-4 mb-3 md:mb-4">
        <p className="text-xs md:text-sm text-blue-800 dark:text-blue-400">
          ✓ Document verification complete
        </p>
      </div>

      <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 rounded-lg font-medium text-sm md:text-base transition">
        View Complete Profile
      </button>
    </div>
  );
}
