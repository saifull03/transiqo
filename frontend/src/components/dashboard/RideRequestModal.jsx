const RideRequestModal = ({ request, onAccept, onDecline }) => {
  if (!request) return null;
  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-gray-900 border border-white/10 rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-5 text-center">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <h2 className="text-white font-black text-lg uppercase tracking-widest">New Ride Request!</h2>
        </div>
        <div className="p-6 space-y-3">
          {[
            { label: "Est. Earnings", value: `৳${request.fare}`, highlight: true },
            { label: "Distance", value: `${request.distance} km` },
            { label: "Duration", value: `${request.duration} min` },
          ].map(({ label, value, highlight }) => (
            <div key={label} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
              <span className="text-gray-400 text-sm">{label}</span>
              <span className={`font-black text-lg ${highlight ? "text-green-400" : "text-white"}`}>{value}</span>
            </div>
          ))}
          {request.pickupLocation?.address && (
            <div className="bg-white/5 rounded-xl p-3 mt-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Pickup</p>
              <p className="text-gray-200 text-sm">{request.pickupLocation.address}</p>
            </div>
          )}
          <div className="flex gap-3 pt-2">
            <button onClick={onDecline} className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 font-bold transition">
              Decline
            </button>
            <button onClick={onAccept} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold transition shadow-lg shadow-blue-500/30">
              Accept Ride
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RideRequestModal;
