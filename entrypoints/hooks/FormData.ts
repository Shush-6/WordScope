import { useEffect, useState } from "react";
export interface IFormData{
    apiKey: string;
    endpoint: string;
}

export const useFormData = ()=>{
    const [FormData,setFormData]= useState<IFormData>({
        apiKey: "",
        endpoint: ""
    });
    useEffect(()=>{
        chrome.storage.local.get(["FormData"],(result)=>{
            if(result.FormData){
                setFormData(result.FormData as IFormData);
            }
        });
    },[]);
    return {FormData, setFormData};
};
