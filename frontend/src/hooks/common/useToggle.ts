// Hook
// This hook is mainly to open and close utility for all the 
// component that required on and off features

import { useCallback, useState } from "react";
// Use Hook function for the toggle back and forth
export function useToggle(initivalValue:boolean){
    // Initialized the use state value
    const [isOn,setIsOn] = useState(initivalValue)
    // Create invoke function to set on and off depend on the last record
    const toggle = useCallback(()=>setIsOn(prev => !prev),[])
    // return both set and function to use in other components
    
    return {isOn,toggle}
}
