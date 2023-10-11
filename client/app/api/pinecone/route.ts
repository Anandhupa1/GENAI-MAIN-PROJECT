import { QdrantVectorStore } from "langchain/vectorstores/qdrant";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import {QdrantClient} from '@qdrant/js-client-rest';
import { NextResponse } from "next/server";
import connectDb from "../connection";
import RecipeModel from "./recipe.model";
let docs = [
    `{ name: "parotta",  description: "parotta is from china" }`,
    `{ name: "biryany", description: "its a spicy good dish from india" }`,
    `{ name: "payasam",  description: "its a sweet dish from kerala" }`,
    `{ name: "ladu1",  description: "its a sweet dish from India" }`,
  ];


connectDb()

export async function POST (req:Request,res:Response) {
    try {
    let data = await RecipeModel.find();
    console.log(data)
    return NextResponse.json({message:"okay",data},{status:200})
// text sample from Godel, Escher, Bach

const client = new QdrantClient({
    url: process.env.QDRANT_HOST,
    apiKey: process.env.QDRANT_API_KEY,
});

// from qdrant_client.models import Distance, VectorParams
const vectorStore = await QdrantVectorStore.fromTexts(
   docs,
    [ ],
    new OpenAIEmbeddings(),
    {
      url: process.env.QDRANT_HOST,
      collectionName: "goldel_escher_bach",
    }
  );
  
  const response = await vectorStore.similaritySearch("suggest me sweet dish for my child from india",2);
  
  console.log(response);
console.log("successfully data added...")

        // return NextResponse.json({message:"okay"},{status:200})
    

    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"error",error},{status:500})
    }
    
   }