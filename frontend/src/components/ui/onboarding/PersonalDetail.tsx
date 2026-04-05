export default function OnBoardingPersonalDetail() {
  return (
    <>
      {/* Title */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800 text-center">
          Personal Details
        </h2>
        <div className="mt-2 border-t border-slate-400/50" />
      </div>

      {/* Fields */}
      <div className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">Name</label>
          <input
            type="text"
            placeholder="name"
            className="w-full rounded-lg bg-white/70 border border-slate-300 px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">Username</label>
          <input
            type="text"
            placeholder="username"
            className="w-full rounded-lg bg-white/70 border border-slate-300 px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg bg-white/70 border border-slate-300 px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>
      </div>
    </>
  );
}
