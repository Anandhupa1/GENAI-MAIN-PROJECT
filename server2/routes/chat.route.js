const { ChatModel } = require("../models/chat.model");
const chatRouter = require("express").Router();
require("dotenv").config();
const { QdrantVectorStore } = require("langchain/vectorstores/qdrant");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { QdrantClient } = require('@qdrant/js-client-rest');
const { RetrievalQAChain } = require("langchain/chains");
const OpenAI = require("openai");
const { ChatOpenAI } = require("langchain/chat_models/openai");
const { BufferMemory } = require("langchain/memory");

chatRouter.post('/new', async (req, res) => {
  try {
    const body = req.body;

    if (!body.userId) {
      return res.status(422).json({ message: 'Please provide userId' });
    }

    if (!body.type || !['recommend', 'location', 'other'].includes(body.type)) {
      return res.status(422).json({ message: 'Please provide a valid type of chat (recommend | location | other)' });
    } else {
      const newChat = new ChatModel(body);
      const output = await newChat.save();

      return res.status(201).json({ message: 'ok', data: output });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error', error });
  }
});

chatRouter.post("/",async(req,res)=>{
    try {
        let body = req.body;
        let query = body.query;
        if(!body.query || !body.chatId){ res.status(422).json({message:"please provide chatId with query"})}
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
     console.log("external api data not available.....$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
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

        res.status(201).json({message:"ok",data})
     }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"error",error})
    }
})

chatRouter.get("/getChat/:id",async(req,res)=>{
  try {
    let id = req.params.id;
    let data = await ChatModel.findById(id);
    res.send(data)
  } catch (error) {
    console.log(error);
    res.status(500).send({message:error,error})
  }
})
chatRouter.get("/delChat/:id",async(req,res)=>{
  try {
    let id = req.params.id;
    let data = await ChatModel.findByIdAndDelete(id)
    res.send({message:"ok"})
  } catch (error) {
    console.log(error);
    res.status(500).send({message:error,error})
  }
})








module.exports={chatRouter}