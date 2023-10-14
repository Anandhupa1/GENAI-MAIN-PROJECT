import { NextResponse } from "next/server"
import ChatModel from "./chat.model"
import connectDb from "../connection"
connectDb()

//login 
export async function POST(req:Request,res:Response) {
    try {
        let body = await req.json()
        
        if(!body.userId){return NextResponse.json({message:"please provide userId"},{status:422})}
        if(!body.type){return NextResponse.json({message:"please the type of chat (recommend | location | other)"},{status:422})}
        else {
            let newChat = new ChatModel(body);
            let output = await newChat.save();
            
            return NextResponse.json({message:"ok",data:output},{status:201})

        }


       
    } catch (error) {
        console.log(error)
        return  NextResponse.json({message:"error",error},{status:500})
    }
}
