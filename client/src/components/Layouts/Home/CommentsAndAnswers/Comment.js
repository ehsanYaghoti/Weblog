import React from 'react';
// import moment from 'jalali-moment';

// import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faheartSolid ,faUserCircle , faReply  } from '@fortawesome/free-solid-svg-icons';
import {  faHeart   } from '@fortawesome/free-regular-svg-icons';
import TimesAgo from 'src/components/Layouts/Home/General/TimesAgo';


function Comment(props) {
    
    //props
    let comment = props.comment
    let userstate = props.userstate 
    let commentField = props.commentField
    let setCommentField = props.setCommentField
    let likeHandler = props.likeHandler
    let inputCommentHandler = props.inputCommentHandler
    let commentHandler = props.commentHandler


    // console.log(comment.comments.comments)



    return (
        // Comment
        <div className='w-full flex flex-col p-4 border border-solid border-gray-300 rounded-md shadow-md mb-6 dark:text-gray-50' >
            {/* article comment writer and info */}
            <div className='w-full flex flex-col md:flex-row gap-8 items-start md:items-center justify-between text-3xl text-gray-700 font-[600] py-4 border-b border-solid border-gray-300 mb-6 dark:text-gray-50' >
                <div className='flex items-center' >
                    <a href={`/user/dashboard/${comment.user._id}`} className='  w-fit h-fit dark:text-gray-50' >
                        {
                            comment.user.avatar 
                            ? 
                            <img src={`http://localhost:5000/${comment.user.avatarpath}`} alt="user" className='h-14 w-14 rounded-full ring-2 ring-green-200  object-cover self-center shadow-md hover:scale-105 transition-all' />
                            : <FontAwesomeIcon icon={faUserCircle} className='text-4xl ring-4 ring-green-500 rounded-full ' />
                        }
                    </a>
                    <div className='flex flex-col items-start dark:text-gray-50 '>
                        <a href={`/user/dashboard/${comment.user._id}`} className='ml-2 text-lg' >{comment.user.username}</a>
                        {/* created at time  */}
                        <TimesAgo date={comment.createdAt} icon={true} />
                    </div>
                </div>
                {/* react to comment section */}
                <div className='flex items-center text-sm gap-4' >
                    {/* Reply Button */}
                    {
                        userstate.isAuthenticated ?
                            <a href={`#answer-${comment._id}`} onClick={e => document.getElementById(`answer-${comment._id}`).classList.replace('hidden' , 'flex') }   className='flex items-center justify-start gap-1 h-fit py-2 px-2 rounded-md border border-solid border-gray-100 bg-gray-100 text-gray-500 hover:bg-gray-500 hover:text-white cursor-pointer ' > 
                                <FontAwesomeIcon icon={faReply} />
                                <span className='h-fit box-content' >answer</span>                                        
                            </a >
                        : ''
                    }
                    {/* Like Button */}
                    <button disabled={userstate.isAuthenticated ? false : true} className={`flex items-center gap-1  py-2 px-2 rounded-md  border border-solid border-red-50 hover:bg-red-200  hover:text-white cursor-pointer 
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
            <div className='flex flex-col items-start gap-4  text-lg font-[600]' >
                {
                    comment.parent !== null ?
                        <a className='text-blue-600 hover:underline w-fit ' href={`/user/dashboard/${comment.parent.user._id}`} >@{comment.parent.user.username}</a>
                    : ''
                } 
                <p className=' whitespace-normal leading-8  text-gray-700 dark:text-gray-50 h-fit font-[500] pb-4'  >
                    {comment.statement}
                </p>
            </div>
            {/* add comment reply  form */}
            <div id={`answer-${comment._id}`} className='hidden flex-col transition-all  w-full p-6 border border-solid border-gray-200 rounded-md' >
                {/* comment writer  */}
                <div className='w-full flex items-center text-3xl text-gray-700 dark:text-gray-50 font-[600] py-4 border-b border-solid border-gray-300 mb-6' >
                    <a href={`/user/dashboard/${userstate.user._id}`} className='  w-fit' >
                        {
                            userstate.user.avatar 
                            ? 
                            <img src={`http://localhost:5000/${comment.user.avatarpath}`} alt="user" className='h-14 w-14 rounded-full ring-2 ring-green-200  object-cover self-center shadow-md hover:scale-105 transition-all' />
                            : <FontAwesomeIcon icon={faUserCircle} className='text-4xl ring-4 ring-green-500 rounded-full' />
                        }
                    </a>
                    <a href={`/user/dashboard/${userstate.user._id}`} className='ml-2' >{userstate.user.username}</a>
                </div>
                <div className='w-full'>
                    <textarea placeholder='Enter your statement...' value={commentField.statement} onChange={e => inputCommentHandler(e , comment._id)}  cols="30" rows="10" className=' w-full text-lg text-gray-700 outline-none p-4 border border-solid border-gray-300 rounded-md' ></textarea>
                    <button name='comment' onClick={commentHandler} className='text-xl font-[500] text-white bg-blue-800 hover:opacity-80 px-4 py-2 border border-solid border-gray-300 rounded-md shadow-md mt-4 ' >Add Comment</button>
                    <button onClick={e =>{
                        document.getElementById(`answer-${comment._id}`).classList.replace('flex' , 'hidden')
                        setCommentField(prevState =>{
                            return {
                                ...prevState,
                                statement : ''
                            }
                        })
                    }} className='text-xl font-[500] text-gray-500 dark:text-gray-50 hover:opacity-80 px-4 py-2 border border-solid border-gray-300 rounded-md shadow-md mt-4 ml-4 ' >Cancel</button>
                </div>
            </div>
            {/* Commment Child Commnets */}
            {
                (comment.comments.length !== 0) ? 
                    comment.comments.map(comment => {
                        return (
                        // Comment
                        <div key={comment._id} className='w-full flex flex-col p-4 border border-solid border-gray-300 rounded-md shadow-md mb-6' >
                            {/* article comment writer and info */}
                            <div className='w-full flex flex-col md:flex-row gap-8 items-start md:items-center  justify-between text-3xl text-gray-700 dark:text-gray-50 font-[600] py-4 border-b border-solid border-gray-300 mb-6' >
                                <div className='flex items-center' >
                                    <a href={`/user/dashboard/${comment.user._id}`} className='  w-fit h-fit' >
                                        {
                                            comment.user.avatar 
                                            ? 
                                            <img src={`http://localhost:5000/${comment.user.avatarpath}`} alt="user" className='h-10 w-10 rounded-full ring-2 ring-green-200  object-cover self-center shadow-md hover:scale-105 transition-all' />
                                            : <FontAwesomeIcon icon={faUserCircle} className='text-4xl ring-4 ring-green-500 rounded-full' />
                                        }
                                    </a>
                                    <div className='flex flex-col items-start'>
                                        <a href={`/user/dashboard/${comment.user._id}`} className='ml-2 text-lg' >{comment.user.username}</a>
                                        {/* created at time  */}
                                        <TimesAgo date={comment.createdAt} icon={true} />
                                    </div>
                                </div>
                                {/* react to comment section */}
                                <div className='flex items-center text-sm gap-4' >
                                    {/* Reply Button */}
                                    {
                                        userstate.isAuthenticated ?
                                            <a href={`#answer-${comment._id}`} onClick={e => document.getElementById(`answer-${comment._id}`).classList.replace('hidden' , 'flex') }   className='flex items-center justify-start gap-1 h-fit py-2 px-2 rounded-md border border-solid border-gray-100 bg-gray-100 text-gray-500 hover:bg-gray-500 hover:text-white cursor-pointer ' > 
                                                <FontAwesomeIcon icon={faReply} />
                                                <span className='h-fit box-content' >answer</span>                                        
                                            </a >
                                        : ''
                                    }
                                    {/* Like Button */}
                                    <button disabled={userstate.isAuthenticated ? false : true} className={`flex items-center gap-1  py-2 px-2 rounded-md  border border-solid border-red-50 hover:bg-red-200  hover:text-white cursor-pointer 
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
                            <div className='flex flex-col items-start gap-4  text-lg font-[600]' >
                                {
                                    comment.parent !== null ?
                                        <a className='text-blue-600 hover:underline w-fit ' href={`/user/dashboard/${comment.parent.user._id}`} >@{comment.parent.user.username}</a>
                                    : ''
                                } 
                                <p className=' whitespace-normal leading-8  text-gray-700 dark:text-gray-50 h-fit font-[500] pb-4'  >
                                    {comment.statement}
                                </p>
                            </div>
                            {/* add comment reply  form */}
                            <div id={`answer-${comment._id}`} className='hidden flex-col transition-all  w-full p-6 border border-solid border-gray-200 rounded-md' >
                                {/* comment writer  */}
                                <div className='w-full flex items-center text-3xl text-gray-700 dark:text-gray-50 font-[600] py-4 border-b border-solid border-gray-300 mb-6' >
                                    <a href={`/user/dashboard/${userstate.user._id}`} className='  w-fit' >
                                        {
                                            userstate.user.avatar 
                                            ? 
                                            <img src={`http://localhost:5000/${comment.user.avatarpath}`} alt="user" className='h-14 w-14 rounded-full ring-2 ring-green-200  object-cover self-center shadow-md hover:scale-105 transition-all' />
                                            : <FontAwesomeIcon icon={faUserCircle} className='text-4xl ring-4 ring-green-500 rounded-full' />
                                        }
                                    </a>
                                    <a href={`/user/dashboard/${userstate.user._id}`} className='ml-2' >{userstate.user.username}</a>
                                </div>
                                <div className='w-full'>
                                    <textarea placeholder='Enter your statement...' value={commentField.statement} onChange={e => inputCommentHandler(e , comment._id)}  cols="30" rows="10" className=' w-full text-lg text-gray-700  outline-none p-4 border border-solid border-gray-300 rounded-md' ></textarea>
                                    <button name='comment' onClick={commentHandler} className='text-xl font-[500] text-white bg-blue-800 hover:opacity-80 px-4 py-2 border border-solid border-gray-300 rounded-md shadow-md mt-4 ' >Add Comment</button>
                                    <button onClick={e =>{
                                        document.getElementById(`answer-${comment._id}`).classList.replace('flex' , 'hidden')
                                        setCommentField(prevState =>{
                                            return {
                                                ...prevState,
                                                statement : ''
                                            }
                                        })
                                    }} className='text-xl font-[500] text-gray-500 dark:text-gray-50 hover:opacity-80 px-4 py-2 border border-solid border-gray-300 rounded-md shadow-md mt-4 ml-4 ' >Cancel</button>
                                </div>
                            </div>
                            {/* Commment Child Commnets Child Comments */}
                            {
                                (comment.comments !== undefined  )  ? 
                                    comment.comments.map(comment => {
                                        return (
                                        // Comment
                                        <div key={comment._id} className='w-full flex flex-col p-4 border border-solid border-gray-300 rounded-md shadow-md mb-6' >
                                            {/* article comment writer and info */}
                                            <div className='w-full flex flex-col md:flex-row gap-8 items-start md:items-center justify-between text-3xl text-gray-700 dark:text-gray-50 font-[600] py-4 border-b border-solid border-gray-300 mb-6' >
                                                <div className='flex items-center' >
                                                    <a href={`/user/dashboard/${comment.user._id}`} className='  w-fit h-fit' >
                                                        {
                                                            comment.user.avatar 
                                                            ? 
                                                            <img src={`http://localhost:5000/${comment.user.avatarpath}`} alt="user" className='h-8 w-8 rounded-full ring-2 ring-green-200  object-cover self-center shadow-md hover:scale-105 transition-all' />
                                                            : <FontAwesomeIcon icon={faUserCircle} className='text-4xl ring-4 ring-green-500 rounded-full dark:text-gray-50' />
                                                        }
                                                    </a>
                                                    <div className='flex flex-col items-start dark:text-gray-50'>
                                                        <a href={`/user/dashboard/${comment.user._id}`} className='ml-2 text-base md:text-lg' >{comment.user.username}</a>
                                                        {/* created at time  */}
                                                        <TimesAgo date={comment.createdAt} icon={true} />
                                                    </div>
                                                </div>
                                                {/* react to comment section */}
                                                <div className='flex items-center text-sm gap-4' >
                                                    {/* Reply Button
                                                    <a href={`#answer-${comment._id}`} onClick={e => document.getElementById(`answer-${comment._id}`).classList.replace('hidden' , 'flex') }   className='flex items-center justify-start gap-1 h-fit py-2 px-2 rounded-md border border-solid border-gray-100 bg-gray-100 text-gray-500 hover:bg-gray-500 hover:text-white cursor-pointer ' > 
                                                        <FontAwesomeIcon icon={faReply} />
                                                        <span className='h-fit box-content' >answer</span>                                        
                                                    </a > */}
                                                    {/* Like Button */}
                                                    <button disabled={userstate.isAuthenticated ? false : true} className={`flex items-center gap-1  py-2 px-2 rounded-md  border border-solid border-red-50 hover:bg-red-200  hover:text-white cursor-pointer 
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
                                            <div className='flex flex-col items-start gap-4  text-lg font-[600]' >
                                                {
                                                    comment.parent !== null ?
                                                        <a className='text-blue-600 hover:underline w-fit ' href={`/user/dashboard/${comment.parent.user._id}`} >@{comment.parent.user.username}</a>
                                                    : ''
                                                } 
                                                <p className=' whitespace-normal leading-8  text-gray-700 dark:text-gray-50 h-fit font-[500] pb-4'  >
                                                    {comment.statement}
                                                </p>
                                            </div>
                                            {/* add comment reply  form */}
                                            
                                            {/* <div id={`answer-${comment._id}`} className='hidden flex-col transition-all  w-full p-6 border border-solid border-gray-200 rounded-md' >
                                                <div className='w-full flex items-center text-3xl text-gray-700 font-[600] py-4 border-b border-solid border-gray-300 mb-6' >
                                                    <a href={`/user/dashboard/${userstate.user._id}`} className='  w-fit' >
                                                        {
                                                            userstate.user.avatar 
                                                            ? 
                                                            <img src={`http://localhost:5000/${comment.user.avatarpath}`} alt="user" className='h-14 w-14 rounded-full ring-2 ring-green-200  object-cover self-center shadow-md hover:scale-105 transition-all' />
                                                            : <FontAwesomeIcon icon={faUserCircle} className='text-4xl ring-4 ring-green-500 rounded-full' />
                                                        }
                                                    </a>
                                                    <a href={`/user/dashboard/${userstate.user._id}`} className='ml-2' >{userstate.user.username}</a>
                                                </div>
                                                <div className='w-full'>
                                                    <textarea placeholder='Enter your statement...' value={commentField.statement} onChange={e => inputCommentHandler(e , comment._id)}  cols="30" rows="10" className=' w-full text-lg text-gray-700 outline-none p-4 border border-solid border-gray-300 rounded-md' ></textarea>
                                                    <button name='comment' onClick={commentHandler} className='text-xl font-[500] text-white bg-blue-800 hover:opacity-80 px-4 py-2 border border-solid border-gray-300 rounded-md shadow-md mt-4 ' >Add Comment</button>
                                                    <button onClick={e =>{
                                                        document.getElementById(`answer-${comment._id}`).classList.replace('flex' , 'hidden')
                                                        setCommentField(prevState =>{
                                                            return {
                                                                ...prevState,
                                                                statement : ''
                                                            }
                                                        })
                                                    }} className='text-xl font-[500] text-gray-500 hover:opacity-80 px-4 py-2 border border-solid border-gray-300 rounded-md shadow-md mt-4 ml-4 ' >Cancel</button>
                                                </div>
                                            </div> */}
                                        </div>
                                        )
                                    })
                                : ''
                            }
                        </div>
                        )
                    })
                : ''
            }
        </div>
        
    )
}

export default Comment;