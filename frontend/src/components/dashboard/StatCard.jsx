const StatCard = ({ icon, label, value, color = "blue", sub }) => {
  const colors = {
    blue: "from-blue-600/20 to-blue-800/20 border-blue-500/20 text-blue-400",
    green: "from-green-600/20 to-green-800/20 border-green-500/20 text-green-400",
    purple: "from-purple-600/20 to-purple-800/20 border-purple-500/20 text-purple-400",
    amber: "from-amber-600/20 to-amber-800/20 border-amber-500/20 text-amber-400",
  };

  return (
    <div className={`bg-gradient-to-br ${colors[color]} border rounded-2xl p-5 flex flex-col gap-2 hover:scale-[1.02] transition-transform`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-current/10 ${colors[color].split(" ").pop()}`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">{label}</p>
        <p className="text-white text-2xl font-black mt-0.5">{value}</p>
        {sub && <p className="text-gray-500 text-xs mt-0.5">{sub}</p>}
      </div>
    </div>
  );
};

export default StatCard;
