import React   from 'react';

// import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import ButtonSpinner from 'src/components/Layouts/Home/Loadings/ButtonSpinner';


function CardUserBio(props){
    
    const authenticatedUser = props.authenticatedUser
    const user = props.user
    const sidebar = props.sidebar
    const followUserHandler = props.followUserHandler
    const buttonLoading = props.buttonLoading


    
    
    return (
        // user info
        <div className='flex flex-col items-center w-full h-fit bg-white p-4 border border-solid border-gray-300 rounded-md shadow-md mt-6 dark:bg-gradient-to-br dark:from-10% dark:from-[rgb(32,38,57)] dark:to-70% dark:to-[rgb(63,76,119)] dark:text-gray-50 dark:border-none ' >
            {/* user info row 1 */}
            <div className='flex flex-col md:flex-row items-center justify-between w-full h-fit' >
                {/* base info about user */}
                <div className='flex flex-col md:flex-row items-center md:items-start gap-4' >
                    <a href={`/user/dashboard/${user._id}`} className='flex items-center justify-center text-gray-600 w-12 h-12 overflow-hidden ring-1 ring-green-300 rounded-full mt-2' >
                        {
                            user.avatar === null ?
                            <FontAwesomeIcon icon={faCircleUser} className='text-gray-300 text-2xl font-[400] h-full w-full '   /> 
                            :
                            <img src={`${process.env.REACT_APP_API_URL}/${user.avatarpath}`} alt={`${user.username}`} className=' scale-105 hover:scale-125 transition-all duration-500 ' />
                        }
                    </a>
                    <div className='h-fit flex flex-col items-center md:items-start gap-2 md:gap-1' >
                        <a href={`/user/dashboard/${user._id}`} className='h-fit w-fit text-lg font-[600]' >{
                            user.fullname === null ?
                            user.username :
                            user.fullname
                        }</a >
                        <div className='md:divide-x divide-gray-300 text-sm font-[500] text-gray-700 dark:text-gray-50 flex flex-col md:flex-row items-center' >
                            {
                                sidebar ? '' :
                                <button className='h-fit hidden md:flex cursor-text pr-2 font-[700] mr-2' >
                                    <a href={`/user/dashboard/${user._id}`}>
                                        @{
                                            user.username
                                        }
                                    </a>
                                </button>
                            }
                            {
                                user.profossional === null ? ''
                                : 
                                <button className='h-fit cursor-text  whitespace-nowrap' >
                                    <span className='font-[700] mx-2' >
                                        profossional :
                                    </span>
                                    {user.profossional}
                                </button>
                            }
                        </div>
                        {
                            props.sidebar ? 
                            <div className='text-gray-600 h-fit' >
                                {
                                    authenticatedUser.isAuthenticated ?
                                    user._id === authenticatedUser.user._id ?
                                    ''
                                    : 
                                    <button onClick={e => followUserHandler(e , user.followedByThisUser , user._id ) }  disabled={buttonLoading ? true : false} className='border border-solid border-blue-300 rounded-md px-2 py-1 text-sm  text-white bg-blue-400 hover:bg-transparent hover:text-blue-600 font-[500] mt-4 focus:ring-4 focus:ring-green-500 ' > 
                                        {
                                            buttonLoading ? <ButtonSpinner /> : 

                                            user.followedByThisUser 
                                            ? <span>unfollow</span> 
                                            :  <span>follow</span> 
                                        
                                        }
                                    </button>
                                    : ''
                                }
                            </div>
                            :
                            user.about !== null ?
                            <div className='text-base mt-2  text-center md:text-start leading-6 font-[500] whitespace-normal' >
                                {user.about}
                            </div>
                            : ''
                        }
                        
                    </div>
                </div> 
                
                {/* A button to follow a user or edit profile */}
                { sidebar ? '' : 
                    (
                    <div className='text-gray-600 h-fit' >
                        {
                            authenticatedUser.isAuthenticated ?
                            user._id === authenticatedUser.user._id ?
                            ''
                            // <button className='border border-solid border-blue-300 rounded-md px-2 py-3 text-base text-blue-600  hover:bg-blue-400 hover:text-white font-[500]' >
                            //     <a href={`/user/panel/profile`}>
                            //         Edit profile
                            //     </a>
                            // </button>
                            :
                            <button onClick={e => followUserHandler(e , user.followedByThisUser , user._id ) }  disabled={buttonLoading ? true : false}  className='border border-solid border-blue-300 rounded-md px-2 py-1 text-sm  text-white bg-blue-400 hover:bg-transparent hover:text-blue-600 font-[500] mt-4 focus:ring-4 focus:ring-green-500 ' > 
                                {
                                    buttonLoading ? <ButtonSpinner /> : 

                                    user.followedByThisUser 
                                    ? 'unfollow'
                                    : 'follow'
                                }
                            </button>
                            : ''
                        }
                    </div>
                    )
                }
            </div>
        </div>            
    )
}

export default CardUserBio; 