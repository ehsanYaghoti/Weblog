import React , { useState }  from 'react';
import { Link } from 'react-router-dom';
import { NavLink , useHistory } from 'react-router-dom';
import moment from 'jalali-moment';

// import Api
import NodejsApi from 'src/Api/NodejsApi'; 
import SpinnerOnTop from '../Loadings/SpinnerOnTop';


// styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBlog  , faClose , faSearch , faUser as faUserSolid ,faAdd, faHand, faPodcast, faUserAlt, faUsers , faAdjust   } from '@fortawesome/free-solid-svg-icons'
import {  faBookmark, faCommentDots, faComments, faFileLines, faHeart, faUser  } from '@fortawesome/free-regular-svg-icons';

 
function UserPanelHeader(props) { 
    
    //props
    let userProp = props.user
    let user = props.userNavbar

    const history = useHistory()


    const [loading , setLoading] = useState(false)
    const [success , setSuccess] = useState({
        state : true,
        message : ''
    })


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
        // openButten = document.getElementById("openButten"),
        // closeButton = document.getElementById("closeButton"),
        overlay = document.getElementById("overlay");

        hiddenMenu.classList.replace('flex' , 'hidden')
        overlay.classList.replace('flex' , 'hidden')
    }

    let signOutHandler = ( e ) => {
        console.log(e)
        
        setLoading(true)

        NodejsApi.post('/auth/logout' , user._id)
        .then(response => {

            if(! response.data.success){
                setLoading(false)
                return  setSuccess(prevState => {
                    return {
                        state : response.data.success ,
                        message : response.data.message
                    }
                })
            }else if(response.data.success){
                setLoading(false)
                history.push('/')
            }
        })
        .catch(err => {
            console.log(err)
            setSuccess({
                state : false,
                message : err.message
            })
            setLoading(false)
        })
    } 

    return (
        // UserPanelHeader 
        <>
            { success ? '' : 
                <div className='fixed h-screen w-screen bg-gray-600 bg-opacity-20 z-50 flex items-center justify-center' > 
                    <div className="bg-red-500 text-white font-[700] text-lg" >{success.message}</div>
                </div> 
            }
            { loading ? <SpinnerOnTop  /> : '' }
            <header className='flex items-center self-end sticky top-0 z-50 justify-between w-full lg:w-[75%] xl:w-[80%] h-10 py-10 px-4 md:p-10  border-b border-solid border-b-gray-600 bg-gradient-to-b from-gray-900 to-gray-600 shadow-lg text-white font-["Nunito"]' >
                {/* burger menu */}
                <button id='openButten' onClick={openHiddenMenuHandler}  className='h-fit flex lg:hidden' >
                    <FontAwesomeIcon icon={faBars} className='text-4xl' />
                </button>

                {/* Logo */}
                <div className='flex items-center w-fit text-white text-4xl' >
                    <FontAwesomeIcon icon={faBlog} className=' '  />
                    <span className='h-fit ml-2 font-["PT_Sans"] font-semibold ' >Weblog</span>
                </div>
                {/* Navigation Menu */}
                <nav className='h-fit hidden xl:flex items-center justify-between gap-4 font-["Nunito"] '>
                    <a href="/" className='' >Home</a>
                    <a href="/articles">Blog</a>
                    <a href="/podcasts">Podcast</a>
                    <a href="/posts">Forum</a>
                    <a href="/aboutus">About us</a>
                    <a href="/contact">Contact</a>
                </nav>
                {/* Search Box */}
                <div className='h-fit relative  hidden lg:flex'  >
                    <input lang='en' onChange={e => console.log(e)} onKeyDown={e => {
                        if(e.key === 'Enter'){
                            history.push(`/search/${e.target.value}`)
                        } 
                    
                    }}  type="text" name='search' className='pl-8 pr-4 py-2 outline-none rounded-md bg-gray-200 text-gray-700 font-["Nunito"]' placeholder='search here' style={{textAlign : 'left'}} />
                    {/* <input lang='fa' type="text" className='pl-8 pr-4 py-2 outline-none rounded-md bg-gray-200 text-gray-700 font-["Vazir"]' placeholder='search here' style={{textAlign : 'left'}} /> */}
                    <FontAwesomeIcon icon={faSearch} className='text-slate-500 absolute left-2 top-3 ' />
                </div>

                {/* theme and auth links */}
                <div className='flex items-center gap-6' >
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
                    <div className='h-fit flex items-center font-["Ubuntu"]' >
                        {
                            userProp.isAuthenticated ? 
                            ( 
                                <Link to={`/user/dashboard/${userProp.user._id}`} className='flex items-center gap-4' >
                                    <span className='hidden md:flex h-fit'  >{ userProp.user.username }</span>
                                    {
                                        userProp.user.avatar !== null ?
                                        <div className='h-12 w-12 ring-2 ring-green-400 overflow-hidden rounded-full my-4   hover:scale-110 transition-all ' >
                                            <img src={`http://localhost:5000/${userProp.user.avatarpath}`} alt="avatar" className='object-cover scale-105' />
                                        </div>                                :
                                        <FontAwesomeIcon icon={faUserSolid} />
                                    }
                                </Link>
                            )
                            : 
                            (
                            <div className='h-fit flex items-center gap-6' >
                                <a href="/auth/login">Login</a>
                                <a href="/auth/register">Register</a>
                            </div>
                            )
                        }
                    </div>
                </div>

            </header>
            {/* hidden menu */}
            <div id='hiddenMenu' dir='ltr' className='hidden flex-col items-center justify-start  gap-4 h-screen w-[320px] bg-zinc-50 dark:bg-[#092635] text-gray-800 dark:text-gray-50 bg-opacity-100 fixed left-0 top-0 z-50 px-6 py-2 ' >
                <button id='closeButton' onClick={closeHiddenMenuHandler}  className='w-fit h-fit' >
                    <FontAwesomeIcon icon={faClose} className='text-blue-900 dark:text-gray-50 text-xl font-[700] cursor-pointer absolute top-5 right-5' />
                </button>
                {/* Logo */}
                <a href='/' className='flex items-center w-fit h-fit text-gray-800 dark:text-white text-4xl mb-4' >
                    <FontAwesomeIcon icon={faBlog} className=' '  />
                    <span className='h-fit ml-2 font-["PT_Sans"] font-semibold flex ' >Weblog</span>
                </a>
                {/* Search Box */}
                <div className='h-fit w-full  flex relative border-b border-solid border-gray-700/70 dark:border-gray-200/80 pb-6 '  >
                    <input lang='en' onKeyDown={e => {
                        if(e.key === 'Enter'){
                            history.push(`/search/${e.target.value}`)
                        }
                    
                    }}  type="text" name='search' className='pl-8 pr-4 py-2 w-full outline-none rounded-md bg-gray-300 dark:bg-gray-600 dark:text-gray-50  text-gray-900 font-["Nunito"]' placeholder='search here' style={{textAlign : 'left'}} />
                    {/* <input lang='fa' type="text" className='pl-8 pr-4 py-2 outline-none rounded-md bg-gray-200 text-gray-700 font-["Vazir"]' placeholder='search here' style={{textAlign : 'left'}} /> */}
                    <FontAwesomeIcon icon={faSearch} className='text-slate-500 absolute left-2 top-3 ' />
                </div>
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
                <nav className='h-fit w-full flex flex-col self-start  items-start justify-between gap-3 font-["Nunito"] overflow-y-auto '>
                    <div className='flex items-center gap-2 font-[600]' >
                        <FontAwesomeIcon icon={faHand} />
                        <span className='h-fit whitespace-nowrap  '>Welcome Aboard :</span>
                        <span className='h-fit leading-7' >
                            {
                                !user.fullname === null ?  user.fullname
                                :  user.username
                            }
                        </span>
                    </div>
                    <div className='flex items-center gap-2 font-[600] my-3'>
                        {moment(new Date() , 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}
                    </div>
                    {
                        user.admin ?
                        <NavLink to="/admin" exact className="flex items-center min-w-[200px]  hover:opacity-80   h-fit font-[600] text-xl py-3 gap-4" 
                            activeClassName=" text-blue-400 text-cyan-600 target:text-cyan-600   drop-shadow-sm shadow-blue-600 " >
                                <FontAwesomeIcon icon={faUserAlt} />
                                <span className='h-fit whitespace-nowrap' >Admin Panel</span>
                        </NavLink>
                        : ''
                    }
                    <NavLink to="/user/panel" exact className="flex items-center min-w-[200px]  hover:opacity-80   h-fit font-[600] text-xl py-3 gap-4" 
                        activeClassName=" text-blue-400 text-cyan-600 target:text-cyan-600   drop-shadow-sm shadow-blue-600 " >
                            <FontAwesomeIcon icon={faAdd} />
                            <span className='h-fit whitespace-nowrap' >Create Post</span>
                    </NavLink>
                    <NavLink to="/user/panel/profile" className="flex items-center min-w-[200px]  hover:opacity-80   h-fit font-[600] text-xl py-3 gap-4 " 
                        activeClassName=" text-blue-400 text-cyan-600 target:text-cyan-600   drop-shadow-sm shadow-blue-600 " >
                            <FontAwesomeIcon icon={faUser} />
                            <span className='h-fit whitespace-nowrap' >Edit Profile</span>
                    </NavLink>
                    <NavLink to="/user/panel/articles" className="flex items-center min-w-[200px]  hover:opacity-80   h-fit font-[600] text-xl py-3 gap-4 " 
                        activeClassName=" text-blue-400 text-cyan-600 target:text-cyan-600   drop-shadow-sm shadow-blue-600 " >
                            <FontAwesomeIcon icon={faFileLines} />
                            <span className='h-fit whitespace-nowrap' >Articles</span>
                    </NavLink>
                    <NavLink to="/user/panel/podcasts" className="flex items-center min-w-[200px]  hover:opacity-80   h-fit font-[600] text-xl py-3 gap-4 " 
                        activeClassName=" text-blue-400 text-cyan-600 target:text-cyan-600   drop-shadow-sm shadow-blue-600 " >
                            <FontAwesomeIcon icon={faPodcast} />
                            <span className='h-fit whitespace-nowrap' >Podcasts</span>
                    </NavLink>
                    <NavLink to="/user/panel/posts" className="flex items-center min-w-[200px]  hover:opacity-80   h-fit font-[600] text-xl py-3 gap-4 " 
                        activeClassName=" text-blue-400 text-cyan-600 target:text-cyan-600   drop-shadow-sm shadow-blue-600 " >
                            <FontAwesomeIcon icon={faFileLines} />
                            <span className='h-fit whitespace-nowrap' >Posts</span>
                    </NavLink>
                    <NavLink to="/user/panel/saves" className="flex items-center min-w-[200px]  hover:opacity-80   h-fit font-[600] text-xl py-3 gap-4 " 
                        activeClassName=" text-blue-400 text-cyan-600 target:text-cyan-600   drop-shadow-sm shadow-blue-600 " >
                            <FontAwesomeIcon icon={faBookmark} />
                            <span className='h-fit whitespace-nowrap' >Saves</span>
                    </NavLink>
                    <NavLink to="/user/panel/likes" className="flex items-center min-w-[200px]  hover:opacity-80   h-fit font-[600] text-xl py-3 gap-4 " 
                        activeClassName=" text-blue-400 text-cyan-600 target:text-cyan-600   drop-shadow-sm shadow-blue-600 " >
                            <FontAwesomeIcon icon={faHeart} />
                            <span className='h-fit whitespace-nowrap' >Likes</span>
                    </NavLink>
                    <NavLink to="/user/panel/followed" className="flex items-center min-w-[200px]  hover:opacity-80   h-fit font-[600] text-xl py-3 gap-4 " 
                        activeClassName=" text-blue-400 text-cyan-600 target:text-cyan-600   drop-shadow-sm shadow-blue-600 " >
                            <FontAwesomeIcon icon={faUsers} />
                            <span className='h-fit whitespace-nowrap' >Followed</span>
                    </NavLink>
                    <NavLink to="/user/panel/comments" className="flex items-center min-w-[200px]  hover:opacity-80   h-fit font-[600] text-xl py-3 gap-4 " 
                        activeClassName="text-blue-400 text-cyan-600 target:text-cyan-600   drop-shadow-sm shadow-blue-600 " >
                            <FontAwesomeIcon icon={faComments} />
                            <span className='h-fit whitespace-nowrap' >Comments</span>
                    </NavLink>
                    <NavLink to="/user/panel/answers" className="flex items-center min-w-[200px]  hover:opacity-80   h-fit font-[600] text-xl py-3 gap-4 " 
                        activeClassName="text-blue-400 text-cyan-600 target:text-cyan-600   drop-shadow-sm shadow-blue-600 " >
                            <FontAwesomeIcon icon={faCommentDots} />
                            <span className='h-fit whitespace-nowrap' >Answers</span>
                    </NavLink>
                    <NavLink to="/user/panel/signout" onClick={signOutHandler} className="flex items-center min-w-[200px]  hover:opacity-80   h-fit font-[600] text-xl py-3 gap-4 " 
                        activeClassName=" text-blue-400 text-cyan-600 target:text-cyan-600   drop-shadow-sm shadow-blue-600 " >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                            </svg>
                            <span className='h-fit whitespace-nowrap' >Sign out</span>
                    </NavLink>
                    {/* <a href="/" className='flex items-center gap-2 w-full' > 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        <span className='h-fit text-xl font-[600]' >Home</span> 
                    </a>
                    <a href="/articles" className='flex items-center gap-2 w-full' >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                        </svg>
                        <span className='h-fit text-xl font-[600]' >Articles</span> 
                    </a>
                    <a href="/podcasts" className='flex items-center gap-2 w-full' >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                        </svg>
                        <span className='h-fit text-xl font-[600]' >Podcasts</span> 
                    </a>
                    <a href="/posts" className='flex items-center gap-2 w-full' >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                        </svg>
                        <span className='h-fit text-xl font-[600]' >Forum</span> 
                    </a> */}

                </nav> 
                
                
            </div>
            {/* overlay */}
            <div id='overlay' onClick={closeHiddenMenuHandler}  className='hidden w-screen h-screen fixed bg-gray-900 bg-opacity-50 z-40  ' ></div>
        </>
    )
}

export default UserPanelHeader;