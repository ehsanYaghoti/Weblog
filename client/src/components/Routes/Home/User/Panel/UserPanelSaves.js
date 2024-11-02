import React , { useState , useEffect   } from 'react';

// Layouts
import UserPanelHeader from 'src/components/Layouts/Home/User/UserPanelHeader';
import GoTopBtn from 'src/components/Layouts/Home/General/GoTopBtn';
import SpinnerOnTop from 'src/components/Layouts/Home/Loadings/SpinnerOnTop';

import CardArticle from 'src/components/Layouts/Home/Cards/CardArticle';
import CardPodcast from 'src/components/Layouts/Home/Cards/CardPodcast';
import CardPost from 'src/components/Layouts/Home/Cards/CardPost';

//import Contexts
// import PaginationContext from 'src/Contexts/paginationContext'
// import Pagination from 'src/components/Layouts/Home/PaginationHome';

//import Api
import NodejsApi from 'src/Api/NodejsApi'; 

// import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faExclamationCircle, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { faFileLines } from '@fortawesome/free-regular-svg-icons';
import UserPanelNavbar from 'src/components/Layouts/Home/User/UserPanelNavbar';
import isAuthenticatedPanel from 'src/Logics/isAuthenticatedPanel';


function UserPanelSaves(props) {

    const [userstate , setUserState ]  = useState({
        isAuthenticated : false,
        user : {
            _id : '',
            username : '',
            avatar : '',
            likes : [],
            roles : [],
        }
    })

    // const [saves , setSaves] = useState({
    //     articles : [],
    //     podcasts : [],
    //     posts : [],
    // })

    const [articles , setArticles] = useState([])
    const [podcasts , setPodcasts] = useState([])
    const [posts , setPosts] = useState([])

    const [typeQuery , setTypeQuery] = useState({
        type : 'articles'
    })    

    const [success , setSuccess] = useState({ state : true ,  message : ''})
    const [noContent , setNocontent] = useState({ state : true ,  message : ''})
    const [loading , setLoading] = useState(false)
    const [buttonLoading  , setButtonLoading] = useState(false)



    useEffect(() => {
        setLoading(true)
        NodejsApi.get(`${process.env.REACT_APP_API_URL}/user/panel`)
        .then(response => {
            if(! response.data.success){
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

            setUserState({
                isAuthenticated : data.isAuthenticated ,
                user : {
                    ...user
                }
            });
            
            let number = 0
            if(data.user.saves.length !== 0){
                // setSaves(user.saves)
                data.user.saves.map(save => {
                    number+=1
                    if(save.article !== null){
                        return setArticles(prevState => {
                            return [
                                ...prevState,
                                save.article
                            ]
                        })
                    } else if(save.podcast !== null){
                        return setPodcasts(prevState => {
                            return [
                                ...prevState,
                                save.podcast
                            ]
                        })
                    } else if(save.post !== null){
                        return setPosts(prevState => {
                            return [
                                ...prevState,
                                save.post
                            ]
                        })
                    }
                    return data.user.saves
                });
            }

            
            console.log(number)

            setLoading(false)



        } )
        .catch(err => {
            console.log(err)
            setSuccess({
                state : false,
                message : err.message
            })
            setLoading(false)
        })

    } , [])

    let likeHandler = (e , id , liked , kind , single = 'userPanelSaves' , moreData = userstate.user._id ) =>{
        e.preventDefault()
        setButtonLoading(true)

        let data ={
            id,
            kind , 
            single,
            moreData
        }
        if(liked){
            console.log('dislike')
            // NodejsApi.post('/dislike' , article)
            NodejsApi.delete(`/like/${id}/${kind}/${single}/${moreData}`)
            .then(response =>{
                console.log(response.data)
                if(response.data.success){

                    let data = response.data
                    let dislikedArticle = data.article

                    if(dislikedArticle !== undefined){

                        if(articles.some(article => article._id === dislikedArticle._id)){

                            let index = articles.findIndex(element => element._id === dislikedArticle._id)

                            articles[index].likedByThisUser = false
                            articles[index].likeCount = dislikedArticle.likeCount -1

                            setArticles(articles)
                        }

                    }

                    let dislikedPodcast = data.podcast

                    if(dislikedPodcast !== undefined){

                        if(podcasts.some(podcast => podcast._id === dislikedPodcast._id)){

                            let index = podcasts.findIndex(element => element._id === dislikedPodcast._id)

                            podcasts[index].likedByThisUser = false
                            podcasts[index].likeCount = dislikedPodcast.likeCount -1

                            setPodcasts(podcasts)
                        }

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
                setLoading(false)

            })


        } else if(! liked){
            NodejsApi.post('/like' , data)
            .then(response =>{
                console.log(response.data)
                if(response.data.success){
                    let data = response.data
                    let likedArticle = data.article

                    if(likedArticle !== undefined){
                        if(articles.some(article => article._id === likedArticle._id)){

                            let index = articles.findIndex(element => element._id === likedArticle._id)

                            articles[index].likedByThisUser = true
                            articles[index].likeCount = likedArticle.likeCount +1

                            setArticles(articles)
                        }
                    }

                    let likedPodcast = data.podcast

                    if(likedPodcast !== undefined){

                        if(podcasts.some(podcast => podcast._id === likedPodcast._id)){

                            let index = podcasts.findIndex(element => element._id === likedPodcast._id)

                            podcasts[index].likedByThisUser = true
                            podcasts[index].likeCount = likedPodcast.likeCount +1

                            setPodcasts(podcasts)
                        }

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

    let saveHandler = (e , id , saved , kind , single = 'userPanelSaves' , moreData = userstate.user._id ) =>{
        e.preventDefault()
        setButtonLoading(true)

        let data ={
            id,
            kind , 
            single,
            moreData
        }
        if(saved){
            console.log('unsaving')
            NodejsApi.delete(`/save/${id}/${kind}/${single}/${moreData}`)
            .then(response =>{
                console.log(response.data)
                if(response.data.success){

                    let data = response.data
                    let unsavedArticle = data.article

                    if(unsavedArticle !== undefined){

                        if(articles.some(article => article._id === unsavedArticle._id)){

                            let index = articles.findIndex(element => element._id === unsavedArticle._id)

                            articles[index].savedByThisUser = false
                            articles[index].saveCount = unsavedArticle.saveCount -1

                            setArticles(articles)
                        }

                    }

                    let unsavedPodcast = data.podcast

                    if(unsavedPodcast !== undefined){

                        if(podcasts.some(podcast => podcast._id === unsavedPodcast._id)){

                            let index = podcasts.findIndex(element => element._id === unsavedPodcast._id)

                            podcasts[index].savedByThisUser = false
                            podcasts[index].saveCount = unsavedPodcast.saveCount -1

                            setPodcasts(podcasts)
                        }

                    }

                    let unsavedPost = data.post

                    if(unsavedPost !== undefined){

                        if(posts.some(post => post._id === unsavedPost._id)){

                            let index = posts.findIndex(element => element._id === unsavedPost._id)

                            posts[index].savedByThisUser = false
                            posts[index].saveCount = unsavedPost.saveCount -1

                            setPosts(posts)
                        }

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
        } else if(! saved){
            console.log('saving')
            NodejsApi.post('/save' , data)
            .then(response =>{
                console.log(response.data)

                if(response.data.success){

                    let data = response.data
                    let savedArticle = data.article

                    if(savedArticle !== undefined){

                        if(articles.some(article => article._id === savedArticle._id)){

                            let index = articles.findIndex(element => element._id === savedArticle._id)

                            articles[index].savedByThisUser = true
                            articles[index].saveCount = savedArticle.saveCount +1

                            setArticles(articles)
                        }

                    }

                    let savedPodcast = data.podcast

                    if(savedPodcast !== undefined){

                        if(podcasts.some(podcast => podcast._id === savedPodcast._id)){

                            let index = podcasts.findIndex(element => element._id === savedPodcast._id)

                            podcasts[index].savedByThisUser = true
                            podcasts[index].saveCount = savedPodcast.saveCount +1

                            setPodcasts(podcasts)
                        }

                    }

                    let savedPost = data.post

                    if(savedPost !== undefined){

                        if(posts.some(post => post._id === savedPost._id)){

                            let index = posts.findIndex(element => element._id === savedPost._id)

                            posts[index].savedByThisUser = true
                            posts[index].saveCount = savedPost.saveCount +1

                            setPosts(posts)
                        }

                    }
                    
                    setButtonLoading(false)
                    
                }
            })
            .catch(err => {
                console.log(err)
                setSuccess({
                    state : false,
                    message : err.message
                })
                setButtonLoading(false)
            })
        }

    }

    let typeMediaHandler = (e , type) => {

        e.preventDefault();

        switch (type) {
            case 'podcasts':
                setTypeQuery({
                    type : 'podcasts'
                })
            break;
            case 'posts':
                setTypeQuery({
                    type : 'posts'
                })
            break;
            case 'articles':
                setTypeQuery({
                    type : 'articles'
                })
            break;
            default:
                setTypeQuery({
                    type : 'articles'
                })
            break;
        }
    }

    return (
        <div className='flex flex-col w-full h-screen'  >
        {
            success.state ? (
                <div className='flex flex-col w-full h-fit'>
                    {
                        loading ? 
                        <SpinnerOnTop />
                        : ''
                    }
                    <UserPanelHeader user={userstate} userNavbar={userstate.user} />
                    {/* Main Content */}
                    <main className='flex flex-row items-center w-full h-fit min-h-screen gap-10     pl-0 font-["Nunito"]  bg-gradient-to-br from-30% from-slate-100 to-70% to-slate-300  dark:bg-gradient-to-t dark:from-10% dark:from-slate-600 dark:to-90% dark:to-slate-800 dark:text-gray-50' >
                        <UserPanelNavbar user={userstate.user} />
                        { ! noContent.state ? <span className='' >{noContent.message}</span> :
                        (
                        <div className='w-full px-4 py-8 lg:w-[80%] lg:pl-8 lg:ml-[25%] xl:ml-[20%] lg:mx-4 ' >
                        {/* save all medias */}
                        <div className='flex items-center justify-between h-20 w-full gap-6 whitespace-nowrap' >
                            {/* type of media select buttons */}
                            <div className='flex lg:self-start items-center justify-center w-full md:w-fit h-fit lg:h-full rounded-md border border-solid border-gray-300 p-2 xl:p-4 mb-10 dark:bg-slate-700/80 ' >
                                <div className='flex items-center justify-center h-fit gap-2 md:gap-4 lg:gap-4  xl:gap-6 text-xs md:text-lg font-semibold '  >
                                    <button onClick={e => typeMediaHandler(e , 'articles')} className={`${ typeQuery.type === 'articles' ? "bg-cyan-700  shadow-sm shadow-cyan-600/70 text-slate-50" : 'bg-white'  } text-gray-600  hover:bg-opacity-90 flex items-center gap-2 px-2 lg:px-4 py-2 border border-solid border-gray-300 rounded-md ring-1 focus:ring-cyan-400 focus:text-white`} >
                                        <FontAwesomeIcon icon={faFileLines} />
                                        <span>
                                            Articles
                                        </span>
                                    </button>
                                    <button onClick={e => typeMediaHandler(e , 'podcasts')} className={`${ typeQuery.type === 'podcasts' ? "bg-cyan-700  shadow-sm shadow-cyan-600/70 text-slate-50" : 'bg-white'  } text-gray-600   hover:bg-opacity-90  flex items-center gap-2 px-2 lg:px-4 py-2 border border-solid border-gray-300 rounded-md ring-1 focus:ring-cyan-400 focus:text-white`}>
                                        <FontAwesomeIcon icon={faMicrophone} />
                                        <span>
                                            Podcasts
                                        </span>
                                    </button>   
                                    <button onClick={e => typeMediaHandler(e , 'posts')} className={`${ typeQuery.type === 'posts' ? "bg-cyan-700 shadow-sm shadow-cyan-600/70 text-slate-50" : 'bg-white'  } text-gray-600   hover:bg-opacity-90  flex items-center gap-2 px-2 lg:px-4 py-2 border border-solid border-gray-300 rounded-md ring-1 focus:ring-cyan-400 focus:text-white`} >
                                        <FontAwesomeIcon icon={faFileLines} />
                                        <span>
                                            Posts
                                        </span>
                                    </button>                
                                </div>
                            </div>
                        </div>
                        {/* contents */}
                        {
                            typeQuery.type === 'articles' ? 
                            (
                                <>
                                {/* all Articles */}
                                <h2 className=' h-fit flex items-center self-start my-10  gap-2' >
                                        <span className='text-2xl font-[600] text-gray-900 dark:text-gray-50 ' >Articles</span>
                                </h2>
                                {
                                ! noContent.state ? 
                                <span className='' >{noContent.message}</span>
                                : ( 
                                    <div className='grid justify-items-center grid-cols-1 lg:grid-cols-2 gap-y-9 gap-x-6 py-6 w-full h-fit  pb-10 '  >
                                    {
                                        articles.map(article => {
                                            return (
                                                article.savedByThisUser ?
                                                <CardArticle key={article._id} article={article} buttonLoading={buttonLoading} userstate={userstate} saveHandler={saveHandler} likeHandler={likeHandler} />
                                                : ''
                                            )
                                        })
                                    }
                                </div>
                                )}
                                </>
                            )
                            : ''
                        }

                        {
                            typeQuery.type === 'podcasts' ? 
                            (
                                <>
                                {/* all Podcasts */}
                                <h2 className=' h-fit flex items-center self-start my-10  gap-2' >
                                    <span className='text-2xl font-[600] text-gray-900 dark:text-gray-50 ' >Podcasts</span>
                                </h2>
                                {
                                ! noContent.state ? 
                                <span className='' >{noContent.message}</span>
                                : ( 
                                <div className='grid justify-items-center grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-y-9 gap-x-6 py-6 w-full h-fit  pb-10 '  >
                                {
                                    podcasts.map(podcast => {
                                        return (
                                            podcast.savedByThisUser ?
                                            <CardPodcast key={podcast._id} buttonLoading={buttonLoading} podcast={podcast} userstate={userstate} saveHandler={saveHandler} likeHandler={likeHandler} page={'singleTagPage'} />
                                            : ''
                                        )
                                    })
                                }
                                </div>
                                )}
                                </>
                            )
                            : ''
                        }
                        
                        {
                            typeQuery.type === 'posts'  ? 
                            (
                                <>
                                    {/* all Posts */}
                                    <h2 className=' h-fit flex items-center self-start my-10  gap-2' >
                                        <span className='text-2xl font-[600] text-gray-900 dark:text-gray-50' >All Posts</span>
                                    </h2>
                                    {
                                    ! noContent.state ? 
                                    <span className='' >{noContent.message}</span>
                                    : ( 
                                    <div className='grid justify-items-center grid-cols-1 xl:grid-cols-2  gap-y-9 gap-x-6 py-6 w-full h-fit pb-10'  >
                                    {
                                            posts.map(post => {
                                                return (
                                                    post.savedByThisUser ?
                                                    <CardPost key={post._id} buttonLoading={buttonLoading}  isSinglePage={false} post={post}  userstate={userstate} saveHandler={saveHandler}  />
                                                    : ''
                                                )
                                            })
                                        }
                                    </div>
                                    )}
                                </>
                            )
                            : ''
                        }
                        


                        {/* pagination */}
                        {/* {
                                        
                            ! (pagination.totalPages === 1) ?
                            (
                                <PaginationContext.Provider value={{ pagination  , paginationHandler }}>
                                    <Pagination  />
                                </PaginationContext.Provider>
                            )
                            : ''
                        } */}
                        </div>
                        )}
                    
                    </main>
                    <GoTopBtn />
                </div>
            ) : (

                <span className='flex items-center justify-center w-full h-full font-["Vazir"] text-8xl text-gray-500 ' >
                    { success.message }
                    <FontAwesomeIcon icon={faExclamationCircle} />    
                </span>
                
            )
        }
        </div>
    )
}

export default isAuthenticatedPanel(UserPanelSaves);