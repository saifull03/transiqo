"use client";

import { TrendingUp, Users, DollarSign, Clock } from "lucide-react";

export default function StatsCards() {
  const stats = [
    {
      label: "Total Earnings",
      value: "$4,250.50",
      change: "+12.5%",
      icon: DollarSign,
      bgColor: "bg-green-50 dark:bg-green-900/20",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      label: "Total Rides",
      value: "342",
      change: "+23 this month",
      icon: Users,
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Rating",
      value: "4.8/5.0",
      change: "+0.2 this week",
      icon: TrendingUp,
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      iconColor: "text-yellow-600 dark:text-yellow-400",
    },
    {
      label: "Avg. Trip Time",
      value: "18 min",
      change: "-2 min vs last week",
      icon: Clock,
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </p>
                <p className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  {stat.change}
                </p>
              </div>
              <div
                className={`${stat.bgColor} p-2 md:p-3 rounded-lg flex-shrink-0`}
              >
                <Icon size={20} className={`${stat.iconColor} md:w-6 md:h-6`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
