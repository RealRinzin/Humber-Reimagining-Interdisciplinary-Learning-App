'use client'
import { faAngleDown, faAngleUp, faCheck, faVial, faCopy } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark, solarizedlight, solarizedDarkAtom } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from "react";

interface contentProps {
  title: string,
  content: string
  icon: IconDefinition;
  type: string,
}
//
export default function CourseTabs({ title, content, icon, type }: contentProps) {
  const [drop, setDrop] = useState(false);
  const [isChecked, setIsChecked] = useState(false)
  return (
    <section className="my-5" >
      <div className="flex justify-between bg-slate-100 p-3 rounded-md">
        <h2 className="text-xl font-bold text-gray-600">
          <FontAwesomeIcon icon={icon} size="1x" /> {title}
          <FontAwesomeIcon
            icon={drop ? faAngleUp : faAngleDown}
            size="1x"
            onClick={() => setDrop(prev => !prev)}
            className="cursor-pointer text-gray-600 px-2"
          />
        </h2>
        <div className={`h-8 w-8 rounded-full border-6  ${isChecked ? 'bg-green-600 border-green-600 hover:cursor-pointer' : 'bg-slate-400 border-slate-600 hover:border-green-600 hover:cursor-pointer hover:bg-white transition duration-300 ease-in-out'}  
 hover:shadow-[0_0_10px_3px_rgba(34,197,94,0.6)]`} onClick={() => setIsChecked(prev => !prev)}>
          {
            isChecked ? (<FontAwesomeIcon icon={faCheck} size="1x" className="text-white" />) : ''
          }
        </div>
      </div>
      <div className={`relative p-3 ${drop ? "block" : "hidden"}`}>
        {/* <div className={`relative p-3`}> */}
        <p className="absolute right-10 my-4"><FontAwesomeIcon icon={faCopy} size="1x" className="text-white hover:cursor-pointer" /></p>
        {/* Check the Type for the format */}
        {
          type === 'code' ?
            <SyntaxHighlighter language="cpp" style={solarizedDarkAtom}>
              {content}
            </SyntaxHighlighter> :
            type === 'rambling' ? 'Rambling' :
              type === 'tyk' ? 'Testing Your knowledge' :
                type === 'tldnw' ? 'Later watch' :
                  // Resources Component
                  type === 'resources' ? 'Documents' : content

        }
      </div>
    </section>
  )
}
