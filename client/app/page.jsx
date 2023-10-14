
import Image from 'next/image'
import "./styles/styles.css"
import { LiaRocketchat, LiaRobotSolid,LiaMapMarkedAltSolid,LiaHomeSolid ,LiaWindowCloseSolid,LiaArrowCircleLeftSolid} from "react-icons/lia";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaCircleRight } from "react-icons/fa6";
export default function Home() {





  return (

     
<div className="techwave_fn_wrapper fn__has_sidebar">
	<div className="techwave_fn_wrap">
	
        
		
{/* <!-- ----------------------------------------------------------------------- --> */}


{/* <!-- LEFT PANEL --> */}
<div className="techwave_fn_leftpanel">
	
	<div className="mobile_extra_closer"></div>
	
	{/* <!-- logo (left panel) --> */}
	<div className="leftpanel_logo">
		<a href="index.html" className="fn_logo">
			<span className="full_logo">
				<img src="img/logo-desktop-full.png" alt="" className="desktop_logo"/>
				<img src="img/logo-retina-full.png" alt="" className="retina_logo"/>
			</span>
			<span className="short_logo">
				<img src="img/logo-desktop-mini.png" alt="" className="desktop_logo"/>
				<img src="img/logo-retina-mini.png" alt="" className="retina_logo"/>
			</span>
		</a>
		<a href="#" className="fn__closer fn__icon_button desktop_closer">
			<img src="svg/arrow.svg" alt="" className="fn__svg"/>
		</a>
		<a href="#" className="fn__closer fn__icon_button mobile_closer">
			<img src="svg/arrow.svg" alt="" className="fn__svg"/>
		</a>
	</div>
	{/* <!-- !logo (left panel) --> */}
	
	{/* <!-- content (left panel) --> */}
	<div className="leftpanel_content">
	
		{/* <!-- #1 navigation group --> */}
		<div class="nav_group">
			<h2 className="group__title">Start Here</h2>
			<ul className="group__list">
				<li>
					<a href="index.html" className="fn__tooltip menu__item" data-position="right" title="Home">
						<span className="icon">
						
						<LiaHomeSolid className="reactIcons" />
						</span>
						<span className="text">Home</span>
					</a>
				</li>
				
				
			</ul>
		</div>
		{/* <!-- !#1 navigation group --> */}
	
		{/* <!-- #2 navigation group --> */}
		<div className="nav_group">
			<h2 className="group__title">User Tools</h2>
			<ul className="group__list">
				<li>
					<a href="ai-chat-bot.html" className="fn__tooltip active menu__item" data-position="right" title="AI Chat Bot">
						<span className="icon">
							{/* <img src="svg/chat.svg" alt="" className="fn__svg"/> */}
							< LiaRobotSolid className="reactIcons" />
							
							</span>
						<span className="text">AI Chat Bot</span>
					</a>
				</li>
				<li>
					<a href="ai-chat-bot.html" className="fn__tooltip menu__item" data-position="right" title="AI Chat Bot">
						<span className="icon">
							{/* <img src="svg/chat.svg" alt="" className="fn__svg"/> */}
							<LiaMapMarkedAltSolid className="reactIcons"/>
							</span>
						<span className="text">Find a restaurant </span>
					</a>
				</li>
				<li>
					<a href="sign-in.html" className="fn__tooltip menu__item" data-position="right" title="Log Out">
						<span className="icon">
						<LiaArrowCircleLeftSolid className="reactIcons"/>
							
							</span>
						<span className="text">Log Out</span>
					</a>
				</li>
			</ul>
		</div>
	</div>
	{/* <!-- !content (left panel) --> */}
	
</div>
{/* <!-- !LEFT PANEL --> */}


{/* <!-- CONTENT --> */}
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
							<div classNamee="chat__list">

								

								<div className="chat__item active" id="chat1">
									<div className="chat__box your__chat">
										<div className="author"><span>You</span></div>
										<div className="chat">
											<p>What is a chat bot?</p>
										</div>
									</div>
									<div className="chat__box bot__chat">
										<div className="author"><span>Bot</span></div>
										<div className="chat">
											<p>At the most basic level, a chatbot is a computer program that simulates and processes human conversation (either written or spoken), allowing humans to interact with digital devices as if they were communicating with a real person. Chatbots can be as simple as rudimentary programs that answer a simple query with a single-line response, or as sophisticated as digital assistants that learn and evolve to deliver increasing levels of personalization as they gather and process information.</p>
										</div>
									</div>
									<div className="chat__box your__chat">
										<div className="author"><span>You</span></div>
										<div className="chat">
											<p>How do chatbots work?</p>
										</div>
									</div>
									<div className="chat__box bot__chat">
										<div className="author"><span>Bot</span></div>
										<div className="chat">
											<p>Chatbots boost operational efficiency and bring cost savings to businesses while offering convenience and added services to internal employees and external customers. They allow companies to easily resolve many types of customer queries and issues while reducing the need for human interaction.</p>
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
									<textarea rows="1" placeholder="Send a message..." id="fn__chat_textarea"></textarea>
									<button>
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
    </div>
</div>

 
  )
}
