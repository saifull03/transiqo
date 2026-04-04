# Transiqo Dashboard Setup Guide

## Project Overview

A modern ride-sharing driver dashboard built with Next.js, TypeScript, and Tailwind CSS. The dashboard includes real-time ride tracking, driver statistics, earnings management, and recent trip history.

## Quick Start

### 1. Install Dependencies

```bash
# Navigate to project directory
cd /home/saiful-islam/Documents/Projects/transiqo

# Install all dependencies (including lucide-react icon library)
npm install

# If npm install fails, you may need to install lucide-react separately:
npm install lucide-react
```

### 2. Install Ride-Sharing Specific Packages

```bash
# Install these packages for API integration and real-time features
npm install @react-google-maps/api axios socket.io-client
```

### 3. Start Development Server

```bash
npm run dev
```

The dashboard will be available at: **http://localhost:3000**

### 4. Build for Production

```bash
npm run build
npm start
```

## Project Files Created

### Components (in `src/components/`)

| File                | Purpose                                               |
| ------------------- | ----------------------------------------------------- |
| `Dashboard.tsx`     | Main container with navigation and layout             |
| `Header.tsx`        | Top navigation with notifications and user menu       |
| `Sidebar.tsx`       | Left sidebar with navigation items                    |
| `StatsCards.tsx`    | 4 KPI cards showing earnings, rides, rating, avg time |
| `ActiveRides.tsx`   | Current live rides with passenger details             |
| `DriverProfile.tsx` | Driver info, ratings, and verification status         |
| `RecentTrips.tsx`   | Historical trip data in table format                  |

### Configuration Files

| File                 | Purpose                                     |
| -------------------- | ------------------------------------------- |
| `.env.local`         | Environment variables (needs API keys)      |
| `next.config.ts`     | Next.js configuration                       |
| `tailwind.config.ts` | Tailwind CSS configuration (auto-generated) |
| `tsconfig.json`      | TypeScript configuration                    |
| `postcss.config.mjs` | PostCSS configuration for Tailwind          |

## Features Included

✅ **Responsive Design** - Works on mobile, tablet, and desktop
✅ **Dark Mode** - Built-in dark mode support
✅ **Icon System** - Lucide React icons throughout
✅ **Component Architecture** - Modular, reusable components
✅ **TypeScript** - Full type safety
✅ **Mock Data** - Ready for API integration
✅ **Tailwind CSS** - Utility-first CSS framework
✅ **Modern UI** - Clean, professional design

## Key Dashboard Sections

### 1. **Statistics Cards**

Shows key metrics:

- Total Earnings
- Total Rides
- Driver Rating
- Average Trip Time

### 2. **Active Rides**

Displays current ride details:

- Passenger information and rating
- Pickup and dropoff locations
- Time to arrival
- Navigation button

### 3. **Driver Profile**

Quick profile information:

- Avatar and driver name
- Rating, acceptance rate, cancellations
- Document verification status
- Account balance

### 4. **Recent Trips**

Full trip history table with:

- Passenger names
- Route information
- Distance and fare details
- Trip ratings
- Timestamps

## Customization Guide

### Changing Colors

Edit the Tailwind color classes in components:

```tsx
// Example: Change primary color from blue to purple
className = "bg-purple-600 hover:bg-purple-700";
```

### Updating Mock Data

Replace data arrays in each component with API calls:

```tsx
// Before (mock data)
const rides = [ { id: 1, ... } ];

// After (API call)
const [rides, setRides] = useState([]);
useEffect(() => {
  fetchRides().then(data => setRides(data));
}, []);
```

### Integrating APIs

Use the pre-installed packages:

```tsx
// Axios for HTTP calls
import axios from "axios";
const response = await axios.get("/api/rides");

// Socket.io for real-time updates
import io from "socket.io-client";
const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);
socket.on("ride-update", handleUpdate);

// Google Maps for location tracking
import { GoogleMap, Marker } from "@react-google-maps/api";
```

## Environment Variables (.env.local)

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## Browser Compatibility

- ✅ Chrome/Chromium (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Package Dependencies

```json
{
  "next": "^15.0+",
  "react": "^19.0+",
  "react-dom": "^19.0+",
  "typescript": "^5.0+",
  "tailwindcss": "^4.0+",
  "lucide-react": "^latest",
  "axios": "^latest",
  "@react-google-maps/api": "^latest",
  "socket.io-client": "^latest"
}
```

## Troubleshooting

### Port 3000 Already in Use

```bash
# Use a different port
npm run dev -- -p 3001
```

### Tailwind CSS Not Working

```bash
# Rebuild Tailwind
npx tailwindcss -i ./src/app/globals.css -o ./src/app/output.css
```

### Missing Dependencies

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

```bash
# Rebuild TypeScript types
npm run build
```

## Next Steps

1. **Replace Mock Data** - Connect to real backend APIs
2. **Add Authentication** - Implement driver login/logout
3. **Real-time Updates** - Use Socket.io for live updates
4. **Map Integration** - Add Google Maps for ride tracking
5. **Push Notifications** - Implement notification system
6. **Payment Integration** - Add payment processing
7. **Analytics** - Add detailed statistics and reports

## Project Structure

```
transiqo/
├── public/                 # Static files
├── src/
│   ├── app/
│   │   ├── page.tsx       # Home page
│   │   ├── layout.tsx     # Root layout
│   │   ├── globals.css    # Global styles
│   │   └── favicon.ico
│   ├── components/
│   │   ├── Dashboard.tsx
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── StatsCards.tsx
│   │   ├── ActiveRides.tsx
│   │   ├── DriverProfile.tsx
│   │   └── RecentTrips.tsx
├── .env.local            # Environment variables
├── next.config.ts        # Next.js config
├── tailwind.config.ts    # Tailwind config
├── tsconfig.json         # TypeScript config
├── package.json          # Dependencies
└── README.md             # Project documentation
```

## Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com
- **Lucide Icons**: https://lucide.dev
- **TypeScript**: https://www.typescriptlang.org

---

**Ready to launch? Run `npm run dev` and visit http://localhost:3000** 🚀
