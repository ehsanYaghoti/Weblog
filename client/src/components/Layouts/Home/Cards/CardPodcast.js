import React from 'react';
// import moment from 'jalali-moment';

// import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment , faHeart as faheartSolid  , faBookmark as faBookmarkSolid, faMicrophoneAlt, faClock   } from '@fortawesome/free-solid-svg-icons';
import {  faHeart , faBookmark   } from '@fortawesome/free-regular-svg-icons';


function CardPodcast(props) {
    
    //props
    let podcast = props.podcast
    let userstate = props.userstate
    let saveHandler = props.saveHandler
    let likeHandler = props.likeHandler
    let buttonLoading = props.buttonLoading
    // let buttonLikeLoading = props.buttonLikeLoading
    // let buttonSaveLoading = props.buttonSaveLoading


    return (
        // CardPodcast
        <div key={podcast._id} className='flex flex-col md:flex-row  items-center   rounded-lg w-full h-fit md:w-[500px] lg:max-w-[600px] xl:max-w-[750px] lg:w-full md:h-[200px]    shadow-md shadow-slate-500/90 font-["Vazir"] bg-white dark:bg-slate-600/80  dark:text-white ' >
            
            {/* Card image */}
            <a href={`/podcasts/${podcast.slug}`} className='h-full' >
                <img src={`http://localhost:5000/${podcast.imagepath}`} alt="podcast" className='w-full md:w-64 h-full object-cover md:object-cover  rounded-l-lg shadow-md hover:scale-105 transition-all' />
            </a>
            
            <div className='flex flex-col items-start gap-6 pt-4' >
                {/* Card row 2 */}
                <div className='flex items-center justify-between gap-2 md:gap-4  w-full h-fit py-2 px-1 md:pl-6 pr-2 ' >

                    {/* podcast sound time */}
                    <div className='h-fit flex items-center gap-1' >
                        <FontAwesomeIcon icon={faClock} /> 
                        <span>
                            {podcast.soundTime}
                        </span>
                    </div>

                    {/* podcast number */}
                    <div className='h-fit flex items-center gap-1' >
                        <FontAwesomeIcon icon={faMicrophoneAlt} />
                        <div className='flex items-center gap-1 whitespace-nowrap'>
                            <span className='h-fit'  >number</span>
                            <span className='h-fit'  >{podcast.number}</span>
                        </div>
                    </div>

                    {/* podcast react buttons */}
                    <div className='flex items-center gap-2 text-xs ' >
                        {/* Comments link */}
                        <a href={`/podcasts/${podcast.slug}#comments`} className='flex items-center justify-center h-full w-1/3 gap-1 py-1 px-1 rounded-md border border-solid border-gray-100 bg-gray-100  text-gray-500 hover:bg-gray-500  hover:text-white dark:bg-gray-700 dark:bg-opacity-50  dark:border-none dark:shadow-md dark:shadow-gray-500/50  dark:text-gray-300 cursor-pointer ' > 
                            <FontAwesomeIcon icon={faComment} />
                            {podcast.commentCount}
                        </a >
                        {/* Save Button */}
                        <button disabled={userstate.isAuthenticated || !buttonLoading ? false : true} className={`flex items-center justify-center h-full w-fit gap-1 py-1 px-1 rounded-md  border border-solid border-blue-50  hover:bg-opacity-90 hover:text-blue-400  dark:hover:text-white dark:border-none cursor-pointer
                            ${ userstate.isAuthenticated ?
                                podcast.savedByThisUser ? 'bg-blue-500 text-white hover:bg-opacity-30 dark:shadow-md dark:shadow-blue-500/50' : 'bg-blue-50 text-blue-200 dark:bg-blue-700 dark:bg-opacity-40 dark:text-blue-400  ' 
                                : ''
                            }`} onClick={e => saveHandler(e, podcast._id , podcast.savedByThisUser , 'podcast')} >
                            <FontAwesomeIcon icon={ 
                                userstate.isAuthenticated ?
                                podcast.savedByThisUser ? faBookmarkSolid : faBookmark  
                                : faBookmark
                            }  /> 
                            {podcast.saveCount}
                        </button>
                        {/* Like Button */}
                        <button id={`likeOf-${podcast._id}`} disabled={userstate.isAuthenticated || !buttonLoading ? false : true} className={`flex items-center gap-1  p-1 rounded-md  border border-solid border-red-50 hover:bg-opacity-90  hover:text-red-400 dark:hover:text-white dark:border-none cursor-pointer 
                            ${ userstate.isAuthenticated ?
                                podcast.likedByThisUser ? 'bg-red-500 text-white hover:bg-opacity-30 dark:shadow-md dark:shadow-red-400/50' : 'bg-red-50 text-red-200 dark:bg-red-600 dark:bg-opacity-30 dark:text-red-400 ' 
                                : ''
                            } `} onClick={e => likeHandler(e, podcast._id , podcast.likedByThisUser , 'podcast' )} >
                            <FontAwesomeIcon icon={ 
                                userstate.isAuthenticated ?
                                podcast.likedByThisUser ? faheartSolid : faHeart  
                                : faHeart
                            }  />
                            {podcast.likeCount}
                        </button>
                    </div>

                </div> 

                {/* Card title */}
                <h3 dir='ltr' className='text-xl h-12 md:pl-6 px-1  justify-center line-clamp-2 font-[600] text-gray-900  dark:text-gray-50 hover:opacity-85 ' >
                    <a href={`/podcasts/${podcast.slug}`}  dir='ltr' >
                        {podcast.title}
                    </a>
                </h3>

                {/* Card row 1 */}
                {/* <div className='flex items-center justify-between w-full h-fit py-2 ' >
                    <a href={`/user/dashboard/${podcast.user._id}`} className='flex items-center gap-2 h-fit' >
                        {
                            podcast.user.avatar !== null ?
                            <img src={`http://localhost:5000/${podcast.user.avatarpath}`} alt="user" className='h-10 w-10 rounded-full ring-1 ring-green-200  object-cover self-center shadow-md hover:scale-105 transition-all' />
                            : <FontAwesomeIcon icon={faUserCircle} />
                        }
                        <span className='dark:text-gray-50 hover:text-opacity-80' >{podcast.user.username}</span>
                    </a>
                    <a href={`/podcasts?category=${podcast.categories[0].slug}`}   className='flex items-center gap-1 h-fit dark:text-gray-50 hover:text-opacity-80' >
                        <FontAwesomeIcon icon={faFolderClosed} />
                        <span>{podcast.categories[0].name}</span>
                    </a>
                </div> */}

                <div className='h-fit w-full flex justify-end px-6 py-2 border-t border-solid border-gray-300 text-right' >
                    <a href={`/podcasts/${podcast.slug}`} className='h-fit text-lg flex items-center gap-2 text-blue-500 dark:text-blue-200  dark:hover:text-blue-400 ' >
                        <span className='font-[500] text-lg h-fit' >listen to podcast</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </a>   
                </div>
                
            </div>
            {/* <p id={podcast._id} className='font-[200] w-full text-gray-800 line-clamp-2 leading-6 overflow-hidden '  ></p> */}
        
        </div>
    )
}

export default CardPodcast;