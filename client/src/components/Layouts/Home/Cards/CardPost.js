import React from 'react';
// import moment from 'jalali-moment';
import TimesAgo from 'src/components/Layouts/Home/General/TimesAgo';

// import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle , faBookmark as faBookmarkSolid , faReply  , faCheck, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { faBookmark , faCopy  } from '@fortawesome/free-regular-svg-icons'




function CardPost(props) {
    
    //props
    let post = props.post
    let showReportForm = props.showReportForm
    let userstate = props.userstate
    let isSinglePage = props.isSinglePage
    let saveHandler = props.saveHandler
    

    return (
        // CardPost
        <div key={post._id} dir='ltr' className='flex flex-col items-start  gap-4 text-right  rounded-md w-full h-fit px-4 py-8  border border-solid border-gray-300 shadow-sm bg-zinc-100 dark:bg-[#3F4E4F] dark:bg-opacity-80 dark:border-none dark:text-white font-["Vazir"] ' >
            <div className='w-full flex flex-col md:flex-row gap-6    items-center justify-between' >
                <div className='flex flex-col md:flex-row w-full items-center gap-3'>        
                    <a href={`/user/dashboard/${post.user._id}`} className='h-fit' >
                        {
                            post.user.avatar !== null ?
                            <img src={`http://localhost:5000/${post.user.avatarpath}`} alt="user" className='h-16 w-16 rounded-full ring-2 ring-green-200  object-cover self-center shadow-md hover:scale-105 transition-all' />
                            : <FontAwesomeIcon icon={faUserCircle}className='text-6xl ml-4 text-gray-400 ring-4 ring-green-500 rounded-full' />
                        }
                    </a>
                    <div className='flex flex-col'>
                        <span className='text-2xl text-center md:text-start' >{post.user.username}</span>
                        <span className='self-end flex items-center gap-2 h-fit text-sm md:text-lg  ' dir='ltr' >
                            <span className='text-gray-500 whitespace-nowrap  h-fit dark:text-gray-50' >
                                asked by 
                            </span>
                            <a href={`/user/dashboard/${post.user._id}`} className='text-blue-300 underline h-fit hover:text-opacity-90 ' >
                                {post.user.username} 
                            </a>
                            <TimesAgo date={post.createdAt} icon={true} /> 
                        </span>
                    </div>
                </div>

                <div className='flex items-center gap-4' >
                    {
                        post.hasBestAnswer ?
                            <button  className='text-3xl  relative group     text-green-600  border bordder-solid border-green-500 rounded-md px-4 py-1 h-full ' >
                                <FontAwesomeIcon icon={faCheck} />
                                <div className='absolute -top-[100%] -left-1/2 h-fit text-sm w-fit invisible group-hover:visible group-hover:opacity-100 whitespace-nowrap   z-10 inline-block px-2 py-2  font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0' >
                                    <span>contain best answer</span>
                                    <div className='w-0 h-0  z-50 border-l-[50px] border-l-transparent border-t-[75px] border-t-red-800 border-r-[50px] border-r-transparent' ></div>
                                </div>
                            </button>
                        : ''
                    }
                    {/* Answers link */}
                    <a  href={ (isSinglePage) ? '#answers'  : `/posts/${post.slug}#answers` }   dir='ltr' className='flex items-center justify-start h-fit gap-1 py-3 px-2 rounded-md border border-solid border-gray-100 bg-gray-100 text-gray-500 hover:bg-gray-500 dark:border-none hover:text-white cursor-pointer ' > 
                        <FontAwesomeIcon icon={faReply} />
                        <span className='h-fit' >{post.answerCount}</span>
                        <span className='h-fit box-content' >answer</span>                                        
                    </a >
                    {/* Save Button */}
                    <button disabled={userstate.isAuthenticated ? false : true} className={`flex items-center gap-1 py-3 px-2 rounded-md  border border-solid border-blue-50  hover:bg-opacity-90 hover:text-white dark:border-none cursor-pointer
                        ${ userstate.isAuthenticated ?
                            post.savedByThisUser ? 'bg-blue-500 text-white' : 'bg-blue-50 text-blue-200 dark:bg-blue-300 dark:text-blue-500 ' 
                            : ''
                        }`} onClick={ isSinglePage ? e => saveHandler(e, post._id , post.savedByThisUser , 'post' , true) : e => saveHandler(e, post._id , post.savedByThisUser , 'post')} >
                        <FontAwesomeIcon icon={ 
                            userstate.isAuthenticated ?
                            post.savedByThisUser ? faBookmarkSolid : faBookmark  
                            : faBookmark
                        }  />
                        {post.saveCount}
                    </button>
                    {
                        isSinglePage ?
                        <>           
                        {/* report Button post */}
                        <button name='reportBtnPost' onClick={e => { 
                            showReportForm(e , 'post' , post._id )
                        }} disabled={userstate.isAuthenticated ? false : true} className={`flex items-center gap-1 py-3 px-3 text-xl text-gray-500 rounded-md  border border-solid border-gray-200  hover:bg-gray-500 hover:text-white dark:text-gray-50 cursor-pointer`} >
                            <FontAwesomeIcon icon={faExclamationTriangle}   />
                            
                        </button>
                        
                        {/* share link Button */}
                        <button onClick={e => {

                            let url = window.location.href.toString()
                            navigator.clipboard.writeText(decodeURIComponent(url));

                        }} disabled={userstate.isAuthenticated ? false : true} 
                            className={`flex items-center gap-1 py-3 px-3 text-xl text-gray-500 rounded-md  border border-solid border-gray-200 focus:bg-green-400 focus:border-green-300 focus:shadow-md focus:shadow-green-500 focus:text-white hover:bg-gray-500 hover:text-white cursor-pointer dark:text-gray-50`} >
                            <FontAwesomeIcon icon={faCopy}  />
                        </button>
                        </>
                        : ''
                    }
                </div>
            </div>
            {
                isSinglePage ? 
                <h3 className='text-xl h-fit font-[600] text-gray-900 my-4 dark:text-gray-50 hover:text-opacity-85 ' >{post.title}</h3>
                : 
                <a href={`/posts/${post.slug}`}>
                    <h3 className='text-xl h-fit font-[600] text-gray-900 my-4 dark:text-gray-50 hover:text-opacity-85' >{post.title}</h3>
                </a>
            }
            
            <a href={`/posts/${post.slug}`} className='w-full' >
                <p  id={post._id}  dir='ltr' className='font-[400] font-["Vazir"] w-full h-32 text-center md:text-left text-gray-800 line-clamp-4 md:line-clamp-4 text-lg leading-8 dark:text-gray-50 hover:text-opacity-85 overflow-hidden '  ></p>                                        
            </a>
        
            <div className='flex items-center mt-6 flex-wrap gap-x-2 gap-y-4 w-full text-sm md:text-lg' >
            {
                post.tags.map(tag =>{
                    return (
                        <span key={tag._id} className=' bg-teal-700 dark:shadow-lg dark:shadow-teal-500/50 p-2  md:p-4  rounded-md text-white font-["Nunito"]' >
                            <a href={`/tag/${tag.slug}`}>{tag.name}#</a>
                        </span>
                    )
                })
            }
            </div>
        </div>
    )
}

export default CardPost;