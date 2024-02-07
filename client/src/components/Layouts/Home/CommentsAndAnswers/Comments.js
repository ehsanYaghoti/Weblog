import React from 'react';
// import moment from 'jalali-moment';

// import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle , faCirclePlus  } from '@fortawesome/free-solid-svg-icons';

// import layouts
import Comment from './Comment';


function Comments(props) {
    
    //props
    let comments = props.comments
    let userstate = props.userstate
    let commentField = props.commentField
    let setCommentField = props.setCommentField
    let likeHandler = props.likeHandler
    let inputCommentHandler = props.inputCommentHandler
    let commentHandler = props.commentHandler


    // console.log(comment.comments.comments)



    return (
        // Comments
        <div id='comments' className='flex flex-col items-start gap-8 scroll-smooth w-full min-h-fit px-2 py-8 md:p-10 border border-solid border-gray-300 rounded-md shadow-md mt-10 bg-white dark:bg-gradient-to-br dark:from-10% dark:from-[rgb(36,45,57)] dark:via-50% dark:via-[rgb(16,37,60)] dark:to-100% dark:to-[rgb(0,0,0)] dark:border-none' >
            {/* comments title */}
            <div className='flex flex-col md:flex-row gap-8 items-center whitespace-nowrap justify-between w-full' >
                <h2 className='text-xl   md:text-3xl text-center font-[600] text-gray-700 w-full md:w-fit h-fit dark:text-white' >
                    <a href="#comments" className='w-ull md:w-fit' >Questions and Comments</a>     
                </h2>
                {
                    userstate.isAuthenticated ?
                    <a href='#newCommentForm' onClick={e => document.getElementById('newCommentForm').classList.replace('hidden' , 'flex') } className='flex items-center h-fit bg-cyan-800 focus:ring-2 focus:ring-teal-500  text-white px-6 py-3 border border-solid border-cyan-600 rounded-md shadow-md drop-shadow-md shadow-cyan-100 hover:opacity-80 ' >
                        <span className='text-xl  font-[700] mr-2  ' >Add new comment</span>
                        <FontAwesomeIcon icon={faCirclePlus} />
                    </a>
                    : 
                    <div  className='flex items-center gap-2 text-lg text-gray-500 font-[600] dark:text-gray-50' >
                        <span>for set a comment you should</span>   
                        <a href="/auth/login" className='text-blue-600 underline hover:text-opacity-70' >login</a>
                    </div>
                }
            </div>
            {/* new comment form */}
            <div id='newCommentForm' className='hidden flex-col transition-all  w-full p-6 border border-solid border-gray-200 rounded-md' >
                {/* comment writer  */}
                <div className='w-full flex items-center text-3xl text-gray-700 font-[600] py-4 border-b border-solid border-gray-300 mb-6' >
                    <a href={`/user/dashboard/${userstate.user._id}`} className='  w-fit' >
                        {
                            userstate.user.avatar ? 
                            <img src={`http://localhost:5000/${userstate.user.avatarpath}`} alt="user" className='h-16 w-16 rounded-full ring-2 ring-green-200  object-cover self-center shadow-md hover:scale-105 transition-all' />
                            : <FontAwesomeIcon icon={faUserCircle} className='text-4xl ring-4 ring-green-500 rounded-full dark:text-gray-50' />
                        }
                    </a>
                    <a href={`/user/dashboard/${userstate.user._id}`} className='ml-2 dark:text-gray-50 h-fit ' >{userstate.user.username}</a>
                </div>
                {/* form */}
                <div className='w-full ' >
                    <textarea value={commentField.statement} onChange={e => inputCommentHandler(e, null)}  cols="30" rows="10" className=' w-full text-lg text-gray-700 outline-none p-4 border border-solid border-gray-300 rounded-md dark:bg-slate-100' ></textarea>
                    <button name='comment' onClick={commentHandler} className='text-xl font-[500] text-white bg-blue-800 hover:opacity-80 px-4 py-2 border border-solid border-gray-300 rounded-md shadow-md mt-4 ' >Add Comment</button>
                    <button 
                        onClick={e => {
                            document.getElementById('newCommentForm').classList.replace('flex' , 'hidden') 
                            setCommentField(prevState =>{
                                return {
                                    ...prevState,
                                    statement : ''
                                }
                            })
                        }}     
                        className='text-xl font-[500] text-gray-500 hover:opacity-80 px-4 py-2 border border-solid border-gray-300 rounded-md shadow-md mt-4 md:ml-4 dark:bg-[#30475E] dark:text-white' >
                        Cancel
                    </button>
                </div>
            </div>
            {/* article comments body  */}
            <div className='flex flex-col w-full p-4 border border-solid border-gray-300 rounded-md shadow-md' >
                {
                    comments.length !==0 ?
                    comments.map(comment => {
                        return (
                            <Comment key={comment._id} comment={comment} userstate={userstate} commentField={commentField} setCommentField={setCommentField} inputCommentHandler={inputCommentHandler} commentHandler={commentHandler} likeHandler={likeHandler} />
                        )                 
                    })
                    :
                    <span className='h-fit text-neutral-500 dark:text-white' >There is no comment for this article</span>
                }
            </div>
        </div>   
    )
}

export default Comments;