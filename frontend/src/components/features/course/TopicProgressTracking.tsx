
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
                <ul className="relative gap-8">
                    {
                        tracking.map((color, index) => (
                            <li className={`flex my-10 relative  items-center justify-center h-10 w-10 rounded-full ${color.status?`bg-pink-600 outline-pink-600 border-pink-900`:`bg-green-600 outline-green-600 border-green-900`}  outline-4 border-5  shadow-[0_0_20px_5px_rgba(34,197,94,0.6)]`} key={index}>
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