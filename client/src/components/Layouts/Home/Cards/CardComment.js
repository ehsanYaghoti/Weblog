import React from 'react';
// import moment from 'jalali-moment';
import TimesAgo from 'src/components/Layouts/Home/General/TimesAgo';

// import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faheartSolid ,faUserCircle , faReply  } from '@fortawesome/free-solid-svg-icons';
import {  faHeart   } from '@fortawesome/free-regular-svg-icons';


function CardComment(props) {
    
    //props
    let comment = props.comment
    let userstate = props.userstate
    let likeHandler = props.likeHandler
    let buttonLoading = props.buttonLoading

    let singleMediaPage = props.singleMediaPage

    let commentField = props.commentField
    let setCommentField = props.setCommentField
    let inputCommentHandler = props.inputCommentHandler
    let commentHandler = props.commentHandler

    console.log(comment)

    return (
        // Comment
        <div key={comment._id} id={`comment_${comment._id}`} className='w-full h-fit flex flex-col p-4 border border-solid border-gray-300 rounded-md shadow-md mb-6 bg-white dark:bg-slate-600/80' >
        {/* comment related media*/}
        {
            singleMediaPage ? '' : 
            <div className='flex flex-col lg:flex-row lg:whitespace-nowrap items-center gap-6 justify-between p-4 border-b border-solid border-gray-300  ' >
                
                <div className='flex flex-col md:flex-row lg:flex-col  xl:flex-row gap-2 lg:gap-4  items-center text-center   ' >
                    <div className=' font-[600] text-gray-700 dark:text-gray-100 text-base ' >
                        <span className='mr-2 leading-7' >The Comment is related to this {comment.mediaModel.toLowerCase()} : </span> 
                    </div>
                    <a href={`/${comment.mediaModel.toLowerCase()}s/${comment.media.slug}`} className='hover:text-gray-600 dark:hover:text-gray-50 text-blue-600 text-base xl:text-lg font-[600]' >{comment.media.title}</a>
                </div>

                <a href={`/${comment.mediaModel.toLowerCase()}s/${comment.media.slug}`} className='text-blue-600 hover:text-gray-600 dark:hover:text-gray-100 underline font-[600] text-lg xl:text-xl flex items-center gap-2 ' >
                    <span>
                        watch the {comment.mediaModel}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </a>
            </div>
        }
        {/* comment writer and info */}
        <div className='w-full flex flex-col md:flex-row lg:flex-col xl:flex-row gap-6 items-start md:items-center lg:items-start xl:items-center justify-between text-3xl text-gray-700 dark:text-gray-100 font-[600] py-4  mb-6' >
            {/* comment writer */}
            <div className='flex items-start lg:items-center' >
                <a href={`/user/dashboard/${comment.user._id}`} className='  w-fit h-fit' >
                    {
                        comment.user.avatar 
                        ? 
                        <img src={`http://localhost:5000/${comment.user.avatarpath}`} alt="user" className='h-14 w-14 rounded-full ring-2 ring-green-500  object-cover self-center shadow-md hover:scale-105 transition-all' />
                        : <FontAwesomeIcon icon={faUserCircle} className='text-4xl ring-4 ring-green-500 rounded-full' />
                    }
                </a>
                <div className='flex flex-col items-start gap-2 lg:ml-2'>
                    <a href={`/user/dashboard/${comment.user._id}`} className='ml-2 text-lg' >
                        {
                            comment.user.fullname !== null ?
                                <span>{comment.user.fullname}</span>
                            : <span>{comment.user.username}</span>
                        }
                    </a>
                    {/* comment writer details */}
                    <div className='flex flex-col md:flex-row items-center gap-2 lg:gap-4 lg:divide-x-2 divide-gray-300 ml-2 ' >
                        <button className='text-sm lg:text-base font-[500] flex items-center whitespace-nowrap' disabled >
                            <span className='lg:mr-2' >commented in : </span>
                            <TimesAgo date={comment.createdAt} icon={false} />
                        </button>
                        <button className='text-sm lg:text-base whitespace-nowrap  font-[500] px-2' disabled >
                            <span className='mr-2' >profossional : </span>
                            {comment.user.profossional}
                        </button>
                        <button className='text-sm lg:text-base whitespace-nowrap  font-[500] px-2' disabled >
                            @{comment.user.username}
                        </button>
                    </div>
                </div>
            </div>
            {/* react to comment section */}
            <div className='flex  items-center text-sm gap-4' >
                {/* Reply Button */}
                {
                    singleMediaPage ?
                    <a href={`/${comment.mediaModel.toLowerCase()}s/${comment.media.slug}#comment-${comment._id}`}  className='flex items-center justify-start gap-1 h-full py-2 px-2 rounded-md border border-solid border-gray-100 bg-gray-100 text-gray-500 hover:bg-cyan-400 hover:text-white cursor-pointer ' > 
                        <FontAwesomeIcon icon={faReply} />
                        <span className='h-fit box-content' >Reply</span>                                        
                    </a >
                    : ''
                }
                {/* save the link of comment Button */}
                <button  href={`/${comment.mediaModel.toLowerCase()}s/${comment.media.slug}#comment-${comment._id}`}  className='flex items-center justify-start gap-1 h-full py-2 px-2 rounded-md border border-solid border-gray-100 bg-gray-100 text-gray-500 hover:bg-gray-800 hover:text-white cursor-pointer ' 
                    onClick={e => {
                        navigator.clipboard.writeText(decodeURIComponent(`http://localhost:3000/${comment.mediaModel.toLowerCase()}s/${comment.media.slug}#comment-${comment._id}`));
                    }} > 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6" />
                    </svg>                                      
                </button >
                {/* Like Button */}
                <button disabled={userstate.isAuthenticated || !buttonLoading ? false : true} className={`flex items-center gap-1  py-2 px-2 rounded-md  border border-solid border-red-50 hover:bg-red-200  hover:text-white cursor-pointer 
                    ${ userstate.isAuthenticated ?
                        comment.likedByThisUser ? 'bg-red-500 text-white hover:bg-opacity-30 dark:shadow-md dark:shadow-red-400/50' : 'bg-red-50 text-red-200 dark:bg-red-200 dark:text-red-400 ' 
                        : ''
                    } `} onClick={e => likeHandler(e, comment._id , comment.likedByThisUser , 'comment')} >
                    <FontAwesomeIcon icon={ 
                        userstate.isAuthenticated ?
                        comment.likedByThisUser ? faheartSolid : faHeart  
                        : faHeart
                    }  />
                    {comment.likeCount}
                </button>



            </div>
        </div>
        {/* comment content */}
        <div className='text-lg h-fit font-[600] text-gray-700 dark:text-gray-50 flex flex-col gap-4 pb-8 border-b border-solid border-gray-100 '>
            {
                comment.parent !== null ?
                    <a className='text-blue-600 hover:underline w-fit ' href={`/user/dashboard/${comment.parent.user._id}`} >@{comment.parent.user.username}</a>
                : ''
            }
            {comment.statement}
        </div>
        <div className='w-full p-4 px-0' >
            {/* Reply Button */}
            {
                singleMediaPage ? '' :  
                <a href={`/${comment.mediaModel.toLowerCase()}s/${comment.media.slug}#comment-${comment._id}` }  className='flex items-center w-fit justify-start gap-1 h-full py-2 px-2 rounded-md border border-solid border-gray-100 bg-gray-100 text-gray-500 hover:bg-cyan-400 hover:text-white cursor-pointer ' > 
                    <FontAwesomeIcon icon={faReply} />
                    <span className='h-fit box-content' >Reply</span>                                        
                </a >
            }
        </div>
        {/* add comment reply  form */}
        {
            singleMediaPage ?  
            <div id={`comment-${comment._id}`} className='hidden flex-col transition-all  w-full p-6 border border-solid border-gray-200 rounded-md' >
                <div className='w-full flex items-center text-3xl text-gray-700 font-[600] py-4 border-b border-solid border-gray-300 mb-6' >
                    <a href={`/user/dashboard/${userstate.user._id}`} className='  w-fit' >
                        {
                            userstate.user.avatar 
                            ? 
                            <img src={`http://localhost:5000/${comment.user.avatarpath}`} alt="user" className='h-12 w-12 rounded-full ring-2 ring-green-200  object-cover self-center shadow-md hover:scale-105 transition-all' />
                            : <FontAwesomeIcon icon={faUserCircle} className='text-4xl ring-4 ring-green-500 rounded-full' />
                        }
                    </a>
                    <a href={`/user/dashboard/${userstate.user._id}`} className='ml-2' >{userstate.user.username}</a>
                </div>
                <div className='w-full'>
                    <textarea placeholder='Enter your statement...' value={commentField.statement} onChange={e => inputCommentHandler(e , comment._id)}  cols="30" rows="10" className=' w-full text-lg text-gray-700 outline-none p-4 border border-solid border-gray-300 rounded-md' ></textarea>
                    <button name='comment' onClick={commentHandler} className='text-xl font-[500] text-white bg-blue-800 hover:opacity-80 px-4 py-2 border border-solid border-gray-300 rounded-md shadow-md mt-4 ' >Add Comment</button>
                    <button onClick={e =>{
                        document.getElementById(`comment-${comment._id}`).classList.replace('flex' , 'hidden')
                        setCommentField(prevState =>{
                            return {
                                ...prevState,
                                statement : ''
                            }
                        })
                    }} className='text-xl font-[500] text-gray-500 hover:opacity-80 px-4 py-2 border border-solid border-gray-300 rounded-md shadow-md mt-4 ml-4 ' >Cancel</button>
                </div>
            </div>
            : ""
        }
    </div>
    )
}

export default CardComment;