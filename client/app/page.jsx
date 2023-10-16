import Image from 'next/image'
import "./styles/styles.css"
import { LiaRocketchat, LiaRobotSolid,LiaMapMarkedAltSolid,LiaHomeSolid ,LiaWindowCloseSolid,LiaArrowCircleLeftSolid} from "react-icons/lia";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaCircleRight } from "react-icons/fa6";
import Header from "./header";
import LeftPanel from "./leftbar"
import ChatContent from "./chat/Chat"
export default function Home() {




  return (

     
<div className="techwave_fn_wrapper fn__has_sidebar">
	<div className="techwave_fn_wrap">
	
        
		{/* <!-- HEADER --> */}
		<Header/>
		{/* <!-- !HEADER --> */}
		
{/* <!-- ----------------------------------------------------------------------- --> */}


{/* <!-- LEFT PANEL --> */}

	<LeftPanel/>

{/* <!-- !LEFT PANEL --> */}


{/* <!-- CONTENT --> */}
 <ChatContent/>

{/* <!-- CONTENT --> */}



    </div>
</div>

 
  )
}
