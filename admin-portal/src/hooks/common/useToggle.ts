import { useCallback,useState } from "react";

export function useToggle(initialValue:boolean){
    const [isOn,setIsOn] = useState(initialValue);
    const toggle = useCallback(()=>setIsOn(prev => !prev),[]);
    return {isOn,toggle};
}