import Link from 'next/link';
import Image from 'next/image';
// Import your icons from their source or update with your actual icon path
import {
  LiaHomeSolid,
  LiaRobotSolid,
  LiaMapMarkedAltSolid,
  LiaArrowCircleLeftSolid,
} from "react-icons/lia";

const LeftPanel = () => {
  return (
    <div className="techwave_fn_leftpanel">
      
      <div className="mobile_extra_closer"></div>
      
      {/* logo (left panel) */}
      <div className="leftpanel_logo">
    
          <div className="fn_logo">
            
              {/* <Image 
                src="/img/logo-desktop-full.png" 
                alt="Full Logo Desktop" 
                width={100}  // Adjust width and height according to your requirements
                height={50}
              /> */}
              {/* <Image 
                src="/img/logo.png" 
                alt="foodie" 
                width={100}  
                height={50}
              /> */}
               <h3 style={{color:"#7C5FE3"}} className="title">Foodie</h3>
         
            <span className="short_logo">
              <Image 
                src="/img/logo-desktop-mini.png" 
                alt="Mini Logo Desktop" 
                width={50}  
                height={25}
              />
              <Image 
                src="/img/logo-retina-mini.png" 
                alt="Mini Logo Retina" 
                width={50}  
                height={25}
              />
            </span>
          </div>
        
        {/* Note: The closers below should have some function, which might be to close/open a menu, thus consider adding an onClick event */}
     
      </div>
      
      {/* content (left panel) */}
      <div className="leftpanel_content">
        
        {/* #1 navigation group */}
        <div className="nav_group">
          <h2 className="group__title">Start Here</h2>
          <ul className="group__list">
            <li>
              <Link href="/" passHref>
                <div className="fn__tooltip menu__item" data-position="right" title="Home">
                  <span className="icon">
                    <LiaHomeSolid className="reactIcons" />
                  </span>
                  <span className="text">Home</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
        
        {/* #2 navigation group */}
        <div className="nav_group">
          <h2 className="group__title">User Tools</h2>
          <ul className="group__list">
            <li>
              <Link href="/" passHref>
                <div className="fn__tooltip active menu__item" data-position="right" title="AI Chat Bot">
                  <span className="icon">
                    <LiaRobotSolid className="reactIcons" />
                  </span>
                  <span className="text">AI Chat Bot</span>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/" passHref>
                <div className="fn__tooltip menu__item" data-position="right" title="Find a Restaurant">
                  <span className="icon">
                    <LiaMapMarkedAltSolid className="reactIcons"/>
                  </span>
                  <span className="text">Find a Restaurant</span>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/" passHref>
                <div className="fn__tooltip menu__item" data-position="right" title="Log Out">
                  <span className="icon">
                    <LiaArrowCircleLeftSolid className="reactIcons"/>
                  </span>
                  <span className="text">Log Out</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
        
      </div>
    </div>
  );
};

export default LeftPanel;
