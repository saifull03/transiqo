# Book Ride Feature Guide

## Overview

The **Book Ride** feature allows users to:

1. Select a pickup location
2. Choose a destination on Google Maps
3. View real-time fare calculation
4. Confirm and book a ride with detailed fare breakdown

## New Components

### 1. **BookRide Component** (`src/components/BookRide.tsx`)

Main component that orchestrates the entire booking flow.

**Features:**

- Multi-step booking process (location → destination → confirmation)
- Pickup location input
- Integration with Google Maps for destination selection
- Real-time fare calculation
- Detailed fare breakdown display

**Usage:**

```tsx
import BookRide from "@/components/BookRide";

export default function Page() {
  return <BookRide />;
}
```

### 2. **DestinationMap Component** (`src/components/DestinationMap.tsx`)

Interactive map for selecting destination coordinates.

**Props:**

```tsx
interface DestinationMapProps {
  onDestinationSelect: (location: LocationCoords, address: string) => void;
  pickupLocation?: LocationCoords;
  pickupAddress?: string;
}
```

**Features:**

- Click map to select destination
- Green marker for pickup, red marker for destination
- Route visualization with directions
- Address reverse geocoding
- Confirmation button with validation

### 3. **GoogleMapsProvider Component** (`src/components/GoogleMapsProvider.tsx`)

Wrapper component for initializing Google Maps API.

**Usage:**

```tsx
<GoogleMapsProvider>
  <YourMapComponent />
</GoogleMapsProvider>
```

## Fare Calculation System

Located in `src/utils/fareCalculator.ts`

### Pricing Model

| Component     | Cost             |
| ------------- | ---------------- |
| Base Fare     | $2.50            |
| Distance Rate | $1.50 per km     |
| Time Rate     | $0.25 per minute |
| Minimum Fare  | $3.50            |

### Functions

#### `calculateFare(pickupLat, pickupLon, dropoffLat, dropoffLon)`

Calculates complete fare details.

**Returns:**

```tsx
interface FareDetails {
  baseFare: number; // $2.50
  distanceFare: number; // distance * $1.50
  timeFare: number; // estimatedTime * $0.25
  totalFare: number; // base + distance + time (min $3.50)
  distance: number; // in km
  estimatedTime: number; // in minutes
}
```

**Example:**

```tsx
import { calculateFare, formatFare } from "@/utils/fareCalculator";

const fare = calculateFare(37.7749, -122.4194, 37.7849, -122.4094);
console.log(`Total: ${formatFare(fare.totalFare)}`); // $15.25
```

#### `calculateDistance(lat1, lon1, lat2, lon2)`

Uses Haversine formula for accurate distance between coordinates.

```tsx
const distance = calculateDistance(37.7749, -122.4194, 37.7849, -122.4094);
console.log(`${distance.toFixed(1)} km`); // 11.3 km
```

#### `estimateTravelTime(distanceKm)`

Estimates travel time assuming 30 km/h average speed in city.

```tsx
const time = estimateTravelTime(10); // ~20 minutes
```

#### `formatFare(amount)`

Formats fare amount for display.

```tsx
formatFare(15.25); // "$15.25"
```

## Usage Flow

### Step 1: Pickup Location

```
User enters address or uses current location
↓
Address confirmed and stored
```

### Step 2: Destination Selection

```
Google Map displays with markers
↓
User clicks on map to select destination
↓
Address reverse geocoded automatically
↓
Route visualized with directions
```

### Step 3: Fare Review & Confirmation

```
Fare calculated based on route
↓
Display breakdown: distance, time, fare components
↓
User can edit destination or confirm booking
```

## Integration with Dashboard

The BookRide component is accessible via:

- **Sidebar Navigation** → "Book Ride" option
- Direct URL when configured in routing

The sidebar automatically includes the new "Book Ride" option with MapPin icon.

## Customization

### Change Pricing Model

Edit `src/utils/fareCalculator.ts`:

```tsx
const PRICING = {
  baseFare: 2.5, // Change base fare
  pricePerKm: 1.5, // Change per-km rate
  pricePerMinute: 0.25, // Change per-minute rate
  minimumFare: 3.5, // Change minimum fare
};
```

### Change Default Location

Edit `src/components/BookRide.tsx`:

```tsx
const defaultCenter = {
  lat: 40.7128, // Change to your city
  lng: -74.006,
};
```

### Change Map Zoom Level

In `DestinationMap.tsx`:

```tsx
<GoogleMap
  zoom={13}  // Change zoom level (1-20)
  center={defaultCenter}
  ...
>
```

## Environment Setup

Required in `.env.local`:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

## API Keys & Permissions

Ensure these APIs are enabled in Google Cloud Console:

1. ✅ Maps JavaScript API
2. ✅ Places API (for geocoding)
3. ✅ Directions API (for routes)
4. ✅ Geocoding API (for address lookup)

## Browser Support

Works on:

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS, Android)

## Troubleshooting

### Map Not Loading

**Problem:** Blank white area where map should be

**Solution:**

1. Check API key in `.env.local`
2. Verify APIs are enabled in Google Cloud Console
3. Check browser console for error messages
4. Test API key permissions

### Directions Not Working

**Problem:** Route lines not appearing

**Solution:**

1. Enable Directions API in Google Cloud
2. Ensure Directions API is in API key restrictions
3. Check that both pickup and destination coordinates are valid

### Fare Calculation Issues

**Problem:** Incorrect distance or fare

**Solution:**

1. Verify coordinates are in correct format (lat, lng)
2. Check PRICING constants in fareCalculator.ts
3. Test with known distance using calculateDistance function

### Address Reverse Geocoding Fails

**Problem:** Selected location not showing address

**Solution:**

1. Enable Geocoding API in Google Cloud
2. Check internet connection
3. Try clicking on a different location on the map

## Performance Considerations

- **Map Rendering:** Lazy-loaded via useJsApiLoader hook
- **Geocoding:** Debounce if querying frequently
- **API Calls:** Each action counts toward daily quota (check Google Cloud billing)

## Security

- API key is **public** (NEXT*PUBLIC* prefix) - this is intended for frontend use
- Restrict key to:
  - HTTP referrers (your domain)
  - Specific APIs only
- Never commit `.env.local` with real keys to version control

## Future Enhancements

Potential features to add:

- [ ] Multi-stop routes
- [ ] Ride sharing suggestions
- [ ] Driver rating display before booking
- [ ] Payment integration
- [ ] Real-time traffic data
- [ ] Saved locations (home, work, etc.)
- [ ] Scheduled rides
- [ ] Promo codes / discounts

## Related Files

| File                                | Purpose                |
| ----------------------------------- | ---------------------- |
| `src/components/BookRide.tsx`       | Main booking component |
| `src/components/DestinationMap.tsx` | Map interface          |
| `src/utils/fareCalculator.ts`       | Fare calculation logic |
| `src/components/Sidebar.tsx`        | Navigation integration |
| `src/components/Dashboard.tsx`      | Main layout & routing  |

---

**Need help?** Check Google Maps API documentation: https://developers.google.com/maps/documentation
