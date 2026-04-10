import { useMemo } from "react";
import { CircleMarker, MapContainer, Marker, Polyline, TileLayer, useMapEvents } from "react-leaflet";
import L from "leaflet";

const pickupIcon = new L.DivIcon({
  className: "map-marker pickup-marker",
  html: "<span>P</span>",
  iconSize: [28, 28]
});

const destinationIcon = new L.DivIcon({
  className: "map-marker destination-marker",
  html: "<span>D</span>",
  iconSize: [28, 28]
});

function MapClickHandler({ onPick }) {
  useMapEvents({
    click(event) {
      onPick(event.latlng);
    }
  });

  return null;
}

export default function MapSelector({ pickup, destination, setPickup, setDestination }) {
  const center = useMemo(() => {
    if (pickup) {
      return [pickup.lat, pickup.lng];
    }

    return [23.8103, 90.4125];
  }, [pickup]);

  const handlePick = ({ lat, lng }) => {
    const location = {
      label: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
      lat,
      lng
    };

    if (!pickup) {
      setPickup(location);
      return;
    }

    if (!destination) {
      setDestination(location);
      return;
    }

    setPickup(location);
    setDestination(null);
  };

  return (
    <div className="map-wrapper">
      <MapContainer center={center} zoom={13} scrollWheelZoom className="leaflet-map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler onPick={handlePick} />

        {pickup && (
          <>
            <Marker position={[pickup.lat, pickup.lng]} icon={pickupIcon} />
            <CircleMarker
              center={[pickup.lat, pickup.lng]}
              radius={18}
              pathOptions={{ color: "#1f8a70", fillColor: "#1f8a70", fillOpacity: 0.2 }}
            />
          </>
        )}

        {destination && (
          <Marker position={[destination.lat, destination.lng]} icon={destinationIcon} />
        )}

        {pickup && destination && (
          <Polyline
            positions={[
              [pickup.lat, pickup.lng],
              [destination.lat, destination.lng]
            ]}
            pathOptions={{ color: "#ef8354", weight: 5 }}
          />
        )}
      </MapContainer>

      <div className="map-help">
        <p>1. Click once to place pickup.</p>
        <p>2. Click again to place destination.</p>
        <p>3. Click a third time to reset pickup and start over.</p>
      </div>
    </div>
  );
}
