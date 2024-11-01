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
// import PaginationContext from 'src/Contexts/paginationContext'
// import Pagination from 'src/components/Layouts/Home/PaginationHome';

//import Api
import NodejsApi from 'src/Api/NodejsApi'; 

// import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faBook, faExclamationCircle, faMicrophone , faPodcast, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { faFileLines } from '@fortawesome/free-regular-svg-icons';


function Tag(props) {
    
    const [userstate , setUserState ]  = useState({
        isAuthenticated : false,
        user : {
            _id : '',
            username : '',
            avatar : '',
            likes : []
        }
    })
    const [tag , setTag] = useState({
        title : '',
        followedByThisUser : false,
        articles : [],
        podcasts : [],
        posts : []
    })    

    const [queries , setQuery] = useState({
        type : 'articles' ,
        likeCount : 'desc',
        saveCount : 'desc',
        viewCount : 'desc',
        commentCount : 'desc',
        answerCount : 'desc',
        date : 'desc',
        createdAt : ''
    })

    const [typeQuery , setTypeQuery] = useState({
        type : 'articles'
    })

    // const [ pagination , setPagination ] = useState({
    //     page : 0 ,
    //     hasNextPage : false ,
    //     hasPrevPage : false ,
    //     nextPage : null ,
    //     prevPage : null ,
    //     totalDocs : 0,
    //     totalPages : 0
    // })
    

    const [success , setSuccess] = useState({ state : true ,  message : ''})
    const [noContent , setNocontent] = useState({ state : true ,  message : ''})
    const [loading , setLoading] = useState(false)
    const [buttonLoading  , setButtonLoading] = useState(false)

    const {slug} = useParams()    


    useEffect(() => {
        setLoading(true)

        NodejsApi.get(`${process.env.REACT_APP_API_URL}/tag/${slug}`)
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
            let tag = data.tag



            setTag(tag)

            // setPagination({
            //     page : data.tag.page ,
            //     hasNextPage : data.tag.hasNextPage ,
            //     hasPrevPage : data.tag.hasPrevPage ,
            //     limit : data.tag.limit ,
            //     nextPage : data.tag.nextPage ,
            //     prevPage : data.tag.prevPage ,
            //     totalDocs : data.tag.totalDocs,
            //     totalPages : data.tag.totalPages
            // })

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

    } , [slug])

    useEffect(() => {
        setLoading(true)
        
        NodejsApi.get(`${process.env.REACT_APP_API_URL}/tag/${slug}?type=${typeQuery.type}`)
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
            let tag = data.tag


            setTag(tag)

            // setPagination({
            //     page : data.tag.page ,
            //     hasNextPage : data.tag.hasNextPage ,
            //     hasPrevPage : data.tag.hasPrevPage ,
            //     limit : data.tag.limit ,
            //     nextPage : data.tag.nextPage ,
            //     prevPage : data.tag.prevPage ,
            //     totalDocs : data.tag.totalDocs,
            //     totalPages : data.tag.totalPages
            // })

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

    } , [typeQuery , slug])


    let paginationHandler = (e) => {
        e.preventDefault();
        let name = e.target.name
        let value = e.target.value

        NodejsApi.get(`${process.env.REACT_APP_API_URL}/tag/${slug}?${name}=${value}&type=${typeQuery.type}`)
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


            let data = response.data
            let tag = data.tag

            console.log(data)
            if(tag.articles){
                setTag(prevState => {
                    return {
                        ...prevState,
                        articles : tag.articles
                    }
                });
            } else if(tag.podcasts){
                setTag(prevState => {
                    return {
                        ...prevState,
                        podcasts : tag.podcasts
                    }
                });
            } else if(tag.posts){
                setTag(prevState => {
                    return {
                        ...prevState,
                        posts : tag.posts
                    }
                });
            }

            // setPagination({
            //     page : data.tag.page ,
            //     hasNextPage : data.tag.hasNextPage ,
            //     hasPrevPage : data.tag.hasPrevPage ,
            //     limit : data.tag.limit ,
            //     nextPage : data.tag.nextPage ,
            //     prevPage : data.tag.prevPage ,
            //     totalDocs : data.tag.totalDocs,
            //     totalPages : data.tag.totalPages
            // })

        } )
        .catch(err => {
            console.log(err)
            setSuccess({
                state : false,
                message : err.message
            })
        })

        

    }

    let sortHandler = (e) => {
        e.preventDefault();
        let name = e.target.name
        setLoading(true)

        if(queries[name] === 'asc'){
            
            setQuery(prevState => {
                return {
                    ...prevState,
                    [name] : 'desc'
                }
            })


        } else if(queries[name] === 'desc'){
            setQuery(prevState => {
                return {
                    ...prevState,
                    [name] : 'asc'
                }
            })
        }

        NodejsApi.get(`${process.env.REACT_APP_API_URL}/tag/${slug}?${name}=${queries[name]}&type=${typeQuery.type}`)
        .then(response => {
            if(! response.data.success){
                // setLoading(false)
                return  setSuccess(prevState => {
                   return {
                    state : response.data.success ,
                    message : response.data.data
                    }
                })
              
            }

            setSuccess(prevState => {
                return {
                state : response.data.success ,
                message : ''
                }
            })


            let data = response.data
            let tag = data.tag

            console.log(data)
            if(tag.articles){
                setTag(prevState => {
                    return {
                        ...prevState,
                        articles : tag.articles
                    }
                });
            } else if(tag.podcasts){
                setTag(prevState => {
                    return {
                        ...prevState,
                        podcasts : tag.podcasts
                    }
                });
            } else if(tag.posts){
                setTag(prevState => {
                    return {
                        ...prevState,
                        posts : tag.posts
                    }
                });
            }

            setLoading(false)
            document.getElementById('sortDropdown').classList.replace('flex' , 'hidden')
            

        } )
        .catch(err => {
            console.log(err)
            setSuccess({
                state : false,
                message : err.message
            })
            setLoading(false)
        })

    }

    let followTagHandler = (e , id , followed) =>{
        e.preventDefault()

        setButtonLoading(true)

        let data ={
            id,
        }
        if(followed){
            console.log('unfollow')
            NodejsApi.put(`/tags/unfollow/${id}` , data)
            .then(response =>{
                console.log(response.data)
                if(response.data.success){

                    let data = response.data
                    let tag = data.tag
                    console.log(tag)

                    
                    if(tag){
                        setTag(prevState => {
                            return {
                                ...prevState,
                                followedByThisUser : false

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
            NodejsApi.put(`/tags/follow/${id}` , data)
            .then(response =>{
                console.log(response.data)
                if(response.data.success){
                    let data = response.data  
                    let tag = data.tag
                    console.log(tag)
                    
                    if(tag){
                        console.log('defined tag')
                        setTag(prevState => {
                            return {
                                ...prevState,
                                followedByThisUser : true

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

    let likeHandler = (e , id , liked , kind , single = 'singleTagPage' , moreData = slug ) =>{
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

                        if(tag.articles.some(article => article._id === dislikedArticle._id)){

                            let index = tag.articles.findIndex(element => element._id === dislikedArticle._id)

                            tag.articles[index].likedByThisUser = false
                            tag.articles[index].likeCount = dislikedArticle.likeCount -1

                            setTag(prevState => {
                                return {
                                    ...prevState,
                                    articles : tag.articles
                                }
                            })
                        }

                    }

                    let dislikedPodcast = data.podcast

                    if(dislikedPodcast !== undefined){

                        if(tag.podcasts.some(podcast => podcast._id === dislikedPodcast._id)){

                            let index = tag.podcasts.findIndex(element => element._id === dislikedPodcast._id)

                            tag.podcasts[index].likedByThisUser = false
                            tag.podcasts[index].likeCount = dislikedPodcast.likeCount -1

                            setTag(prevState => {
                                return {
                                    ...prevState,
                                    podcasts : tag.podcasts
                                }
                            })
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
                if(response.data.success){


                    let data = response.data
                    let likedArticle = data.article

                    if(likedArticle !== undefined){

                        if(tag.articles.some(article => article._id === likedArticle._id)){

                            let index = tag.articles.findIndex(element => element._id === likedArticle._id)

                            tag.articles[index].likedByThisUser = true
                            tag.articles[index].likeCount = likedArticle.likeCount +1

                            setTag(prevState => {
                                return {
                                    ...prevState,
                                    articles : tag.articles
                                }
                            })
                        }

                    }

                    let likedPodcast = data.podcast

                    if(likedPodcast !== undefined){

                        if(tag.podcasts.some(podcast => podcast._id === likedPodcast._id)){

                            let index = tag.podcasts.findIndex(element => element._id === likedPodcast._id)

                            tag.podcasts[index].likedByThisUser = true
                            tag.podcasts[index].likeCount = likedPodcast.likeCount +1

                            setTag(prevState => {
                                return {
                                    ...prevState,
                                    podcasts : tag.podcasts
                                }
                            })
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

    let saveHandler = (e , id , saved , kind , single = 'singleTagPage' , moreData = slug ) =>{
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

                        if(tag.articles.some(article => article._id === unsavedArticle._id)){

                            let index = tag.articles.findIndex(element => element._id === unsavedArticle._id)

                            tag.articles[index].savedByThisUser = false
                            tag.articles[index].saveCount = unsavedArticle.saveCount -1

                            setTag(prevState => {
                                return {
                                    ...prevState,
                                    articles : tag.articles
                                }
                            })
                        }

                    }

                    let unsavedPodcast = data.podcast

                    if(unsavedPodcast !== undefined){

                        if(tag.podcasts.some(podcast => podcast._id === unsavedPodcast._id)){

                            let index = tag.podcasts.findIndex(element => element._id === unsavedPodcast._id)

                            tag.podcasts[index].savedByThisUser = false
                            tag.podcasts[index].saveCount = unsavedPodcast.saveCount -1

                            setTag(prevState => {
                                return {
                                    ...prevState,
                                    podcasts : tag.podcasts
                                }
                            })
                        }

                    }

                    let unsavedPost = data.post

                    if(unsavedPost !== undefined){

                        if(tag.posts.some(post => post._id === unsavedPost._id)){

                            let index = tag.posts.findIndex(element => element._id === unsavedPost._id)

                            tag.posts[index].savedByThisUser = false
                            tag.posts[index].saveCount = unsavedPost.saveCount -1

                            setTag(prevState => {
                                return {
                                    ...prevState,
                                    posts : tag.posts
                                }
                            })
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

                        if(tag.articles.some(article => article._id === savedArticle._id)){

                            let index = tag.articles.findIndex(element => element._id === savedArticle._id)

                            tag.articles[index].savedByThisUser = true
                            tag.articles[index].saveCount = savedArticle.saveCount +1

                            setTag(prevState => {
                                return {
                                    ...prevState,
                                    articles : tag.articles
                                }
                            })
                        }

                    }

                    let savedPodcast = data.podcast

                    if(savedPodcast !== undefined){

                        if(tag.podcasts.some(podcast => podcast._id === savedPodcast._id)){

                            let index = tag.podcasts.findIndex(element => element._id === savedPodcast._id)

                            tag.podcasts[index].savedByThisUser = true
                            tag.podcasts[index].saveCount = savedPodcast.saveCount +1

                            setTag(prevState => {
                                return {
                                    ...prevState,
                                    podcasts : tag.podcasts
                                }
                            })
                        }

                    }

                    let savedPost = data.post

                    if(savedPost !== undefined){

                        if(tag.posts.some(post => post._id === savedPost._id)){

                            let index = tag.posts.findIndex(element => element._id === savedPost._id)

                            tag.posts[index].savedByThisUser = true
                            tag.posts[index].saveCount = savedPost.saveCount +1

                            setTag(prevState => {
                                return {
                                    ...prevState,
                                    posts : tag.posts
                                }
                            })
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
                    
                        {/* tag info row */}
                        <div className='flex flex-col lg:flex-row items-center gap-4 [&>div]:bg-white [&>div]:dark:bg-slate-700/80 w-full lg:h-28' >
                            {/* tag card */}
                            <div  className='flex items-center justify-between h-full w-full md:w-80 kg:w-96  min-w-fit p-4   border border-solid border-gray-300 rounded-md shadow-md' >
                                {/* tag title  */}
                                <span key={tag._id} className='text-blue-600 text-lg font-[700] hover:text-blue-900 h-fit py-4' >
                                    <span className='mr-2' >#</span>
                                    {tag.name}
                                </span>
                                {/* tag follow button */}
                                <button className='text-white text-lg font-[600] hover:text-blue-600 bg-blue-600 hover:bg-white focus:opacity-60 px-4 py-2 border border-solid border-blue-600 rounded-md' >
                                    {
                                        tag.followedByThisUser ?
                                        <span onClick={e => followTagHandler(e , tag._id , tag.followedByThisUser)} >unfollow</span>
                                        : <span onClick={e => followTagHandler(e , tag._id , tag.followedByThisUser)} >follow</span>
                                    }
                                </button>
                            </div>
                            {/* tag medias count */}
                            <div  className='flex items-center gap-6 h-full w-full md:w-80  min-w-fit p-4   border border-solid border-gray-300 rounded-md shadow-md dark:text-gray-50' >
                                <span className='text-blue-600 text-4xl font-[700] hover:text-blue-900 dark:hover:text-blue-500 h-fit py-4 drop-shadow-md' >
                                    <FontAwesomeIcon icon={faBook} />
                                </span>
                                <div className='flex flex-col h-fit  ' >
                                    <span className='h-fit text-lg font-[700]'>
                                        {
                                            tag.articlesCount
                                        }
                                        <span className='ml-2'>Article</span>
                                    </span>
                                    <span className="h-fit mt-4 text-base text-gray-600 dark:text-gray-200 " >
                                        Has been published
                                    </span>
                                </div>
                                
                            </div>
                            <div  className='flex items-center gap-6 h-full w-full md:w-80  min-w-fit p-4   border border-solid border-gray-300 rounded-md shadow-md dark:text-gray-50' >
                                <span className='text-blue-600 text-4xl font-[700] hover:text-blue-900 dark:hover:text-blue-500 h-full py-4 drop-shadow-md' >
                                    <FontAwesomeIcon icon={faPodcast} />
                                </span>
                                <div className='flex flex-col h-fit ' >
                                    <span className='h-fit text-lg font-[700] space-x-2' >
                                        {   
                                            tag.podcastsCount                                            
                                        }
                                        <span className='ml-2'>Podcast</span>
                                    </span>
                                    <span className='h-fit mt-4 text-base text-gray-600 dark:text-gray-200' >
                                        Has been published
                                    </span>
                                </div>
                                
                            </div>
                            <div  className='flex items-center gap-6 h-full w-full md:w-80  min-w-fit p-4   border border-solid border-gray-300 rounded-md shadow-md dark:text-gray-50' >
                                <span className='text-blue-600 text-4xl font-[700] hover:text-blue-900 dark:hover:text-blue-500 h-full py-4 drop-shadow-md' >
                                    <FontAwesomeIcon icon={faQuestionCircle} />
                                </span>
                                <div className='flex flex-col h-fit' >
                                    <span className='h-fit text-lg font-[700] space-x-2' >
                                        {
                                            tag.postsCount
                                        }
                                        <span className='ml-2' >Post</span>
                                    </span>
                                    <span className='h-fit mt-4 text-base text-gray-600 dark:text-gray-200' >
                                        Has been published
                                    </span>
                                </div>
                                
                            </div>
                        </div>

                        {/* tag all medias */}
                        <div className='flex flex-col lg:flex-row items-center lg:justify-between lg:h-20 xl:h-20 w-full gap-6 whitespace-nowrap' >

                            <div className='flex flex-col  lg:flex-row items-center gap-6 w-full h-full' >
                                {/* sort */}
                                <div className='flex flex-col relative items-center h-full w-full md:w-80 lg:w-48 xl:w-64 gap-4 z-20    dark:text-gray-50'>
                                    <button type='button' id='dropBtn'  className='text-lg text-gray-600 dark:text-gray-50 bg-white dark:bg-slate-700/80 font-semibold h-fit py-6 w-full flex items-center justify-center gap-2 text-center cursor-pointer rounded-md border border-solid border-gray-300' 
                                        // onBlur={e => document.getElementById('sortDropdown').classList.replace('flex' , 'hidden')}
                                        // onMouseEnter={e => document.getElementById('sortDropdown').classList.replace('hidden' , 'flex')}  
                                        onClick={e => document.getElementById('sortDropdown').classList.contains('hidden') ? 
                                            document.getElementById('sortDropdown').classList.replace('hidden' , 'flex')
                                            : 
                                            document.getElementById('sortDropdown').classList.replace('flex' , 'hidden')
                                        }>

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" dataslot="icon" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
                                        </svg>
                                        <span className='h-fit ' >Sort by</span>  
                                        <FontAwesomeIcon icon={faAngleDown} />

                                    </button>

                                    <div id='sortDropdown' 
                                    onMouseLeave={e => document.getElementById('sortDropdown').classList.replace('flex' , 'hidden')}
                                    className='hidden absolute top-24 flex-col text-gray-700 dark:bg-slate-700/80 dark:text-gray-50  transition-all w-full h-fit p-4 font-semibold divide-y-2 divide-gray-300 bg-white rounded-md border border-solid border-gray-300 shadow-md' >
                                        
                                        <button name='likeCount' value={queries.likeCount} onClick={sortHandler} className='cursor-pointer hover:opacity-80 hover:bg-teal-400 hover:text-white focus:bg-teal-100 focus:text-white focus:ring-2 focus:ring-teal-900 px-4 py-3' >likes</button >
                                        <button name='saveCount' value={queries.saveCount} onClick={sortHandler} className='cursor-pointer hover:opacity-80 hover:bg-teal-400 hover:text-white focus:bg-teal-100 focus:text-white focus:ring-2 focus:ring-teal-900 px-4 py-3' >saves</button>
                                        <button name='viewCount' value={queries.viewCount} onClick={sortHandler} className='cursor-pointer hover:opacity-80 hover:bg-teal-400 hover:text-white focus:bg-teal-100 focus:text-white focus:ring-2 focus:ring-teal-900 px-4 py-3' >viewes</button>
                                        <button name='commentCount' value={queries.commentCount} onClick={sortHandler} className='cursor-pointer hover:opacity-80 hover:bg-teal-400 hover:text-white focus:bg-teal-100 focus:text-white focus:ring-2 focus:ring-teal-900 px-4 py-3' >comments</button>
                                        <button name='answerCount' value={queries.answerCount} onClick={sortHandler} className='cursor-pointer hover:opacity-80 hover:bg-teal-400 hover:text-white focus:bg-teal-100 focus:text-white focus:ring-2 focus:ring-teal-900 px-4 py-3' >answers</button>
                                        <button name='date' value={queries.date} onClick={sortHandler} className='cursor-pointer hover:opacity-80 hover:bg-teal-400 hover:text-white focus:bg-teal-100 focus:text-white focus:ring-2 focus:ring-teal-900 px-4 py-3' >date</button>
                                
                                    </div>
                                </div> 
                                {/* filter */}
                                <div className='text-gray-600 flex lg:self-start items-center whitespace-nowrap justify-center w-full md:w-80 bg-white  lg:w-fit h-fit lg:h-full rounded-md border border-solid border-gray-300  p-4 mb-10 dark:bg-slate-700/80 dark:text-gray-50' >
                                    <div className='flex items-center justify-center h-fit gap-8 text-base xl:text-lg font-semibold '  >
                                        <label className='h-fit flex items-center gap-2' >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" dataslot="icon" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
                                            </svg>
                                            <span>
                                                Filter By Time  : 
                                            </span>
                                            <select className='select dark:text-gray-600 outline-none rounded-sm' name='createdAt' onChange={paginationHandler}>
                                                <option value='' >always</option>
                                                <option value='1weekAgo'>1 week ago</option>
                                                <option value='1monthAgo'>1 month ago</option>
                                                <option value='1yearAgo'>1 year ago</option>
                                            </select>
                                        </label>               
                                    </div>
                                </div>
                            </div>

                            {/* type of media select buttons */}
                            <div className='flex lg:self-start items-center justify-center w-full md:w-fit h-fit lg:h-full rounded-md bg-white border border-solid border-gray-300 p-2 xl:p-4 mb-10 dark:bg-slate-700/80 ' >
                                <div className='flex items-center justify-center h-fit gap-2 lg:gap-4  xl:gap-6 text-xs md:text-lg font-semibold '  >
                                    <button onClick={e => typeMediaHandler(e , 'articles')} className={`${ typeQuery.type === 'articles' ? "bg-cyan-700  shadow-sm shadow-cyan-600/70 text-slate-50" : 'bg-white'  } text-gray-600 hover:bg-opacity-90 flex items-center gap-2 px-4 py-2 border border-solid border-gray-300 rounded-md ring-1 focus:ring-cyan-400 focus:text-white`} >
                                        <FontAwesomeIcon icon={faFileLines} />
                                        <span>
                                            Articles
                                        </span>
                                    </button>
                                    <button onClick={e => typeMediaHandler(e , 'podcasts')} className={`${ typeQuery.type === 'podcasts' ? "bg-cyan-700  shadow-sm shadow-cyan-600/70 text-slate-50" : 'bg-white'  } text-gray-600   hover:bg-opacity-90  flex items-center gap-2 px-4 py-2 border border-solid border-gray-300 rounded-md ring-1 focus:ring-cyan-400 focus:text-white`}>
                                        <FontAwesomeIcon icon={faMicrophone} />
                                        <span>
                                            Podcasts
                                        </span>
                                    </button>   
                                    <button onClick={e => typeMediaHandler(e , 'posts')} className={`${ typeQuery.type === 'posts' ? "bg-cyan-700 shadow-sm shadow-cyan-600/70 text-slate-50" : 'bg-white'  } text-gray-600   hover:bg-opacity-90  flex items-center gap-2 px-4 py-2 border border-solid border-gray-300 rounded-md ring-1 focus:ring-cyan-400 focus:text-white`} >
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
                            !(tag.articles === undefined) ? 
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
                                <div className='grid justify-items-center grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-y-9 gap-x-6 w-full mb-8 '  >
                                    {
                                        tag.articles.map(article => {
                                            return (
                                            <CardArticle key={article._id} buttonLoading={buttonLoading} article={article} userstate={userstate} saveHandler={saveHandler} likeHandler={likeHandler} />
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
                            !(tag.podcasts === undefined) ? 
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
                                <div className='grid justify-items-center grid-cols-1 lg:grid-cols-1 xl:grid-cols-2  grid-rows-1 gap-y-9 gap-x-6 w-full mb-8 '  >
                                {
                                    tag.podcasts.map(podcast => {
                                        return (
                                            <CardPodcast key={podcast._id} buttonLoading={buttonLoading} podcast={podcast} userstate={userstate} saveHandler={saveHandler} likeHandler={likeHandler} page={'singleTagPage'}  moreData={slug} />
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
                            !(tag.posts === undefined)  ? 
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
                                    <div className='grid justify-items-center grid-cols-1 grid-rows-1 gap-y-9 gap-x-6 w-full mb-8'  >
                                        {
                                            tag.posts.map(post => {
                                                return (
                                                    <CardPost key={post._id}  buttonLoading={buttonLoading}  isSinglePage={false} post={post} userstate={userstate} saveHandler={saveHandler}  />
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

export default Tag;