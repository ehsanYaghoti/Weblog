import React   from 'react';
import ButtonSpinner from 'src/components/Layouts/Home/Loadings/ButtonSpinner';

// import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';


function CardUserFollowing(props){
    
    const authenticatedUser = props.authenticatedUser
    const user = props.user
    const followUserHandler = props.followUserHandler
    const buttonLoading = props.buttonLoading

    

    
    return (
        // user info
        <div className='flex flex-col items-center gap-4 w-full h-fit bg-white p-4 border border-solid border-gray-300 dark:border-gray-500 rounded-md shadow-md mt-6 dark:bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] dark:from-gray-900 dark:to-gray-600 ' >
            {/* user avatar */}
            <a href={`/user/dashboard/${user._id}`} className='flex items-center justify-center text-gray-600 w-14 h-14 overflow-hidden ring-1 ring-green-300 rounded-full mt-2' >
                {
                    user.avatar === null ?
                    <FontAwesomeIcon icon={faUserCircle} className='text-gray-300  text-2xl font-[400] h-full w-full '   /> 
                    :
                    <img src={`http://localhost:5000/${user.avatarpath}`} alt={`${user.username}`} className=' scale-105 hover:scale-125 transition-all duration-500 ' />
                }
            </a>

            {/* base info about user */}        
            <div className='flex flex-col w-fit h-fit items-center gap-4' >
                <a href={`/user/dashboard/${user._id}`} className='h-fit text-lg font-[600]' >{
                    user.fullname === null ?
                    user.username :
                    user.fullname
                }</a >
                <div className=' flex flex-col lg:flex-row gap-2 items-center lg:divide-x divide-gray-300 text-sm font-[500] text-gray-700 dark:text-gray-50' >
                    <button className='h-fit cursor-text  font-[700] ' >
                        <a href={`/user/dashboard/${user._id}`}>
                            @{
                                user.username
                            }
                        </a>
                    </button>
                    {
                        user.profossional === null ? ''
                        : 
                        <button className='h-fit cursor-text px-2' >
                            <span className='font-[700] mr-2' >
                                profossional :
                            </span>
                            {user.profossional}
                        </button>
                    }
                </div>
            </div>
            
            {/* user about */}
            {
                user.about !== null ?
                <div className='text-base mt-2 font-[500] whitespace-normal' >
                    {user.about}
                </div>
                : ''
            }

            {/* A button to follow a user or edit profile */}
            <div className='text-gray-600 h-fit' > 
                {
                    user._id === authenticatedUser.user._id ? ''
                    :
                    <button onClick={e => followUserHandler(e , user.followedByThisUser , user._id )}  disabled={buttonLoading ? true : false} className='border border-solid border-blue-300 rounded-md px-2 py-1 text-sm  text-white bg-blue-400 hover:bg-transparent hover:text-blue-600 font-[500] mt-4 focus:ring-4 focus:ring-green-500 ' > 
                        {
                            buttonLoading ? <ButtonSpinner /> : 

                            user.followedByThisUser 
                            ? 'unfollow'
                            : 'follow'
                        }
                    </button>
                }
            </div>
        </div>            
    )
}

export default CardUserFollowing; 