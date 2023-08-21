import { auth,currentUser } from "@clerk/nextjs";

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { absolutUrl } from "@/lib/utils";
import prismadb from "@/lib/prismadb";
import { use } from "react";

const settingsUrl = absolutUrl("/settings");

export async function GET() {
    try{
        const {userId}=auth();
        const user = await currentUser();
        if(!userId || !user){
            return new NextResponse("Unauthorized",{status:401});
        }
        
    }catch(error){
        console.log("[STRIPE_ERROR]",error);
        return new NextResponse("Internal error",{status:500});
    }
}