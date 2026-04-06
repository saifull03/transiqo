import { useEffect, useRef } from "react";

export default function MapPicker({
  pickup,
  destination,
  drivers,
  onSelectLocation,
}) {
  const mapElement = useRef(null);
  const mapInstance = useRef(null);
  const markers = useRef([]);
  const polyline = useRef(null);

  useEffect(() => {
    if (!window.google || !mapElement.current) return;

    if (!mapInstance.current) {
      mapInstance.current = new window.google.maps.Map(mapElement.current, {
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 12,
      });
      mapInstance.current.addListener("click", (event) => {
        onSelectLocation({ lat: event.latLng.lat(), lng: event.latLng.lng() });
      });
    }
  }, [onSelectLocation]);

  useEffect(() => {
    markers.current.forEach((marker) => marker.setMap(null));
    markers.current = [];

    if (!window.google || !mapInstance.current) return;
    const map = mapInstance.current;
    const newMarkers = [];

    if (pickup) {
      newMarkers.push(
        new window.google.maps.Marker({
          position: pickup,
          map,
          label: "P",
          title: "Pickup",
        }),
      );
    }
    if (destination) {
      newMarkers.push(
        new window.google.maps.Marker({
          position: destination,
          map,
          label: "D",
          title: "Destination",
        }),
      );
    }
    drivers?.forEach((driver) => {
      newMarkers.push(
        new window.google.maps.Marker({
          position: { lat: driver.lat, lng: driver.lng },
          map,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 6,
            fillColor: "#1976d2",
            fillOpacity: 0.9,
            strokeWeight: 1,
          },
          title: `Driver ${driver.name || driver.userId}`,
        }),
      );
    });

    markers.current = newMarkers;

    const bounds = new window.google.maps.LatLngBounds();
    if (pickup) bounds.extend(pickup);
    if (destination) bounds.extend(destination);
    drivers?.forEach((driver) =>
      bounds.extend({ lat: driver.lat, lng: driver.lng }),
    );
    if (!bounds.isEmpty()) {
      map.fitBounds(bounds, 80);
    }

    if (pickup && destination) {
      if (polyline.current) {
        polyline.current.setMap(null);
      }
      polyline.current = new window.google.maps.Polyline({
        path: [pickup, destination],
        strokeColor: "#1976d2",
        strokeOpacity: 0.8,
        strokeWeight: 4,
        map,
      });
    }
  }, [pickup, destination, drivers]);

  return <div ref={mapElement} className="map-canvas" />;
}
