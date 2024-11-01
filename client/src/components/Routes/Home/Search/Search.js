import React , { useState , useEffect   } from 'react';
import { useParams } from 'react-router-dom';

// Layouts
import Header from 'src/components/Layouts/Home/General/Header';
import Footer from 'src/components/Layouts/Home/General/Footer';
import GoTopBtn from 'src/components/Layouts/Home/General/GoTopBtn';
import SpinnerOnTop from 'src/components/Layouts/Home/Loadings/SpinnerOnTop';

import CardArticle from 'src/components/Layouts/Home/Cards/CardArticle';
import CardPodcast from 'src/components/Layouts/Home/Cards/CardPodcast';
import CardPost from 'src/components/Layouts/Home/Cards/CardPost';

//import Contexts
import PaginationContext from 'src/Contexts/paginationContext'
import Pagination from 'src/components/Layouts/Home/General/PaginationHome';

//import Api
import NodejsApi from 'src/Api/NodejsApi'; 

// import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faMicrophone  } from '@fortawesome/free-solid-svg-icons';
import { faFileLines } from '@fortawesome/free-regular-svg-icons';


function Search(props) {
    
    const [userstate , setUserState ]  = useState({
        isAuthenticated : false,
        user : {
            _id : '',
            username : '',
            avatar : '',
            likes : []
        }
    })

    const [articles , setArticles] = useState([])
    const [articlesPagination , setArticlesPagination] = useState({
        page : 0 ,
        hasNextPage : false ,
        hasPrevPage : false ,
        nextPage : null ,
        prevPage : null ,
        totalDocs : 0,
        totalPages : 0
    })

    const [podcasts , setPodcasts] = useState([])
    const [podcastsPagination , setPodcastsPagination] = useState({
        page : 0 ,
        hasNextPage : false ,
        hasPrevPage : false ,
        nextPage : null ,
        prevPage : null ,
        totalDocs : 0,
        totalPages : 0
    })

    const [posts , setPosts] = useState([])
    const [postsPagination , setPostsPagination] = useState({
        page : 0 ,
        hasNextPage : false ,
        hasPrevPage : false ,
        nextPage : null ,
        prevPage : null ,
        totalDocs : 0,
        totalPages : 0
    })

    const [counts , setCounts] = useState({
        articlesCount : 0,
        podcastsCount : 0,
        postsCount : 0,
    })


    const [typeQuery , setTypeQuery] = useState({
        type : 'articles'
    })
    

    const [success , setSuccess] = useState({ state : true ,  message : ''})
    const [noContent , setNocontent] = useState({ state : true ,  message : ''})
    const [loading , setLoading] = useState(false)
    const [buttonLoading  , setButtonLoading] = useState(false)

    const {search} = useParams()    


    useEffect(() => {
        setLoading(true)

        NodejsApi.get(`${process.env.REACT_APP_API_URL}/search/${search}`)
        .then(response => {
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
            
            console.log(response.data)
            let data = response.data
            let user = data.user
            let articles = data.articles
            let podcasts = data.podcasts
            let posts = data.posts
            let articlesCount = data.articlesCount
            let podcastsCount = data.podcastsCount
            let postsCount = data.postsCount

            setCounts({
                articlesCount,
                podcastsCount,
                postsCount
            })

            if(articles){
                setArticles(articles.docs)

                setArticlesPagination({
                    page : articles.page ,
                    hasNextPage : articles.hasNextPage ,
                    hasPrevPage : articles.hasPrevPage ,
                    limit : articles.limit ,
                    nextPage : articles.nextPage ,
                    prevPage : articles.prevPage ,
                    totalDocs : articles.totalDocs,
                    totalPages : articles.totalPages
                })
            }

            if(podcasts){

                setPodcasts(podcasts.docs)

                setPodcastsPagination({
                    page : podcasts.page ,
                    hasNextPage : podcasts.hasNextPage ,
                    hasPrevPage : podcasts.hasPrevPage ,
                    limit : podcasts.limit ,
                    nextPage : podcasts.nextPage ,
                    prevPage : podcasts.prevPage ,
                    totalDocs : podcasts.totalDocs,
                    totalPages : podcasts.totalPages
                })
            }

            if(posts){

                setPosts(posts.docs)

                setPostsPagination({
                    page : posts.page ,
                    hasNextPage : posts.hasNextPage ,
                    hasPrevPage : posts.hasPrevPage ,
                    limit : posts.limit ,
                    nextPage : posts.nextPage ,
                    prevPage : posts.prevPage ,
                    totalDocs : posts.totalDocs,
                    totalPages : posts.totalPages
                })

            }

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
            setLoading(false)
            setSuccess({
                state : false,
                message : err.message
            })
        })

    } , [search])

    useEffect(() => {
        setLoading(true)
        
        NodejsApi.get(`${process.env.REACT_APP_API_URL}/search/${search}?type=${typeQuery.type}`)
        .then(response => {
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
            
            console.log(response.data)
            let data = response.data
            let user = data.user
            let articles = data.articles
            let podcasts = data.podcasts
            let posts = data.posts
            let articlesCount = data.articlesCount
            let podcastsCount = data.podcastsCount
            let postsCount = data.postsCount

            setCounts({
                articlesCount,
                podcastsCount,
                postsCount
            })

            if(articles){
                setArticles(articles.docs)

                setArticlesPagination({
                    page : articles.page ,
                    hasNextPage : articles.hasNextPage ,
                    hasPrevPage : articles.hasPrevPage ,
                    limit : articles.limit ,
                    nextPage : articles.nextPage ,
                    prevPage : articles.prevPage ,
                    totalDocs : articles.totalDocs,
                    totalPages : articles.totalPages
                })
            }

            if(podcasts){
                setPodcasts(podcasts.docs)

                setPodcastsPagination({
                    page : podcasts.page ,
                    hasNextPage : podcasts.hasNextPage ,
                    hasPrevPage : podcasts.hasPrevPage ,
                    limit : podcasts.limit ,
                    nextPage : podcasts.nextPage ,
                    prevPage : podcasts.prevPage ,
                    totalDocs : podcasts.totalDocs,
                    totalPages : podcasts.totalPages
                })
            }

            if(posts){
                setPosts(posts.docs)

                setPostsPagination({
                    page : posts.page ,
                    hasNextPage : posts.hasNextPage ,
                    hasPrevPage : posts.hasPrevPage ,
                    limit : posts.limit ,
                    nextPage : posts.nextPage ,
                    prevPage : posts.prevPage ,
                    totalDocs : posts.totalDocs,
                    totalPages : posts.totalPages
                })
            }

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
            setLoading(false)

            setSuccess({
                state : false,
                message : err.message
            })
        })

    } , [typeQuery , search])

    useEffect(()=>{
        try {
            let parser = new DOMParser();

                posts.forEach(post =>{
                    // console.log(post.statement)
                    document.getElementById(post._id).innerHTML = parser.parseFromString( post.statement , 'text/html').body.innerHTML
                })
            
            

        } catch (error) {
            console.log(error)
            setSuccess({
                state : false,
                message : error
            })
        }
    } ,[posts] )

    let paginationHandler = (e) => {
        e.preventDefault();

        NodejsApi.get(`${process.env.REACT_APP_API_URL}/search/${search}?type=${typeQuery.type}`)
        .then(response => {
            if(! response.data.success){
                // setLoading(false)
                if(response.data.code === 204){
                    console.log(response.data.code)
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

            setNocontent({
                state : true,
                message : ''
            })

            setSuccess(prevState => {
                return {
                state : response.data.success ,
                message : ''
                }
            })


            console.log(response.data)
            let data = response.data
            let user = data.user
            let articles = data.articles
            let podcasts = data.podcasts
            let posts = data.posts
            let articlesCount = data.articlesCount
            let podcastsCount = data.podcastsCount
            let postsCount = data.postsCount

            setCounts({
                articlesCount,
                podcastsCount,
                postsCount
            })

            if(articles){
                setArticles(articles.docs)

                setArticlesPagination({
                    page : articles.page ,
                    hasNextPage : articles.hasNextPage ,
                    hasPrevPage : articles.hasPrevPage ,
                    limit : articles.limit ,
                    nextPage : articles.nextPage ,
                    prevPage : articles.prevPage ,
                    totalDocs : articles.totalDocs,
                    totalPages : articles.totalPages
                })
            }

            if(podcasts){
                setPodcasts(podcasts.docs)

                setPodcastsPagination({
                    page : podcasts.page ,
                    hasNextPage : podcasts.hasNextPage ,
                    hasPrevPage : podcasts.hasPrevPage ,
                    limit : podcasts.limit ,
                    nextPage : podcasts.nextPage ,
                    prevPage : podcasts.prevPage ,
                    totalDocs : podcasts.totalDocs,
                    totalPages : podcasts.totalPages
                })
            }

            if(posts){
                setPosts(posts.docs)

                setPostsPagination({
                    page : posts.page ,
                    hasNextPage : posts.hasNextPage ,
                    hasPrevPage : posts.hasPrevPage ,
                    limit : posts.limit ,
                    nextPage : posts.nextPage ,
                    prevPage : posts.prevPage ,
                    totalDocs : posts.totalDocs,
                    totalPages : posts.totalPages
                })
            }

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

        

    }

    let likeHandler = (e , id , liked , kind , single = 'searchPage' , moreData = search ) =>{
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

    let saveHandler = (e , id , saved , kind , single = 'searchPage' , moreData = search ) =>{
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
            NodejsApi.post('/save' , data)
            .then(response =>{
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
                setButtonLoading(false)
                setSuccess({
                    state : false,
                    message : err.message
                })
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

    console.log(posts)

    return (
        <div className='flex flex-col w-full h-screen'  >
        {
            success.state ? (
                <div className='flex flex-col w-full h-fit bg-gradient-to-br from-30% from-slate-100 to-70% to-slate-300 dark:bg-gradient-to-t dark:from-10% dark:from-slate-600 dark:to-90% dark:to-slate-800 dark:text-gray-50'>
                    {
                        loading ? 
                        <SpinnerOnTop />
                        : ''
                    }
                    <Header user={userstate} />
                    {/* Main Content */}
                    <main className='flex flex-col  w-full md:w-[90%] lg:w-full xl:w-[90%] md:self-center px-2 py-4 lg:p-8 h-fit min-h-screen gap-10 font-["Nunito"] ' >

                        {/* searched content */}
                        <div className='flex items-center gap-3 dark:text-slate-50 text-gray-600 ' >
                            <span className='font-[500] text-lg' >The Search results for :</span>
                            <span className='font-[800] text-xl' >{search}</span>
                        </div>


                        {/* kind of media */}
                        <div className='flex flex-col lg:flex-row items-center lg:justify-between lg:h-20 xl:h-20 w-full gap-6 whitespace-nowrap' >
                            {/* type of media select buttons */}
                            <div className='flex lg:self-start items-center justify-center w-full md:w-fit h-fit lg:h-full rounded-md bg-white border border-solid border-gray-300 p-2 xl:p-4 mb-10 dark:bg-slate-700/80 ' >
                                <div className='flex items-center justify-center h-fit gap-2 lg:gap-4  xl:gap-6 text-xs md:text-lg font-semibold '  >
                                    <button onClick={e => typeMediaHandler(e , 'articles')} className={`${ typeQuery.type === 'articles' ? "bg-cyan-700  shadow-sm shadow-cyan-600/70 text-slate-50" : 'bg-white'  } text-gray-600 hover:bg-opacity-90 flex items-center gap-2 px-4 py-2 border border-solid border-gray-300 rounded-md ring-1 focus:ring-cyan-400 focus:text-white`} >
                                        <FontAwesomeIcon icon={faFileLines} />
                                        <span>
                                            Articles
                                        </span>
                                        <span>{counts.articlesCount}</span>
                                    </button>
                                    <button onClick={e => typeMediaHandler(e , 'podcasts')} className={`${ typeQuery.type === 'podcasts' ? "bg-cyan-700  shadow-sm shadow-cyan-600/70 text-slate-50" : 'bg-white'  } text-gray-600   hover:bg-opacity-90  flex items-center gap-2 px-4 py-2 border border-solid border-gray-300 rounded-md ring-1 focus:ring-cyan-400 focus:text-white`}>
                                        <FontAwesomeIcon icon={faMicrophone} />
                                        <span>
                                            Podcasts
                                        </span>
                                        <span>{counts.podcastsCount}</span>
                                    </button>   
                                    <button onClick={e => typeMediaHandler(e , 'posts')} className={`${ typeQuery.type === 'posts' ? "bg-cyan-700 shadow-sm shadow-cyan-600/70 text-slate-50" : 'bg-white'  } text-gray-600   hover:bg-opacity-90  flex items-center gap-2 px-4 py-2 border border-solid border-gray-300 rounded-md ring-1 focus:ring-cyan-400 focus:text-white`} >
                                        <FontAwesomeIcon icon={faFileLines} />
                                        <span>
                                            Posts
                                        </span>
                                        <span>{counts.postsCount}</span>
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
                                        <span className='text-2xl font-[600] text-gray-900 dark:text-gray-50' >Articles</span>
                                </h2>
                                {
                                ! noContent.state ? 
                                <span className='' >{noContent.message}</span>
                                : ( 
                                <>
                                    <div className='grid justify-items-center grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-y-9 gap-x-6 w-full mb-8 '  >
                                        {
                                            articles.map(article => {
                                                return (
                                                <CardArticle key={article._id} buttonLoading={buttonLoading} article={article} userstate={userstate} saveHandler={saveHandler} likeHandler={likeHandler} />
                                                )
                                            })
                                        }
                                    </div>
                                    {/* post pagination */}
                                    {                                                     
                                        ! (articlesPagination.totalPages === 1) ?
                                        (
                                            <PaginationContext.Provider value={{ pagination : articlesPagination  , paginationHandler }}>
                                                <Pagination  />
                                            </PaginationContext.Provider>
                                        )
                                        : ''
                                    }
                                </>
                                )}
                                </>
                            )
                            : ''
                        }

                        {
                            typeQuery.type === 'podcasts' && !loading ? 
                            (
                                <>
                                {/* all Podcasts */}
                                <h2 className=' h-fit flex items-center self-start my-10  gap-2' >
                                        <span className='text-2xl font-[600] text-gray-900 dark:text-gray-50' >Podcasts</span>
                                </h2>
                                {
                                ! noContent.state ? 
                                <span className='' >{noContent.message}</span>
                                : ( 
                                    <>
                                        <div className='grid justify-items-center grid-cols-1 lg:grid-cols-2 xl:grid-cols-2  grid-rows-1 gap-y-9 gap-x-6 w-full mb-8 '  >
                                        {
                                            podcasts.map(podcast => {
                                                return (
                                                    <CardPodcast key={podcast._id} buttonLoading={buttonLoading} podcast={podcast} userstate={userstate} saveHandler={saveHandler} likeHandler={likeHandler} page={'singleTagPage'}  moreData={search} />
                                                )
                                            })
                                        }
                                        </div>
                                        {/* podcast pagination */}
                                        {                                                     
                                        ! (podcastsPagination.totalPages === 1) ?
                                        (
                                            <PaginationContext.Provider value={{ pagination : podcastsPagination  , paginationHandler }}>
                                                <Pagination  />
                                            </PaginationContext.Provider>
                                        )
                                        : ''
                                        }
                                    </>
                                )}
                                </>
                            )
                            : ''
                        }
                        
                        {
                            typeQuery.type === 'posts' && !loading  ? 
                            (
                                <>
                                    {/* all Posts */}
                                    <h2 className=' h-fit flex items-center lg:self-start my-10  gap-2' >
                                        <span className='text-2xl font-[600] text-gray-900 dark:text-gray-50' >Posts</span>
                                    </h2>
                                    {
                                    ! noContent.state ? 
                                    <span className='' >{noContent.message}</span>
                                    : ( 
                                        <>
                                        <div className='grid justify-items-center grid-cols-1 grid-rows-1 gap-y-9 gap-x-6 w-full mb-8'  >
                                            {
                                                posts.map(post => {
                                                    return (
                                                        <CardPost key={post._id} buttonLoading={buttonLoading}  isSinglePage={false} post={post} userstate={userstate} saveHandler={saveHandler}  />
                                                    )
                                                })
                                            }
                                        </div>
                                        {/* post pagination */}
                                        {
                                                                                
                                            ! (postsPagination.totalPages === 1) ?
                                            (
                                                <PaginationContext.Provider value={{ pagination : postsPagination  , paginationHandler }}>
                                                    <Pagination  />
                                                </PaginationContext.Provider>
                                            )
                                            : ''
                                        }
                                        </>
                                    )}
                                </>
                            )
                            : ''
                        }
                        
                    </main>
                    <Footer />
                    <GoTopBtn />
                </div>
            ) : (

                <span className='flex items-center justify-center w-full h-full font-["Vazir"] text-8xl text-gray-500 dark:text-gray-50 ' >
                    { success.message }
                    <FontAwesomeIcon icon={faExclamationCircle} />    
                </span>
                
            )
        }
        </div>
    )
}

export default Search;