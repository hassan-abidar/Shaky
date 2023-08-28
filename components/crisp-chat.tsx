"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat =()=>{
    useEffect(()=>{
        Crisp.configure("9db8c401-cfb9-48df-b148-ddf5d3b53be0");
    },[]);
    return null;
}