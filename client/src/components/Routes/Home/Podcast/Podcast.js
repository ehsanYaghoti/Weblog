import React , { useState , useEffect   } from 'react';
import { useParams }  from 'react-router-dom'; 

// Layouts
import Header from 'src/components/Layouts/Home/General/Header';
import Footer from 'src/components/Layouts/Home/General/Footer';
import GoTopBtn from 'src/components/Layouts/Home/General/GoTopBtn';
import LoadingSkeletonSingle from 'src/components/Layouts/Home/Loadings/LoadingSkeletonSingle';
import CardPodcast from 'src/components/Layouts/Home/Cards/CardPodcast';
import CardUserBio from 'src/components/Layouts/Home/User/CardUserBio';
import Comments from 'src/components/Layouts/Home/CommentsAndAnswers/Comments';
import TimesAgo from 'src/components/Layouts/Home/General/TimesAgo';
import ShareLinkBtn from 'src/components/Layouts/Home/General/ShareLinkBtn';
import ButtonSpinner from 'src/components/Layouts/Home/Loadings/ButtonSpinner';

//import Api
import NodejsApi from 'src/Api/NodejsApi'; 

// import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle , faComment , faHeart as faheartSolid , faBookmark as faBookmarkSolid  } from '@fortawesome/free-solid-svg-icons';
import {  faHeart , faBookmark , faClock, faFolderClosed , faRectangleList  } from '@fortawesome/free-regular-svg-icons';
import ButtonTag from 'src/components/Layouts/Home/Buttons/ButtonTag';

