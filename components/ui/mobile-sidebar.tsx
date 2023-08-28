"use client"
import { Button } from "./button";
import { Menu  } from "lucide-react";
import { Sheet,SheetTrigger,SheetContent } from "./sheet";
import Sidebar from "../sidebar";
import { useEffect, useState } from "react";

interface MobilebarProps{
    apiLimitCount:number;
    isPro : boolean;
}
const MobileSidebar = ( {
    apiLimitCount=0,
    isPro=false
}:MobilebarProps) => {
    const [isMounted,setIsMounted] = useState(false);
    useEffect(()=>{
            setIsMounted(true);
    },[]);
    if(!isMounted){
        return null;
    }
    return ( 
        <Sheet>
        <SheetTrigger>
        <Button variant="ghost" size="icon"
            className="md:hidden">

            <Menu/  >
            </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
            <Sidebar isPro={isPro} apiLimitCount={apiLimitCount}/>
        </SheetContent>
        </Sheet>
     );
}
 
export default MobileSidebar;