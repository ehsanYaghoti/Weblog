import React , { useState , useEffect   } from 'react';
import { useParams }  from 'react-router-dom'; 

// Layouts
import Header from 'src/components/Layouts/Home/General/Header';
import Footer from 'src/components/Layouts/Home/General/Footer';
import GoTopBtn from 'src/components/Layouts/Home/General/GoTopBtn';
import LoadingSkeletonSingle from 'src/components/Layouts/Home/Loadings/LoadingSkeletonSingle';
import Answers from 'src/components/Layouts/Home/CommentsAndAnswers/Answers';
import TimesAgo from 'src/components/Layouts/Home/General/TimesAgo';
import ButtonSpinner from 'src/components/Layouts/Home/Loadings/ButtonSpinner'
import ButtonTag from 'src/components/Layouts/Home/Buttons/ButtonTag';

//import Api
import NodejsApi from 'src/Api/NodejsApi'; 

// import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faExclamationCircle , faUserCircle , faBookmark as faBookmarkSolid , faReply  , faCheck, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { faRectangleList , faCommentDots , faBookmark , faCopy  } from '@fortawesome/free-regular-svg-icons';


function Post(props) {
    
    const [userstate , setUserState ]  = useState({
        isAuthenticated : false,
        user : {
            username : '',
            avatar : '',
            likes : []
        }
    })

    const [post , setPost] = useState({
        _id : '',
        tags : [
            {
                name : '',
                slug : '',
            }
        ],
        user : {
            username : '',
            avatar : ''
        },
        answers : []
    })    

    const [reports , setReports] = useState([]);
    const [reportsField , setReportsField] = useState({
        kind : '',
        reported : false,
        postId : '',
        answerId : '',
        reports : []
    });

    const [similarPosts , setSimilarPosts] = useState([])
    const [answerField , setAnswerField] = useState({
        parent : '',
        statement : '',
        postId : '',
    })

    const [loading  , setLoading] = useState(false)
    const [buttonSaveLoading  , setButtonSaveLoading] = useState(false)

    const [success , setSuccess] = useState({ state : true ,  message : ''})
    const [noContent , setNocontent] = useState({ state : true ,  message : ''})



    const {slug} = useParams()    
    

    useEffect(() => {
        setLoading(true)
        NodejsApi.get(`${process.env.REACT_APP_API_URL}/posts/${slug}`)
        .then(async response => {
            if(! response.data.success){
                setLoading(false)
                if(response.data.code === 204){
                    return setNocontent({
                        state : response.data.success,
                        message : response.data.message
                    })
                }
                return  setSuccess(prevState => {
                   return {
                    state : response.data.success ,
                    message : response.data.message
                    }
                })
              
            }

            setSuccess(prevState => {
                return {
                state : response.data.success ,
                message : ''
                }
            })

            setNocontent({
                state : true,
                message : ''
            })
            
            let data = response.data
            let user = data.user
            let post = data.post
            let similarPosts = data.similarPosts[0].posts

            
            similarPosts = similarPosts.filter(element => { return element._id !== post._id })

            setPost(post)
            setSimilarPosts([...similarPosts])

            setUserState({
                isAuthenticated : data.isAuthenticated ,
                user : {
                    ...user
                }
            });

            setReports([...data.reports])


            setLoading(false)


        } )
        .catch(err => {
            console.log(err)
            setSuccess({
                state : false,
                message : err.message
            })
        })

    } , [slug])

    useEffect(()=>{
        try {
            if(document.getElementById(post._id)){
                let parser = new DOMParser();
                document.getElementById(post._id).innerHTML = parser.parseFromString( post.statement , 'text/html').body.innerHTML 
            }
        } catch (error) {
            console.log(error)
            setSuccess({
                state : false,
                message : error
            })
        }
    } ,[post] )

    let saveHandler = (e , id , saved , kind , single = 'singlePage' , moreData = null) =>{
        e.preventDefault()
        setButtonSaveLoading(true)

        let data ={
            id,
            kind , 
            single,
            moreData
        }
        console.log(saved , data)

        if(saved){
            console.log('unsaving')

            NodejsApi.delete(`/save/${id}/${kind}/${single}/${moreData}`)
            .then(response =>{

                if(response.data.success){

                    let data = response.data
                    let unsavedPost = data.post

                    if(unsavedPost._id === post._id){
                        setPost(prevState => {
                            return {
                                ...prevState,
                                savedByThisUser : false,
                                saveCount : prevState.saveCount -1
                            }
                        })
                    }
                    
                    setButtonSaveLoading(false)
      
                }
            })
            .catch(err => {
                console.log(err)
                setButtonSaveLoading(false)
                setSuccess({
                    state : false,
                    message : err.message
                })
            })
        } else if(! saved){
            console.log('saving')

            NodejsApi.post('/save' , data)
            .then(response =>{

                if(response.data.success){

                    let data = response.data
                    let savedPost = data.post

                    if(savedPost._id === post._id){
                        setPost(prevState => {
                            return {
                                ...prevState,
                                savedByThisUser : true,
                                saveCount : prevState.saveCount +1
                            }
                        })
                    }

                    
                    setButtonSaveLoading(false)

                }
            })
            .catch(err => {
                console.log(err)
                setButtonSaveLoading(false)
                setSuccess({
                    state : false,
                    message : err.message
                })
            })
        }

    }

    let answerHandler =  (e , postId ) => {
        console.log(e.target.name)
        // console.log(e.target.value)
        console.log(answerField)

        setLoading(true)

        NodejsApi.post(`${process.env.REACT_APP_API_URL}/answer/create` , answerField )
        .then(async response => {
            if(! response.data.success){
                setLoading(false)
                if(response.data.code === 204){
                    return setNocontent({
                        state : response.data.success,
                        message : response.data.message
                    })
                }
                return  setSuccess(prevState => {
                   return {
                    state : response.data.success ,
                    message : response.data.message
                    }
                })
              
            }

            setSuccess(prevState => {
                return {
                state : response.data.success ,
                message : ''
                }
            })

            setNocontent({
                state : true,
                message : ''
            })
            
            let data = response.data            
            let postAnswers = data.postAnswers
            let newAnswersNumber = data.newAnswersNumber

            
            console.log(data)

            setPost(prevState => {
                return {
                    ...prevState,
                    answers : postAnswers,
                    answerCount : newAnswersNumber
                }
            })

            setAnswerField(prevState =>{
                return{
                    parent : '',
                    postId : '',
                    statement : ''
                }
            })

            setLoading(false)


        } )
        .catch(err => {
            console.log(err)
            setSuccess({
                state : false,
                message : err.message
            })
        })

    }

    let inputAnswerHandler = (e , parentId) => {
        e.preventDefault();
        // let name = e.target.name
        let value = e.target.value

        if(parentId === null){
            setAnswerField(prevState => {
                return {
                    parent : null ,
                    postId : post._id ,
                    statement : value
                }
            })
        } else {
            setAnswerField(prevState => {
                return {
                    parent : parentId,
                    postId : post._id ,
                    statement : value
                }
            })
        }
        

    }

    let checkBoxInputHandler = (e  , reportId) => {
        // let name = e.target.name
        // let value = e.target.value

        if(reportsField.reports.includes(reportId)){
            return setReportsField(prevState => {
                return {
                    ...prevState,
                    reports : [
                        ...prevState.reports.filter(id => id !== reportId)                        
                    ]
        
                }
            })
        }

        setReportsField(prevState => {
            return {
                ...prevState, 
                reports : [
                    ...prevState.reports,
                    reportId
                ]
    
            }
        })
    }

    let reportHandler = (e , kind) => {
        console.log(kind)
        if(kind === 'post'){
            NodejsApi.post(`${process.env.REACT_APP_API_URL}/posts/report` , reportsField)
            .then(async response => {
                if(! response.data.success){
                    setLoading(false)
                    if(response.data.code === 204){
                        return setNocontent({
                            state : response.data.success,
                            message : response.data.message
                        })
                    }
                    return  setSuccess(prevState => {
                    return {
                        state : response.data.success ,
                        message : response.data.message
                        }
                    })
                
                }

                setSuccess(prevState => {
                    return {
                    state : response.data.success ,
                    message : ''
                    }
                })

                setNocontent({
                    state : true,
                    message : ''
                })
                
                // let data = response.data

                setReportsField( prevState => {
                    return {
                        reported : true,
                        reports : [],
                        postId : ''
                    }
                })

                
                
                // console.log(data)
                
                document.getElementById('reportConclusion').classList.toggle('invisible')
                document.getElementById('reportForm').classList.replace('visible' , 'invisible')

                setLoading(false)


            } )
            .catch(err => {
                console.log(err)
                setSuccess({
                    state : false,
                    message : err.message
                })
            })
        } else if(kind === 'answer'){
            NodejsApi.post(`${process.env.REACT_APP_API_URL}/answer/report` , reportsField)
            .then(async response => {
                if(! response.data.success){
                    setLoading(false)
                    if(response.data.code === 204){
                        return setNocontent({
                            state : response.data.success,
                            message : response.data.message
                        })
                    }
                    return  setSuccess(prevState => {
                    return {
                        state : response.data.success ,
                        message : response.data.message
                        }
                    })
                
                }

                setSuccess(prevState => {
                    return {
                    state : response.data.success ,
                    message : ''
                    }
                })

                setNocontent({
                    state : true,
                    message : ''
                })
                
                // let data = response.data

                setReportsField( prevState => {
                    return {
                        reported : true,
                        reports : [],
                        postId : ''
                    }
                })

                
                
                // console.log(data)
                
                document.getElementById('reportConclusion').classList.toggle('invisible')
                document.getElementById('reportForm').classList.replace('visible' , 'invisible')



            } )
            .catch(err => {
                console.log(err)
                setSuccess({
                    state : false,
                    message : err.message
                })
            })
        }
    }

    let showReportForm = (e , kind , id) => {
        document.getElementById('reportForm').classList.replace('invisible' , 'visible')
        if(kind === 'post'){
            setReportsField(prevState => {
                return {
                    ...prevState,
                    kind : 'post',
                    postId : id,
                    answerId : '',
                }
            })
        } else if(kind === 'answer'){
            setReportsField(prevState => {
                return {
                    ...prevState,
                    postId : '',
                    kind : 'answer',
                    answerId : id
                }
            })
        }
        
    }


    return (
        <div className='flex flex-col w-full h-screen scroll-smooth'  >
        {
            success.state ? (
                <div className='flex flex-col w-full h-fit'>
                    <Header user={userstate} />
                    <main className='flex flex-col items-center  w-full h-fit gap-10 pb-10 font-["Nunito"] bg-gradient-to-br from-30% from-slate-100 to-70% to-slate-300 dark:bg-gradient-to-t dark:from-10% dark:from-slate-600 dark:to-90% dark:to-slate-800' >
                        {/* Main Content */}
                        <div className='flex flex-col scroll-smooth items-center w-full lg:w-[90%] h-fit min-h-screen  px-2 py-8 lg:p-10 pt-5 text-gray-800 dark:text-white' >
                            {/* contents */}
                            {
                            ! noContent.state ? 
                            <span className='' >{noContent.message}</span>
                            :
                                loading ? 
                                (                                            
                                    <LoadingSkeletonSingle />
                                ) : 
                                (
                                    // post content
                                    <div dir={post.language === 'fa' ? 'rtl' :'ltr'}  className=' flex flex-col items-start  scroll-smooth  w-full h-fit p-4 md:p-10 border border-solid border-gray-300 rounded-xl shadow-md bg-white dark:bg-gradient-to-t dark:from-10% dark:text-gray-50 dark:from-[#1A1A2E] dark:to-90% dark:to-slate-700/80 dark:border-none' >
                                        
                                        {/* post author and raection buttons */}
                                        <div className='w-full flex flex-col md:flex-row gap-6 h-fit  items-center justify-between' >
                                            {/* post author */}
                                            <div className='flex flex-col md:flex-row w-full items-center gap-3'>        
                                                <a href={`/user/dashboard/${post.user._id}`} className='h-fit' >
                                                    {
                                                        post.user.avatar !== null ?
                                                        <img src={`${process.env.REACT_APP_API_URL}/${post.user.avatarpath}`} alt="user" className='h-16 w-16 rounded-full ring-2 ring-green-200  object-cover self-center shadow-md hover:scale-105 transition-all' />
                                                        : <FontAwesomeIcon icon={faUserCircle}className='text-6xl ml-4 text-gray-400 ring-4 ring-green-500 rounded-full' />
                                                    }
                                                </a>
                                                <div className='flex flex-col'>
                                                    <span className='text-2xl  h-fit text-center md:text-start' >{post.user.username}</span>
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
                                            
                                            {/* post reactive buttons */}
                                            <div className='flex flex-wrap md:flex-nowrap items-center gap-2 w-fit md:gap-4' >
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
                                                <a  href='#answers'   dir='ltr' className='flex items-center justify-start h-fit gap-1 px-1 py-2  lg:py-2 lg:px-2 text-sm lg:text-lg rounded-lg border border-solid border-gray-100 bg-gray-100 text-gray-500 hover:bg-gray-500 dark:border-none hover:text-white cursor-pointer ' > 
                                                    <FontAwesomeIcon icon={faReply} />
                                                    <span className='h-fit' >{post.answerCount}</span>
                                                    <span className='h-fit box-content' >answer</span>                                        
                                                </a >
                                                {/* Save Button */}
                                                <button disabled={userstate.isAuthenticated ? false : true} className={`flex items-center gap-1 p-1 lg:py-2 lg:px-2 text-sm lg:text-lg rounded-lg  border border-solid border-blue-50  hover:bg-opacity-90 hover:text-white dark:border-none cursor-pointer
                                                    ${ userstate.isAuthenticated ?
                                                        post.savedByThisUser ? 'bg-blue-500 text-white' : 'bg-blue-50 text-blue-200 dark:bg-blue-300 dark:text-blue-500 ' 
                                                        : ''
                                                    }`} onClick={e => saveHandler(e, post._id , post.savedByThisUser , 'post' )  } >
                                                    {
                                                        buttonSaveLoading ? <ButtonSpinner /> : 
                                                        <>
                                                            <FontAwesomeIcon icon={ 
                                                                userstate.isAuthenticated ?
                                                                post.savedByThisUser ? faBookmarkSolid : faBookmark  
                                                                : faBookmark
                                                            }  />
                                                            {post.saveCount}
                                                        </>
                                                    }
                                                </button>

                                                {/* report Button post */}
                                                <button name='reportBtnPost' onClick={e => { 
                                                    showReportForm(e , 'post' , post._id )
                                                }} disabled={userstate.isAuthenticated ? false : true} className={`flex items-center gap-1 p-2 lg:py-3 lg:px-3 text-sm lg:text-lg  xl:text-xl text-gray-500 rounded-lg  border border-solid border-gray-200  hover:bg-gray-500 hover:text-white dark:text-gray-50 cursor-pointer`} >
                                                    <FontAwesomeIcon icon={faExclamationTriangle}   />
                                                    
                                                </button>
                                                
                                                {/* share link Button */}
                                                <button onClick={e => {

                                                    let url = window.location.href.toString()
                                                    navigator.clipboard.writeText(decodeURIComponent(url));

                                                }} disabled={userstate.isAuthenticated ? false : true} 
                                                    className={`flex items-center gap-1 p-2 lg:py-3 lg:px-3 text-sm lg:text-lg xl:text-xl  text-gray-500 rounded-lg  border border-solid border-gray-200 focus:bg-green-400 focus:border-green-300 focus:shadow-md focus:shadow-green-500 focus:text-white hover:bg-gray-500 hover:text-white cursor-pointer dark:text-gray-50`} >
                                                    <FontAwesomeIcon icon={faCopy}  />
                                                </button>
                                            </div>

                                        </div>

                                        {/* post title */}
                                        <h3 className='text-xl h-fit font-[600] text-gray-900 my-4 dark:text-gray-50 hover:text-opacity-85 rtl:text-right ltr:text-left ' dir={post.language === 'fa' ? 'rtl' :'ltr'} >{post.title}</h3> 
                                        
                                        {/* post statement */}
                                        {/* <div  id={post._id} dir='ltr'  className='font-[400] font-["Vazir"] w-full mb-10 h-fit text-gray-800 text-lg leading-8 dark:text-gray-50 hover:text-opacity-85 text-left '  ></div> */}
                                        <p id={post._id} className='text-left whitespace-pre-line  leading-8 text-lg font-[500] pb-4 h-fit rtl:text-right ltr:text-lef ' dir={post.language === 'fa' ? 'rtl' :'ltr'}  style={{wordBreak : 'normal' , wordSpacing : '2px'}} ></p>
                                        {/* post tags */}
                                        <div className='flex items-center mt-6 flex-wrap gap-x-2 gap-y-4 w-full text-sm md:text-lg' >
                                        { 
                                            post.tags.map(tag =>{
                                                return <ButtonTag key={`${tag._id}`} tag={tag} />
                                                // <span key={tag._id} className=' bg-teal-700 dark:shadow-lg dark:shadow-teal-500/50 p-2 h-fit  md:py-2 px-3  rounded-md text-white font-["Nunito"]' >
                                                //     <a href={`/tag/${tag.slug}`}>{tag.name}#</a>
                                                // </span>
                                            })
                                        }
                                        </div>

                                    </div>      
                                )
                            }        
                            <div className='flex flex-col lg:flex-row items-start w-full'>
                                {/* post answers */}
                                <Answers userstate={userstate} isPost={true} showReportForm={showReportForm} answers={post.answers}  answerField={answerField} setAnswerField={setAnswerField} inputAnswerHandler={inputAnswerHandler} answerHandler={answerHandler}   />
                                {/* similar posts */}
                                {
                                similarPosts.length === 0 ? '' : 
                                    <div className='flex flex-col items-center justify-between gap-4 w-full lg:w-[500px] h-fit  mt-10 lg:ml-4  py-4 px-4 rounded-md border border-solid border-gray-300 shadow-lg dark:text-gray-50 bg-white dark:bg-gradient-to-br dark:from-10% dark:from-[rgb(36,45,57)] dark:via-50% dark:via-[rgb(16,37,60)] dark:to-100% dark:to-[rgb(0,0,0)] dark:border-none ' >
                                        <div className='flex flex-col items-center h-fit max-h-fit w-full' >
                                            <span className='h-fit text-center font-[600] text-xl text-gray-500 dark:text-gray-100' >
                                                <FontAwesomeIcon icon={faRectangleList} />
                                                <span className='ml-2 h-fit' >similar posts</span>
                                            </span>
                                            {
                                                similarPosts.map(post => {
                                                    return (
                                                        <div key={post._id} className=' bg-[#0F2027]  p-4 text-gray-400 dark:text-gray-50 text-center border min-w-fit w-full border-solid border-gray-400 shadow-md rounded-lg px-1 py-2 pl-0 my-4  dark:bg-gradient-to-br dark:from-10%  dark:from-[rgb(20,30,48)] dark:to-90% dark:to-[rgb(36,59,85)] dark:border-gray-500 ' >
                                                            <FontAwesomeIcon icon={faCommentDots} className='text-2xl text-center  mr-2' />
                                                            <a href={`/posts/${post.slug}`} className='text-lg w-full  text-right font-[500]' >{post.title}</a>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>   
                                }
                            </div>
                            
                        </div>
                        {/* post report form */}
                        <div id='reportForm'  className='invisible flex items-center justify-center fixed  w-screen h-screen bg-opacity-80  bg-gray-300/10  transition-all    peer-focus:flex' >
                            <div className='p-4 bg-blue-gray-500 flex flex-col items-center  h-fit w-fit dark:text-white rounded-md bg-white text-gray-700 dark:bg-blue-600 border border-solid border-gray-400' >
                                <ul className='flex flex-col items-start gap-6'>
                                {
                                    reports.map(report =>{
                                        return ( 
                                        <li key={report._id} >
                                            <label htmlFor={`radio-${report.title}`} className='flex items-center gap-2' >
                                                <input id={`radio-${report.title}`} type="checkbox" checked={reportsField.reports.includes(report._id) ? true : false }  onChange={(e)=>  checkBoxInputHandler(e , report._id) }  />
                                                <span>{report.title}</span>
                                            </label>
                                        </li>
                                        )
                                    })
                                }
                                </ul>
                                <div className='mt-6'>
                                    <button  onClick={e=> reportHandler(e , reportsField.kind)}  className='px-4 py-2 border border-solid border-gray-300 rounded-md shadow-sm mx-2'>report</button>
                                    <button  onClick={e => {
                                        document.getElementById('reportForm').classList.replace('visible' , 'invisible')
                                        setReportsField(prevState => {
                                            return {
                                                ...prevState,
                                                reported : false,
                                                reports : [],
                                            }
                                        })
                                }} className='px-4 py-2 border border-solid border-gray-300 rounded-md shadow-sm mx-2 dark:bg-[#30475E] '  >cancel</button>
                                </div>
                            </div>
                        </div>
                        {/* report conclusion */}    
                        <div id='reportConclusion' className='invisible fixed bottom-2 right-2 h-fit w-fit flex items-center px-6 py-3 bg-green-700 rounded-md text-white' >
                            <button  className='text-base' onClick={e => {document.getElementById('reportConclusion').classList.toggle('invisible')}} >
                                <FontAwesomeIcon icon={faClose} />                                
                            </button>
                            <span>Report is successful</span>

                        </div>
                    </main>
                    <Footer />
                    <GoTopBtn />
                </div>
                ) : (
                <div className='flex items-center justify-center w-full h-full font-["Vazir"] text-8xl text-gray-500 ' >
                    { success.message }
                    <FontAwesomeIcon icon={faExclamationCircle} />    
                </div>
            )
        }
        </div>
    )
}

export default Post;