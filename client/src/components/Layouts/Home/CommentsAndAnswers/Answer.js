import React from 'react';
// import moment from 'jalali-moment';

// import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle , faReply  , faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import TimesAgo from 'src/components/Layouts/Home/General/TimesAgo';


function Answer(props) {
    
    //props
    let answer = props.answer
    let userstate = props.userstate
    let answerField = props.answerField
    let setAnswerField = props.setAnswerField
    let inputAnswerHandler = props.inputAnswerHandler
    let answerHandler = props.answerHandler
    let showReportForm = props.showReportForm


    // console.log(answer.answers.answers)



    return (
        // Answer
        <div className='w-full flex flex-col p-4 border border-solid border-gray-300 rounded-md shadow-md mb-6' >
            {/* article answer writer and info */}
            <div className='w-full flex flex-col md:flex-row items-start gap-4 md:items-center justify-between text-3xl text-gray-700 font-[600] py-4 border-b border-solid border-gray-300 mb-6 dark:text-gray-50' >
                <div className='flex items-center' >
                    <a href={`/user/dashboard/${answer.user._id}`} className='  w-fit h-fit' >
                        {
                            answer.user.avatar 
                            ? 
                            <img src={`http://localhost:5000/${answer.user.avatarpath}`} alt="user" className='h-12 w-12 rounded-full ring-2 ring-green-200  object-cover self-center shadow-md hover:scale-105 transition-all' />
                            : <FontAwesomeIcon icon={faUserCircle} className='text-4xl ring-4 ring-green-500 rounded-full' />
                        }
                    </a>
                    <div className='flex flex-col items-start'>
                        <a href={`/user/dashboard/${answer.user._id}`} className='ml-2 text-lg' >{answer.user.username}</a>
                        {/* created at time  */}
                        <TimesAgo date={answer.createdAt} icon={true} />
                    </div>
                </div>
                {/* react to answer section */}
                <div className='flex items-center text-sm gap-4' >
                    {/* Reply Button */}
                    {
                        userstate.isAuthenticated ?
                            <a href={`#answer-${answer._id}`} onClick={e => document.getElementById(`answer-${answer._id}`).classList.replace('hidden' , 'flex') }   className='flex items-center justify-start gap-1 h-fit py-2 px-2 rounded-md border border-solid border-gray-100 bg-gray-100 text-gray-500 hover:bg-gray-500 hover:text-white cursor-pointer ' > 
                                <FontAwesomeIcon icon={faReply} />
                                <span className='h-fit box-content' >answer</span>                                        
                            </a >
                        : ''
                    }
                    {/* report Button */}
                    <button onClick={e => { 
                        showReportForm(e , 'answer' , answer._id )
                    }} disabled={userstate.isAuthenticated ? false : true} className={`flex items-center gap-1 py-3 px-3 text-xl text-gray-500 dark:text-gray-50 rounded-md  border border-solid border-gray-200  hover:bg-gray-500 hover:text-white cursor-pointer`} >
                        <FontAwesomeIcon icon={faExclamationTriangle}  />
                    </button>
                    

                </div>
            </div>
            {/* answer content */}
            <div className='flex flex-col items-start gap-4  text-lg font-[600]' >
                {
                    answer.parent !== null ?
                        <a className='text-blue-600 hover:underline w-fit ' href={`/user/dashboard/${answer.parent.user._id}`} >@{answer.parent.user.username}</a>
                    : ''
                } 
                <p className=' whitespace-normal leading-8  text-gray-700 dark:text-gray-50 h-fit font-[500] pb-4'  >
                    {answer.statement}
                </p>
            </div>
            {/* add answer reply  form */}
            <div id={`answer-${answer._id}`} className='hidden flex-col transition-all  w-full p-6 border border-solid border-gray-200 rounded-md' >
                {/* answer writer  */}
                <div className='w-full flex items-center text-3xl text-gray-700 dark:text-gray-50 font-[600] py-4 border-b border-solid border-gray-300 mb-6' >
                    <a href={`/user/dashboard/${userstate.user._id}`} className='  w-fit' >
                        {
                            userstate.user.avatar 
                            ? 
                            <img src={`http://localhost:5000/${userstate.user.avatarpath}`} alt="user" className='h-12 w-12 rounded-full ring-2 ring-green-200  object-cover self-center shadow-md hover:scale-105 transition-all' />
                            : <FontAwesomeIcon icon={faUserCircle} className='text-4xl ring-4 ring-green-500 rounded-full' />
                        }
                    </a>
                    <a href={`/user/dashboard/${userstate.user._id}`} className='ml-2' >{userstate.user.username}</a>
                </div>
                <div className='w-full'>
                    <textarea placeholder='Enter your statement...' value={answerField.statement} onChange={e => inputAnswerHandler(e , answer._id)}  cols="30" rows="10" className=' w-full text-lg text-gray-700 outline-none p-4 border border-solid border-gray-300 rounded-md' ></textarea>
                    <button name='answer' onClick={answerHandler} className='text-xl font-[500] text-white bg-blue-800 hover:opacity-80 px-4 py-2 border border-solid border-gray-300 rounded-md shadow-md mt-4 ' >Add Answer</button>
                    <button onClick={e =>{
                        document.getElementById(`answer-${answer._id}`).classList.replace('flex' , 'hidden')
                        setAnswerField(prevState =>{
                            return {
                                ...prevState,
                                statement : ''
                            }
                        })
                    }} className='text-xl font-[500] text-gray-500 hover:opacity-80 px-4 py-2 border border-solid border-gray-300 rounded-md shadow-md mt-4 ml-4 dark:text-gray-50' >Cancel</button>
                </div>
            </div>
            {/* Commment Child Commnets */}
            {
                (answer.answers.length !== 0) ? 
                    answer.answers.map(answer => {
                        return (
                        // Answer
                        <div key={answer._id} id={`answer_${answer._id}`} className='w-full flex flex-col p-4 border border-solid border-gray-300 rounded-md shadow-md mb-6' >
                            {/* article answer writer and info */}
                            <div className='w-full flex flex-col md:flex-row items-start gap-4 md:items-center justify-between text-3xl text-gray-700 dark:text-gray-50 font-[600] py-4 border-b border-solid border-gray-300 mb-6' >
                                <div className='flex items-center' >
                                    <a href={`/user/dashboard/${answer.user._id}`} className='  w-fit h-fit' >
                                        {
                                            answer.user.avatar 
                                            ? 
                                            <img src={`http://localhost:5000/${answer.user.avatarpath}`} alt="user" className='h-10 w-10 rounded-full ring-2 ring-green-200  object-cover self-center shadow-md hover:scale-105 transition-all' />
                                            : <FontAwesomeIcon icon={faUserCircle} className='text-4xl ring-4 ring-green-500 rounded-full' />
                                        }
                                    </a>
                                    <div className='flex flex-col items-start'>
                                        <a href={`/user/dashboard/${answer.user._id}`} className='ml-2 text-sm md:text-lg' >{answer.user.username}</a>
                                        {/* created at time  */}
                                        <TimesAgo date={answer.createdAt} icon={true} />
                                    </div>
                                </div>
                                {/* react to answer section */}
                                <div className='flex items-center text-sm gap-4' >
                                    {/* Reply Button */}
                                    {
                                        userstate.isAuthenticated ?
                                            <a href={`#answer-${answer._id}`} onClick={e => document.getElementById(`answer-${answer._id}`).classList.replace('hidden' , 'flex') }   className='flex items-center justify-start gap-1 h-fit py-2 px-2 rounded-md border border-solid border-gray-100 bg-gray-100 text-gray-500 hover:bg-gray-500 hover:text-white cursor-pointer ' > 
                                                <FontAwesomeIcon icon={faReply} />
                                                <span className='h-fit box-content' >answer</span>                                        
                                            </a >
                                        : ''
                                    }
                                   {/* report Button */}
                                    <button onClick={e => { 
                                            showReportForm(e , 'answer' , answer._id )
                                        }} disabled={userstate.isAuthenticated ? false : true} className={`flex items-center gap-1 py-3 px-3 text-xl text-gray-500 dark:text-gray-50 rounded-md  border border-solid border-gray-200  hover:bg-gray-500 hover:text-white cursor-pointer`} >
                                        <FontAwesomeIcon icon={faExclamationTriangle}  />
                                    </button>

                                </div>
                            </div>
                            {/* answer content */}
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
                            {/* add answer reply  form */}
                            <div id={`answer-${answer._id}`} className='hidden flex-col transition-all  w-full p-6 border border-solid border-gray-200 rounded-md' >
                                {/* answer writer  */}
                                <div className='w-full flex items-center text-3xl text-gray-700 dark:text-gray-50 font-[600] py-4 border-b border-solid border-gray-300 mb-6' >
                                    <a href={`/user/dashboard/${userstate.user._id}`} className='  w-fit' >
                                        {
                                            userstate.user.avatar 
                                            ? 
                                            <img src={`http://localhost:5000/${userstate.user.avatarpath}`} alt="user" className='h-12 w-12 rounded-full ring-2 ring-green-200  object-cover self-center shadow-md hover:scale-105 transition-all' />
                                            : <FontAwesomeIcon icon={faUserCircle} className='text-4xl ring-4 ring-green-500 rounded-full' />
                                        }
                                    </a>
                                    <a href={`/user/dashboard/${userstate.user._id}`} className='ml-2' >{userstate.user.username}</a>
                                </div>
                                <div className='w-full'>
                                    <textarea placeholder='Enter your statement...' value={answerField.statement} onChange={e => inputAnswerHandler(e , answer._id)}  cols="30" rows="10" className=' w-full text-lg text-gray-700  outline-none p-4 border border-solid border-gray-300 rounded-md' ></textarea>
                                    <button name='answer' onClick={answerHandler} className='text-xl font-[500] text-white bg-blue-800 hover:opacity-80 px-4 py-2 border border-solid border-gray-300 rounded-md shadow-md mt-4 ' >Add Answer</button>
                                    <button onClick={e =>{
                                        document.getElementById(`answer-${answer._id}`).classList.replace('flex' , 'hidden')
                                        setAnswerField(prevState =>{
                                            return {
                                                ...prevState,
                                                statement : ''
                                            }
                                        })
                                    }} className='text-xl font-[500] text-gray-500 dark:text-gray-50 hover:opacity-80 px-4 py-2 border border-solid border-gray-300 rounded-md shadow-md mt-4 ml-4 ' >Cancel</button>
                                </div>
                            </div>
                            {/* Commment Child Commnets Child Answers */}
                            {
                                (answer.answers !== undefined  )  ? 
                                    answer.answers.map(answer => {
                                        return (
                                        // Answer
                                        <div key={answer._id} id={`answer_${answer._id}`} className='w-full flex flex-col p-2 md:p-4 border border-solid border-gray-300 rounded-md shadow-md mb-6' >
                                            {/* article answer writer and info */}
                                            <div className='w-full flex flex-col md:flex-row items-start gap-4 md:items-center justify-between text-3xl text-gray-700 dark:text-gray-50 font-[600] py-4 border-b border-solid border-gray-300 mb-6' >
                                                <div className='flex items-center gap-0' >
                                                    <a href={`/user/dashboard/${answer.user._id}`} className='  w-fit h-fit' >
                                                        {
                                                            answer.user.avatar 
                                                            ? 
                                                            <img src={`http://localhost:5000/${answer.user.avatarpath}`} alt="user" className='h-8 w-8 rounded-full ring-2 ring-green-200  object-cover self-center shadow-md hover:scale-105 transition-all' />
                                                            : <FontAwesomeIcon icon={faUserCircle} className='text-4xl ring-4 ring-green-500 rounded-full' />
                                                        }
                                                    </a>
                                                    <div className='flex flex-col items-start'>
                                                        <a href={`/user/dashboard/${answer.user._id}`} className='ml-2 text-sm md:text-lg' >{answer.user.username}</a>
                                                        {/* created at time  */}
                                                        <TimesAgo date={answer.createdAt} icon={true} />
                                                    </div>
                                                </div>
                                                {/* react to answer section */}
                                                <div className='flex items-center text-sm gap-4' >
                                                    {/* Reply Button
                                                    <a href={`#answer-${answer._id}`} onClick={e => document.getElementById(`answer-${answer._id}`).classList.replace('hidden' , 'flex') }   className='flex items-center justify-start gap-1 h-fit py-2 px-2 rounded-md border border-solid border-gray-100 bg-gray-100 text-gray-500 hover:bg-gray-500 hover:text-white cursor-pointer ' > 
                                                        <FontAwesomeIcon icon={faReply} />
                                                        <span className='h-fit box-content' >answer</span>                                        
                                                    </a > */}
                                                   {/* report Button */}
                                                    <button onClick={e => { 
                                                            showReportForm(e , 'answer' , answer._id )
                                                        }} disabled={userstate.isAuthenticated ? false : true} className={`flex items-center gap-1 py-3 px-3 text-xl text-gray-500 dark:text-gray-50 rounded-md  border border-solid border-gray-200  hover:bg-gray-500 hover:text-white cursor-pointer`} >
                                                        <FontAwesomeIcon icon={faExclamationTriangle}  />
                                                    </button>

                                                </div>
                                            </div>
                                            {/* answer content */}
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
                                            {/* add answer reply  form */}
                                            
                                            {/* <div id={`answer-${answer._id}`} className='hidden flex-col transition-all  w-full p-6 border border-solid border-gray-200 rounded-md' >
                                                <div className='w-full flex items-center text-3xl text-gray-700 font-[600] py-4 border-b border-solid border-gray-300 mb-6' >
                                                    <a href={`/user/dashboard/${userstate.user._id}`} className='  w-fit' >
                                                        {
                                                            userstate.user.avatar 
                                                            ? 
                                                            <img src={`http://localhost:5000/${answer.user.avatarpath}`} alt="user" className='h-12 w-12 rounded-full ring-2 ring-green-200  object-cover self-center shadow-md hover:scale-105 transition-all' />
                                                            : <FontAwesomeIcon icon={faUserCircle} className='text-4xl ring-4 ring-green-500 rounded-full' />
                                                        }
                                                    </a>
                                                    <a href={`/user/dashboard/${userstate.user._id}`} className='ml-2' >{userstate.user.username}</a>
                                                </div>
                                                <div className='w-full'>
                                                    <textarea placeholder='Enter your statement...' value={answerField.statement} onChange={e => inputAnswerHandler(e , answer._id)}  cols="30" rows="10" className=' w-full text-lg text-gray-700 outline-none p-4 border border-solid border-gray-300 rounded-md' ></textarea>
                                                    <button name='answer' onClick={answerHandler} className='text-xl font-[500] text-white bg-blue-800 hover:opacity-80 px-4 py-2 border border-solid border-gray-300 rounded-md shadow-md mt-4 ' >Add Answer</button>
                                                    <button onClick={e =>{
                                                        document.getElementById(`answer-${answer._id}`).classList.replace('flex' , 'hidden')
                                                        setAnswerField(prevState =>{
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

export default Answer;