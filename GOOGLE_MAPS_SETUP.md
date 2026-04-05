# Quick Google Maps API Key Setup Guide

## ⚡ Fast Track (5 minutes)

### Step 1: Go to Google Cloud Console

Open: https://console.cloud.google.com/

### Step 2: Create or Select a Project

1. Click the project dropdown (top-left)
2. Click "NEW PROJECT"
3. Enter name: "Transiqo"
4. Click "CREATE"
5. Wait for project to be created, then select it

### Step 3: Enable Required APIs

1. Click the hamburger menu (☰) → "APIs & Services" → "Library"
2. Search for and enable each API:

**API 1: Maps JavaScript API**

- Search: "Maps JavaScript API"
- Click on it → "ENABLE"

**API 2: Places API**

- Search: "Places API"
- Click on it → "ENABLE"

**API 3: Directions API**

- Search: "Directions API"
- Click on it → "ENABLE"

### Step 4: Create API Key

1. Click "APIs & Services" → "Credentials" (left menu)
2. Click "+ CREATE CREDENTIALS" → "API Key"
3. Copy the API key that appears
4. (Optional) Click "Restrict key" to:
   - Set Application restrictions to "HTTP referrers"
   - Add: `http://localhost:3000/*`
   - Set API restrictions to only selected APIs above

### Step 5: Add to Your Project

1. Open `.env.local` in your project root
2. Replace this line:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```
   With your actual key:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyD...rest_of_your_key
   ```

### Step 6: Restart Dev Server

```bash
# Stop the current server (Ctrl+C)
# Then start it again
npm run dev
```

### Step 7: Test

1. Open http://localhost:3000
2. Click "Book Ride" in the sidebar
3. The map should now load!

---

## 🧪 Alternative: Test Without Real API Key

If you want to test the booking UI without setting up an API key yet:

1. Edit `.env.local`
2. Change from:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```
   To:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=test_demo_key
   ```
3. You'll see the booking form but without the interactive map

---

## ❓ Troubleshooting

**Issue: "This API project is not authorized to use this API"**

- Make sure you enabled ALL three APIs (Maps JavaScript, Places, Directions)
- Wait a few minutes for APIs to activate

**Issue: "Invalid API key"**

- Check you copied the ENTIRE key (should be long)
- No extra spaces or characters
- Restart dev server after updating `.env.local`

**Issue: Map still not loading**

- Open browser DevTools (F12) → Console tab
- Look for error messages
- Try clearing browser cache: Ctrl+Shift+Delete

---

## 📚 Reference

- [Google Cloud Console](https://console.cloud.google.com/)
- [Maps JavaScript API Docs](https://developers.google.com/maps/documentation/javascript)
- [API Pricing](https://developers.google.com/maps/billing-and-pricing)

---

**Estimated Time: 5-10 minutes** ⏱️

Need help? Follow each step carefully and the map feature will work! 🗺️
