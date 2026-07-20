
export default function Ring({color}:any) {
  return (
    <>
      <div className={`bg-${color}/60 ring-3 ring-${color} ring-offset-4 rounded-full h-5 w-5`}></div>
      {/* <div className="bg-pink-600/60 ring-3 ring-pink-600 ring-offset-4 rounded-full h-5 w-5"></div>
      <div className="bg-blue-600/60 ring-3 ring-blue-600 ring-offset-4 rounded-full h-5 w-5"></div>
      <div className="bg-purple-600/60 ring-3 ring-purple-600 ring-offset-4 rounded-full h-5 w-5"></div> */}
    </>
  )
}
