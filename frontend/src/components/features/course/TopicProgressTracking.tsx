import { faMagnifyingGlassMinus, faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

export default function TopicProgressTracking() {
    const colors = ['green', 'amber', 'pink', 'lime', 'blue', 'indigo', 'rose']
    const tracking = [
        { color: 'Rotation', status: true },
        { color: 'Model Space', status: false },
        { color: 'Vertex Position', status: true },
        { color: 'Scale', status: false },
        { color: 'Translation', status: true },
        { color: 'Matrix', status: false },
        { color: 'Projection', status: false },
    ]
    return (
        <>
            <aside className="text-white m-8">
                <div className="flex justify-end items-center">
                    <div className="flex gap-3 items-center justify-center bg-slate-700 rounded px-3 py-1 ">
                        <span className="text-sm ">Tracking</span>
                        <span><input type="checkbox" className="" /></span>
                    </div>
                </div>
                <div className="flex flex-col justify-end items-end gap-2 my-2">
                    <FontAwesomeIcon icon={faMagnifyingGlassPlus} size="1x" className="text-white bg-slate-700 p-1 rounded" />
                    <FontAwesomeIcon icon={faMagnifyingGlassMinus} size="1x" className="text-white bg-slate-700 p-1 rounded" />
                </div>
                <ul className="relative gap-4">
                    {
                        tracking.map((color, index) => (
                            <React.Fragment key={index}>
                                <li className={`flex h-12 w-12 relative items-center justify-center rounded-full ${color.status ? `bg-pink-600 outline-pink-600 border-pink-900` : `bg-green-600 outline-green-600 border-green-900`}   outline-4 border-5  shadow-[0_0_20px_5px_rgba(34,197,94,0.6)]`}
                                    style={{
                                        marginLeft: `calc(${Math.random() * 90}% - ${Math.random() * 80}px)`
                                    }}
                                >
                                    <a className="absolute text-center mt-1 text-sm bg-white text-black rounded-xl px-2 opacity-80 w-30">
                                        {color.color}
                                    </a>
                                </li>
                                <li className="border border-slate-700 h-28 w-0"
                                    style={{
                                        // transform: `rotate(${Math.random()*90}deg)` /* tilts 10 degrees 
                                    }}
                                ></li>
                            </React.Fragment>

                        ))
                    }
                </ul>
            </aside>
        </>
    )
}