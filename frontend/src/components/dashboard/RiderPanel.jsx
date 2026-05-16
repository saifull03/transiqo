import RideMap from "../Map/RideMap";

const RiderPanel = ({
  isOnline, activeRide, elapsedTime, rideStartTime,
  onToggleStatus, onStartRide, onFinishRide, onConfirmPayment,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 h-full">
      {/* Left controls */}
      <div className="lg:w-80 space-y-4 flex-shrink-0">
        {/* Status toggle */}
        {!activeRide && (
          <div className="bg-gray-800/60 border border-white/10 rounded-2xl p-5 text-center space-y-4">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${isOnline ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-gray-700/50 text-gray-400 border border-gray-600/30"}`}>
              <div className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-400 animate-pulse" : "bg-gray-500"}`} />
              {isOnline ? "ONLINE" : "OFFLINE"}
            </div>
            <p className="text-gray-400 text-sm">{isOnline ? "You're visible to passengers. Waiting for requests..." : "Go online to start receiving ride requests."}</p>
            <button
              onClick={onToggleStatus}
              className={`w-full py-4 rounded-2xl font-black text-white text-lg shadow-xl transition-all hover:-translate-y-0.5 active:translate-y-0 ${isOnline ? "bg-gradient-to-r from-red-500 to-rose-600 shadow-red-500/30 hover:from-red-400 hover:to-rose-500" : "bg-gradient-to-r from-green-500 to-emerald-600 shadow-green-500/30 hover:from-green-400 hover:to-emerald-500"}`}
            >
              {isOnline ? "Go Offline" : "Go Online 🟢"}
            </button>
          </div>
        )}

        {/* Active ride controls */}
        {activeRide && (
          <div className="space-y-4">
            {/* Passenger info */}
            {activeRide.userInfo && (
              <div className="bg-gray-800/60 border border-white/10 rounded-2xl p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-3">👤 Passenger</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {activeRide.userInfo.name?.[0]?.toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white font-bold">{activeRide.userInfo.name}</p>
                      <p className="text-gray-400 text-xs">{activeRide.userInfo.phone}</p>
                    </div>
                  </div>
                  <a href={`tel:${activeRide.userInfo.phone}`} className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-400 text-white flex items-center justify-center transition shadow-lg shadow-green-500/30">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </a>
                </div>
              </div>
            )}

            {/* Ride info */}
            <div className="bg-gradient-to-br from-blue-600/20 to-indigo-700/20 border border-blue-500/20 rounded-2xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-sm">Status</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase">{activeRide.status}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Fare</span>
                <span className="text-2xl font-black text-green-400">৳{activeRide.fare}</span>
              </div>
              {activeRide.status === "started" && rideStartTime && (
                <div className="mt-3 pt-3 border-t border-white/10 text-center">
                  <p className="text-xs text-indigo-400 uppercase tracking-widest mb-1">Elapsed Time</p>
                  <div className="text-3xl font-black text-white font-mono">{elapsedTime}</div>
                </div>
              )}
            </div>

            {/* Action buttons */}
            {activeRide.status === "accepted" && (
              <button onClick={onStartRide} className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-lg shadow-xl shadow-indigo-500/30 transition hover:-translate-y-0.5">
                ▶ Start Ride
              </button>
            )}
            {activeRide.status === "started" && (
              <button onClick={onFinishRide} className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-black text-lg shadow-xl shadow-blue-500/30 transition hover:-translate-y-0.5">
                🏁 Finish Ride
              </button>
            )}
            {activeRide.status === "completed" && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5 text-center space-y-3">
                <p className="text-green-400 font-bold">Collect Cash Payment</p>
                <div className="text-4xl font-black text-white">৳{activeRide.fare}</div>
                <button onClick={onConfirmPayment} className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold shadow-lg shadow-green-500/30 transition">
                  ✓ Confirm Cash Received
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Map */}
      <div className="flex-1 min-h-[400px] lg:min-h-0 rounded-2xl overflow-hidden border border-white/10">
        <RideMap
          initialPickup={activeRide?.pickupLocation}
          initialDestination={activeRide?.dropoffLocation}
        />
      </div>
    </div>
  );
};
export default RiderPanel;
