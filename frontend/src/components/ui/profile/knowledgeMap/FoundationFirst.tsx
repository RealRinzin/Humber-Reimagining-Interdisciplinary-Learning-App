
'use client';

import { StepByStepDtypes } from "@/types/profile/step-by-step.types";

export default function FoundationFirst({topics,
  totalCount,
}: StepByStepDtypes) {
    return (
        <>
      <div className="h-2 w-full bg-gray-400 rounded-lg mt-4 relative">
        {/* Progres Tabs */}
        <div
          className={`h-2 bg-gray-700  w-1/2 rounded-lg mt-2 relative`}
          style={{
            width: `${(totalCount() / 18) * 100}%`,
          }}
        ></div>
      </div>
      <p className="py-3 text-sm font-bold text-gray-500 text-right">
        {totalCount()}/18 Completed
      </p>
      <p className="text-gray-600">
        A little overview of how this path is structured. Study by covering the
        key concepts first then devlving deeper into each topic one by one.
      </p>
        </>
    )
}

