import React , {useState} from 'react';
import { Link , useNavigate } from 'react-router-dom';

// styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars , faBlog , faClose , faSearch , faUser , faAdjust, faSignOut } from '@fortawesome/free-solid-svg-icons'

// import api
import NodejsApi from 'src/Api/NodejsApi'; 

// import layout
import SpinnerOnTop from '../Loadings/SpinnerOnTop';


function Header(props) {
    
    //props
    let userProp = props.user
    const navigation = useNavigate()

    const [loading , setLoading] = useState(false)
    const [success , setSuccess] = useState({
        state : true,
        message : ''
    })


    let themeHandler = (e , theme ) => {
        // console.log(theme)

        switch (theme) {
            
            case 'dark':
                
                document.documentElement.classList.add('dark')

                document.getElementById('moon')?.classList.remove('hidden')
                document.getElementById('moon2')?.classList.remove('hidden')
                document.getElementById('DarkThemeSpan')?.classList.remove('hidden')

                document.getElementById('sun')?.classList.add('hidden')
                document.getElementById('sun2')?.classList.add('hidden')
                document.getElementById('lightThemeSpan')?.classList.add('hidden')

                document.getElementById('systemMode')?.classList.add('hidden')
                document.getElementById('systemMode2')?.classList.add('hidden')
                document.getElementById('SystemThemeSpan')?.classList.add('hidden')

                // Whenever the user explicitly chooses dark mode
                localStorage.theme = 'dark'

            break;
            case 'system':

                if ( ( window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement?.classList.add('dark')
                } else {
                    document.documentElement?.classList.remove('dark')
                }

                document.getElementById('systemMode')?.classList.remove('hidden')
                document.getElementById('systemMode2')?.classList.remove('hidden')
                document.getElementById('SystemThemeSpan')?.classList.remove('hidden')

                document.getElementById('sun')?.classList.add('hidden')
                document.getElementById('sun2')?.classList.add('hidden')
                document.getElementById('lightThemeSpan')?.classList.add('hidden')

                document.getElementById('moon')?.classList.add('hidden')
                document.getElementById('moon2')?.classList.add('hidden')
                document.getElementById('DarkThemeSpan')?.classList.add('hidden')

                // Whenever the user explicitly chooses system mode
                localStorage.theme = 'system'

            break;
            case 'light':
                document.documentElement?.classList.remove('dark')

                document.getElementById('sun')?.classList.remove('hidden')
                document.getElementById('sun2')?.classList.remove('hidden')
                document.getElementById('lightThemeSpan')?.classList.remove('hidden')

                document.getElementById('moon')?.classList.add('hidden')
                document.getElementById('moon2')?.classList.add('hidden')
                document.getElementById('DarkThemeSpan')?.classList.add('hidden')
                
                document.getElementById('systemMode')?.classList.add('hidden')
                document.getElementById('systemMode2')?.classList.add('hidden')
                document.getElementById('SystemThemeSpan')?.classList.add('hidden')

                // Whenever the user explicitly chooses light mode
                localStorage.theme = 'light'

            break;        
            default:
                document.documentElement?.classList.remove('dark')
            break;
        }
    }

    window.addEventListener('load' , e => themeHandler(e , 'system'))

    let openHiddenMenuHandler = (e) => {
        const hiddenMenu = document.getElementById("hiddenMenu"),
        // openButten = document.getElementById("openButten"),
        // closeButton = document.getElementById("closeButton"),
        overlay = document.getElementById("overlay");

        hiddenMenu?.classList.replace('hidden' , 'flex')
        overlay?.classList.replace('hidden' , 'flex')
    }

    let closeHiddenMenuHandler = (e) => {
        const hiddenMenu = document.getElementById("hiddenMenu"),
        // openButten = document.getElementById("openButten"),
        // closeButton = document.getElementById("closeButton"),
        overlay = document.getElementById("overlay");

        hiddenMenu?.classList.replace('flex' , 'hidden')
        overlay?.classList.replace('flex' , 'hidden')
    }

    window.addEventListener("resize" , () => closeHiddenMenuHandler());

    window.onclick = (e => {
            let userInfo1 = document.getElementById('userInfo1')
            let userInfo2 = document.getElementById('userInfo2')
            let userInfo3 = document.getElementById('userInfo3')
            let userInfo4 = document.getElementById('userInfo4')

            if(e.target !== userInfo1 && e.target !== userInfo2  && e.target !== userInfo3  && e.target !== userInfo4 ){
                if(document.getElementById('userMenu') !== null && document.getElementById('userMenu')?.classList.contains('flex')){
                    document.getElementById('userMenu')?.classList.replace('flex' , 'hidden')
                }
            }   

    })

    let signOutHandler = ( e ) => {
        console.log(e)
        
        setLoading(true)

        NodejsApi.post('/auth/logout' , userProp._id)
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
                navigation('/')
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
        // Header
        <>
        {
            success ? '' : 
            <div className='fixed h-screen w-screen bg-gray-600 bg-opacity-20 z-50 flex items-center justify-center' > 
                <div className="bg-red-500 text-white font-[700] text-lg" >{success.message}</div>
            </div>
        }
        { loading ? <SpinnerOnTop  /> : '' }
        <header className='flex items-center sticky top-0 z-30 justify-between w-full h-10 py-10 px-4 md:p-10  border-b border-solid border-b-[#0F2027] bg-gradient-to-r from-[#0F2027] via-[#203A43] to-[#2C5364] shadow-lg text-white dark:border-none font-["Nunito"]' >
            {/* burger menu */}
            <button id='openButten' onClick={openHiddenMenuHandler}  className='h-fit flex lg:hidden' >
                <FontAwesomeIcon icon={faBars} className='text-4xl' />
            </button>
            {/* Logo */}
            <Link to={'/'}  className='flex items-center w-fit text-white text-4xl' >
                <FontAwesomeIcon icon={faBlog} className=''  />
                <span className='h-fit ml-2 font-["PT_Sans"] font-semibold flex ' >Weblog</span>
            </ Link>
            
            {/* Navigation Menu */}
            <nav className='h-fit hidden xl:flex items-center justify-between gap-8 font-["Nunito"]  '>
                <Link to="/" className='' >Home</Link>
                <Link to="/articles">Blog</Link>
                <Link to="/podcasts">Podcast</Link>
                <Link to="/posts">Forum</Link>
                <Link to="/aboutus">About us</Link>
                <Link to="/contact">Contact</Link>
            </nav> 

            {/* Search Box */}
            <div className='h-fit hidden md:flex relative '  >
                <input lang='en' onKeyDown={e => {
                    if(e.key === 'Enter'){
                        navigation(`/search/${e.target.value}`)
                    }
                
                }} type="text" name='search' className='pl-8 pr-4 py-2 outline-none rounded-md bg-gray-200 text-gray-700 font-["Nunito"]' placeholder='search here' style={{textAlign : 'left'}} />
                {/* <input lang='fa' type="text" className='pl-8 pr-4 py-2 outline-none rounded-md bg-gray-200 text-gray-700 font-["Vazir"]' placeholder='search here' style={{textAlign : 'left'}} /> */}
                <FontAwesomeIcon icon={faSearch} className='text-slate-500 absolute left-2 top-3 ' />
            </div>
            {/* theme and auth links */}
            <div className='flex items-center gap-6' >
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
                <div className='h-fit flex items-center font-["Ubuntu"]' >
                    {
                        userProp.isAuthenticated ? 
                        ( 
                            <div className='relative' >    

                                <div id='userInfo1' className='flex items-center gap-4 w-fit '
                                    onClick={e => document.getElementById('userMenu')?.classList.contains('hidden') ? 
                                    document.getElementById('userMenu')?.classList.replace('hidden' , 'flex')
                                    : 
                                    document.getElementById('userMenu')?.classList.replace('flex' , 'hidden')
                                }>

                                    <span id='userInfo2'  className='hidden md:flex cursor-pointer'  >{ userProp.user.username }</span>
                                    {
                                        userProp.user.avatar !== null ?
                                        <div  className='h-12 w-12 ring-2 ring-green-400 overflow-hidden rounded-full my-4   hover:scale-110 transition-all cursor-pointer ' >
                                            <img id='userInfo3'  src={`${process.env.REACT_APP_API_URL}/${userProp.user.avatarpath}`} alt="avatar" className='object-cover scale-105' />
                                        </div>
                                        :
                                        <FontAwesomeIcon id='userInfo4'  icon={faUser} />
                                    }

                                </div>

                                <div  id='userMenu' className='hidden flex-col items-center h-fit absolute top-24 right-1  text-gray-50  divide-y divide-gray-400 bg-slate-600 border border-solid border-gray-300 border-opacity-10 rounded-md py-6 px-4 bg-gradient-to-r from-[#0F2027] via-[#203A43] to-[#2C5364] shadow-lg ' >
                                    <button className='h-fit w-full py-4 px-2' >
                                        <Link to={`/user/dashboard/${userProp.user._id}`} className='flex items-center justify-start h-fit w-full gap-2 hover:text-blue-600 whitespace-nowrap ' >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>
                                            <span className='font-[500] text-md ' >User Dashboard</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                        </Link>
                                    </button>
                                    <button className='h-fit w-full py-4 px-2' >
                                        <Link to={`/user/panel/profile`} className='flex items-center justify-start h-fit w-full gap-2 hover:text-blue-600 whitespace-nowrap ' >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>
                                            <span className='font-[500] text-md ' >User Panel</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                        </Link>
                                    </button>
                                    <button className='h-fit w-full py-4 pl-4 flex items-center justify-start gap-4 hover:text-blue-600 ' onClick={signOutHandler} >
                                        <FontAwesomeIcon icon={faSignOut} />
                                        <span className=' font-[500] text-md ' >logout</span>
                                    </button>
                                </div>

                            </div>
                        )
                        :  
                        (
                        <div className='h-fit flex flex-col md:flex-row items-center gap-4 md:gap-6' >
                            <Link to="/auth/login">Login</Link>
                            <Link to="/auth/register">Register</Link>
                        </div>
                        )
                    }
                </div>
                
            </div>

            
            

        </header>

        {/* hidden menu */}
        <div id='hiddenMenu' dir='ltr' className='hidden flex-col items-center justify-start  gap-6 h-screen w-[320px] bg-zinc-50 dark:bg-[#092635] text-gray-800 dark:text-gray-50 bg-opacity-100 fixed left-0 top-0 z-50 px-6 py-4 ' >
            <button id='closeButton' onClick={closeHiddenMenuHandler}  className='w-fit h-fit' >
                <FontAwesomeIcon icon={faClose} className='text-blue-900 dark:text-gray-50 text-xl font-[700] cursor-pointer absolute top-5 right-5' />
            </button>
            {/* Logo */}
             <Link to='/' className='flex items-center w-fit h-fit text-gray-800 dark:text-white text-4xl mb-6' >
                <FontAwesomeIcon icon={faBlog} className=' '  />
                <span className='h-fit ml-2 font-["PT_Sans"] font-semibold flex ' >Weblog</span>
            </Link>
            {/* Search Box */}
            <div className='h-fit w-full  flex relative border-b border-solid border-gray-700/70 dark:border-gray-200/80 pb-10 '  >
                <input lang='en' onKeyDown={e => {
                    if(e.key === 'Enter'){
                        navigation(`/search/${e.target.value}`)
                    }
                
                }}  type="text" name='search' className='pl-8 pr-4 py-2 w-full outline-none rounded-md bg-gray-300 dark:bg-gray-600 dark:text-gray-50  text-gray-900 font-["Nunito"]' placeholder='search here' style={{textAlign : 'left'}} />
                {/* <input lang='fa' type="text" className='pl-8 pr-4 py-2 outline-none rounded-md bg-gray-200 text-gray-700 font-["Vazir"]' placeholder='search here' style={{textAlign : 'left'}} /> */}
                <FontAwesomeIcon icon={faSearch} className='text-slate-500 absolute left-2 top-3 ' />
            </div>
            {/* theme and auth links */}
            <div className='h-fit w-full flex flex-col items-start py-4 px-2  border-b border-solid border-gray-700/70 dark:border-gray-200/80 gap-6 ' >
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
                
                {/* Auth links */}
                <div className='h-fit flex items-center font-["Ubuntu"]' >
                    {
                        userProp.isAuthenticated ? 
                        ( 
                            <Link to={`/user/dashboard/${userProp.user._id}`} className='flex items-center gap-4' >
                                {
                                    userProp.user.avatar !== null ?
                                    <div className='h-12 w-12 ring-2 ring-green-400 overflow-hidden rounded-full my-4   hover:scale-110 transition-all ' >
                                        <img src={`${process.env.REACT_APP_API_URL}/${userProp.user.avatarpath}`} alt="avatar" className='object-cover scale-105' />
                                    </div>
                                    :
                                    <FontAwesomeIcon icon={faUser} />
                                }
                                <span className='h-fit font-[500] text-lg'  >{ userProp.user.username }</span>

                            </Link>
                        )
                        : 
                        (
                        <div className='h-fit flex items-center gap-6' >
                            <Link to="/auth/login">
                                Login
                            </Link>
                            <Link to="/auth/register">Register</Link>
                        </div>
                        )
                    }
                </div>
            </div>
            {/* Navigation Menu */}
            <nav className='h-fit w-full flex flex-col self-start  items-start justify-between gap-5 font-["Nunito"] overflow-y-auto '>
                <Link  to="/" className='flex items-center gap-2 w-full' >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    <span className='h-fit text-xl font-[600]' >Home</span> 
                </Link >
                <Link  to="/articles" className='flex items-center gap-2 w-full' >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                    </svg>
                    <span className='h-fit text-xl font-[600]' >Articles</span> 
                </Link >
                <Link  to="/podcasts" className='flex items-center gap-2 w-full' >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                    </svg>
                    <span className='h-fit text-xl font-[600]' >Podcasts</span> 
                </Link >
                <Link  to="/posts" className='flex items-center gap-2 w-full' >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                    </svg>
                    <span className='h-fit text-xl font-[600]' >Forum</span> 
                </Link >
                <Link  to="/aboutus" className='flex items-center gap-2 w-full' >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>
                    <span className='h-fit text-xl font-[600]' >About us</span> 
                </Link >
                <Link  to="/contact" className='flex items-center gap-2 w-full' >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                    <span className='h-fit text-xl font-[600]' >Contact</span> 
                </Link >
            </nav> 
            
            
        </div>
        {/* overlay */}
        <div id='overlay' onClick={closeHiddenMenuHandler}  className='hidden w-screen h-screen fixed bg-gray-900 bg-opacity-50 z-40  ' ></div>

        </>
    )
}

export default Header;