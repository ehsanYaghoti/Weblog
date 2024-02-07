import React , { useState , useEffect   } from 'react';
import { useParams }  from 'react-router-dom'; 

// Layouts
import Header from 'src/components/Layouts/Home/General/Header';
import Footer from 'src/components/Layouts/Home/General/Footer';
import GoTopBtn from 'src/components/Layouts/Home/General/GoTopBtn';
import LoadingSkeletonSingle from 'src/components/Layouts/Home/Loadings/LoadingSkeletonSingle';
import CardArticle from 'src/components/Layouts/Home/Cards/CardArticle';
import CardUserBio from 'src/components/Layouts/Home/User/CardUserBio';
import Comments from 'src/components/Layouts/Home/CommentsAndAnswers/Comments';
import ShareLinkBtn from 'src/components/Layouts/Home/General/ShareLinkBtn';
import ButtonTag from 'src/components/Layouts/Home/Buttons/ButtonTag';
import TimesAgo from 'src/components/Layouts/Home/General/TimesAgo';
import ButtonSpinner from 'src/components/Layouts/Home/Loadings/ButtonSpinner';

//import Api
import NodejsApi from 'src/Api/NodejsApi'; 

// import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle , faComment , faHeart as faheartSolid , faBookmark as faBookmarkSolid, faArrowLeft  } from '@fortawesome/free-solid-svg-icons';
import {  faHeart , faBookmark , faClock, faFolderClosed , faUser, faStar, faRectangleList  } from '@fortawesome/free-regular-svg-icons';


