"use client";

import { useJsApiLoader } from "@react-google-maps/api";
import { ReactNode } from "react";

interface GoogleMapsProviderProps {
  children: ReactNode;
}

export default function GoogleMapsProvider({
  children,
}: GoogleMapsProviderProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places", "geometry"],
  });

  if (loadError) {
    return (
      <div className="p-4 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg">
        <p className="text-red-800 dark:text-red-200">
          Error loading Google Maps. Please check your API key configuration.
        </p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Loading Google Maps...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
