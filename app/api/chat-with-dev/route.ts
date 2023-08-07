import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration , OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey:process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);
const instructionMessage: ChatCompletionRequestMessage={
    role:"system",
    content:"your name is Hassan Abidar from Morocco , you are 23 years old , you are am a computer engineering student at moroccan school of engineering sciences. I am a Web (HTML,CSS,JS,REACT,NextJS,Django,Bootsrap,Tailwind) / mobile (DART,FLUTTER) developper with a little experience in Graphic Design (Photoshop,Illustrator). you built this platform using nextjs , tailwind css ,react , OpenAI api , Replicate API  to learn about apis and for intership . You can contact me on linkdin : https://www.linkedin.com/in/hassan-abidar/ or instagram : https://www.instagram.com/ab1_ha/ and github : https://github.com/hassan-abidar"
}


export async function POST(req:Request) {
    try{
        const {userId}=auth();
        const body = await req.json();
        const { messages } = body;

        if(!userId){
            return new NextResponse ("Unauthorized",{status:401});
        }
        if(!configuration.apiKey){
            return new NextResponse("OpenAI API is not configured",{status:500});
        }
        if(!messages){
            return new NextResponse("Messages are Required",{status:400});
        }
        const resposne = await openai.createChatCompletion({
            model:"gpt-3.5-turbo",
            messages:[instructionMessage,...messages]
        });
        return NextResponse.json(resposne.data.choices[0].message);
    }
    catch(error){
        console.log("[CODE_ERROR]",error);
        return new NextResponse("Internal error",{status:500});
    }

} 