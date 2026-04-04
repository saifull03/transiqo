# Transiqo - Ride Sharing Driver Dashboard

A modern, responsive driver dashboard for a ride-sharing application built with Next.js, TypeScript, and Tailwind CSS.

## Features

### Dashboard Components

- **Header Navigation**: Top navigation with notifications, user menu, and brand logo
- **Sidebar Navigation**: Easy navigation between different dashboard sections
- **Statistics Cards**: Display key metrics including:
  - Total Earnings
  - Total Rides
  - Driver Rating
  - Average Trip Time

- **Active Rides**: Real-time display of active rides with:
  - Passenger information and ratings
  - Pickup and dropoff locations
  - Navigation controls
  - Time to arrival

- **Driver Profile**: Quick access to driver information including:
  - Driver rating and statistics
  - Acceptance rates
  - Verification status
  - Balance display

- **Recent Trips**: Detailed table view of completed trips with:
  - Passenger names
  - Route information
  - Distance and fare
  - Ratings timestamp

- **Responsive Design**: Mobile-first approach that works on all screen sizes

## Tech Stack

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Runtime**: Node.js

## Project Structure

```
transiqo/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Main dashboard page
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── Dashboard.tsx      # Main dashboard component
│   │   ├── Header.tsx         # Header/navigation
│   │   ├── Sidebar.tsx        # Sidebar navigation
│   │   ├── StatsCards.tsx     # Statistics cards
│   │   ├── ActiveRides.tsx    # Active rides section
│   │   ├── DriverProfile.tsx  # Driver profile card
│   │   └── RecentTrips.tsx    # Recent trips table
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn

### Installation

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Install additional packages** (if not already installed):
   ```bash
   npm install lucide-react @react-google-maps/api axios socket.io-client
   ```

### Running the Development Server

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the dashboard.

### Building for Production

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Customization

### Colors and Branding

Modify the Tailwind CSS classes in components to change the color scheme:

- Primary color: Blue (`blue-600`, `blue-700`)
- Success color: Green
- Warning color: Yellow
- Danger color: Red

### Component Customization

All components are modular and can be easily customized:

- **Header**: Update logo, navigation items, and menu options in `Header.tsx`
- **Sidebar**: Modify navigation items and styling in `Sidebar.tsx`
- **Cards**: Adjust statistics and metrics in `StatsCards.tsx`
- **Tables**: Update trip data structure in `RecentTrips.tsx`

### Mock Data

The dashboard uses mock data for demonstration. To integrate real data:

1. Replace mock data arrays with API calls using `axios`
2. Add state management (Redux, Zustand, or Context API)
3. Implement real-time updates using Socket.io

## API Integration

The project includes packages for API integration:

- **axios**: HTTP client for API requests
- **@react-google-maps/api**: Google Maps integration
- **socket.io-client**: Real-time updates

### Example Usage

```typescript
// Using axios for API calls
import axios from "axios";

const fetchRides = async () => {
  const response = await axios.get("/api/rides");
  return response.data;
};

// Using Socket.io for real-time updates
import io from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);
socket.on("ride-update", (data) => {
  console.log("New ride update:", data);
});
```

## Dark Mode

The dashboard includes dark mode support using Tailwind CSS dark mode classes. Dark mode classes are already applied throughout the components.

## Performance Optimization

- Uses Next.js Image component for optimized images
- Implements code splitting with dynamic imports
- Responsive design reduces unnecessary rendering

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- [ ] Real-time location tracking with Google Maps
- [ ] Chat functionality between driver and passenger
- [ ] Payment integration
- [ ] Offline mode support
- [ ] Advanced analytics and reporting
- [ ] Driver preferences and settings

## License

This project is part of the Transiqo ride-sharing application.

## Support

For issues, feature requests, or contributions, please contact the development team.

---

**Built with ❤️ using Next.js and Tailwind CSS**

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
