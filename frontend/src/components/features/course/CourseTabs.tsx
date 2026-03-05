'use client'
import { faAngleDown, faAngleUp, faCheck, faVial } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark,solarizedlight,solarizedDarkAtom } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from "react";
// export default function CourseTabs({ title,status,icon }: { title: string,status:boolean,icon:IconDefinition }) {
export default function CourseTabs({ title, status }: { title: string, status: boolean }) {
  const [drop, setDrop] = useState(true);
  const code = `
// Grab a 3D vertex from Paul Neale's model and turn it into 4D

Vec4 vertexPos = Vec4(vertex.x, vertex.y, vertex.z, 1);

// Pretend we already have the 4x4 matrices in the following steps built

// modelMatrix takes you from model to world space

Vec4 vertexPosWorldSpace = modelMatrix * vertexPos;

// viewMatrix takes you from world to camera space

Vec4 vertexPosCameraSpace = viewMatrix * vertexPosWorldSpace;

// projectionMatrix takes you from camera to NDC space (after dividing out the w)

Vec4 vertexPosNdcSpace = projectionMatrix * vertexPosCameraSpace;

vertexPosNdcSpace.x /= vertexPosNdcSpace.w;

vertexPosNdcSpace.y /= vertexPosNdcSpace.w;

vertexPosNdcSpace.z /= vertexPosNdcSpace.w;

vertexPosNdcSpace.w = 1;

// Lastly the viewportMatrix takes you from NDC to screen space

Vec4 vertexPosScreenSpace = viewportMatrix * vertexPosNdcSpace;
`
  return (
    <section className="my-2" >
      <div className="flex justify-between bg-slate-300 p-3 rounded-sm">
        <h2 className="text-xl font-bold text-gray-600 ">
          <FontAwesomeIcon icon={faVial} size="1x" /> {title}
          <FontAwesomeIcon
            icon={drop ? faAngleUp : faAngleDown}
            size="1x"
            onClick={() => setDrop(prev => !prev)}
            className="cursor-pointer"
          />
        </h2>
        <div className={`h-8 w-8 rounded-full border-6  ${status ? 'bg-green-600 border-green-600' : 'bg-slate-400 border-slate-600 hover:border-green-600 hover:cursor-pointer hover:bg-white transition duration-300 ease-in-out'}  
 hover:shadow-[0_0_10px_3px_rgba(34,197,94,0.6)]`}>
          {
            status ? (<FontAwesomeIcon icon={faCheck} size="1x" className="text-white" />) : ''
          }
        </div>
      </div>
      <div className={`p-3 ${status ? "block" : "hidden"}`}>
        <SyntaxHighlighter language="cpp" style={solarizedDarkAtom}>
          {code}
        </SyntaxHighlighter>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
      </div>
    </section>
  )
}
