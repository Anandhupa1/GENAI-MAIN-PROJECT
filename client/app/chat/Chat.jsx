"use client"
import { FaCircleRight,FaSortAmountUp } from "react-icons/fa6";
import { LiaSortAmountUpSolid } from "react-icons/lia";
import  { useEffect, useRef, useState } from 'react'

function Chat() {
let userId = "65282c762b343032bfedd7cf";
let chatId = "65283b307688802854798ebe";
let [currentChat,setCurrentChat] =useState([]);
let [loading,setLoading]=useState(false);
let [stream,setStream]=useState("stream data here..................")
let query = useRef()
const [source, setSource] = useState(null);
const [error, setError] = useState(null);

  const processToken = (token) => {
    return token.replace(/\\n/g, "\n").replace(/\"/g, "");
  };



//   const submitQuery = async () => {
//     try {
//       alert(`sending ${query.current.value}`);
//       await fetch("/api/query", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({  
//         chatId,
//         query:query.current.value }),
//       });
//       // close existing sources
//       if (source) {
//         source.close();
//       }
//       // create new eventsource

//       const newSource = new EventSource("/api/query");

//       setSource(newSource);

//       newSource.addEventListener("newToken", (event) => {
//         const token = processToken(event.data);
//         // setData((prevData) => prevData + token);
//         setStream((prev)=> prev + token)
//       });

//       newSource.addEventListener("end", () => {
//         newSource.close();
//       });
//     } catch (err) {
//       alert(err)
//       console.error(err);
//       setError(error);
//     }
//   };

  // Clean up the EventSource on component unmount
  
  async function submitQuery(){
    try {
        let data = await fetch("/api/query");
        alert(data)
    } catch (error) {
        alert(error)
    }

  }
  useEffect(() => {
    // stuff is gonna happen
    return () => {
      if (source) {
        source.close();
      }
    };
  }, [source]);



  return (
    <>
      		<div className="techwave_fn_content">
		
        {/* <!-- PAGE (all pages go inside this div) --> */}
        <div className="techwave_fn_page">
            
            {/* <!-- AI Chat Bot Page --> */}
            <div className="techwave_fn_aichatbot_page fn__chatbot">
                
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
                                        <p>👋 Hello, Culinary Explorer! 🍽 Welcome to the delightful world of flavors and aromas. 🌿 Whether you're craving a sweet treat or a spicy adventure, I'm here to whisk you away on a tantalizing journey through recipes and culinary wonders! 🍰🌶 Tell me what you're in the mood for, and together, let’s concoct something scrumptious! 🚀 Whether you need a quick recipe suggestion, or just want to explore similar mouth-watering dishes, I'm all ears! 🐰👂 Let’s cook up some magic together! ✨👩‍🍳</p>
                                    </div>
                                </div>
    {/* ------------------------------------------------------------------------------------------------------ */}
                               {/* user */}
                               <div className="chat__box your__chat">
										<div className="author"><span>You</span></div>
										<div className="chat">
											<p>What is a chat bot?</p>
										</div>
								</div>
                               
                                {/* bot */}
                                <div className="chat__box bot__chat">
                                    <div className="author"><span>Bot</span></div>
                                    <div className="chat">
                                        <p>Chatbots boost operational efficiency and bring cost savings to businesses while offering convenience and added services to internal employees and external customers. They allow companies to easily resolve many types of customer queries and issues while reducing the need for human interaction.</p>
                                        {/* ---------------------------------------------- */}
                                        
                                        <div className="fn__tabs_content">
                                            <div id="tab1" className="tab__item active">
                                                <h6 style={{paddingTop:"20px"}} >similiar items</h6>
                                                <ul  className="fn__model_items">
                                                    <li style={{cursor:"pointer"}} className="fn__model_item">
                                                        <div className="item">
                                                            <div className="img">
                                                                <img src="img/models/1.jpg" alt=""/>
                                                            </div>
                                                            <div className="item__info">
                                                                <h3 className="title">GameVisuals</h3>
                                                                <p className="desc">A versatile model great at both photorealism and anime, includes noise offset training... by Lykon.</p>
                                                            </div>
                                                            <div className="item__author">
                                                                <LiaSortAmountUpSolid/>
                                                                <div style={{width: "70%"}} className="progressContainer">
                                                                     <div className="progressFill" style={{width: "70%"}}></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        {/* ---------------------------------------------- */}
                                    </div>
                                </div>



{/* ----------------------------------------------------------------------------------------------------------- */}
{/* stream */}
                                <div className="chat__box bot__chat">
                                    <div className="author"><span>Bot</span></div>
                                    <div className="chat">
                                        <p>{stream}</p>
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
                                <button onClick={submitQuery}>
                                    <FaCircleRight className="reactIcons"/>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                </div>

 {/* <!-- rightbar ----------------------------------------------------------> */}
 
 <div className="chat__sidebar">
                    <div className="sidebar_header">
                        <a href="#chat0" className="fn__new_chat_link">
                            <span className="icon"></span>
                            <span className="text">New Chat</span>
                        </a>
                    </div>
                    <div className="sidebar_content">
                        <div className="chat__group new">
                            <h2 className="group__title">Your Chats</h2>
                            <ul className="group__list">
                                <li className="group__item">
                                    <div className="fn__chat_link active" href="#chat1">
                                        <span className="text">Chat Bot Definition</span>
                                        <input type="text" value="Chat Bot Definition"/>
                                        <span className="options">
                                            <button className="trigger"><span></span></button>
                                            <span className="options__popup">
                                                <span className="options__list">
                                                    <button className="edit">Edit</button>
                                                    <button className="delete">Delete</button>
                                                </span>
                                            </span>
                                        </span>
                                        <span className="save_options">
                                            <button class="save">
                                                <img src="svg/check.svg" alt="" className="fn__svg"/>
                                            </button>
                                            <button className="cancel">
                                                <img src="svg/close.svg" alt="" className="fn__svg"/>
                                            </button>
                                        </span>
                                    </div>
                                </li>
                                <li className="group__item">
                                    <div className="fn__chat_link" href="#chat2">
                                        <span className="text">Essay: Marketing</span>
                                        <input type="text" value="Essay: Marketing"/>
                                        <span className="options">
                                            <button className="trigger"><span></span></button>
                                            <span className="options__popup">
                                                <span className="options__list">
                                                    <button className="edit">Edit</button>
                                                    <button className="delete">Delete</button>
                                                </span>
                                            </span>
                                        </span>
                                        <span className="save_options">
                                            <button className="save">
                                                <img src="svg/check.svg" alt="" className="fn__svg"/>
                                            </button>
                                            <button className="cancel">
                                                <img src="svg/close.svg" alt="" className="fn__svg"/>
                                            </button>
                                        </span>
                                    </div>
                                </li>
                                <li className="group__item">
                                    <div className="fn__chat_link" href="#chat3">
                                        <span className="text">Future of Social Media</span>
                                        <input type="text" value="Future of Social Media"/>
                                        <span className="options">
                                            <button className="trigger"><span></span></button>
                                            <span className="options__popup">
                                                <span className="options__list">
                                                    <button className="edit">Edit</button>
                                                    <button className="delete">Delete</button>
                                                </span>
                                            </span>
                                        </span>
                                        <span className="save_options">
                                            <button className="save">
                                                <img src="svg/check.svg" alt="" className="fn__svg"/>
                                            </button>
                                            <button className="cancel">
                                                <img src="svg/close.svg" alt="" className="fn__svg"/>
                                            </button>
                                        </span>
                                    </div>
                                </li>
                                <li className="group__item">
                                    <div className="fn__chat_link" href="#chat4">
                                        <span className="text">Business Ideas</span>
                                        <input type="text" value="Business Ideas"/>
                                        <span className="options">
                                            <button className="trigger"><span></span></button>
                                            <span className="options__popup">
                                                <span className="options__list">
                                                    <button className="edit">Edit</button>
                                                    <button className="delete">Delete</button>
                                                </span>
                                            </span>
                                        </span>
                                        <span className="save_options">
                                            <button className="save">
                                                <img src="svg/check.svg" alt="" className="fn__svg"/>
                                            </button>
                                            <button className="cancel">
                                                <img src="svg/close.svg" alt="" className="fn__svg"/>
                                            </button>
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                </div>
            {/* <!-- !AI Chat Bot Page --> */}
            
        </div>
        {/* <!-- !PAGE (all pages go inside this div) --> */}
        
        
        {/* <!-- FOOTER (inside the content) --> */}
        <footer className="techwave_fn_footer">
            <div className="techwave_fn_footer_content">
                <div className="copyright">
                    {/* <p>created by Anandhu P A</p>  */}
                </div>
                <div className="menu_items">
                    <ul>
                         <li><a href="terms.html">Github Repository</a></li> 
                        
                    </ul>
                </div>
            </div>
        </footer>
</div>


    </>
  )
}

export default Chat
