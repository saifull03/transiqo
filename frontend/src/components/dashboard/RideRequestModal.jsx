const RideRequestModal = ({ requests = [], onAccept, onDecline }) => {
  if (!requests || requests.length === 0) return null;

  // ── SINGLE REQUEST: show the existing card modal ──────────────────────────
  if (requests.length === 1) {
    const request = requests[0];
    return (
      <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
        <div className="bg-gray-900 border border-white/10 rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-5 text-center relative">
            <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/20 rounded-full px-2.5 py-1">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white text-[10px] font-bold uppercase tracking-widest">Live</span>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <h2 className="text-white font-black text-lg uppercase tracking-widest">New Ride Request!</h2>
          </div>

          {/* Details */}
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

            {request.dropoffLocation?.address && (
              <div className="bg-white/5 rounded-xl p-3">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Dropoff</p>
                <p className="text-gray-200 text-sm">{request.dropoffLocation.address}</p>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => onDecline(request._id || request.id)}
                className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 font-bold transition"
              >
                Decline
              </button>
              <button
                onClick={() => onAccept(request)}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold transition shadow-lg shadow-blue-500/30"
              >
                Accept Ride
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── MULTIPLE REQUESTS: show a table ──────────────────────────────────────
  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-gray-900 border border-white/10 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div>
              <h2 className="text-white font-black text-base uppercase tracking-widest">Incoming Ride Requests</h2>
              <p className="text-blue-200 text-xs mt-0.5">{requests.length} requests waiting — pick one to accept</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white text-xs font-bold">{requests.length} Live</span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto max-h-[70vh]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-800/80 text-gray-400 uppercase text-[10px] tracking-widest">
                <th className="text-left px-4 py-3 font-semibold">#</th>
                <th className="text-left px-4 py-3 font-semibold">Pickup</th>
                <th className="text-left px-4 py-3 font-semibold">Dropoff</th>
                <th className="text-right px-4 py-3 font-semibold">Dist.</th>
                <th className="text-right px-4 py-3 font-semibold">Time</th>
                <th className="text-right px-4 py-3 font-semibold text-green-400">Fare</th>
                <th className="text-center px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {requests.map((req, i) => (
                <tr
                  key={req._id || req.id || i}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="px-4 py-3.5 text-gray-500 font-mono">{i + 1}</td>

                  {/* Pickup */}
                  <td className="px-4 py-3.5 max-w-[180px]">
                    <div className="flex items-start gap-2">
                      <span className="mt-1 w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                      <span className="text-gray-200 truncate text-xs leading-relaxed">
                        {req.pickupLocation?.address || `${req.pickupLocation?.lat?.toFixed(3)}, ${req.pickupLocation?.lng?.toFixed(3)}`}
                      </span>
                    </div>
                  </td>

                  {/* Dropoff */}
                  <td className="px-4 py-3.5 max-w-[180px]">
                    <div className="flex items-start gap-2">
                      <span className="mt-1 w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
                      <span className="text-gray-200 truncate text-xs leading-relaxed">
                        {req.dropoffLocation?.address || `${req.dropoffLocation?.lat?.toFixed(3)}, ${req.dropoffLocation?.lng?.toFixed(3)}`}
                      </span>
                    </div>
                  </td>

                  {/* Distance */}
                  <td className="px-4 py-3.5 text-right text-white font-semibold whitespace-nowrap">
                    {req.distance} km
                  </td>

                  {/* Duration */}
                  <td className="px-4 py-3.5 text-right text-gray-300 whitespace-nowrap">
                    {req.duration} min
                  </td>

                  {/* Fare */}
                  <td className="px-4 py-3.5 text-right whitespace-nowrap">
                    <span className="text-green-400 font-black text-base">৳{req.fare}</span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2 justify-center">
                      <button
                        onClick={() => onDecline(req._id || req.id)}
                        title="Decline"
                        className="w-8 h-8 rounded-lg bg-white/10 hover:bg-red-500/20 hover:text-red-400 text-gray-400 flex items-center justify-center transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <button
                        onClick={() => onAccept(req)}
                        className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs transition shadow-lg shadow-blue-500/20 whitespace-nowrap"
                      >
                        Accept
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-800/50 border-t border-white/5 text-center">
          <p className="text-gray-500 text-xs">Accepting one ride will dismiss all others automatically.</p>
        </div>
      </div>
    </div>
  );
};

export default RideRequestModal;