function Podcast(props) {
    
    const [userstate , setUserState ]  = useState({
        isAuthenticated : false,
        user : {
            username : '',
            avatar : '',
        }
    })

    const [podcast , setPodcast] = useState({
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
        user : {
            username : '',
            avatar : ''
        },
        comments : [],
        likedByThisUser : false,
        likeCount : 0,
        savedByThisUser : false,
        saveCount : 0
    })    

    const [similarPodcasts , setSimilarPodcasts] = useState([])
    const [commentField , setCommentField] = useState({
        parent : '',
        statement : '',
        podcastId : '',
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
        NodejsApi.get(`http://localhost:5000/podcasts/${slug}`)
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
            let podcast = data.podcast
            let similarPodcasts = data.similarPodcasts[0].podcasts

            
            // console.log(data)
            // console.log(data.similarPodcasts[0])

            setPodcast(podcast)

            similarPodcasts = similarPodcasts.filter(element => { return element._id !== podcast._id })

            setSimilarPodcasts([...similarPodcasts])

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
            if(document.getElementById(podcast._id)){
                let parser = new DOMParser();
                document.getElementById(podcast._id).innerHTML = parser.parseFromString( podcast.statement , 'text/html').body.innerHTML 
            }
        } catch (error) {
            console.log(error)
            setSuccess({
                state : false,
                message : error
            })
        }
    } ,[podcast] )

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

            NodejsApi.delete(`/like/${id}/${kind}/${single}/${moreData}`)
            .then(response =>{
                console.log(response.data)
                if(response.data.success){

                    let data = response.data
                    let dislikedPodcast = data.podcast

                    if(dislikedPodcast !== undefined ){

                        if(dislikedPodcast._id === podcast._id){
                            setPodcast(prevState => {
                                return {
                                    ...prevState,
                                    likedByThisUser : false,
                                    likeCount : prevState.likeCount -1
                                }
                            })
                        }

                        if(similarPodcasts.some(simipodcast => simipodcast._id === dislikedPodcast._id)){

                            let index = similarPodcasts.findIndex(element => element._id === dislikedPodcast._id)

                            similarPodcasts[index].likedByThisUser = false
                            similarPodcasts[index].likeCount = dislikedPodcast.likeCount -1

                            setSimilarPodcasts(similarPodcasts)
                        }
                    
                    }

                    let comments = data.comments

                    if(comments){
                        setPodcast(prevState => {
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
                    let likedPodcast = data.podcast

                    if(likedPodcast !== undefined ){

                        if(likedPodcast._id === podcast._id){
                            setPodcast(prevState => {
                                return {
                                    ...prevState,
                                    likedByThisUser : true,
                                    likeCount : prevState.likeCount +1
                                }
                            })
                        }

                        if(similarPodcasts.some(simipodcast => simipodcast._id === likedPodcast._id)){

                            let index = similarPodcasts.findIndex(element => element._id === likedPodcast._id)

                            similarPodcasts[index].likedByThisUser = true
                            similarPodcasts[index].likeCount = likedPodcast.likeCount +1

                            setSimilarPodcasts(similarPodcasts)
                        }
                    
                    }
                    
                    let comments = data.comments

                    if(comments){
                        setPodcast(prevState => {
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

    let saveHandler = (e , id , saved , kind , single = 'singlePage' ,  moreData = null) =>{
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
                console.log(response.data)
                if(response.data.success){

                    let data = response.data
                    let unsavedPodcast = data.podcast

                    if(unsavedPodcast._id === podcast._id){
                        setPodcast(prevState => {
                            return {
                                ...prevState,
                                savedByThisUser : false,
                                saveCount : prevState.saveCount -1
                            }
                        })
                    }

                    if(similarPodcasts.some(simipodcast => simipodcast._id === unsavedPodcast._id)){

                        let index = similarPodcasts.findIndex(element => element._id === unsavedPodcast._id)

                        similarPodcasts[index].savedByThisUser = false
                        similarPodcasts[index].saveCount = unsavedPodcast.saveCount -1

                        setSimilarPodcasts(similarPodcasts)
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
                    let savedPodcast = data.podcast

                    if(savedPodcast._id === podcast._id){
                        setPodcast(prevState => {
                            return {
                                ...prevState,
                                savedByThisUser : true,
                                saveCount : prevState.saveCount +1
                            }
                        })
                    }

                    if(similarPodcasts.some(simipodcast => simipodcast._id === savedPodcast._id)){

                        let index = similarPodcasts.findIndex(element => element._id === savedPodcast._id)

                        similarPodcasts[index].savedByThisUser = true
                        similarPodcasts[index].saveCount = savedPodcast.saveCount +1

                        setSimilarPodcasts(similarPodcasts)
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

    let commentHandler =  (e , podcastId ) => {
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
            let podcastComments = data.podcastComments
            let newCommentsNumber = data.newCommentsNumber

            
            console.log(data)

            setPodcast(prevState => {
                return {
                    ...prevState,
                    comments : podcastComments,
                    commentCount : newCommentsNumber
                }
            })

            setCommentField(prevState =>{
                return{
                    parent : '',
                    podcastId : '',
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
                    podcastId : podcast._id ,
                    statement : value
                }
            })
        } else {
            setCommentField(prevState => {
                return {
                    parent : parentId,
                    podcastId : podcast._id ,
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
            console.log('unfollow')
            NodejsApi.put(`/user/unfollow/${followingUserId}` , data )
            .then(response =>{
                console.log(response.data)
                if(response.data.success){
                    let user = response.data.user  

                    if(! user.followedByThisUser){

                        setPodcast(prevState => {
                            return {
                                ...prevState,
                                user : {
                                    ...prevState.user,
                                    followedByThisUser : false
                                }
                            }
                        })

                    }

                    setButtonLoading(false)
                }
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
            console.log('follow')
            NodejsApi.put(`/user/follow/${followingUserId}` , data)
            .then(response =>{
                console.log(response.data)
                if(response.data.success){
                    let user = response.data.user  

                    if(user.followedByThisUser){

                        setPodcast(prevState => {
                            return {
                                ...prevState,
                                user : {
                                    ...prevState.user,
                                    followedByThisUser : true
                                }
                            }
                        })

                    }
                    setButtonLoading(false)
                }
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


    // console.log(podcast)


    return (
        <div className='flex flex-col w-full h-screen scroll-smooth'  >
        {
            success.state ? (
                <div className='flex flex-col w-full h-fit'>
                    <Header user={userstate} />
                    <main className='flex flex-row justify-center w-full h-fit gap-10 font-["Nunito"] bg-gradient-to-br from-30% from-slate-100 to-70% to-slate-300 dark:bg-gradient-to-t dark:from-10% dark:from-slate-600 dark:to-90% dark:to-slate-800 dark:text-gray-50' >
                        {/* Main Content */}
                        <div className='flex flex-col scroll-smooth items-center w-full lg:w-[80%] h-fit min-h-screen p-4 md:p-10 pt-5 text-gray-800' >
                            {/* contents */}
                            {
                            ! noContent.state ? 
                            <span className='' >{noContent.message}</span>
                            :
                            (   
                                // Podcast Content
                                <div className=' flex flex-col items-start justify-start scroll-smooth  w-full h-full min-h-fit p-4 lg:p-10 border border-solid border-gray-300 rounded-xl shadow-md bg-white dark:bg-gradient-to-t dark:from-10% dark:from-[#1A1A2E] dark:to-90% dark:to-slate-700/80 dark:border-none dark:text-gray-50' >
                                    {
                                        loading ? 
                                        (                                            
                                            <LoadingSkeletonSingle />
                                        ) : 
                                        (
                                        <>
                                        {/* podcast image */}
                                        <div className='w-full h-[200px] md:h-[400px] self-center flex items-center justify-center border border-solid border-gray-200 rounded-lg shadow-md mb-10 dark:border-none ' >
                                            <img src={`http://localhost:5000/${podcast.imagepath}`} 
                                                onError={e =>{ 
                                                    e.currentTarget.style.display = 'none'
                                                    console.log(e)  }  } 
                                                alt="podcast" className='object-cover w-full rounded-xl '  
                                            />
                                        </div>
                                        {/* podcast category and soundTime */}
                                        <div className='flex flex-col lg:flex-row h-fit items-center w-full my-4 gap-4' >
                                            <a href={`/podcasts/?category=${podcast.categories[0].slug}`} className=' bg-teal-400 h-fit px-4 py-2 rounded-lg text-white hover:opacity-80 shadow-md shadow-teal-400' >
                                                <FontAwesomeIcon icon={faFolderClosed}  />
                                                <span className='text-xl font-[600] ml-2' >{podcast.categories[0].name}</span>
                                            </a>
                                            <span className='h-fit flex items-center whitespace-nowrap px-4 py-2 text-xl font-[500] text-gray-600 dark:text-gray-100 hover:opacity-80' >
                                                <FontAwesomeIcon icon={faClock} />
                                                <span className='h-fit ml-2 drop-shadow-lg '>
                                                    sound time : {podcast.soundTime}
                                                </span>
                                            </span>
                                        </div>
                                        {/* podcast content */}
                                        <div className='font-["Nunito"] w-full min-h-fit dark:text-gray-50' >
                                            <h2 className='h-fit text-3xl font-[600] mb-6 ' >{podcast.title}</h2>
                                            {/* podcast sound */}
                                            <div className='h-fit w-full flex items-center justify-center md:p-4 mb-4'>
                                                {/* <span style={{ marginLeft : '10px'}} >صوت فعلی :</span> */}
                                                <audio id="player"  controls={true}  className='h-[60px]  w-[700px]  md:w-[500px]'  src={`http://localhost:5000/${podcast.soundpath}`} />   
                                            </div>
                                            {/* podcast statement */}
                                            <p id={podcast._id} className='h-fit whitespace-pre-line leading-7 text-lg font-[500] pb-4 ' style={{wordBreak : 'normal' , wordSpacing : '2px'}} >
                                            </p>
                                            {/* About Podcast */}
                                            <div className='py-4 px-2 border-t border-solid border-gray-400 h-fit' >
                                                {/* podcast times and tags */}
                                                <div className='flex flex-col gap-6 md:flex-row items-center justify-between' >
                                                    {/* created at time  */}
                                                    <TimesAgo date={podcast.createdAt} icon={true} />
                                                    {/* podcast tags */}
                                                    <div className='flex items-center' >
                                                        {
                                                            podcast.tags.map(tag => {
                                                                return <ButtonTag key={`${tag._id}`} tag={tag} />
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                                {/* podcast reactives */}
                                                <div className='flex flex-col gap-6 md:flex-row items-center w-full justify-between mt-10' >
                                                    <div className='flex items-center gap-3 text-sm ' >
                                                        {/* Comments link */}
                                                        <a href={`#comments`} className='flex items-center gap-1 py-1 px-2 rounded-md border border-solid border-gray-100 bg-gray-100 text-gray-500 hover:bg-gray-500 hover:text-white dark:bg-gray-200  dark:border-none cursor-pointer ' > 
                                                            <FontAwesomeIcon icon={faComment} />
                                                            {podcast.commentCount}
                                                        </a >
                                                        {/* Save Button */}
                                                        <button disabled={userstate.isAuthenticated || !buttonSaveLoading ? false : true} className={`flex items-center gap-1 py-1 px-2 rounded-md  border border-solid border-blue-50  hover:bg-opacity-90 hover:text-blue-400 dark:hover:text-white dark:border-none cursor-pointer
                                                                ${ userstate.isAuthenticated ?
                                                                    podcast.savedByThisUser ? 'bg-blue-500 text-white hover:bg-opacity-30 dark:shadow-md dark:shadow-blue-500/50' : 'bg-blue-50 text-blue-200 dark:bg-blue-200 dark:text-blue-400  ' 
                                                                : ''
                                                            }`} onClick={e => saveHandler(e, podcast._id , podcast.savedByThisUser , 'podcast')} >
                                                            {
                                                                buttonSaveLoading ? <ButtonSpinner /> : 
                                                                <>
                                                                    <FontAwesomeIcon icon={ 
                                                                        userstate.isAuthenticated ?
                                                                        podcast.savedByThisUser ? faBookmarkSolid : faBookmark  
                                                                        : faBookmark
                                                                    }  />
                                                                    {podcast.saveCount}
                                                                </>
                                                            }
                                                        </button>
                                                        {/* Like Button */}
                                                        <button id={`likeOf-${podcast._id}`} disabled={userstate.isAuthenticated || !buttonLikeLoading ? false : true} className={`flex items-center gap-1  py-1 px-2 rounded-md  border border-solid border-red-50 hover:bg-opacity-90  hover:text-red-400 dark:hover:text-white dark:border-none cursor-pointer 
                                                            ${ userstate.isAuthenticated ?
                                                                podcast.likedByThisUser ? 'bg-red-500 text-white hover:bg-opacity-30 dark:shadow-md dark:shadow-red-400/50' : 'bg-red-50 text-red-200 dark:bg-red-200 dark:text-red-400 '

                                                                : ''
                                                            } `} onClick={e => likeHandler(e, podcast._id , podcast.likedByThisUser , 'podcast')} >
                                                            {buttonLikeLoading ? <ButtonSpinner /> : 
                                                            <>
                                                                <FontAwesomeIcon icon={ 
                                                                    userstate.isAuthenticated ?
                                                                    podcast.likedByThisUser ? faheartSolid : faHeart  
                                                                    : faHeart
                                                                }  />
                                                                {podcast.likeCount}
                                                            </>}
                                                        </button>
                                                    </div>
                                                    <ShareLinkBtn title={podcast.title} />
                                                </div>
                                            </div>

                                        </div>
    
                                        </>
                                        )
                                    }
                                </div>
                            )
                            }       
                            <CardUserBio followUserHandler={followUserHandler} buttonLoading={buttonLoading} user={podcast.user} authenticatedUser={userstate} sidebar={false} />

                            {/* similarPodcasts */}
                            {
                                similarPodcasts.length === 0 ? '' : 
                                <div className='flex flex-col items-start' >
                                    
                                    <h2 className='text-gray-800 text-3xl whitespace-nowrap pr-8 py-4 font-[600] flex items-center justify-center lg:justify-start gap-2 w-full  rounded-md mt-10 mb-4 dark:text-gray-50' >
                                        <FontAwesomeIcon icon={faRectangleList} />
                                        <span className='ml-2' >Similar Podcasts</span>
                                    </h2>
            
                                    <div className='grid justify-items-center grid-rows-1 grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-x-4 gap-y-4 w-full '  >
                                        {/* cards */}
                                        {   
                                            similarPodcasts.map(podcast => {
                                                return (
                                                // Card
                                                <CardPodcast key={podcast._id}  buttonLoading={buttonSaveLoading || buttonLikeLoading}  podcast={podcast} userstate={userstate} saveHandler={saveHandler} likeHandler={likeHandler} />
                                                )
                                            })
                                        }
                                    </div>

                                </div>
                            }

                            {/* podcast comments */}
                            <Comments userstate={userstate} isPodcast={true} comments={podcast.comments}  commentField={commentField} setCommentField={setCommentField} inputCommentHandler={inputCommentHandler} commentHandler={commentHandler} likeHandler={likeHandler}  />

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

export default Podcast;