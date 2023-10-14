const express = require("express");
require("dotenv").config();
const { connection } = require("./config/connection");
const { chatRouter } = require("./routes/chat.route");
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer,{cors:{origin:"*"}})
const cors = require("cors");
const { userRouter } = require("./routes/user.route");
const port = process.env.PORT || 8001;
app.use(express.json());
app.use(cors());
//------------------------------------------
const { QdrantVectorStore } = require("langchain/vectorstores/qdrant");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { QdrantClient } = require('@qdrant/js-client-rest');
const { RetrievalQAChain } = require("langchain/chains");
const OpenAI = require("openai");
const { ChatOpenAI } = require("langchain/chat_models/openai");
const { BufferMemory } = require("langchain/memory");
const { ChatModel } = require("./models/chat.model");


app.get("/",async(req,res)=>{
    try {
        res.send("home page")
    } catch (error) {
        res.status(500).json({message:"error"})
    }
})
app.use("/chat",chatRouter);
app.use("/user",userRouter);


io.on("connection",(socket)=>{
    
    // socket.emit("message","hi welcome");
    //taking queries from user and responding with socket ...
    socket.on("query",async(body)=>{
//)))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
let query = body.query;
        if(!body.query || !body.chatId){ socket.emit("error","please provide chatId with query")}
        else{
        
        const vectorStore = await QdrantVectorStore.fromExistingCollection(
            new OpenAIEmbeddings(),
            {
              url: process.env.QDRANT_URL,
              collectionName: "RecipeChatBot",
            }
          );
          //------experimenting
          
          const model = new ChatOpenAI({
            modelName:"gpt-3.5-turbo",
            streaming:true,
            temperature:1.5,
            // modelKwargs:10,
            callbacks: [
              {
                handleLLMNewToken(token) {
               
                  socket.emit("token",token)
                  
                },
             
              },
            ],
          });
          let qa = RetrievalQAChain.fromLLM(
            model,
            vectorStore.asRetriever(),
          );



          let question = `Act as a food recommending chat bot , which will recommend recipe to user in a polite way. give detailed overview including
                          ingredients, how to cook, expense etc available to a recipe except it's imageUrl.use imojicons in output.
                          please answer the followig query , query : ${query} ,
                  
          `
          const response = await qa.call({query: question })
          
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
      
        }
        

//)))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
    //   io.emit("card1",data)
    })

})






httpServer.listen(port,async()=>{
    try {
        await connection
        console.log("connected to remote db")
    } catch (error) {
        console.log("error in connection", error)
    }
    console.log(`app started @ http://localhost:${port}`)
})