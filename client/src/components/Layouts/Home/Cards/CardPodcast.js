import React from 'react';
import SaveBtn from '../Buttons/saveBtn';
import LikeBtn from '../Buttons/likeBtn';
import CommentBtn from '../Buttons/commentBtn';

// import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophoneAlt, faClock   } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


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
            <a href={`/podcasts/${podcast.slug}`} className='w-full md:w-[40%] h-full' >
                <img src={`${process.env.REACT_APP_API_URL}/${podcast.imagepath}`} alt="podcast" className=' object-cover rounded-l-lg shadow-md hover:scale-105 transition-all' />
            </a>

            {/* card info */}
            <div className='flex flex-col items-start gap-6 pt-4 w-[60%]' >

                <div className='flex items-center flex-wrap gap-2 md:gap-[10px]  w-full h-fit py-2 px-2 ' >

                    {/* podcast sound time */}
                    <div className='h-fit flex items-center gap-1' >
                        <FontAwesomeIcon icon={faClock} />
                        <span className="flex items-center justify-center">
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
                    <div className='flex items-center gap-1 text-xs ' >

                        <CommentBtn link={`/podcasts/${podcast.slug}#comments`} commentCount={podcast.commentCount} />

                        <SaveBtn saveCount={podcast.saveCount} _id={podcast._id} savedByThisUser={podcast.savedByThisUser} saveHandler={saveHandler} isAuthenticated={userstate.isAuthenticated} buttonLoading={buttonLoading} />

                        <LikeBtn likeCount={podcast.likeCount} _id={podcast._id} likedByThisUser={podcast.likedByThisUser} likeHandler={likeHandler} isAuthenticated={userstate.isAuthenticated} buttonLoading={buttonLoading} />

                    </div>

                </div>

                {/* Card title */}
                <h3 dir='ltr' className='text-lg h-12 md:pl-6 px-1  justify-center line-clamp-2 font-[600] text-gray-900  dark:text-gray-50 hover:opacity-85 ' >
                    <a href={`/podcasts/${podcast.slug}`}  dir='ltr' >
                        {podcast.title}
                    </a>
                </h3>

                {/* Card row 1 */}
                {/* <div className='flex items-center justify-between w-full h-fit py-2 ' >
                    <a href={`/user/dashboard/${podcast.user._id}`} className='flex items-center gap-2 h-fit' >
                        {
                            podcast.user.avatar !== null ?
                            <img src={`${process.env.REACT_APP_API_URL}/${podcast.user.avatarpath}`} alt="user" className='h-10 w-10 rounded-full ring-1 ring-green-200  object-cover self-center shadow-md hover:scale-105 transition-all' />
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
                    <Link  to={`/podcasts/${podcast.slug}`} className='h-fit text-lg flex items-center gap-2 text-blue-500 dark:text-blue-200  dark:hover:text-blue-400 ' >
                        <span className='font-[500] text-lg h-fit' >listen to podcast</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </Link>
                </div>

            </div>

        </div>
    )
}

export default CardPodcast;
