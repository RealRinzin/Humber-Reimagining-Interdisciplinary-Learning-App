import { faMagnifyingGlassMinus, faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function TopicProgressTracking() {
    const colors = ['green', 'amber', 'pink', 'lime', 'blue', 'indigo', 'rose']
    const tracking = [
        { color: 'green', status: true },
        { color: 'amber', status: false },
        { color: 'pink', status: true },
        { color: 'lime', status: false },
        { color: 'blue', status: true },
        { color: 'indigo', status: false },
    ]
    console.log(tracking)
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
                <ul className="relative gap-8">
                    {
                        tracking.map((color, index) => (
                            <li className={`flex my-10 h-12 w-12 relative  items-center justify-center rounded-full ${color.status ? `bg-pink-600 outline-pink-600 border-pink-900` : `bg-green-600 outline-green-600 border-green-900`}   outline-4 border-5  shadow-[0_0_20px_5px_rgba(34,197,94,0.6)]`}
                                key={index}
                                style={{
                                    marginLeft: `calc(${Math.random() * 90}% - ${Math.random() * 80}px)`
                                }}
                            >
                                <span className="absolute mt-1 text-sm bg-white text-black rounded-xl px-2 opacity-80">
                                    {color.color}
                                </span>
                            </li>
                        ))
                    }
                </ul>
            </aside>
        </>
    )
}