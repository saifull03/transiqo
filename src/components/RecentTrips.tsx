"use client";

import { MapPin, Clock, DollarSign, Star, ChevronRight } from "lucide-react";

export default function RecentTrips() {
  const trips = [
    {
      id: 1,
      passenger: "Emily Davis",
      pickup: "123 Main St",
      dropoff: "789 Park Ave",
      time: "12:30 PM",
      distance: "4.2 km",
      fare: "$12.50",
      rating: 5,
      status: "completed",
    },
    {
      id: 2,
      passenger: "John Smith",
      pickup: "456 Oak Rd",
      dropoff: "321 Pine St",
      time: "11:15 AM",
      distance: "6.8 km",
      fare: "$18.75",
      rating: 4,
      status: "completed",
    },
    {
      id: 3,
      passenger: "Lisa Anderson",
      pickup: "789 Elm St",
      dropoff: "654 Maple Dr",
      time: "9:45 AM",
      distance: "3.1 km",
      fare: "$9.80",
      rating: 5,
      status: "completed",
    },
    {
      id: 4,
      passenger: "Robert Johnson",
      pickup: "321 Birch Lane",
      dropoff: "987 Cedar Ave",
      time: "8:20 AM",
      distance: "5.5 km",
      fare: "$15.20",
      rating: 4,
      status: "completed",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
          Recent Trips
        </h2>
        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-xs md:text-sm font-medium flex items-center gap-1">
          View All
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
          >
            <p className="font-semibold text-sm text-gray-900 dark:text-white mb-2">
              {trip.passenger}
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-gray-600 dark:text-gray-400">Route</p>
                <p className="text-gray-900 dark:text-white font-medium">
                  {trip.pickup.split(" ")[0]}... → {trip.dropoff.split(" ")[0]}
                  ...
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Distance</p>
                <p className="text-gray-900 dark:text-white font-medium">
                  {trip.distance}
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Fare</p>
                <p className="text-green-600 font-semibold">{trip.fare}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Time</p>
                <p className="text-gray-900 dark:text-white font-medium">
                  {trip.time}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <Star size={12} className="text-yellow-400 fill-yellow-400" />
              <span className="text-xs text-gray-900 dark:text-white">
                {trip.rating}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300">
                Passenger
              </th>
              <th className="text-left py-3 px-4 text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300">
                Route
              </th>
              <th className="text-left py-3 px-4 text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300">
                Distance
              </th>
              <th className="text-left py-3 px-4 text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300">
                Fare
              </th>
              <th className="text-left py-3 px-4 text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300">
                Rating
              </th>
              <th className="text-left py-3 px-4 text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300">
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip) => (
              <tr
                key={trip.id}
                className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
              >
                <td className="py-3 md:py-4 px-2 md:px-4">
                  <p className="text-xs md:text-sm font-medium text-gray-900 dark:text-white">
                    {trip.passenger}
                  </p>
                </td>
                <td className="py-3 md:py-4 px-2 md:px-4">
                  <div className="flex items-center gap-1 md:gap-2">
                    <MapPin size={12} className="text-gray-400 flex-shrink-0" />
                    <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                      {trip.pickup.split(" ")[0]}... →{" "}
                      {trip.dropoff.split(" ")[0]}...
                    </span>
                  </div>
                </td>
                <td className="py-3 md:py-4 px-2 md:px-4">
                  <span className="text-xs md:text-sm text-gray-900 dark:text-white font-medium">
                    {trip.distance}
                  </span>
                </td>
                <td className="py-3 md:py-4 px-2 md:px-4">
                  <div className="flex items-center gap-1">
                    <DollarSign
                      size={12}
                      className="text-green-600 flex-shrink-0"
                    />
                    <span className="text-xs md:text-sm font-semibold text-green-600">
                      {trip.fare}
                    </span>
                  </div>
                </td>
                <td className="py-3 md:py-4 px-2 md:px-4">
                  <div className="flex items-center gap-0.5">
                    {[...Array(trip.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className="text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                </td>
                <td className="py-3 md:py-4 px-2 md:px-4">
                  <div className="flex items-center gap-1 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    <Clock size={12} className="flex-shrink-0" />
                    {trip.time}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
