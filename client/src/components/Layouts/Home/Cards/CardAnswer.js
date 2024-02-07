import React from 'react';
// import moment from 'jalali-moment';
import TimesAgo from 'src/components/Layouts/Home/General/TimesAgo';

// import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faReply, faUserCircle , faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';




function CardAnswer(props) {
    
    //props
    let answer = props.answer
    let showReportForm = props.showReportForm


    return (
        // Answer
        <div key={answer._id} id={`answer_${answer._id}`} className='w-full h-fit flex flex-col p-4 border border-solid border-gray-300 rounded-md shadow-md mb-6 bg-white dark:bg-slate-600/80' >
        {/* answer related post*/}
        <div className='flex flex-col lg:flex-row lg:whitespace-nowrap items-center gap-6 justify-between p-4 border-b border-solid border-gray-300 text-center' >
            
            <div className='flex flex-col xl:flex-row gap-2 lg:gap-4 items-center' >
                <span className=' font-[600] text-gray-700  dark:text-gray-50 text-base leading-7' >The Answer is related to this post : </span>
                <a href={`/posts/${answer.post.slug}`} className='hover:text-gray-600 dark:hover:text-gray-100 text-blue-600  text-base xl:text-lg font-[600]' >{answer.post.title}</a>
            </div>
            <a href={`/posts/${answer.post.slug}`} className='text-blue-600 hover:text-gray-600 dark:hover:text-gray-100 underline font-[600] text-lg xl:text-xl flex items-center gap-2  ' >
                <span className='text-center' >
                    watch the post
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </a>
        </div>
        {/* post answer writer and react buttons */}
        <div className='w-full flex flex-col xl:flex-row gap-6 items-start lg:items-center justify-between text-3xl text-gray-700 dark:text-gray-50 font-[600] py-4  mb-6' >
            {/* post answer writer */}
            <div className='flex items-start lg:items-center' >
                <a href={`/user/dashboard/${answer.user._id}`} className='  w-fit h-fit' >
                    {
                        answer.user.avatar 
                        ? 
                        <img src={`http://localhost:5000/${answer.user.avatarpath}`} alt="user" className='h-14 w-14 rounded-full ring-2 ring-green-200  object-cover self-center shadow-md hover:scale-105 transition-all' />
                        : <FontAwesomeIcon icon={faUserCircle} className='text-4xl ring-4 ring-green-500 rounded-full' />
                    }
                </a>
                <div className='flex flex-col items-start gap-2  lg:ml-2 dark:text-gray-50'>
                    <a href={`/user/dashboard/${answer.user._id}`} className='ml-2 text-lg' >
                        {
                            answer.user.fullname !== null ?
                                <span>{answer.user.fullname}</span>
                            : <span>{answer.user.username}</span>
                        }
                    </a>
                    {/* answer writer details */}
                    <div className='flex flex-col lg:flex-row items-center gap-2 lg:gap-4 lg:divide-x-2 divide-gray-300 ml-2 ' >
                        <button className='text-sm lg:text-base whitespace-nowrap font-[500] flex items-center' disabled >
                            <span className='lg:mr-2'  >answered in : </span>
                            <TimesAgo date={answer.createdAt} icon={false} />
                        </button>
                        <button className='text-sm lg:text-base whitespace-nowrap font-[500] px-2' disabled >
                            <span className='mr-2' >profossional : </span>
                            {answer.user.profossional}
                        </button>
                        <button className='text-sm lg:text-base whitespace-nowrap font-[500] px-2' disabled >
                            @{answer.user.username}
                        </button>
                    </div>
                </div>
            </div>

            {/* react to answer section */}
            <div className='flex items-center text-sm gap-4' >
                {/* Reply Button */}
                {/* <a href={`/posts/${answer.post.slug}#answer-${answer._id}`}  className='flex items-center justify-start gap-1 h-full py-2 px-2 rounded-md border border-solid border-gray-100 bg-gray-100 text-gray-500 hover:bg-cyan-400 hover:text-white cursor-pointer ' > 
                    <FontAwesomeIcon icon={faReply} />
                    <span className='h-fit box-content' >answer</span>                                        
                </a > */}
                {/* report Button */}
                <button onClick={e => { 
                        showReportForm(e , 'answer' , answer._id )
                    }} disabled className={`flex items-center gap-1 py-3 px-3 text-lg text-gray-500 dark:text-gray-50 rounded-md  border border-solid border-gray-200  hover:bg-red-200 hover:text-white cursor-pointer`} >
                    <FontAwesomeIcon icon={faExclamationTriangle}  />
                </button>
                {
                    answer.bestAnswer ? 
                        <button disabled   className='flex items-center justify-start gap-1 h-fit py-2 px-2 rounded-md border border-solid border-green-100 bg-white text-green-500 hover:bg-green-500 hover:text-white cursor-pointer ' > 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <span className='h-fit box-content' >Best Answer</span>                                        
                        </button >
                    :''
                }
                {/* save link of answer Button */}
                <button  href={`/posts/${answer.post.slug}#answer-${answer._id}`}  className='flex items-center justify-start gap-1 h-full py-2 px-2 rounded-md border border-solid border-gray-100 bg-gray-100 text-gray-500 hover:bg-gray-800 hover:text-white cursor-pointer ' 
                    onClick={e => {
                        navigator.clipboard.writeText(decodeURIComponent(`http://localhost:3000/posts/${answer.post.slug}#answer-${answer._id}`));
                    }} > 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6" />
                    </svg>                                      
                </button >




            </div>

        </div>
        {/* answer content */}
        <div className='flex items-center gap-6 pb-8 border-b border-solid border-gray-100 '>
            <div className='flex flex-col items-center gap-2 text-gray-600 dark:text-gray-50' >
                <button className='font-[700]' onClick={(e) => {
                    answer.score += 1} } >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 font-[700] text-lg ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                    </svg>
                </button>

                <span className='h-fit w-fit font-[700]' >{answer.score}</span>

                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </button>
            </div>
            <div className='flex flex-col items-start gap-4  text-lg font-[600]' >
                {
                    answer.parent !== null ?
                        <a className='text-blue-600 hover:underline w-fit ' href={`/user/dashboard/${answer.parent.user._id}`} >@{answer.parent.user.username}</a>
                    : ''
                }
                <p className=' whitespace-normal leading-8  text-gray-700 dark:text-gray-50 h-fit font-[500]'  >
                    {answer.statement}
                </p>
            </div>
        </div>
        <div className='w-full p-4 px-0' >
            {/* Reply Button */}
            <a href={`/posts/${answer.post.slug}#answer-${answer._id}`}  className='flex items-center w-fit justify-start gap-1 h-full py-2 px-2 rounded-md border border-solid border-gray-100 bg-gray-100 text-gray-500 hover:bg-cyan-400 hover:text-white cursor-pointer ' > 
                <FontAwesomeIcon icon={faReply} />
                <span className='h-fit box-content' >answer</span>                                        
            </a >
        </div>
        
    </div>
    )
}

export default CardAnswer;