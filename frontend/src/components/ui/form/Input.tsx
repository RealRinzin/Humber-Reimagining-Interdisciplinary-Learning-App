import { InputTypes } from "@/types/form/input.types";

export default function Input({type,name}:InputTypes){
    return(
        <>
            <label htmlFor={name}>
              <input
                type={type}
                name={name}
                className="h-4 w-4 rounded border-4 border-gray-600 bg-white checked:border-amber-500 checked:bg--500 "
              />
              <span className="px-3">{name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}</span>
            </label>
        </>
    )
}