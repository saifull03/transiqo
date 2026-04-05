"use client";

import { useState, useEffect } from "react";
import { MapPin, Navigation, DollarSign, Clock } from "lucide-react";
import MapTilerMap, { LocationCoords } from "./MapTilerMap";
import { calculateFare, formatFare, FareDetails } from "@/utils/fareCalculator";

interface BookRideState {
  pickupLocation: LocationCoords | null;
  pickupAddress: string;
  destinationLocation: LocationCoords | null;
  destinationAddress: string;
  fareDetails: FareDetails | null;
  step: "location" | "destination" | "confirmation";
}

export default function BookRide() {
  const [state, setState] = useState<BookRideState>({
    pickupLocation: null,
    pickupAddress: "",
    destinationLocation: null,
    destinationAddress: "",
    fareDetails: null,
    step: "location",
  });

  const [tempPickupAddress, setTempPickupAddress] = useState("");
  const [isMapReady, setIsMapReady] = useState(true); // MapTiler loads instantly

  // Simulate current location as pickup
  useEffect(() => {
    // For demo purposes, using a default location (London)
    // In production, use geolocation API
    setState((prev) => ({
      ...prev,
      pickupLocation: { lat: 51.5074, lng: -0.1278 },
      pickupAddress: "123 Main St, London, UK",
      step: "destination",
    }));
  }, []);

  const handleDestinationSelect = (
    location: LocationCoords,
    address: string,
  ) => {
    if (state.pickupLocation) {
      const fare = calculateFare(
        state.pickupLocation.lat,
        state.pickupLocation.lng,
        location.lat,
        location.lng,
      );

      setState((prev) => ({
        ...prev,
        destinationLocation: location,
        destinationAddress: address,
        fareDetails: fare,
        step: "confirmation",
      }));
    }
  };

  const handlePickupAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTempPickupAddress(e.target.value);
  };

  const handleSetPickupLocation = () => {
    if (tempPickupAddress.trim()) {
      setState((prev) => ({
        ...prev,
        pickupAddress: tempPickupAddress,
        step: "destination",
      }));
    }
  };

  const handleManualPickup = () => {
    setState((prev) => ({
      ...prev,
      step: "location",
    }));
  };

  const handleConfirmBooking = () => {
    alert(
      `Ride booked! Total fare: ${formatFare(state.fareDetails?.totalFare || 0)}`,
    );
    // Reset state
    setState({
      pickupLocation: null,
      pickupAddress: "",
      destinationLocation: null,
      destinationAddress: "",
      fareDetails: null,
      step: "location",
    });
  };

  const handleEditDestination = () => {
    setState((prev) => ({
      ...prev,
      destinationLocation: null,
      destinationAddress: "",
      fareDetails: null,
      step: "destination",
    }));
  };

  if (!isMapReady) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
        <p className="text-gray-600 dark:text-gray-400">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Pickup Location Step */}
      {state.step === "location" && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Navigation className="w-5 h-5 text-blue-600" />
              Select Pickup Location
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Where should we pick you up from?
            </p>
          </div>

          <div className="space-y-2">
            <input
              type="text"
              placeholder="Enter your pickup address"
              value={tempPickupAddress}
              onChange={handlePickupAddressChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
            <button
              onClick={handleSetPickupLocation}
              disabled={!tempPickupAddress.trim()}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors"
            >
              Continue with this location
            </button>
          </div>

          {/* Or use current location */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
            <span className="text-sm text-gray-500 dark:text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
          </div>

          <button
            onClick={() =>
              setState((prev) => ({
                ...prev,
                step: "destination",
              }))
            }
            className="w-full px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-medium rounded-lg transition-colors"
          >
            Use my current location
          </button>
        </div>
      )}

      {/* Destination Selection Step */}
      {state.step === "destination" && state.pickupLocation && (
        <MapTilerMap
          onDestinationSelect={handleDestinationSelect}
          pickupLocation={state.pickupLocation}
          pickupAddress={state.pickupAddress}
        />
      )}

      {/* Confirmation Step */}
      {state.step === "confirmation" && state.fareDetails && (
        <div className="space-y-4">
          {/* Route Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Trip Summary
            </h3>

            {/* Pickup Location */}
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <MapPin className="w-5 h-5 text-green-600 mt-1" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Pickup
                </p>
                <p className="text-gray-900 dark:text-white">
                  {state.pickupAddress}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="pl-2 border-l-2 border-gray-300 dark:border-gray-600 ml-2 h-8"></div>

            {/* Destination Location */}
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <MapPin className="w-5 h-5 text-red-600 mt-1" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Destination
                </p>
                <p className="text-gray-900 dark:text-white">
                  {state.destinationAddress}
                </p>
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={handleEditDestination}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Edit destination
            </button>
          </div>

          {/* Fare Breakdown */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              Fare Estimate
            </h3>

            {/* Distance & Time */}
            <div className="grid grid-cols-2 gap-4 pb-3 border-b border-gray-200 dark:border-gray-700">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Distance
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {state.fareDetails.distance} km
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Estimated Time
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {state.fareDetails.estimatedTime} min
                </p>
              </div>
            </div>

            {/* Fare Breakdown */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Base Fare
                </span>
                <span className="text-gray-900 dark:text-white">
                  {formatFare(state.fareDetails.baseFare)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Distance ({state.fareDetails.distance} km)
                </span>
                <span className="text-gray-900 dark:text-white">
                  {formatFare(state.fareDetails.distanceFare)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Time ({state.fareDetails.estimatedTime} min)
                </span>
                <span className="text-gray-900 dark:text-white">
                  {formatFare(state.fareDetails.timeFare)}
                </span>
              </div>
            </div>

            {/* Total Fare */}
            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-900 dark:text-white">
                  Total Fare
                </span>
                <span className="text-2xl font-bold text-blue-600">
                  {formatFare(state.fareDetails.totalFare)}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleEditDestination}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-lg transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleConfirmBooking}
              className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Book Ride
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
