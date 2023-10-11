import { QdrantVectorStore } from "langchain/vectorstores/qdrant";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import {QdrantClient} from '@qdrant/js-client-rest';
import { NextResponse } from "next/server";

export async function POST (req:Request,res:Response) {
    try {

// text sample from Godel, Escher, Bach

const client = new QdrantClient({
    url: process.env.QDRANT_URL,
    apiKey: process.env.QDRANT_API_KEY,
});

// from qdrant_client.models import Distance, VectorParams
  
const vectorStore = await QdrantVectorStore.fromExistingCollection(
    new OpenAIEmbeddings(),
    {
      url: process.env.QDRANT_URL,
      collectionName: "goldel_escher_bach",
    }
  );
  
  const response = await vectorStore.similaritySearch("scared", 2);
  
  console.log(response);
  
  console.log(response);
console.log("successfully data retrieved...")

        return NextResponse.json({message:"okay"},{status:200})
    

    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"error",error},{status:500})
    }
    
   }