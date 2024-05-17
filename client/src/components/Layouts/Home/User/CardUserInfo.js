import React   from 'react';
import { NavLink } from 'react-router-dom';

// import layouts
import TimesAgo from 'src/components/Layouts/Home/General/TimesAgo';
import ButtonSpinner from 'src/components/Layouts/Home/Loadings/ButtonSpinner';

// import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faClock  } from '@fortawesome/free-regular-svg-icons';
import { faGithub, faInstagram, faLinkedin, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

function CardUserInfo(props){
    
    const authenticatedUser = props.authenticatedUser
    const userstate = props.userstate
    const followUserHandler = props.followUserHandler
    const buttonLoading = props.buttonLoading
    const user = props.userstate.user

    console.log(userstate.user.roles)

    let userRolesNames = []
    if(userstate.user.roles.length !== 0 && userstate.user.roles !== undefined ){
        userstate.user.roles.forEach(role => {
            return userRolesNames.push(role.name) 
        })
    }

    return (
        // user info 
        <div className='flex flex-col items-center w-full h-fit bg-white px-2 py-6 lg:p-4 border border-solid border-gray-300 rounded-md shadow-md dark:bg-slate-600/80 dark:text-gray-50' >
            {/* user info row 1 */}
            <div className='flex flex-col gap-6 lg:flex-row items-center justify-between w-full h-fit' >
                {/* base info about user */}
                <div className='flex flex-col lg:flex-row  items-center gap-4' >
                    <div className='flex items-center justify-center text-gray-600 dark:text-gray-50 w-32 h-32 overflow-hidden ring-4 ring-green-300 rounded-full' >
                        {
                            userstate.user.avatar === null ?
                            <FontAwesomeIcon icon={faCircleUser} className='text-gray-300 dark:text-gray-200 text-2xl font-[400] h-full w-full '   /> :
                            <img src={`http://localhost:5000/${userstate.user.avatarpath}`} alt={`${userstate.user.username}`} className=' scale-105 hover:scale-125 transition-all duration-500 ' />
                        }
                    </div>
                    <div className='h-fit flex flex-col items-center lg:items-start gap-4 lg:gap-2' >
                        <span className='h-fit w-fit text-2xl font-[800] text-center lg:text-start dark:text-gray-50' >{
                            userstate.user.fullname === null ?
                            userstate.user.username :
                            userstate.user.fullname
                        }</span>
                        <div className=' lg:divide-x divide-gray-300 text-base font-[500] text-gray-700 dark:text-gray-50 flex flex-col lg:flex-row gap-2 items-center' >
                            <button className='h-fit cursor-text px-2 pl-0 font-[700] mr-2' >
                                @{
                                    userstate.user.username
                                }
                            </button>
                            {
                                userstate.user.profossional === null ? ''
                                : 
                                <button className='h-fit cursor-text px-2' >
                                    <span className='font-[700] mr-2' >
                                        profossional :
                                    </span>
                                    {userstate.user.profossional}
                                </button>
                            }
                            <button className='flex items-center gap-2 cursor-text px-2' >
                                <FontAwesomeIcon icon={faClock} />
                                <div className='h-fit cursor-text flex items-center' >
                                    <span className='font-[700] mr-2' >
                                        last availabity :
                                    </span>
                                    <TimesAgo date={userstate.user.updatedAt} icon={false} />
                                </div>
                            </button>
                        </div>
                    </div>
                </div> 
                {/* A button to follow a user or edit profile */}
                {authenticatedUser.isAuthenticated &&
                <div className='text-gray-600 h-fit' >
                    {
                        
                        userstate.user._id === authenticatedUser?.user?._id ?
                        <button className='border border-solid border-blue-300 rounded-md px-6 py-3 text-blue-600  hover:bg-blue-400 hover:text-white font-[600]' >
                            <a href={`/user/panel/profile`}>
                                Edit profile
                            </a>
                        </button>
                        : 
                        <button onClick={e => followUserHandler(e , user.followedByThisUser , user._id ) } disabled={buttonLoading ? true : false} className='border border-solid border-blue-300 rounded-md px-4 py-2 text-lg  text-white bg-blue-400 hover:bg-transparent hover:text-blue-600 font-[500] mt-4 focus:ring-4 focus:ring-green-500 ' > 
                            {
                                buttonLoading ? <ButtonSpinner /> : 
                                
                                user.followedByThisUser 
                                ? 'unfollow'
                                : 'follow'
                            }
                        </button>
                    }
                </div>}
            </div>
            {/* user info row 2 */}
            <div className='flex flex-col gap-6 lg:flex-row  items-center justify-between w-full py-8 border-b border-solid border-gray-300' >
                <div className='flex items-center gap-6' >
                    <div className='flex items-center gap-2 text-gray-500 dark:text-gray-50 font-[600] h-fit' >
                        <span>{userstate.user.followersCount}</span>
                        <span>followers</span>
                    </div>
                    <div className='flex items-center gap-2 text-gray-500 dark:text-gray-50 font-[600] h-fit' >
                        <span>{userstate.user.followingsCount}</span>
                        <span>followings</span>
                    </div>
                </div>
                <div className='flex items-center gap-2 text-gray-600 dark:text-gray-50 font-[600]'  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                    </svg>
                    <span className='h-fit' > time of register :</span>
                    <TimesAgo date={userstate.user.createdAt} icon={false} />
                </div>
            </div>
            {/* user info row 4 works info menu */}
            <div className='flex flex-col gap-6 lg:flex-row  items-center lg:justify-between w-full' >
                <div className='flex items-center justify-center lg:justify-start gap-4 whitespace-nowrap lg:gap-6 w-full py-6 text-gray-800 dark:text-gray-50 text-sm lg:text-lg font-[600] lg:font-[700]' >
                    <button className='' >
                        <NavLink exact to={`/user/dashboard/${userstate.user._id}` }  activeClassName='text-cyan-600 target:text-cyan-600'>
                            About Me
                        </NavLink>
                    </button> 
                    {
                        userRolesNames.includes('article writer') || userRolesNames.includes('writer') || userRolesNames.includes('manager') ?
                        <button>
                            <NavLink to={`/user/dashboard/${userstate.user._id}/articles` }  activeClassName='text-cyan-600 target:text-cyan-600'>
                                Articles
                            </NavLink>
                        </button>
                        : ''
                    }
                    <button>
                        <NavLink to={`/user/dashboard/${userstate.user._id}/posts` }  activeClassName='text-cyan-600 target:text-cyan-600'>
                            Posts
                        </NavLink>                    
                    </button>
                    <button>
                        <NavLink to={`/user/dashboard/${userstate.user._id}/followed-tags` }  activeClassName='text-cyan-600 target:text-cyan-600'>
                            Followed tags
                        </NavLink>    
                    </button>
                </div>
                <div className='flex items-center gap-4 h-fit mr-4' >
                    {
                        userstate.user.github === null ? '' :
                        <span className='text-2xl hover:opacity-60 text-[#333]' >
                            <a href={`${userstate.user.github}`} className='h-full text-center' >
                                <FontAwesomeIcon icon={faGithub} />
                            </a>
                        </span>
                    }
                    {
                        userstate.user.website === null ? '' :
                        <span className='text-2xl hover:opacity-60 text-gray-800 dark:text-gray-50 ' >
                            <a href={`${userstate.user.website}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                            </svg>

                                {/* <FontAwesomeIcon icon={faEarth} /> */}
                            </a>
                        </span>
                    }
                    {
                        userstate.user.linkedin === null ? '' :
                        <span className='text-2xl hover:opacity-60 text-[#0976b4] ' >
                            <a href={`${userstate.user.linkedin}`}>
                                <FontAwesomeIcon icon={faLinkedin} />
                            </a>
                        </span>
                    }
                    {
                        userstate.user.telegram === null ? '' :
                        <span className='text-2xl hover:opacity-60 text-blue-700 ' >
                            <a href={`${userstate.user.telegram}`}>
                                <FontAwesomeIcon icon={faTelegram} />
                            </a>
                        </span>
                    }
                    {
                        userstate.user.instagram === null ? '' :
                        <span className='text-2xl hover:opacity-60 text-[#3f729b] ' >
                            <a href={`${userstate.user.instagram}`}>
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                        </span>
                    }
                    {
                        userstate.user.twitter === null ? '' :
                        <span className='text-2xl hover:opacity-60 text-[#55acee] ' >
                            <a href={`${userstate.user.twitter}`}>
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                        </span>
                    }
                </div>
            </div>
            
        </div>            
    )
}

export default CardUserInfo; 