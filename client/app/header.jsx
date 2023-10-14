import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
    return (
        <header className="techwave_fn_header">
            <div className="header__left">
                <div className="fn__token_info">
                    {/* Content here */}
                </div>
            </div>
            
            <div className="header__right">
                <div className="fn__nav_bar">
                    <div className="bar__item bar__item_user">
                        <Link href="#" className="user_opener">
                            {/* <Image 
                                src="/assets/images/avatar/avt-13.jpg" 
                                alt="User Avatar" 
                                width={50} 
                                height={50}
                            /> */}
                            <img src="https://axies-nextjs.vercel.app/_next/image?url=%2Fassets%2Fimages%2Favatar%2Favt-13.jpg&w=128&q=75"/> 
                        </Link>
                        <div className="item_popup">
                            <div className="user_profile">
                                <div className="user_img">
                               
                                    <Image 
                                        src="/img/user/user.jpg" 
                                        alt="User" 
                                        width={100} 
                                        height={100}
                                    />
                                </div>
                                <div className="user_info">
                                    <h2 className="user_name">Anandhu P A<span>Free</span></h2>
                                    <p>
                                        <a href="mailto:anandhupa131@gmail.com" className="user_email">
                                            anandhupa131@gmail.com
                                        </a>
                                    </p>
                                </div>
                            </div>
                            <div className="user_nav">
                                <ul>
                                    <li>
                                        <Link href="/user-profile" className="icon">
                                            <Image src="/svg/person.svg" alt="Profile" width={20} height={20}/>
                                            <span className="text">Profile</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/sign-in" className="icon">
                                            {/* Replace this comment with the appropriate icon/image or component */}
                                            <span className="text">Log Out</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