function Article(props) {
    
    const [userstate , setUserState ]  = useState({
        isAuthenticated : false,
        user : {
            username : '',
            avatar : '',
            likes : []
        }
    })

    const [article , setArticle] = useState({
        categories : [
            {
                name : '',
                slug : '',
            }
        ],
        tags : [
            {
                name : '',
                slug : '',
            }
        ],
        author : {
            followedByThisUser : false,
            username : '',
            avatar : ''
        },
        comments : [],
        likedByThisUser : false,
        likeCount : 0,
        savedByThisUser : false,
        saveCount : 0
    })    

    const [weekFavouriteArticles , setWeekFavouriteArticles] = useState([])
    const [recentArticles , setRecentArticles] = useState([])
    const [similarArticles , setSimilarArticles] = useState([])
    const [commentField , setCommentField] = useState({
        parent : '',
        statement : '',
        articleId : '',
    })

    const [loading  , setLoading] = useState(false)
    const [buttonLoading  , setButtonLoading] = useState(false)
    const [buttonLikeLoading  , setButtonLikeLoading] = useState(false)
    const [buttonSaveLoading  , setButtonSaveLoading] = useState(false)


    const [success , setSuccess] = useState({ state : true ,  message : ''})
    const [noContent , setNocontent] = useState({ state : true ,  message : ''})



    const {slug} = useParams()    
    

    useEffect(() => {
        setLoading(true)
        NodejsApi.get(`http://localhost:5000/articles/${slug}`)
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
            let article = data.article
            let weekFavouriteArticles = data.weekFavouriteArticles
            let recentArticles = data.recentArticles
            let similarArticles = data.similarArticles[0].articles

            

            // console.log(data.similarArticles[0])

            setArticle(article)
            setWeekFavouriteArticles([...weekFavouriteArticles])
            setRecentArticles([...recentArticles])

            similarArticles = similarArticles.filter(element => { return element._id !== article._id })

            setSimilarArticles([...similarArticles])

            setUserState({
                isAuthenticated : data.isAuthenticated ,
                user : {
                    ...user
                }
            });


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
            if(document.getElementById(article._id)){
                let parser = new DOMParser();
                document.getElementById(article._id).innerHTML = parser.parseFromString( article.statement , 'text/html').body.innerHTML 
            }
        } catch (error) {
            console.log(error)
            setSuccess({
                state : false,
                message : error
            })
        }
    } ,[article] )

    let likeHandler = (e , id , liked , kind , single = 'singlePage' , moreData = null) =>{
        e.preventDefault()

        setButtonLikeLoading(true)

        let data ={
            id,
            kind,
            single,
            moreData
        }
        
        if(liked){
            console.log('dislike')
            // NodejsApi.post('/dislike' , article)
            NodejsApi.delete(`/like/${id}/${kind}/${single}/${moreData}`)
            .then(response =>{
                if(response.data.success){

                    let data = response.data
                    let dislikedArticle = data.article

                    if(dislikedArticle !== undefined ){

                        if(dislikedArticle._id === article._id){
                            setArticle(prevState => {
                                return {
                                    ...prevState,
                                    likedByThisUser : false,
                                    likeCount : prevState.likeCount -1
                                }
                            })
                        }

                        if(similarArticles.some(simiarticle => simiarticle._id === dislikedArticle._id)){

                            let index = similarArticles.findIndex(element => element._id === dislikedArticle._id)

                            similarArticles[index].likedByThisUser = false
                            similarArticles[index].likeCount = dislikedArticle.likeCount -1

                            setSimilarArticles(similarArticles)
                        }

                    }

                    let comments = data.comments

                    if(comments){
                        setArticle(prevState => {
                            return {
                                ...prevState,
                                comments
                            }
                        })
                    }

                    setButtonLikeLoading(false)


                }
            })
            .catch(err => {
                console.log(err)
                setButtonLikeLoading(false)
                setSuccess({
                    state : false,
                    message : err.message
                })
            })


        } else if(! liked){
            NodejsApi.post('/like' , data)
            .then(response =>{
                if(response.data.success){

                    let data = response.data  

                    let likedArticle = data.article

                    if(likedArticle !== undefined ){
                    
                        if(likedArticle._id === article._id){
                            setArticle(prevState => {
                                return {
                                    ...prevState,
                                    likedByThisUser : true,
                                    likeCount : prevState.likeCount +1
                                }
                            })
                        }
                        
                        if(similarArticles.some(simiarticle => simiarticle._id === likedArticle._id)){

                            let index = similarArticles.findIndex(element => element._id === likedArticle._id)

                            similarArticles[index].likedByThisUser = true
                            similarArticles[index].likeCount = likedArticle.likeCount +1
                            
                            setSimilarArticles(similarArticles)
                        }

                    }

                    let comments = data.comments

                    if(comments){
                        setArticle(prevState => {
                            return {
                                ...prevState,
                                comments
                            }
                        })
                    }

                    setButtonLikeLoading(false)

                }
            })
            .catch(err => {
                console.log(err)
                setButtonLikeLoading(false)
                setSuccess({
                    state : false,
                    message : err.message
                })
            })
        }

    }

    let saveHandler = (e , id , saved , kind , single = 'singlePage' , moreData = null) =>{
        e.preventDefault()

        setButtonSaveLoading(true)

        let data ={
            id,
            kind , 
            single,
            moreData
        }

        if(saved){

            // unsaving
            NodejsApi.delete(`/save/${id}/${kind}/${single}/${moreData}`)
            .then(response =>{
                console.log(response.data)
                if(response.data.success){

                    let data = response.data  

                    let unsavedArticle = data.article
                    
                    if(unsavedArticle._id === article._id){
                        setArticle(prevState => {
                            return {
                                ...prevState,
                                savedByThisUser : false,
                                saveCount : prevState.saveCount -1
                            }
                        })
                    }
                    
                    if(similarArticles.some(simiarticle => simiarticle._id === unsavedArticle._id)){

                        let index = similarArticles.findIndex(element => element._id === unsavedArticle._id)

                        similarArticles[index].savedByThisUser = false
                        similarArticles[index].saveCount = unsavedArticle.saveCount -1
                        
                        setSimilarArticles(similarArticles)
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

            // saving

            NodejsApi.post('/save' , data)
            .then(response =>{

                if(response.data.success){
                    let data = response.data  

                    let savedArticle = data.article
                    
                    if(savedArticle._id === article._id){
                        setArticle(prevState => {
                            return {
                                ...prevState,
                                savedByThisUser : true,
                                saveCount : prevState.saveCount +1
                            }
                        })
                    }
                    
                    if(similarArticles.some(simiarticle => simiarticle._id === savedArticle._id)){

                        let index = similarArticles.findIndex(element => element._id === savedArticle._id)

                        similarArticles[index].savedByThisUser = true
                        similarArticles[index].saveCount = savedArticle.saveCount +1
                        
                        setSimilarArticles(similarArticles)
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

    let commentHandler =  (e , articleId ) => {
        console.log(e.target.name)
        // console.log(e.target.value)
        console.log(commentField)
        setLoading(true)
        NodejsApi.post(`http://localhost:5000/comment/` , commentField )
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
            let articleComments = data.articleComments
            let newCommentsNumber = data.newCommentsNumber

            
            console.log(data)

            setArticle(prevState => {
                return {
                    ...prevState,
                    comments : articleComments,
                    commentCount : newCommentsNumber
                }
            })
            setCommentField(prevState =>{
                return{
                    parent : '',
                    articleId : '',
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

    let inputCommentHandler = (e , parentId) => {
        e.preventDefault();
        // let name = e.target.name
        let value = e.target.value

        if(parentId === null){
            setCommentField(prevState => {
                return {
                    parent : null ,
                    articleId : article._id ,
                    statement : value
                }
            })
        } else {
            setCommentField(prevState => {
                return {
                    parent : parentId,
                    articleId : article._id ,
                    statement : value
                }
            })
        }
        

    }

    let followUserHandler = (e , followed , followingUserId) =>{
        e.preventDefault()
        let data = {
            id : followingUserId
        }

        setButtonLoading(true)

        if(followed){
            console.log('unfollowing')
            NodejsApi.put(`/user/unfollow/${followingUserId}` , data )
            .then(response =>{
                console.log(response.data)
                if(response.data.success){
                    let author = response.data.user  

                    if(! author.followedByThisUser){

                        setArticle(prevState => {
                            return {
                                ...prevState,
                                author : {
                                    ...prevState.author,
                                    followedByThisUser : false
                                }
                            }
                        })

                    }

                }

                setButtonLoading(false)
            })
            .catch(err => {
                console.log(err)
                setButtonLoading(false)
                setSuccess({
                    state : false,
                    message : err.message
                })
            })
        } else if(! followed){
            console.log('following')
            NodejsApi.put(`/user/follow/${followingUserId}` , data)
            .then(response =>{
                console.log(response.data)
                if(response.data.success){
                    let author = response.data.user  

                    if(author.followedByThisUser){

                        setArticle(prevState => {
                            return {
                                ...prevState,
                                author : {
                                    ...prevState.author,
                                    followedByThisUser : true
                                }
                            }
                        })

                    }
                }

                setButtonLoading(false)
            })
            .catch(err => {
                console.log(err)
                setButtonLoading(false)
                setSuccess({
                    state : false,
                    message : err.message
                })
            })
        }

    }


    // console.log(article)


    return (
        <div className='flex flex-col w-full h-screen'  >
        {
            success.state ? (
                <div className='flex flex-col w-full h-fit scroll-smooth '>
                    <Header user={userstate} />
                    <main className='flex flex-col items-center lg:items-start lg:flex-row lg:justify-center w-full h-fit pb-6 gap-2 scroll-smooth  font-["Nunito"] bg-gradient-to-br from-30% from-slate-100 to-70% to-slate-300  dark:bg-gradient-to-t dark:from-10% dark:from-slate-600 dark:to-90% dark:to-slate-800 dark:text-gray-50' >
                        
                        {/* Side Menu */}
                        <div className='hidden lg:flex flex-col w-full h-fit px-2 lg:w-[25%] lg:ml-0 xl:ml-6' >
                            {/* author */}
                            <CardUserBio buttonLoading={buttonLoading} user={article.author} followUserHandler={followUserHandler} authenticatedUser={userstate} sidebar={true} />
                            {/* Chosen Articles */}
                            {
                            !(weekFavouriteArticles.length === 0) ? 
                            (
                                <div className='flex flex-col items-center justify-between gap-4 w-full  min-w-fit  min-h-fit mt-5  py-4 lg:px-6 xl:px-10 rounded-md border border-solid border-gray-300 shadow-lg dark:border-none bg-white  dark:bg-gradient-to-br dark:from-10% dark:from-[rgb(20,30,48)] dark:to-90% dark:to-[rgb(36,59,85)]' >
                                    <div className='flex flex-col items-center h-fit w-full ' >
                                        <span className='h-fit text-center font-[600] text-xl text-gray-500 dark:text-gray-50' >
                                            <FontAwesomeIcon icon={faStar} />
                                            <span className='ml-2 h-fit' >Chosen Articles</span>
                                        </span>
                                        {
                                            weekFavouriteArticles.map(article => {
                                                return (
                                                    <div key={article._id} className=' bg-[#0F2027] text-gray-400 w-full dark:text-gray-50 dark:border-none  border border-solid border-gray-400 shadow-md rounded-lg px-4 py-2 pl-0 my-4' >
                                                        <a href={`/articles/${article.slug}`} className='text-xl font-[600] border-l-4 border-solid border-cyan-800 pl-2 ' >{article.title}</a>
                                                        <div className='flex items-center justify-start gap-4 h-fit pl-4 mt-4 mb-2' >
                                                            <div className='flex items-center h-fit pr-4 border-r border-solid border-gray-600' >
                                                                <FontAwesomeIcon icon={faUser} />
                                                                <a href={`/user/dashboard/${article.author._id}`} className='ml-2 h-fit' >
                                                                    {article.author.username}
                                                                </a>
                                                            </div>
                                                            <div className='flex items-center h-fit'  >
                                                                <FontAwesomeIcon icon={faClock} />
                                                                <span className='ml-2 flex items-center gap-2'>
                                                                    {article.readingtime}
                                                                    <span>minute</span>
                                                                </span>

                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <button className='px-6 py-3 w-fit hover:opacity-70 border border-solid border-cyan-200 rounded-md text-cyan-800  dark:text-blue-400 text-xl font-[500]  '          >
                                        <a href="/articles">
                                            <FontAwesomeIcon icon={faArrowLeft} />
                                            <span className='ml-2'>see all articles</span>                                               
                                        </a>
                                    </button>
                                </div>
                            ) : ''
                            }
                            {/* Most Recent Articles */}
                            {
                            recentArticles.length === 0 ? '' :
                            (<div className='flex flex-col items-center justify-between gap-4 w-full  min-w-fit h-fit  mt-5  py-4 lg:px-6 xl:px-10 rounded-md border border-solid  border-gray-300 shadow-lg dark:border-none bg-white  dark:bg-gradient-to-br dark:from-10% dark:from-[rgb(20,30,48)] dark:to-90% dark:to-[rgb(36,59,85)] ' >
                                <div className='flex flex-col items-center h-fit max-h-fit w-full' >
                                    <span className='h-fit text-center font-[600] text-xl text-gray-500 dark:text-gray-50 ' >
                                        <FontAwesomeIcon icon={faRectangleList} />
                                        <span className='ml-2 h-fit' >Recent Articles</span>
                                    </span>
                                    {
                                        recentArticles.map(article => {
                                            return (
                                                <div key={article._id} className=' bg-[#0F2027] text-gray-400 dark:text-gray-50 dark:border-none border min-w-fit w-full border-solid border-gray-400 shadow-md rounded-lg px-4 py-2 pl-0 my-4' >
                                                    <a href={`/articles/${article.slug}`} className='text-xl font-[600] border-l-4 border-solid border-cyan-800 pl-2 ' >{article.title}</a>
                                                    <div className='flex items-center justify-start gap-4 h-fit pl-4 mt-4 mb-2' >
                                                        <div className='flex items-center h-fit pr-4 border-r border-solid border-gray-600' >
                                                            <FontAwesomeIcon icon={faUser} />
                                                            <a href={`/user/dashboard/${article.author._id}`} className='ml-2 h-fit' >
                                                                {article.author.username}
                                                            </a>
                                                        </div>
                                                        <div className='flex items-center h-fit'  >
                                                            <FontAwesomeIcon icon={faClock} />
                                                            <span className='ml-2 flex items-center gap-2'>
                                                                {article.readingtime}
                                                                <span>minute</span>
                                                            </span>

                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <button className='px-6 py-3 w-fit hover:opacity-70 border border-solid border-cyan-200 rounded-md text-cyan-800 dark:text-blue-400 text-xl font-[500]  '          >
                                    <a href="/articles">
                                        <FontAwesomeIcon icon={faArrowLeft} />
                                        <span className='ml-2'>see all articles</span>                                               
                                    </a>
                                </button>
                            </div>)
                            }

                        </div>

                        {/* Main Content */}
                        <div className='flex flex-col items-center w-full lg:w-[75%] h-fit min-h-screen px-2  lg:p-6 pt-5 text-gray-800 scroll-smooth ' >
                            {/* contents */}
                            {
                            ! noContent.state ? 
                            <span className='' >{noContent.message}</span>
                            :
                            (   
                                // Article Content
                                <div className=' flex flex-col items-start justify-start  w-full h-full px-4 py-8 lg:p-10 border border-solid border-gray-300 rounded-xl shadow-md bg-white dark:bg-gradient-to-t dark:from-10% dark:from-[#1A1A2E] dark:to-90% dark:to-slate-700/80 dark:border-none dark:text-gray-50' >
                                    {
                                        loading ? 
                                        (                                            
                                            <LoadingSkeletonSingle />
                                        ) : 
                                        (
                                        <>
                                        {/* article image */}
                                        <div className='w-full h-[200px] lg:h-[400px] self-center flex items-center justify-center border border-solid dark:border-none border-gray-200 rounded-lg shadow-md mb-10  ' >
                                            <img src={`http://localhost:5000/${article.imagepath}`} 
                                                onError={e =>{ 
                                                    e.currentTarget.style.display = 'none'
                                                    console.log(e)  
                                                }} 
                                            alt={`${article.title}`} className='object-cover w-full rounded-xl ' />
                                        </div>

                                        {/* article category and reading time */}
                                        <div className='flex flex-col lg:flex-row items-center h-fit w-full my-4 gap-8' >
                                            <a href={`/articles/?category=${article.categories[0].slug}`} className=' bg-teal-400 h-fit px-4 py-2 rounded-lg text-white hover:opacity-80 shadow-md shadow-teal-400' >
                                                <FontAwesomeIcon icon={faFolderClosed}  />
                                                <span className='text-xl font-[600] ml-2' >{article.categories[0].name}</span>
                                            </a>
                                            <span className='h-fit flex items-center lg:px-4 py-2 whitespace-nowrap text-xl font-[500] text-gray-600 hover:opacity-80 dark:text-gray-100' >
                                                <FontAwesomeIcon icon={faClock} />
                                                <span className='h-fit ml-2 drop-shadow-lg '>
                                                    Reading time : {article.readingtime} minute
                                                </span>
                                            </span>
                                        </div>

                                        {/* article content */}
                                        <div  className={`w-full ${article.language === 'fa' ? 'font-["Vazir"]' : 'font-["Nunito"]'} `} >
                                            {/* article title */}
                                            <h2 className='h-fit text-3xl font-[600] mb-6  leading-10' dir={article.language === 'fa' ? 'rtl' :'ltr'} >{article.title}</h2>
                                            {/* article statement */}
                                            <p id={article._id} className={`h-fit whitespace-pre-line leading-8 text-lg font-[500] pb-4`} style={{wordBreak : 'normal' , wordSpacing : '2px'}} ></p>
                                            {/* article source */}
                                            <a href={`${article.source}`} className="mb-2 text-lg font-[500] text-blue-400" >Source</a>
                                            {/* About Article */}
                                            <div className='py-4 px-2 flex flex-col border-t border-solid border-gray-400 h-fit' >
                                                {/* created time and tags */}
                                                <div className='flex flex-col gap-6 md:flex-row items-center justify-between' >
                                                    {/* created at time  */}
                                                    <TimesAgo date={article.createdAt} icon={true} />
                                                    {/* article tags */}
                                                    <div className='flex items-center gap-4' >
                                                        {
                                                            article.tags.map(tag => {
                                                                return <ButtonTag key={`${tag._id}`} tag={tag} />
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                                {/* Reaction and share */}
                                                <div className='flex flex-col gap-8 md:flex-row items-center w-full justify-between mt-10' >
                                                    {/* react to article */}
                                                    <div className='flex items-center gap-3 text-sm ' >
                                                        {/* Comments link */}
                                                        <a href={`#comments`} className='flex items-center gap-1 py-1 px-2 rounded-md border border-solid border-gray-100 bg-gray-100 text-gray-500 hover:bg-gray-500 hover:text-white dark:border-none dark:shadow-md dark:shadow-gray-500/50 dark:bg-gray-200 dark:text-gray-600 cursor-pointer' > 
                                                            <FontAwesomeIcon icon={faComment} />
                                                            {article.commentCount}
                                                        </a >
                                                        {/* Save Button */}
                                                        <button disabled={userstate.isAuthenticated || !buttonSaveLoading ? false : true} className={`flex items-center gap-1 py-1 px-2 rounded-md  border border-solid border-blue-50  hover:bg-opacity-90 hover:text-blue-400  dark:hover:text-white dark:border-none cursor-pointer
                                                            ${ userstate.isAuthenticated ?
                                                                article.savedByThisUser ? 'bg-blue-500 text-white hover:bg-opacity-30 dark:shadow-md dark:shadow-blue-500/50' : 'bg-blue-50 text-blue-200 dark:bg-blue-200 dark:text-blue-400  ' 
                                                                : ''
                                                            }`} onClick={e => saveHandler(e, article._id , article.savedByThisUser , 'article')} >
                                                            {
                                                                buttonSaveLoading ? <ButtonSpinner /> : 
                                                                <>
                                                                    <FontAwesomeIcon icon={ 
                                                                        userstate.isAuthenticated ?
                                                                        article.savedByThisUser ? faBookmarkSolid : faBookmark  
                                                                        : faBookmark
                                                                    }  />
                                                                    {article.saveCount}
                                                                </>
                                                            }
                                                        </button>
                                                        {/* Like Button */}
                                                        <button id={`likeOf-${article._id}`} disabled={userstate.isAuthenticated || !buttonLikeLoading ? false : true} className={`flex items-center gap-1  py-1 px-2 rounded-md  border border-solid border-red-50 hover:bg-opacity-90 hover:text-red-400   dark:hover:text-white dark:border-none cursor-pointer 
                                                            ${ userstate.isAuthenticated  ?
                                                                article.likedByThisUser ? 'bg-red-500 text-white hover:bg-opacity-30 dark:shadow-md dark:shadow-red-400/50' : 'bg-red-50 text-red-200 dark:bg-red-200 dark:text-red-400 ' 
                                                                : ''
                                                            } `} onClick={e => likeHandler(e, article._id , article.likedByThisUser , 'article')} >
                                                            {buttonLikeLoading ? <ButtonSpinner /> : 
                                                             <>
                                                                <FontAwesomeIcon icon={ 
                                                                    userstate.isAuthenticated ?
                                                                    article.likedByThisUser ? faheartSolid : faHeart  
                                                                    : faHeart
                                                                }  />
                                                                {article.likeCount}
                                                            </>}
                                                        </button>
                                                    </div>
                                                    <ShareLinkBtn title={article.title} />
                                                </div>
                                            </div>

                                        </div>
    
                                        </>
                                        )
                                    }
                                </div>
                            )
                            }       
                            <CardUserBio buttonLoading={buttonLoading} user={article.author} followUserHandler={followUserHandler} authenticatedUser={userstate} sidebar={false} />
                        
                            {/* similarArticles */}
                            {
                                similarArticles.length === 0 ? '' : 

                                <div className='flex flex-col items-start' >

                                    <h2 className='text-gray-80 text-center text-3xl pr-8 py-4 font-[600] flex items-center justify-center lg:justify-start w-full  rounded-md mt-10 mb-4 dark:text-gray-50' >
                                        <FontAwesomeIcon icon={faRectangleList} />
                                        <span className='ml-2 ' >Similar Articles</span>
                                    </h2>

                                    <div className='grid justify-items-center grid-rows-1 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-4 w-full '  >
                                        {/* cards */}
                                        {
                                            similarArticles.map(article => {
                                                return (
                                                // Card
                                                <CardArticle key={article._id} buttonLoading={buttonSaveLoading || buttonLikeLoading} article={article} userstate={userstate} saveHandler={saveHandler} likeHandler={likeHandler} />
                                                )
                                            })
                                        }
                                    </div>

                                </div>
                            }

                            {/* article comments */}
                            <Comments userstate={userstate} comments={article.comments}  commentField={commentField} setCommentField={setCommentField} inputCommentHandler={inputCommentHandler} commentHandler={commentHandler} likeHandler={likeHandler}  />

                        </div>

                        {/* Side Menu */}
                        <div className='flex lg:hidden flex-col w-full h-fit px-2 lg:w-[25%] lg:ml-6' >
                            {/* author */}
                            <CardUserBio buttonLoading={buttonLoading} user={article.author} followUserHandler={followUserHandler} authenticatedUser={userstate} sidebar={true} />
                            {/* Chosen Articles */}
                            {
                            !(weekFavouriteArticles.length === 0) ? 
                            (
                            <div className='flex flex-col items-center justify-between gap-4 w-full  min-w-fit h-fit  mt-5  py-4 px-10 rounded-md border border-solid  border-gray-300 shadow-lg bg-white dark:border-none  dark:bg-gradient-to-br dark:from-10% dark:from-[rgb(20,30,48)] dark:to-90% dark:to-[rgb(36,59,85)] ' >
                                <div className='flex flex-col items-center h-fit w-full ' >
                                        <span className='h-fit text-center font-[600] text-xl text-gray-500' >
                                            <FontAwesomeIcon icon={faStar} />
                                            <span className='ml-2 h-fit' >Chosen Articles</span>
                                        </span>
                                        {
                                            weekFavouriteArticles.map(article => {
                                                return (
                                                    <div key={article._id} className=' bg-[#0F2027] text-gray-400 w-full  border border-solid border-gray-400 shadow-md rounded-lg px-4 py-2 pl-0 my-4' >
                                                        <a href={`/articles/${article.slug}`} className='text-xl font-[600] border-l-4 border-solid border-cyan-800 pl-2 ' >{article.title}</a>
                                                        <div className='flex items-center justify-start gap-4 h-fit pl-4 mt-4 mb-2' >
                                                            <div className='flex items-center h-fit pr-4 border-r border-solid border-gray-600' >
                                                                <FontAwesomeIcon icon={faUser} />
                                                                <a href={`/user/dashboard/${article.author._id}`} className='ml-2 h-fit' >
                                                                    {article.author.username}
                                                                </a>
                                                            </div>
                                                            <div className='flex items-center h-fit'  >
                                                                <FontAwesomeIcon icon={faClock} />
                                                                <span className='ml-2 flex items-center gap-2'>
                                                                    {article.readingtime}
                                                                    <span>minute</span>
                                                                </span>

                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <button className='px-6 py-3 w-fit hover:opacity-70 border border-solid border-cyan-200 rounded-md text-cyan-800 text-xl font-[500]  '          >
                                        <a href="/articles">
                                            <FontAwesomeIcon icon={faArrowLeft} />
                                            <span className='ml-2'>see all articles</span>                                               
                                        </a>
                                    </button>
                                </div>
                            ) : ''
                            }
                            {/* Most Recent Articles */}
                            {
                            recentArticles.length === 0 ? '' :
                            (<div className='flex flex-col items-center justify-between gap-4 w-full  min-w-fit h-fit  mt-5  py-4 px-10 rounded-md border border-solid  border-gray-300 shadow-lg bg-white dark:border-none  dark:bg-gradient-to-br dark:from-10% dark:from-[rgb(20,30,48)] dark:to-90% dark:to-[rgb(36,59,85)] ' >
                                <div className='flex flex-col items-center h-fit max-h-fit w-full' >
                                    <span className='h-fit text-center font-[600] text-xl text-gray-500 dark:text-gray-50 ' >
                                        <FontAwesomeIcon icon={faRectangleList} />
                                        <span className='ml-2 h-fit' >Recent Articles</span>
                                    </span>
                                    {
                                        recentArticles.map(article => {
                                            return (
                                                <div key={article._id} className=' bg-[#0F2027] text-gray-400 dark:text-gray-50 dark:border-none border min-w-fit w-full border-solid border-gray-400 shadow-md rounded-lg px-4 py-2 pl-0 my-4' >
                                                    <a href={`/articles/${article.slug}`} className='text-xl font-[600] border-l-4 border-solid border-cyan-800 pl-2 ' >{article.title}</a>
                                                    <div className='flex items-center justify-start gap-4 h-fit pl-4 mt-4 mb-2' >
                                                        <div className='flex items-center h-fit pr-4 border-r border-solid border-gray-600' >
                                                            <FontAwesomeIcon icon={faUser} />
                                                            <a href={`/user/dashboard/${article.author._id}`} className='ml-2 h-fit' >
                                                                {article.author.username}
                                                            </a>
                                                        </div>
                                                        <div className='flex items-center h-fit'  >
                                                            <FontAwesomeIcon icon={faClock} />
                                                            <span className='ml-2 flex items-center gap-2'>
                                                                {article.readingtime}
                                                                <span>minute</span>
                                                            </span>

                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <button className='px-6 py-3 w-fit hover:opacity-70 border border-solid border-cyan-200 rounded-md text-cyan-800 dark:text-blue-400 text-xl font-[500]  '          >
                                    <a href="/articles">
                                        <FontAwesomeIcon icon={faArrowLeft} />
                                        <span className='ml-2'>see all articles</span>                                               
                                    </a>
                                </button>
                            </div>)
                            }

                        </div>
 
                    </main>
                    <Footer />
                    <GoTopBtn />
                </div>
                ) : (
                <span className='flex items-center justify-center w-full h-full font-["Vazir"] min-h-screen text-8xl text-gray-500 ' >
                    { success.message }
                    <FontAwesomeIcon icon={faExclamationCircle} />    
                </span>
            )
        }
        </div>
    )
}

export default Article;