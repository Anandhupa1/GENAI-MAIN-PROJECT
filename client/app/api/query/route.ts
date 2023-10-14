import { QdrantVectorStore } from "langchain/vectorstores/qdrant";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import {QdrantClient} from '@qdrant/js-client-rest';
import { RetrievalQAChain } from "langchain/chains";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { BufferMemory } from "langchain/memory";
import ChatModel from "../chat/chat.model";
import connectDb from "../connection";

connectDb()


export async function POST(req:Request,res:Response) {
    try {
        let body = await req.json()
        let query = body.query;
        if(!body.query || !body.chatId){ return  NextResponse.json({message:"please provide chatId with query"},{status:422})}
        else{
        const vectorStore = await QdrantVectorStore.fromExistingCollection(
            new OpenAIEmbeddings(),
            {
              url: process.env.QDRANT_URL,
              collectionName: "RecipeChatBot",
            }
          );
          
          // const response = await vectorStore.similaritySearch(query, 1);
          
          //------experimenting
          
          const model = new ChatOpenAI({
            streaming:true,
            callbacks: [
              {
                handleLLMNewToken(token) {
                  console.log(token)
                  // sse.send(token, "newToken");
                },
              },
            ],
          });
          let qa = RetrievalQAChain.fromLLM(
            model,
            vectorStore.asRetriever(),
          );



          let question = `Act as a chat bot , which will recommend recipes to users in a polite way. give detailed overview including
                          ingredients, how to cook, expense etc available to a recipe except it's imageUrl.
                          please answer the followig query , query : ${query} ,
                  
          `
          const response = await qa.call({query: question });
          
//fetching data from microservice 1;------------------------------------------
   // Your request body data
   console.log("request send to external api.........")
   const requestBody = {
    query
  };

  // Making a POST request to the external API
  const externalApiResponse = await fetch('http://127.0.0.1:5000/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  // Check if the request was successful
  if (!externalApiResponse.ok) {
    throw new Error('Failed to fetch from the external API');
  }

  // Parse the response from the external API
  const externalApiData = await externalApiResponse.json();
  console.log(externalApiData)
  response.similiarItems=externalApiData.data;
//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
          //updating chat data in database
          
          let newChat ={user:query,bot:response}
          let data = await ChatModel.findByIdAndUpdate(
            body.chatId, 
            { $push: { data: newChat } }, 
            { new: true, useFindAndModify: false }
          );

        return NextResponse.json({message:"ok",data},{status:200})
     }
    } catch (error) {
        console.log(error)
        return  NextResponse.json({message:"error",error},{status:500})
    }
}

export async function GET(req:Request,res:Response) {
  try {
    return NextResponse.json({message:"ok"})
  } catch (error) {
    console.log(error)
  }
}