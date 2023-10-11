import { NextResponse } from "next/server";
import RecipeModel from "../recipe.model";
import connectDb from "../../connection";
connectDb()
export async function POST (req:Request,res:Response) {
    try {
        let data = await req.json();
        if(!data.name){return NextResponse.json({message:"please provide dish name"},{status:422})}
        else if(!data.imageUrl){return NextResponse.json({message:"please provide image of dish in url format"},{status:422})}
        else if(!data.description){return NextResponse.json({message:"please provide a detailed description about the preparation of the dish"},{status:422})}
        else if(!data.expense){return NextResponse.json({message:"please provide a the overall expense to create this dish. "},{status:422})}
        else if(!data.type){return NextResponse.json({message:"please provide type of recipe [veg | non-veg] "},{status:422})}
        else {
            let newRecipe = new RecipeModel(data);
            let output = await newRecipe.save();
            return NextResponse.json({message:"ok",data:output},{status:201})
        }
      
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"error",error},{status:500})
    }
}
export async function GET(req:Request,res:Response) {
    try {
        let data = await RecipeModel?.find();
        return NextResponse.json({message:"ok",data},{status:200})
    } catch (error) {
        return NextResponse.json({message:"error",error},{status:500})
    }
}