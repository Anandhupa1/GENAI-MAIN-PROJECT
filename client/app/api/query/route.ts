import { QdrantVectorStore } from "langchain/vectorstores/qdrant";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import {QdrantClient} from '@qdrant/js-client-rest';
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:Request,res:Response) {
    try {
        let body = await req.json()
        let query = body.query;
        const vectorStore = await QdrantVectorStore.fromExistingCollection(
            new OpenAIEmbeddings(),
            {
              url: process.env.QDRANT_URL,
              collectionName: "RecipeChatBot",
            }
          );
          
          const response = await vectorStore.similaritySearch(query, 1);
      








        return NextResponse.json({message:"ok",response},{status:200})
    } catch (error) {
        return  NextResponse.json({message:"error",error},{status:500})
    }
}