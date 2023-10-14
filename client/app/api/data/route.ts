import { NextRequest, NextResponse } from "next/server";
import connectDb from "../connection";
import RecipeModel from "../pinecone/recipe.model";
connectDb();

export async function GET(req:Request,res:Response) {
    try {
        const recipes = await RecipeModel.find({}, { _id: 0, key: "$_id", name: 1, description: 1,imageUrl:1,expense:1,type:1,instructions:1 });
        //stringifying all documents.

        return NextResponse.json(recipes,{status:200})
    } catch (error) {
        return  NextResponse.json({message:"error",error},{status:500})
    }
}