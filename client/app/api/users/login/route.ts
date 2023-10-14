import { NextResponse } from "next/server"
import usersModel from "../users.model"
import bcrypt from 'bcrypt';

//login 
export async function POST(req:Request,res:Response) {
    try {
        let body = await req.json()
        
        if(!body.name){return NextResponse.json({message:"please provide your name"},{status:422})}
        if(!body.email){return NextResponse.json({message:"please provide your email"},{status:422})}
        else if(!body.password || body.password.length<4){return NextResponse.json({message:"please provide a strong password"},{status:422})}
        else {
                let userExists = await usersModel.findOne({email:body.email})
                if(!userExists){ return NextResponse.json({message:"No user exists with this email, please register"},{status:404});}
                else{
                //save user to database..
                let mongoPassword = userExists["password"];
                const isPasswordValid = await bcrypt.compare(body.password,mongoPassword);
                if (!isPasswordValid) {
                    return NextResponse.json({message:"wrong password"},{status:422})
                }else{
                    return NextResponse.json({message:"ok",token:userExists["_id"]},{status:200});
                }

              
                }


            
        }


       
    } catch (error) {
        console.log(error)
        return  NextResponse.json({message:"error",error},{status:500})
    }
}
