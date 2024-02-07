import React, { useState } from 'react';
import { NavLink , useHistory } from 'react-router-dom';
import moment from 'jalali-moment';

// import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faHand, faPodcast, faUserAlt, faUsers  } from '@fortawesome/free-solid-svg-icons';
import { faBookmark, faCommentDots, faComments, faFileLines, faHeart, faUser  } from '@fortawesome/free-regular-svg-icons';

// import Api
import NodejsApi from 'src/Api/NodejsApi'; 
import SpinnerOnTop from '../Loadings/SpinnerOnTop';

function UserPanelNavbar(props) {
    
    //props
    let user = props.user
    const history = useHistory()

    let userRolesNames = []
    if(user.roles.length !== 0 && user.roles !== undefined ){
        user.roles.forEach(role => {
            return userRolesNames.push(role.name) 
        })
    }


    const [loading , setLoading] = useState(false)
    const [success , setSuccess] = useState({
        state : true,
        message : ''
    })

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
        // UserPanelNavbar
        <>
            { success ? '' : <div className='fixed h-screen w-screen bg-gray-600 bg-opacity-20 z-50 flex items-center justify-center' > 
                <div className="bg-red-500 text-white font-[700] text-lg" >{success.message}</div>
            </div> }
            { loading ? <SpinnerOnTop  /> : '' }
            <nav className='hidden lg:flex transition-all duration-700 flex-col items-start gap-6 fixed top-0 py-6 px-4 overflow-y-auto overflow-x-clip min-h-fit ml-0 border-l-0 z-10 bg-white text-gray-700 dark:text-gray-50 text-lg font-[600] min-w-[250px] xl:w-[20%] lg:w-[25%] dark:border-none border-r border-solid border-gray-300  shadow-md dark:bg-gradient-to-bl from-gray-700 via-gray-900 to-black  ' >
                    <div className='flex flex-col items-center gap-2' >
                        <span className='h-fit whitespace-nowrap'>
                            <FontAwesomeIcon icon={faHand} className='mr-2' />
                            Welcome Aboard :
                        </span>
                        <span className='h-fit whitespace-normal leading-7' >
                            {
                                !user.fullname === null ?  user.fullname
                                :  user.username
                            }
                        </span>
                    </div>
                    {moment(new Date() , 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}
                    {
                        user.admin ?
                        <NavLink to="/admin" exact className="flex items-center min-w-[200px]  hover:opacity-80   h-fit px-6 py-3 gap-4" 
                            activeClassName=" text-blue-400 text-cyan-600 target:text-cyan-600   drop-shadow-sm shadow-blue-600 " >
                                <FontAwesomeIcon icon={faUserAlt} />
                                <span className='h-fit whitespace-nowrap' >Admin Panel</span>
                        </NavLink>
                        : ''
                    }
                    <NavLink to="/user/panel" exact className="flex items-center min-w-[200px]  hover:opacity-80   h-fit px-6 py-3 gap-4" 
                        activeClassName=" text-blue-400 text-cyan-600 target:text-cyan-600   drop-shadow-sm shadow-blue-600 " >
                            <FontAwesomeIcon icon={faAdd} />
                            <span className='h-fit whitespace-nowrap' >Create Post</span>
                    </NavLink>
                    <NavLink to="/user/panel/profile" className="flex items-center min-w-[200px]  hover:opacity-80   h-fit px-6 py-3 gap-4 " 
                        activeClassName=" text-blue-400 text-cyan-600 target:text-cyan-600   drop-shadow-sm shadow-blue-600 " >
                            <FontAwesomeIcon icon={faUser} />
                            <span className='h-fit whitespace-nowrap' >Edit Profile</span>
                    </NavLink>
                    {
                        userRolesNames.includes('article writer') || userRolesNames.includes('writer') || userRolesNames.includes('Manager') ?
                        <NavLink to="/user/panel/articles" className="flex items-center min-w-[200px]  hover:opacity-80   h-fit px-6 py-3 gap-4 " 
                            activeClassName=" text-blue-400 text-cyan-600 target:text-cyan-600   drop-shadow-sm shadow-blue-600 " >
                                <FontAwesomeIcon icon={faFileLines} />
                                <span className='h-fit whitespace-nowrap' >Articles</span>
                        </NavLink>
                        : ''
                    }
                    {
                        userRolesNames.includes('podcastWriter') || userRolesNames.includes('writer') || userRolesNames.includes('Manager') ?
                        <NavLink to="/user/panel/podcasts" className="flex items-center min-w-[200px]  hover:opacity-80   h-fit px-6 py-3 gap-4 " 
                            activeClassName=" text-blue-400 text-cyan-600 target:text-cyan-600   drop-shadow-sm shadow-blue-600 " >
                                <FontAwesomeIcon icon={faPodcast} />
                                <span className='h-fit whitespace-nowrap' >Podcasts</span>
                        </NavLink>
                        : ''
                    }
                    <NavLink to="/user/panel/posts" className="flex items-center min-w-[200px]  hover:opacity-80   h-fit px-6 py-3 gap-4 " 
                        activeClassName=" text-blue-400 text-cyan-600 target:text-cyan-600   drop-shadow-sm shadow-blue-600 " >
                            <FontAwesomeIcon icon={faFileLines} />
                            <span className='h-fit whitespace-nowrap' >Posts</span>
                    </NavLink>
                    <NavLink to="/user/panel/saves" className="flex items-center min-w-[200px]  hover:opacity-80   h-fit px-6 py-3 gap-4 " 
                        activeClassName=" text-blue-400 text-cyan-600 target:text-cyan-600   drop-shadow-sm shadow-blue-600 " >
                            <FontAwesomeIcon icon={faBookmark} />
                            <span className='h-fit whitespace-nowrap' >Saves</span>
                    </NavLink>
                    <NavLink to="/user/panel/likes" className="flex items-center min-w-[200px]  hover:opacity-80   h-fit px-6 py-3 gap-4 " 
                        activeClassName=" text-blue-400 text-cyan-600 target:text-cyan-600   drop-shadow-sm shadow-blue-600 " >
                            <FontAwesomeIcon icon={faHeart} />
                            <span className='h-fit whitespace-nowrap' >Likes</span>
                    </NavLink>
                    <NavLink to="/user/panel/followed" className="flex items-center min-w-[200px]  hover:opacity-80   h-fit px-6 py-3 gap-4 " 
                        activeClassName=" text-blue-400 text-cyan-600 target:text-cyan-600   drop-shadow-sm shadow-blue-600 " >
                            <FontAwesomeIcon icon={faUsers} />
                            <span className='h-fit whitespace-nowrap' >Followed</span>
                    </NavLink>
                    <NavLink to="/user/panel/comments" className="flex items-center min-w-[200px]  hover:opacity-80   h-fit px-6 py-3 gap-4 " 
                        activeClassName="text-blue-400 text-cyan-600 target:text-cyan-600   drop-shadow-sm shadow-blue-600 " >
                            <FontAwesomeIcon icon={faComments} />
                            <span className='h-fit whitespace-nowrap' >Comments</span>
                    </NavLink>
                    <NavLink to="/user/panel/answers" className="flex items-center min-w-[200px]  hover:opacity-80   h-fit px-6 py-3 gap-4 " 
                        activeClassName="text-blue-400 text-cyan-600 target:text-cyan-600   drop-shadow-sm shadow-blue-600 " >
                            <FontAwesomeIcon icon={faCommentDots} />
                            <span className='h-fit whitespace-nowrap' >Answers</span>
                    </NavLink>
                    <button  onClick={signOutHandler} className="flex items-center min-w-[200px]  hover:opacity-80   h-fit px-6 py-3 gap-4 " 
                        activeClassName=" text-blue-400 text-cyan-600 target:text-cyan-600   drop-shadow-sm shadow-blue-600 " >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                            </svg>
                            <span className='h-fit whitespace-nowrap' >Sign out</span>
                    </button>
            </nav> 
        </>
    )
}

export default UserPanelNavbar;