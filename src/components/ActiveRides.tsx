"use client";

import { MapPin, Phone, Star, Clock } from "lucide-react";

export default function ActiveRides() {
  const activeRides = [
    {
      id: 1,
      passenger: "Sarah Johnson",
      pickup: "123 Main St, Downtown",
      dropoff: "456 Park Ave, Midtown",
      time: "8 min away",
      rating: 4.9,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=passenger1",
    },
    {
      id: 2,
      passenger: "Mike Chen",
      pickup: "789 Oak Rd, Suburbs",
      dropoff: "321 Pine St, Downtown",
      time: "3 min away",
      rating: 4.7,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=passenger2",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
        Active Rides
      </h2>

      <div className="space-y-3 md:space-y-4">
        {activeRides.map((ride) => (
          <div
            key={ride.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 md:p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
          >
            <div className="flex items-start justify-between mb-3 md:mb-4 gap-3">
              <div className="flex items-center gap-2 md:gap-3 min-w-0">
                <img
                  src={ride.avatar}
                  alt={ride.passenger}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm md:text-base text-gray-900 dark:text-white truncate">
                    {ride.passenger}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Star
                      size={12}
                      className="text-yellow-400 fill-yellow-400 flex-shrink-0"
                    />
                    <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                      {ride.rating}
                    </span>
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition flex-shrink-0">
                <Phone size={16} className="text-blue-600 dark:text-blue-400" />
              </button>
            </div>

            <div className="space-y-2 md:space-y-3">
              <div className="flex items-start gap-2 md:gap-3">
                <MapPin
                  size={16}
                  className="text-green-500 mt-0.5 flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    Pickup
                  </p>
                  <p className="text-xs md:text-sm font-medium text-gray-900 dark:text-white truncate">
                    {ride.pickup}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 md:gap-3">
                <MapPin
                  size={16}
                  className="text-red-500 mt-0.5 flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    Dropoff
                  </p>
                  <p className="text-xs md:text-sm font-medium text-gray-900 dark:text-white truncate">
                    {ride.dropoff}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-200 dark:border-gray-700 gap-2">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 min-w-0">
                <Clock size={14} className="flex-shrink-0" />
                <span className="text-xs md:text-sm truncate">{ride.time}</span>
              </div>
              <button className="px-3 md:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm font-medium rounded-lg transition flex-shrink-0">
                Navigate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
