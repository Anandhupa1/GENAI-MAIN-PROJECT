import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { PineconeClient } from "@pinecone-database/pinecone";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { CharacterTextSplitter } from "langchain/text_splitter";

import { NextResponse } from "next/server";

export async function POST (req:Request,res:Response) {
    try {
        let envVariable = process.env.OPENAI_API_KEY
        
        const client = new PineconeClient();

        await client.init({
          apiKey: process.env.PINECONE_API_KEY,
          environment: process.env.PINECONE_ENVIRONMENT,
        });
    
        const pineconeIndex = client.Index(process.env.PINECONE_INDEX);
        console.log(client)
        return NextResponse.json({message:"okay",client},{status:200})
    

    } catch (error) {
        return NextResponse.json({message:"error",error},{status:500})
    }
    
   }