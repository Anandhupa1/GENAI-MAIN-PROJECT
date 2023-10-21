"use client"
import { FaCircleRight,FaSortAmountUp } from "react-icons/fa6";
import { LiaSortAmountUpSolid, LiaCutSolid } from "react-icons/lia";
import  { useEffect, useRef, useState } from "react"
import io from "socket.io-client";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";

const nodeServer = "https://foodchatbackend.onrender.com"||"http://localhost:8001"; //production
// const nodeServer = "http://localhost:8001"; 
// const pythonServer = "http://127.0.0.1:5000";
const pythonServer = "https://pythonmicroservice1.onrender.com";
const socket = io(nodeServer);

function Chat() {

// localStorage.setItem("userId","65282c762b343032bfedd7cf")
let userId = "65282c762b343032bfedd7cf"
let [chatId ,setChatId]=useState("");
let [currentChat,setCurrentChat] =useState([]);
let [loading,setLoading]=useState(false);
let [userData,setUserData] =useState({})
let [similiarList,setSimiliarList]=useState([]);
let [stream,setStream]=useState("Ask me anything related to food....")
let query = useRef()
const [error, setError] = useState(null);
const [userUpdationCount,setUserUpdationCount]=useState(0)
//fetching user data 
useEffect(()=>{
    (async function fetchUser(){
    try {
        let res = await fetch(`${nodeServer}/user/${userId}`);
        let data = await res.json();
        
        setUserData(data);
        localStorage.setItem("userData",JSON.stringify(data))
        
    } catch (error) {
        console.log(error)
        alert(error)
    }
})()
},[userUpdationCount])

//delete a chat 
async function deleteChat(id){
  try {
    let res = await fetch (`${nodeServer}/chat/delChat/${id}`);
    let data = await res.json();
    if(data.message=="ok"){
        if(chatId==id){setCurrentChat([]);setChatId(false)}
        alert("successfully deleted")}
    else{alert("unable to delete")}
    setUserUpdationCount(userUpdationCount+1)
  } catch (error) {
    alert(error)
    console.log(error)
  }
}


//fetch chat ✅
async function fetchChat(id){
    try {
        setChatId(id);
        let res = await fetch (`${nodeServer}/chat/getChat/${id}`);
        let data = await res.json();
        setCurrentChat(data["data"])
    } catch (error) {
        console.log(error)
    }
}
//create new chat 
async function createChat(){
try {
    let res = await fetch(`${nodeServer}/chat/new`, {
        method: "POST",
        body: JSON.stringify({
            userId,
            type:"recommend"
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
    let data = await res.json();
    if(data.message=="ok"){
        
        alert("successfully created")}
    else {alert("unable to create chat.")}
    setUserUpdationCount(userUpdationCount+1)
} catch (error) {
    alert(error)
}
}

const processToken = (token) => {
    return token.replace(/\\n/g, "\n").replace(/\"/g, "");
  };
//socket io start >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
socket.on("token",(token)=>{
    if(token){
    if(token=="9526332548"){
    console.log(token)
    console.log("done")
    }else{setStream(stream+processToken(token))}
}
})


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function submitQuery(){
    setStream("")
    socket.emit("query",{query:query.current.value,chatId})
    
}

async function fetchSimiliarItems(){
    try {

        // alert("I am gonna fetch similiar items..");
        fetchChat(chatId)
        setSimiliarList([])
        let res = await fetch(`${pythonServer}/search`, {
            method: 'POST',
            body: JSON.stringify({query:query.current.value , chatId}),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
        let data = await res.json();
        
        // setTimeout(() => {
        //     setSimiliarList(data["data"])
        // }, 6000);
        
        setSimiliarList(data["data"])
        console.log("set similiaritems")

      
    } catch (error) {
        // alert(error);
        console.log(error)
    }
  

}



  return (
    <>
<div className="techwave_fn_content">
		
        {/* <!-- PAGE (all pages go inside this div) --> */}
        <div className="techwave_fn_page">
            
            {/* <!-- AI Chat Bot Page --> */}
            <div className="techwave_fn_aichatbot_page fn__chatbot">
{chatId?
                <div className="chat__page">
                
                    <div className="font__trigger">
                        <span></span>
                    </div>
                    
                    <div className="fn__title_holder">
                        <div class="container">
                            {/* <!-- current chat title --> */}
                            <h1 className="title">Chat Data</h1>
                            
                        </div>
                    </div>
                    
                    <div className="container">
                        <div className="chat__list">
{/* chat data --------------------------------------------------------------------*/}


 <div className="chat__item active" id="chat1">

                                <div className="chat__box bot__chat">
                                    <div className="author"><span>Bot</span></div>
                                    <div className="chat">
                                        <p>👋 Hello, Culinary Explorer! 🍽 Welcome to the delightful world of flavors and aromas. 🌿 Whether you are craving a sweet treat or a spicy adventure, I am here to whisk you away on a tantalizing journey through recipes and culinary wonders! 🍰🌶 Tell me what you are in the mood for, and together, let’s concoct something scrumptious! 🚀 Whether you need a quick recipe suggestion, or just want to explore similar mouth-watering dishes, I am all ears! 🐰👂 Let’s cook up some magic together! ✨👩‍🍳</p>
                                    </div>
                                </div>
    {/* ------------------------------------------------------------------------------------------------------ */}
{ currentChat.length!=0?
currentChat.map((item,index)=>{
//_start_____________________________________________________________________________________________________________________
                               {/* user */}
if(item.role=="user"){
    return <div key={item.text} className="chat__box your__chat">
    <div className="author"><span>You</span></div>
    <div className="chat">
        <p>{item.text}</p>
    </div>
</div>
}else if(item.role=="bot"){
    return     <div key={item.text} className="chat__box bot__chat">
    <div className="author"><span>Bot</span></div>
    <div className="chat">
        <p>{item.text}</p>
        {/* similiarity search , map ---------------------------------------------- */}
        
        <div className="fn__tabs_content">
            <div id="tab1" className="tab__item active">
             
                <h6 style={{paddingTop:"20px"}} >You may like ....</h6>
                <ul  className="fn__model_items">
                
                {/* similiarity search maping.. */}
                {currentChat[index+1] && currentChat[index+1]["role"]=="api"?(
                            currentChat[index+1].similiarItems.map((elem)=>{
                                return <li key={elem.payload.name} style={{cursor:"pointer"}} className="fn__model_item">
                                    <div className="item">
                                        <div className="img">
                                            <img src={elem.payload.imageUrl} alt={elem.payload.name}/>
                                        </div>
                                        <div className="item__info">
                                            <h3 className="title">{elem.payload.name}</h3>
                                            <p className="desc">{elem.payload.description}</p>
                                        </div>
                                        <div className="item__author">
                                            <LiaSortAmountUpSolid/>
                                            <div style={{width: "70%"}} className="progressContainer">
                                                 <div className="progressFill" style={{width: `${Math.ceil(elem.score*100)}%`}}></div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                                })
                ):<p>Recommendations for this query is not available ......</p>}

                </ul>
            </div>
        </div>

        {/* ---------------------------------------------- */}
    </div>
</div>
}




                                 }) //map ends here
                                :
                                <h1></h1>
                               }

{/* ----------------------------------------------------------------------------------------------------------- */}
{/* stream */}
                                
<div className="chat__box bot__chat">
                                    <div className="author"><span>Bot</span></div>
                                    <div className="chat">
                                        <p>{stream}</p>
                                        {/* similiarity search , map ---------------------------------------------- */}
                                        <div className="fn__tabs_content">
                                            <div id="tab1" className="tab__item active">
                                         {similiarList.length!=0?<h6 style={{paddingTop:"20px"}} >similar items.......</h6>:<p>loading...</p>}
                                         
                                                
                                                <ul  className="fn__model_items">
                                                
                                                {/* similiarity search maping.. */}
                                                { similiarList.map((elem)=>{
                                                    
                                                    return <li key={elem.payload.name} style={{cursor:"pointer"}} className="fn__model_item">
                                                        <div className="item">
                                                            <div className="img">
                                                                <img src={elem.payload.imageUrl} alt={elem.payload.name}/>
                                                            </div>
                                                            <div className="item__info">
                                                                <h3 className="title">{elem.payload.name}</h3>
                                                                <p className="desc">{elem.payload.description}</p>
                                                            </div>
                                                            <div className="item__author">
                                                                <LiaSortAmountUpSolid />
                                                                <div style={{width: "70%"}} className="progressContainer">
                                                                     <div className="progressFill" style={{width: `${Math.ceil(elem.score*100)}%`}}></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                                    })
                                                }
                                                </ul>
                                            </div>
                                        </div>
                                        

                                        {/* ---------------------------------------------- */}
                                    </div>
                                </div>



 </div>

                        
                        </div>
                    </div>
                        
                    {/* <!-- chat text area  --> */}
                    <div className="chat__comment">
                        <div className="container">
                            <div className="fn__chat_comment">
                                <div className="new__chat">
                                    <p>Ask it questions, engage in discussions, or simply enjoy a friendly chat.</p>
                                </div>
                                <textarea rows="1" className="fn__hidden_textarea" tabindex="-1"></textarea>
                                <textarea ref={query} rows="1" placeholder="Send a message..." id="fn__chat_textarea"></textarea>
                                <button onClick={()=>{submitQuery();fetchSimiliarItems()}}>
                                    <FaCircleRight className="reactIcons"/>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                </div>
:
<div style={{width:"100%",height:"300px", display:"flex",alignItems:"center",justifyContent:"center"}}>
    please select a chat
</div>
}
 {/* <!-- rightbar ----------------------------------------------------------> */}
 
 <div className="chat__sidebar">
                    <div onClick={createChat} className="sidebar_header">
                        <a href="#chat0" className="fn__new_chat_link">
                            <span className="icon"></span>
                            <span className="text">New Chat</span>
                        </a>
                    </div>
                    <div className="sidebar_content">
                        <div className="chat__group new">
                            <h2 className="group__title">Your Chats</h2>
                            
                            <ul className="group__list">


                            {userData.data ?
                            userData.data.chats.map((item)=>{

                                return <li key={item} className="group__item">
                                    <div onClick={()=>{fetchChat(item)}} className={item==chatId?"fn__chat_link active":"fn__chat_link" } href="#chat1">
                                        <span className="text">{`New chat [${item.slice(0,10)}]`}</span>
                                        <input type="text" value="Chat Bot Definition"/>
                                        <span className="options">
                                            <button onClick={()=>{deleteChat(item)}}  style={{color:"red"}} className="trigger">
                                              <LiaCutSolid className="reactIcons" style={{color:"red"}} />
                                            </button>
                                        </span>
                                    </div>
                                </li>

                            })

                                :""

                            }


                            </ul>
                        </div>
                    </div>
                </div>
                </div>
            {/* <!-- !AI Chat Bot Page --> */}
            
        </div>
        {/* <!-- !PAGE (all pages go inside this div) --> */}
        
        

       
</div>


    </>
  )
                                            }


export default Chat
