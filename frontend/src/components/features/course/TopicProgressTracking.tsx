
export default function TopicProgressTracking() {
    const colors = ['green', 'amber', 'pink', 'lime', 'blue', 'indigo', 'rose']
    console.log(colors)
    return (
        <>
            <aside className="text-white m-8">
                <ul className="relative gap-8">
                    
                    {
                        colors.map((color,index) => (
                            <li className={`flex my-10 relative  items-center justify-center h-10 w-10 bg-${color}-600 rounded-full outline-${color}-600 outline-4 border-5 border-${color}-900  shadow-[0_0_20px_5px_rgba(34,197,94,0.6)]`} key={index}>
                                <span className="absolute mt-1 text-sm bg-white text-black rounded-xl px-2 opacity-70">
                                    {color}
                                </span>
                            </li>
                        ))
                    }
                    {/* <li className="relative flex items-center justify-center h-10 w-10 bg-indigo-600 rounded-full outline-rose-600 outline-4 border-5 border-blue-900  shadow-[0_0_20px_5px_rgba(34,197,94,0.6)]">
                        <span className="absolute mt-1 text-sm bg-white text-black rounded-xl px-2">
                            Topics
                        </span>
                    </li> */}
                </ul>
            </aside>
        </>
    )
}