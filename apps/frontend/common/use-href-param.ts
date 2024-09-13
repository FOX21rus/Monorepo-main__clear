import {useEffect, useState} from "react";

export const useHrefParam = (paramKey:string,def?:string)=>{
    const [val,setVal]=useState<string|undefined>(def)
    useEffect(()=>{
        if (document.location.search){
            setVal(document.location.search.split(`${paramKey}=`)[1])

        }
    },[])
    console.log('val',val)
    return val;
}