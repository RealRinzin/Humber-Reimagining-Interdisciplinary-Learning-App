import React from "react";

export default function InteractiveDemo({ interactive }: any) {
  return (
    <div>
      {interactive &&
        interactive?.map((interactive:any,index:number) => (
          <div key={index} className="grid grid-cols-1">
            <p className="py-4">{interactive.description}</p>

            <iframe
              src={`${process.env.NEXT_PUBLIC_UPLOAD_FILE_PATH}/interactives/${interactive.path}.html`}
              className="w-full h-screen border-0 rounded-lg"
            />
          </div>
        ))}
    </div>
  );
}
