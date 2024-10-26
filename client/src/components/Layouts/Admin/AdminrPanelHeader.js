import React , { memo } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

// import contexts
// import  AuthenticatedUserContext from 'src/Contexts/authenticatedUserContext';


// styles
import 'src/Styles/sass/main.scss';
import 'src/Styles/sass/navbar.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBlog , faHand , faUser , faBars  , faClose   } from '@fortawesome/free-solid-svg-icons';
// import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUsers , faBook , faQuoteRight , faExclamationTriangle ,faBookmark  , faHeart , faDollarSign , faFile ,faNewspaper , faPlay, faHome , faAdjust  } from "@fortawesome/free-solid-svg-icons";
library.add(faUsers , faBook , faQuoteRight  , faDollarSign , faFile , faNewspaper )

const AdminrPanelHeader = memo(function AdminrPanelHeader(props) { 
    
    // const UserContext =  useContext(AuthenticatedUserContext);
    // let userProp = UserContext

    // console.log(UserContext)

    //props
    let userProp = props.user



    let themeHandler = (e , theme ) => {
        console.log(theme)

        switch (theme) {
            
            case 'dark':
                
                document.documentElement.classList.add('dark')

                document.getElementById('moon').classList.remove('hidden')
                document.getElementById('moon2').classList.remove('hidden')
                document.getElementById('DarkThemeSpan').classList.remove('hidden')

                document.getElementById('sun').classList.add('hidden')
                document.getElementById('sun2').classList.add('hidden')
                document.getElementById('lightThemeSpan').classList.add('hidden')

                document.getElementById('systemMode').classList.add('hidden')
                document.getElementById('systemMode2').classList.add('hidden')
                document.getElementById('SystemThemeSpan').classList.add('hidden')

                // Whenever the user explicitly chooses dark mode
                localStorage.theme = 'dark'

            break;
            case 'system':

                if ( ( window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark')
                } else {
                    document.documentElement.classList.remove('dark')
                }

                document.getElementById('systemMode').classList.remove('hidden')
                document.getElementById('systemMode2').classList.remove('hidden')
                document.getElementById('SystemThemeSpan').classList.remove('hidden')

                document.getElementById('sun').classList.add('hidden')
                document.getElementById('sun2').classList.add('hidden')
                document.getElementById('lightThemeSpan').classList.add('hidden')

                document.getElementById('moon').classList.add('hidden')
                document.getElementById('moon2').classList.add('hidden')
                document.getElementById('DarkThemeSpan').classList.add('hidden')

                // Whenever the user explicitly chooses system mode
                localStorage.theme = 'system'

            break;
            case 'light':
                document.documentElement.classList.remove('dark')

                document.getElementById('sun').classList.remove('hidden')
                document.getElementById('sun2').classList.remove('hidden')
                document.getElementById('lightThemeSpan').classList.remove('hidden')

                document.getElementById('moon').classList.add('hidden')
                document.getElementById('moon2').classList.add('hidden')
                document.getElementById('DarkThemeSpan').classList.add('hidden')
                
                document.getElementById('systemMode').classList.add('hidden')
                document.getElementById('systemMode2').classList.add('hidden')
                document.getElementById('SystemThemeSpan').classList.add('hidden')

                // Whenever the user explicitly chooses light mode
                localStorage.theme = 'light'

            break;        
            default:
                document.documentElement.classList.remove('dark')
            break;
        }
    }

    let openHiddenMenuHandler = (e) => {
        const hiddenMenu = document.getElementById("hiddenMenu"),
        // openButten = document.getElementById("openButten"),
        // closeButton = document.getElementById("closeButton"),
        overlay = document.getElementById("overlay");

        hiddenMenu.classList.replace('hidden' , 'flex')
        overlay.classList.replace('hidden' , 'flex')
    }

    let closeHiddenMenuHandler = (e) => {
        const hiddenMenu = document.getElementById("hiddenMenu"),
        overlay = document.getElementById("overlay");

        hiddenMenu.classList.replace('flex' , 'hidden')
        overlay.classList.replace('flex' , 'hidden')
    }

    // window.addEventListener("resize" , () => closeHiddenMenuHandler());

    return (
        // AdminrPanelHeader 
        <>
            <header dir='ltr' className='flex items-center gap-8 justify-between sticky top-0  z-50  w-full h-10 py-10 px-2 md:p-10 border-b border-solid border-b-gray-600 
            bg-gradient-to-b from-gray-900 to-gray-700
                shadow-lg text-white font-["Nunito"]' >
                   
                {/* Logo */}
                <div className='flex items-center w-fit text-white text-4xl' >
                    <FontAwesomeIcon icon={faBlog} className=' '  />
                    <span className='h-fit ml-2 font-["PT_Sans"] font-semibold ' >Weblog</span>
                </div>
                <div className='hidden lg:flex whitespace-nowrap items-center gap-2 dark:text-gray-50' >
                    <FontAwesomeIcon icon={faHand} />
                    <span className='font-[700] text-xl h-fit ' >Welcome to Admin panel</span>
                </div>
                <div className='flex items-center  gap-6' >
                    {/* theme */}
                    <div className='hidden md:flex items-center justify-center gap-4 '  >
                        {/* dark mode */}
                        <button title='Dark mode' className={`text-2xl font-[400] text-gray-300 items-center justify-center h-fit w-fit  p-1 animate-pulse rounded-full  bg-slate-600 hover:bg-slate-500  ${localStorage.theme === 'dark' ? "flex" : 'hidden' } `} id='moon' onClick={e => themeHandler(e , 'system')}  >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                            </svg>

                        </button> 

                        {/* system mode */}
                        <button title='System mode' className={`text-2xl font-[400] text-gray-300 items-center justify-center h-fit w-fit  p-1 animate-pulse rounded-full  bg-slate-600 hover:bg-slate-500 ${localStorage.theme === 'system' ? "flex" : 'hidden' }   `} id='systemMode' onClick={e => themeHandler(e , 'light')}  >
                            <FontAwesomeIcon icon={faAdjust} className="w-8 h-8 rounded-full" />
                        </button>

                        {/* light mode */}
                        <button title='Light mode' className={`text-8xl font-[400] text-gray-300 items-center justify-center h-fit w-fit p-1 animate-pulse rounded-full  bg-slate-600 hover:bg-slate-500 ${localStorage.theme === 'light' ?  "flex":  'hidden'  } `} id='sun' onClick={e => themeHandler(e , 'dark')} >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                            </svg>
                        </button>
                        
                    </div>
                    
                    {/* Auth links */}
                    <div className='h-fit flex items-center font-["Ubuntu"] justify-self-end ' >
                        {
                            userProp?.isAuthenticated ? 
                            ( 
                                <Link to={`/user/dashboard/${userProp?.user?._id}`} className='flex items-center gap-2' >
                                    <span className=' whitespace-nowrap hidden md:flex'  >{ userProp?.user?.username }</span>
                                    {
                                        userProp?.user?.avatar !== null ?
                                        <div className='h-12 w-12 ring-2 ring-green-400 overflow-hidden rounded-full my-4   hover:scale-110 transition-all ' >
                                            <img src={`http://localhost:5000/${userProp.user?.avatarpath}`} alt="avatar" className='object-cover scale-105' />
                                        </div>                                :
                                        <FontAwesomeIcon icon={faUser} />
                                    }
                                </Link>
                            )
                            : 
                            (
                            <div className='h-fit flex flex-col lg:flex-row items-center gap-6' >
                                <a href="/auth/login">Login</a>
                                <a href="/auth/register">Register</a>
                            </div>
                            )
                        }
                    </div>

                    {/* burger menu */}
                    <button id='openButten' onClick={openHiddenMenuHandler}  className='h-fit flex lg:hidden' >
                        <FontAwesomeIcon icon={faBars} className='text-4xl' />
                    </button>
                </div>
            </header>

            {/* hidden menu */}
            <div id='hiddenMenu' dir='ltr' className='hidden flex-col  fixed right-0 top-0 z-50 px-6 py-4  items-center justify-start  gap-6 h-screen w-[320px] bg-zinc-50 dark:bg-[#092635] text-gray-800 dark:text-gray-50 bg-opacity-100' >
                {/* close button */}
                <button id='closeButton' onClick={closeHiddenMenuHandler}  className='w-fit h-fit' >
                    <FontAwesomeIcon icon={faClose} className='text-blue-900 dark:text-gray-50 text-xl font-[700] cursor-pointer absolute top-5 right-5' />
                </button>
                {/* Logo */}
                <a href='/' className='flex items-center w-fit h-fit text-gray-800 dark:text-white text-4xl mb-2' >
                    <FontAwesomeIcon icon={faBlog} className=' '  />
                    <span className='h-fit ml-2 font-["PT_Sans"] font-semibold flex ' >Weblog</span>
                </a>
                {/* theme and auth links */}
                <div className='h-fit w-full flex flex-col items-start pb-4 px-2  border-b border-solid border-gray-700/70 dark:border-gray-200/80 gap-6 ' >
                    {/* theme */}
                <div className='flex items-center justify-center gap-4 '  >
                    {/* dark mode */}
                    <button title='Dark mode' className={`text-2xl font-[400] text-gray-300 items-center justify-center h-fit w-fit  p-1 animate-pulse rounded-full  bg-slate-600 hover:bg-slate-500  ${localStorage.theme === 'dark' ? "flex" : 'hidden' } `} id='moon2' onClick={e => themeHandler(e , 'system')}  >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                        </svg>
                    </button>
                    <span className={`h-fit font-[500] ${localStorage.theme === 'dark' ? "flex" : 'hidden' } `} id='DarkThemeSpan' >Dark Theme</span>

                    {/* system mode */}
                    <button title='System mode' className={`text-2xl font-[400] text-gray-300 items-center justify-center h-fit w-fit  p-1 animate-pulse rounded-full  bg-slate-600 hover:bg-slate-500 ${localStorage.theme === 'system' ? "flex" : 'hidden' }   `} id='systemMode2' onClick={e => themeHandler(e , 'light')}  >
                        <FontAwesomeIcon icon={faAdjust} className="w-8 h-8 rounded-full" />
                    </button>
                    <span className={`h-fit font-[500] ${localStorage.theme === 'system' ? "flex" : 'hidden' }  `} id='SystemThemeSpan' >System Theme</span>

                    {/* light mode */}
                    <button title='Light mode' className={`text-8xl font-[400] text-gray-300 items-center justify-center h-fit w-fit p-1 animate-pulse rounded-full  bg-slate-600 hover:bg-slate-500 ${localStorage.theme === 'light' ?  "flex":  'hidden'  } `} id='sun2' onClick={e => themeHandler(e , 'dark')} >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                        </svg>
                    </button>
                    <span className={`h-fit font-[500] ${localStorage.theme === 'light' ?  "flex":  'hidden'  } `} id='lightThemeSpan' >Light Theme</span>

                </div>

                </div>
                {/* Navigation Menu */}
                <nav dir='rtl' className='h-fit w-full flex flex-col self-start  items-start justify-between gap-5 font-["Nunito"] overflow-y-auto '>

                    <NavLink to='/admin'  className='nav-link  ' activeClassName='active-link'>
                        <FontAwesomeIcon icon={faHome} /><span>Admin Home</span>
                    </NavLink>
                    <NavLink to='/admin/users' className='dark:text-gray-50 nav-link ' activeClassName='active-link'>
                        <FontAwesomeIcon icon='users' /><span> مدیریت کاربران </span></NavLink>
                    <NavLink to='/admin/permissions' className='nav-link font-[500] text-xl' activeClassName='active-link'><FontAwesomeIcon icon='users' /><span> مدیریت مجوز ها </span></NavLink>
                    <NavLink to='/admin/roles' className='nav-link' activeClassName='active-link'><FontAwesomeIcon icon='users' /><span> مدیریت نقش ها </span></NavLink>
                    <NavLink to='/admin/articles' className='nav-link'  activeClassName='active-link'><FontAwesomeIcon icon='newspaper' /> <span>مدیریت مقاله ها </span></NavLink>
                    <NavLink to='/admin/podcasts' className='nav-link'  activeClassName='active-link'>
                        <FontAwesomeIcon icon={faPlay} />
                        <span>مدیریت پادکست ها </span>
                    </NavLink>
                    <NavLink to='/admin/comments' className='nav-link'  activeClassName='active-link'><FontAwesomeIcon icon='quote-right' /><span>مدیریت دیدگاه ها </span></NavLink>
                    <NavLink to='/admin/posts' className='nav-link'  activeClassName='active-link'><FontAwesomeIcon icon='book' /> <span>مدیریت پست ها </span></NavLink>
                    <NavLink to='/admin/answers' className='nav-link'  activeClassName='active-link'><FontAwesomeIcon icon='book' /> <span>مدیریت پاسخ ها </span></NavLink>
                    <NavLink to='/admin/likes' className='nav-link'  activeClassName='active-link'><FontAwesomeIcon icon={faHeart} /> <span>مدیریت لایک ها </span></NavLink>
                    <NavLink to='/admin/saves' className='nav-link'  activeClassName='active-link'><FontAwesomeIcon icon={faBookmark} /> <span>مدیریت ذخیره ها </span></NavLink>
                    <NavLink to='/admin/categories' className='nav-link'  activeClassName='active-link'><FontAwesomeIcon icon='file' /><span>مدیریت دسته بندی ها </span></NavLink>
                    <NavLink to='/admin/tags' className='nav-link'  activeClassName='active-link'><FontAwesomeIcon icon='file' /><span>مدیریت تگ ها </span></NavLink>
                    <NavLink to='/admin/reports' className='nav-link'  activeClassName='active-link'><FontAwesomeIcon icon={faExclamationTriangle} /><span>مدیریت گزارش ها </span></NavLink>


                </nav> 
                
                
            </div>
            {/* overlay */}
            <div id='overlay' onClick={closeHiddenMenuHandler}  className='hidden w-screen h-screen fixed bg-gray-900 bg-opacity-50 z-40  ' ></div>
        </>
    )
})

export default AdminrPanelHeader;