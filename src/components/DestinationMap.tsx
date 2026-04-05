"use client";

import {
  GoogleMap,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { MapPin, Loader } from "lucide-react";

export interface LocationCoords {
  lat: number;
  lng: number;
}

export interface DestinationMapProps {
  onDestinationSelect: (location: LocationCoords, address: string) => void;
  pickupLocation?: LocationCoords;
  pickupAddress?: string;
}

const containerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "8px",
};

export default function DestinationMap({
  onDestinationSelect,
  pickupLocation,
  pickupAddress,
}: DestinationMapProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedLocation, setSelectedLocation] =
    useState<LocationCoords | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [isLoadingMap, setIsLoadingMap] = useState(true);
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);

  // Default location (San Francisco)
  const defaultCenter = pickupLocation || { lat: 37.7749, lng: -122.4194 };

  useEffect(() => {
    if (typeof window !== "undefined" && !geocoder) {
      setGeocoder(new window.google.maps.Geocoder());
    }
  }, [geocoder]);

  useEffect(() => {
    setIsLoadingMap(false);
  }, []);

  const handleMapClick = async (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const location = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };

      setSelectedLocation(location);

      // Reverse geocode to get address
      if (geocoder) {
        try {
          const response = await geocoder.geocode({ location });
          if (response.results && response.results[0]) {
            setSelectedAddress(response.results[0].formatted_address);
          }
        } catch (error) {
          console.error("Geocoding error:", error);
          setSelectedAddress(
            `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`,
          );
        }
      }
    }
  };

  const handleConfirmDestination = () => {
    if (selectedLocation && selectedAddress) {
      onDestinationSelect(selectedLocation, selectedAddress);
    }
  };

  const handleDirectionsCallback = (result: any, status: string) => {
    if (status === "OK" && result) {
      setDirections(result);
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

      {isLoadingMap ? (
        <div className="flex items-center justify-center h-[500px] bg-gray-100 dark:bg-gray-700 rounded-lg">
          <Loader className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={defaultCenter}
            zoom={13}
            onClick={handleMapClick}
            onLoad={setMap}
            options={{
              disableDefaultUI: false,
              zoomControl: true,
              mapTypeControl: true,
            }}
          >
            {/* Pickup Marker */}
            {pickupLocation && (
              <Marker
                position={pickupLocation}
                title={pickupAddress || "Pickup Location"}
                icon={{
                  url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
                }}
              />
            )}

            {/* Destination Marker */}
            {selectedLocation && (
              <Marker
                position={selectedLocation}
                title={selectedAddress}
                icon={{
                  url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                }}
              />
            )}

            {/* Directions Service and Renderer */}
            {pickupLocation && selectedLocation && (
              <>
                <DirectionsService
                  options={{
                    origin: pickupLocation,
                    destination: selectedLocation,
                    travelMode: window.google.maps.TravelMode.DRIVING,
                  }}
                  callback={handleDirectionsCallback}
                  onLoad={(directionsService) => {
                    // onLoad is called when service is loaded
                  }}
                />

                {directions && (
                  <DirectionsRenderer
                    directions={directions}
                    options={{
                      polylineOptions: {
                        strokeColor: "#3B82F6",
                        strokeWeight: 4,
                      },
                    }}
                  />
                )}
              </>
            )}
          </GoogleMap>

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
