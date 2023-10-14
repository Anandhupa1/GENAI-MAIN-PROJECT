import { QdrantVectorStore } from "langchain/vectorstores/qdrant";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import {QdrantClient} from '@qdrant/js-client-rest';
import { NextRequest, NextResponse } from "next/server";
import connectDb from "../connection";
import RecipeModel from "../pinecone/recipe.model";
connectDb();

export async function GET(req:Request,res:Response) {
    try {
        const recipes = await RecipeModel.find({}, { _id: 0, key: "$_id", name: 1, description: 1,imageUrl:1,expense:1,type:1,instructions:1 });
        //stringifying all documents.
        const recipesStrings = recipes.map(recipe => JSON.stringify(recipe)); 
        //storing data in qdrant vectorStore--------------------------------
        const client = new QdrantClient({
            url: process.env.QDRANT_HOST,
            apiKey: process.env.QDRANT_API_KEY,
        });
        const vectorStore = await QdrantVectorStore.fromTexts(
            recipesStrings,
            [ ],
            new OpenAIEmbeddings(),
            {
              url: process.env.QDRANT_HOST,
              collectionName: "RecipeChatBot",
            }
          );
          

        return NextResponse.json({message:"ok"},{status:200})
    } catch (error) {
        return  NextResponse.json({message:"error",error},{status:500})
    }
}