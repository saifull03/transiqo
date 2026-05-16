import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-center px-4 relative overflow-hidden">
      {/* Hero background image/illustration */}
      <img
        src="/assets/hero-ride.svg"
        alt="RideX Hero"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl opacity-20 pointer-events-none select-none z-0"
        style={{ objectFit: "cover" }}
      />

      {/* Animated headline */}
      <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-6 tracking-tight animate-fade-in-up z-10">
        Go Anywhere with RideX
      </h1>
      <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mb-10 animate-fade-in z-10">
        The most reliable, fast, and modern ride-sharing platform. Request a
        ride, hop in, and go.
      </p>

      {/* CTA buttons with icon */}
      <div className="flex flex-col sm:flex-row gap-4 animate-fade-in z-10">
        <Link
          to="/register"
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-xl shadow-blue-500/30 flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12h14M12 5l7 7-7 7"
            />
          </svg>
          Get Started
        </Link>
        <Link
          to="/login"
          className="px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 border border-gray-200 dark:border-gray-600 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-xl flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12H9m6 0a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
          Login
        </Link>
      </div>

      {/* Features section with animation */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full px-4 text-left animate-fade-in-up z-10">
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50 hover:scale-105 transition-transform">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Always on time
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Reliable drivers ready to pick you up in minutes.
          </p>
        </div>
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50 hover:scale-105 transition-transform">
          <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-indigo-600 dark:text-indigo-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              ></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Safe & Secure
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Verified drivers and live ride tracking for your safety.
          </p>
        </div>
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50 hover:scale-105 transition-transform">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Clear Pricing
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            No hidden fees. See the estimated fare before you book.
          </p>
        </div>
      </div>

      {/* Partner logos/app badges */}
      <div className="mt-16 flex flex-wrap justify-center items-center gap-8 animate-fade-in z-10">
        <img
          src="/assets/appstore-badge.svg"
          alt="App Store"
          className="h-12"
        />
        <img
          src="/assets/playstore-badge.svg"
          alt="Google Play"
          className="h-12"
        />
        <img
          src="/assets/partner-uber.svg"
          alt="Uber"
          className="h-10 opacity-70"
        />
        <img
          src="/assets/partner-lyft.svg"
          alt="Lyft"
          className="h-10 opacity-70"
        />
      </div>

      {/* Testimonials section */}
      <div className="mt-24 max-w-4xl w-full mx-auto animate-fade-in-up z-10">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white text-center">
          What our riders say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              “RideX is always on time and the drivers are super friendly. I
              feel safe every ride!”
            </p>
            <div className="flex items-center gap-3">
              <img
                src="/assets/user1.jpg"
                alt="User 1"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-semibold text-gray-900 dark:text-white">
                Ayesha K.
              </span>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              “Transparent pricing and easy to use. I love the app experience!”
            </p>
            <div className="flex items-center gap-3">
              <img
                src="/assets/user2.jpg"
                alt="User 2"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-semibold text-gray-900 dark:text-white">
                Rahim U.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle animated background shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-blue-300/30 to-indigo-300/10 rounded-full blur-3xl z-0 animate-pulse-slow"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tr from-purple-300/30 to-indigo-300/10 rounded-full blur-3xl z-0 animate-pulse-slow"></div>
    </div>
  );
};

export default Home;
