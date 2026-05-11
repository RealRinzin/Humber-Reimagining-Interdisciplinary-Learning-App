interface checkBox{
    name:string,
    // label:string
}
export default function Checkbox({name}:checkBox){
    return(
      <label className="flex items-center gap-3 cursor-pointer mt-4" htmlFor={name}>
        <div className="relative">
          <input
            id={name} // connect id to htmlFor
            type="checkbox"
            className="sr-only peer"
          />
          <div className="w-14 h-7 bg-red-500 peer-checked:bg-green-500 rounded-full transition-colors duration-300" />
          <div className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow peer-checked:translate-x-7 transition-transform duration-300" />
        </div>
        <span className="text-sm font-medium text-gray-900 first-letter:uppercase">{name}</span>
      </label>
    )
}