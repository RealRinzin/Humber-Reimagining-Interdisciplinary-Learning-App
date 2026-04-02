export default function OnBoardingPersonalDetail() {
  const steps = [
    { number: 1, label: "Personal\nDetails" },
    { number: 2, label: "Select\nContent" },
    { number: 3, label: "Learning\nPath" },
    { number: 4, label: "Show\nProgress" },
  ];
  const currentStep = 1;
  return (
    <>
      <div className="flex justify-center-safe items-center h-screen">
        <div className="w-full max-w-xl rounded-2xl bg-slate-300/60 backdrop-blur-md p-10 shadow-xl">
          {/* Step Indicator */}
          <div className="flex items-start justify-between mb-10">
            {steps.map((step, i) => {
              const isActive = step.number === currentStep;
              const isCompleted = step.number < currentStep;
              const isLast = i === steps.length - 1;

              return (
                <div key={step.number} className="flex items-start flex-1">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold
                    ${isActive ? "bg-slate-700 text-white" : "bg-slate-400/60 text-slate-500"}`}
                    >
                      {step.number}
                    </div>
                    <span className="text-[10px] text-center text-slate-600  leading-tight whitespace-pre-line">
                      {step.label}
                    </span>
                  </div>

                  {/* Connector line */}
                  {!isLast && (
                    <div className="flex-1 mt-3.5 mx-1">
                      <div
                        className={`h-px border-t border-dashed ${isCompleted ? "border-slate-600" : "border-slate-400/70"}`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

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
                placeholder="Full Name"
                className="w-full rounded-lg bg-white/70 border border-slate-300 px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-lg bg-white/70 border border-slate-300 px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-lg bg-white/70 border border-slate-300 px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 mt-8">
            <button className="text-sm text-slate-500 underline underline-offset-2 hover:text-slate-700">
              Return
            </button>
            <button className="bg-slate-700 hover:bg-slate-800 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
