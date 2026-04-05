"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Loader } from "lucide-react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export interface LocationCoords {
  lat: number;
  lng: number;
}

export interface MapTilerProps {
  onDestinationSelect: (location: LocationCoords, address: string) => void;
  pickupLocation?: LocationCoords;
  pickupAddress?: string;
}

export default function MapTilerMap({
  onDestinationSelect,
  pickupLocation,
  pickupAddress,
}: MapTilerProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const pickupMarker = useRef<maplibregl.Marker | null>(null);
  const destMarker = useRef<maplibregl.Marker | null>(null);

  const [selectedLocation, setSelectedLocation] =
    useState<LocationCoords | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const defaultCenter = pickupLocation || { lat: 51.5074, lng: -0.1278 }; // London
  const apiKey =
    process.env.NEXT_PUBLIC_MAPTILER_API_KEY || "cIdTuCP5zRRxlu7urRAz";
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${apiKey}`,
      center: [defaultCenter.lng, defaultCenter.lat],
      zoom: 12,
    });

    map.current.on("load", () => {
      setIsLoading(false);

      // Add pickup marker if provided
      if (pickupLocation && map.current) {
        const el = document.createElement("div");
        el.style.width = "30px";
        el.style.height = "30px";
        el.style.backgroundImage =
          'url(\'data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2316a34a"><path d="M12 0C7.03 0 3 4.03 3 9c0 5.25 9 15 9 15s9-9.75 9-15c0-4.97-4.03-9-9-9zm0 12c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/></svg>\')';
        el.style.backgroundSize = "contain";
        el.style.backgroundRepeat = "no-repeat";
        el.style.cursor = "pointer";

        pickupMarker.current = new maplibregl.Marker({ element: el })
          .setLngLat([pickupLocation.lng, pickupLocation.lat])
          .addTo(map.current);
      }
    });

    map.current.on("error", (event) => {
      setLoadError(
        event.error?.message ||
          "Map failed to load. Check your access token or network.",
      );
      setIsLoading(false);
    });

    // Handle map clicks to select destination
    map.current.on("click", (e) => {
      const location: LocationCoords = {
        lat: e.lngLat.lat,
        lng: e.lngLat.lng,
      };

      setSelectedLocation(location);

      // Remove old destination marker
      if (destMarker.current) {
        destMarker.current.remove();
      }

      // Add new destination marker
      const el = document.createElement("div");
      el.style.width = "30px";
      el.style.height = "30px";
      el.style.backgroundImage =
        'url(\'data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23dc2626"><path d="M12 0C7.03 0 3 4.03 3 9c0 5.25 9 15 9 15s9-9.75 9-15c0-4.97-4.03-9-9-9zm0 12c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/></svg>\')';
      el.style.backgroundSize = "contain";
      el.style.backgroundRepeat = "no-repeat";
      el.style.cursor = "pointer";

      destMarker.current = new maplibregl.Marker({ element: el })
        .setLngLat([location.lng, location.lat])
        .addTo(map.current!);

      // Get address from coordinates (using nominatim for free geocoding)
      const fetchAddress = async () => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lng}`,
          );
          const data = await response.json();
          const address =
            data.address?.road ||
            data.display_name ||
            `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`;
          setSelectedAddress(address);
        } catch (error) {
          console.error("Geocoding error:", error);
          setSelectedAddress(
            `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`,
          );
        }
      };

      fetchAddress();
    });

    return () => {
      map.current?.remove();
    };
  }, [apiKey, pickupLocation]);

  const handleConfirmDestination = () => {
    if (selectedLocation && selectedAddress) {
      onDestinationSelect(selectedLocation, selectedAddress);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          Select Destination
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Click on the map to select your destination
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-[500px] bg-gray-100 dark:bg-gray-700 rounded-lg">
          <Loader className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : loadError ? (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <h4 className="text-red-800 dark:text-red-100 font-semibold mb-2">
            Map failed to load
          </h4>
          <p className="text-sm text-red-700 dark:text-red-200">{loadError}</p>
        </div>
      ) : (
        <>
          <div
            ref={mapContainer}
            style={{ width: "100%", height: "500px", borderRadius: "8px" }}
          />

          {/* Pickup Location Info */}
          {pickupAddress && (
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Pickup Location
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {pickupAddress}
              </p>
            </div>
          )}

          {/* Selected Destination Info */}
          {selectedAddress && (
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Selected Destination
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {selectedAddress}
              </p>
            </div>
          )}

          {/* Confirm Button */}
          <button
            onClick={handleConfirmDestination}
            disabled={!selectedLocation || !selectedAddress}
            className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors"
          >
            Confirm Destination
          </button>
        </>
      )}
    </div>
  );
}
