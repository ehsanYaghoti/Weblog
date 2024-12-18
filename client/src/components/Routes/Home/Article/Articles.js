import React , { useState , useEffect  } from 'react';
import {  useLocation }  from 'react-router-dom'; 

// Layouts
import Header from 'src/components/Layouts/Home/General/Header';
import Footer from 'src/components/Layouts/Home/General/Footer';
import GoTopBtn from 'src/components/Layouts/Home/General/GoTopBtn';
import SpinnerOnTop from 'src/components/Layouts/Home/Loadings/SpinnerOnTop';


//import Contexts
import PaginationContext from 'src/Contexts/paginationContext'
import Pagination from 'src/components/Layouts/Home/General/PaginationHome';

//import Api
import NodejsApi from 'src/Api/NodejsApi'; 

// import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle , faArchive , faAngleDown } from '@fortawesome/free-solid-svg-icons';
import {  faStar  } from '@fortawesome/free-regular-svg-icons'
import CardArticle from 'src/components/Layouts/Home/Cards/CardArticle';

function Articles(props) {
    
    const [userstate , setUserState ]  = useState({
        isAuthenticated : false,
        user : {
            username : '',
            avatar : '',
            likes : [],
        }
    })
    const [articles , setArticles] = useState([])
    const [weekFavouriteArticles , setWeekFavouriteArticles] = useState([])
    

    const [queries , setQuery] = useState({
        likeCount : 'desc',
        saveCount : 'desc',
        viewCount : 'desc',
        commentCount : 'desc',
        date : 'desc',
        createdAt : '' 
    })

    const [ pagination , setPagination ] = useState({
        page : 0 ,
        hasNextPage : false ,
        hasPrevPage : false ,
        nextPage : null ,
        prevPage : null ,
        totalDocs : 0,
        totalPages : 0
    })

    const [tags , setTags] = useState([])
    const [userTags , setUserTags] = useState([])


    const [success , setSuccess] = useState({ state : true ,  message : ''})
    const [noContent , setNocontent] = useState({ state : true ,  message : ''})
    const [loading , setLoading] = useState(false)
    const [buttonLoading  , setButtonLoading] = useState(false)


    const search = useLocation().search


    useEffect(() => {
        setLoading(true)
        NodejsApi.get(`/articles`)
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
            let articles = data.articles.docs
            let weekFavouriteArticles = data.weekFavouriteArticles
            let tags = data.tags
            let userTags = data.userTags


            setArticles([
                ...articles
            ])

            setWeekFavouriteArticles([
                ...weekFavouriteArticles
            ])

            setPagination({
                page : data.articles.page ,
                hasNextPage : data.articles.hasNextPage ,
                hasPrevPage : data.articles.hasPrevPage ,
                limit : data.articles.limit ,
                nextPage : data.articles.nextPage ,
                prevPage : data.articles.prevPage ,
                totalDocs : data.articles.totalDocs,
                totalPages : data.articles.totalPages
            })

            setTags([
                ...tags
            ])

            setUserTags(userTags)

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
            setLoading(false)

        })

    } , [])

    useEffect(() => {
        const searchParams = new URLSearchParams(search)

        setLoading(true)

        NodejsApi.get(`/articles?category=${searchParams.get('category')}`)
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
            
            console.log(response.data)
            let data = response.data
            let user = data.user
            let articles = data.articles.docs
            let weekFavouriteArticles = data.weekFavouriteArticles
            let tags = data.tags



            setArticles([
                ...articles
            ])

            setWeekFavouriteArticles([
                ...weekFavouriteArticles
            ])

            setPagination({
                page : data.articles.page ,
                hasNextPage : data.articles.hasNextPage ,
                hasPrevPage : data.articles.hasPrevPage ,
                limit : data.articles.limit ,
                nextPage : data.articles.nextPage ,
                prevPage : data.articles.prevPage ,
                totalDocs : data.articles.totalDocs,
                totalPages : data.articles.totalPages
            })

            setTags([
                ...tags
            ])

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
            setLoading(false)

        })

    } , [search])

    let paginationHandler = (e) => {
        e.preventDefault();
        let name = e.target.name
        let value = e.target.value
        setLoading(true)

        NodejsApi.get(`/articles?${name}=${value}`)
        .then(response => {
            if(! response.data.success){
                // setLoading(false)
                if(response.data.code === 204){
                    console.log(response.data.code)
                    setLoading(false)   
                    return setNocontent({
                        state : response.data.success,
                        message : response.data.message
                    })
                }
                return  setSuccess(prevState => {
                    setLoading(false)
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
                setLoading(false)
                return {
                state : response.data.success ,
                message : ''
                }
            })


            let data = response.data
            let articles = data.articles.docs
            setArticles(articles);
            setPagination({
                page : data.articles.page ,
                hasNextPage : data.articles.hasNextPage ,
                hasPrevPage : data.articles.hasPrevPage ,
                limit : data.articles.limit ,
                nextPage : data.articles.nextPage ,
                prevPage : data.articles.prevPage ,
                totalDocs : data.articles.totalDocs,
                totalPages : data.articles.totalPages
            })
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

        

    }

    let sortHandler = (e) => {
        e.preventDefault();
        let name = e.target.name

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

        setLoading(true)

        NodejsApi.get(`/articles?${name}=${queries[name]}`)
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
            let articles = data.articles.docs
            setArticles(articles);
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

    }

    let likeHandler = (e , id , liked , kind , single = 'some' , moreData = null) =>{
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

                    if(articles.some(article => article._id === dislikedArticle._id)){

                        let index = articles.findIndex(element => element._id === dislikedArticle._id)

                        articles[index].likedByThisUser = false
                        articles[index].likeCount = dislikedArticle.likeCount -1

                        setArticles(articles)
                    }

                    if(weekFavouriteArticles.some(weekFavouriteArticle => weekFavouriteArticle._id === dislikedArticle._id)){

                        let index = weekFavouriteArticles.findIndex(element => element._id === dislikedArticle._id)

                        weekFavouriteArticles[index].likedByThisUser = false
                        weekFavouriteArticles[index].likeCount = dislikedArticle.likeCount -1

                        setWeekFavouriteArticles(weekFavouriteArticles)
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

                    if(articles.some(article => article._id === likedArticle._id)){

                        let index = articles.findIndex(element => element._id === likedArticle._id)

                        articles[index].likedByThisUser = true
                        articles[index].likeCount = likedArticle.likeCount +1

                        setArticles(articles)
                    }

                    if(weekFavouriteArticles.some(weekFavouriteArticle => weekFavouriteArticle._id === likedArticle._id)){

                        let index = weekFavouriteArticles.findIndex(element => element._id === likedArticle._id)

                        weekFavouriteArticles[index].likedByThisUser = true
                        weekFavouriteArticles[index].likeCount = likedArticle.likeCount +1

                        setWeekFavouriteArticles(weekFavouriteArticles)
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

    let saveHandler = (e , id , saved , kind , single = 'some' , moreData = null ) =>{
        e.preventDefault()

        setButtonLoading(true)

        let data ={
            id,
            kind , 
            single,
            moreData,
        }

        if(saved){
            console.log('unsaving')
            NodejsApi.delete(`/save/${id}/${kind}/${single}/${moreData}`)
            .then(response =>{
                console.log(response.data)
                if(response.data.success){

                    let data = response.data
                    let unsavedArticle = data.article

                    if(articles.some(article => article._id === unsavedArticle._id)){

                        let index = articles.findIndex(element => element._id === unsavedArticle._id)

                        articles[index].savedByThisUser = false
                        articles[index].saveCount = unsavedArticle.saveCount -1

                        setArticles(articles)

                    }

                    if(weekFavouriteArticles.some(weekFavouriteArticle => weekFavouriteArticle._id === unsavedArticle._id)){

                        let index = weekFavouriteArticles.findIndex(element => element._id === unsavedArticle._id)

                        weekFavouriteArticles[index].savedByThisUser = false
                        weekFavouriteArticles[index].saveCount = unsavedArticle.saveCount -1

                        setWeekFavouriteArticles(weekFavouriteArticles)

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

                    if(articles.some(article => article._id === savedArticle._id)){

                        let index = articles.findIndex(element => element._id === savedArticle._id)

                        articles[index].savedByThisUser = true
                        articles[index].saveCount = savedArticle.saveCount +1

                        setArticles(articles)

                    }

                    if(weekFavouriteArticles.some(weekFavouriteArticle => weekFavouriteArticle._id === savedArticle._id)){

                        let index = weekFavouriteArticles.findIndex(element => element._id === savedArticle._id)

                        weekFavouriteArticles[index].savedByThisUser = true
                        weekFavouriteArticles[index].saveCount = savedArticle.saveCount +1

                        setWeekFavouriteArticles(weekFavouriteArticles)

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

    // window.onclick = (e => {
    //     let dropBtn = document.getElementById('dropBtn')
    //     if(e.target !== dropBtn){
    //         if(document.getElementById('sortDropdown').classList.contains('flex')){
    //             document.getElementById('sortDropdown').classList.replace('flex' , 'hidden')
    //         }
    //     }   
    // })


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
                    <Header user={userstate} />
                    <main className='flex flex-col items-center justify-center md:flex-row md:flex-start w-full h-fit min-h-screen gap-10 font-["Nunito"] bg-gradient-to-br from-30% from-slate-100 to-70% to-slate-300  dark:bg-gradient-to-t dark:from-10% dark:from-slate-600 dark:to-90% dark:to-slate-800 ' >
                        {/* Side Menu */}
                        <div className='hidden lg:flex flex-col lg:w-[230px] xl:w-[15%] w-[15%] dark:text-white ' >
                            {/* nav menu articles and tags */}
                            <div className='flex flex-col items-center justify-between w-full min-h-96 h-fit mt-5 ml-4 p-4 rounded-md border border-solid border-gray-400 shadow-lg bg-white  dark:shadow-slate-500/50 dark:border-none dark:bg-gradient-to-br dark:from-10% dark:from-[rgb(36,45,57)] dark:via-50% dark:via-[rgb(16,37,60)] dark:to-100% dark:to-[rgb(0,0,0)] ' >
                                <div className='flex flex-col items-center gap-4 w-full ' >
                                    <span className='h-fit text-center font-[600] text-xl ' >
                                        <a href="/tags">
                                            Most favourite Tags
                                        </a>
                                    </span>
                                    <div className='flex items-start flex-wrap h-fit ' >
                                        {
                                            tags.map(tag => {
                                                return    <a title={`${tag.explain !== null ? tag.explain : ''}`} href={`/tag/${tag.slug}`} key={tag._id} className='h-fit mx-2 my-2 px-4 py-2 rounded-md bg-gray-800 text-white dark:bg-teal-800 ' >#{tag.name}</a>
                                            })
                                        }
                                    </div>
                                    <span className='h-fit text-center font-[600] text-xl ' >
                                        <a href="/tags">
                                            followed Tags
                                        </a>
                                    </span>
                                    <div className='flex items-start flex-wrap h-fit ' >
                                        {
                                            userTags.map(tag => {
                                                return  (
                                                    <a href={`/tag/${tag.slug}`} key={tag._id} className='h-fit mx-2 my-2 px-4 py-2 rounded-md bg-gray-800 text-white dark:bg-teal-800' >#{tag.name}</a>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className='h-fit self-center justify-self-end flex text-center   ' >
                                    <a href="/tags" className='flex items-center gap-2 text-blue-500 hover:opacity-60 font-[600] text-xl' >
                                        <span>All Tags</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            
                        </div>

                        {/* Main Content */}
                        <div className='flex flex-col items-center w-full md:w-[85%]  h-fit px-1 py-6 lg:p-6 text-gray-800' >
                            {
                                !(weekFavouriteArticles.length === 0) ? 
                                (
                                    <>
                                    {/* weekFavouriteArticles */}
                                    <h2 className=' h-fit flex dark:text-gray-50 items-center self-start mb-10  gap-2' >
                                            <FontAwesomeIcon icon={faStar} className='text-xl'  />
                                            <span className='text-2xl font-[600] text-gray-900 dark:text-gray-50  ' >week Favourite Articles</span>
                                    </h2>
                                    {/* contents */}
                                    {
                                        ! noContent.state ? 
                                        <span className='text-gray-500 font-[600] text-xl dark:text-white' >{noContent.message}</span>
                                        :
                                        (           
                                                
                                            <div className='grid justify-items-center grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  grid-rows-1  gap-x-6 gap-y-4 min-h-fit w-full border-b dark:border-none border-solid border-gray-300 p-4 pb-8  '  >
                                                {/* cards */}
                                                {
                                                    
                                                    weekFavouriteArticles.map(article => {
                                                        return (
                                                        // Card
                                                        <CardArticle key={article._id} buttonLoading={buttonLoading} article={article} userstate={userstate} saveHandler={saveHandler} likeHandler={likeHandler} />
                                                        )
                                                    })
                                                }
                                            </div>
                                            
                                        )
                                    }
                                    </>
                                )
                                : ''
                            }

                            {/* Top all Articles */}
                            <h2 className=' h-fit flex items-center self-start my-10 mx-2  gap-2' >
                                <FontAwesomeIcon icon={faArchive} className='text-xl dark:text-gray-50'  />
                                <span className='text-2xl font-[600] text-gray-900 dark:text-gray-50 ' >All Articles</span>
                            </h2>

                            {/* sort and filter >md */}
                            <div className='hidden md:flex flex-col items-center w-full ' >
                                {/* sort */}
                                <div className='flex self-start justify-center w-full min-w-full rounded-md bg-white border border-solid border-gray-400  p-4 mb-10 dark:bg-teal-900 dark:border-none dark:text-white ' >
                                    <div className='flex items-center gap-1 md:gap-2 lg:gap-8 text-lg font-semibold '  >
                                        <span className=' whitespace-nowrap' >Sort by : </span>
                                        <button name='likeCount' value={queries.likeCount} onClick={sortHandler} className='cursor-pointer hover:opacity-80 hover:bg-teal-600 hover:text-white focus:bg-teal-300 focus:text-white focus:ring-2 focus:ring-teal-900 rounded-3xl px-4 py-2' >likes</button >
                                        <button name='saveCount' value={queries.saveCount} onClick={sortHandler} className='cursor-pointer hover:opacity-80 hover:bg-teal-600 hover:text-white focus:bg-teal-300 focus:text-white focus:ring-2 focus:ring-teal-900 rounded-3xl px-4 py-2' >saves</button>
                                        <button name='viewCount' value={queries.viewCount} onClick={sortHandler} className='cursor-pointer hover:opacity-80 hover:bg-teal-600 hover:text-white focus:bg-teal-300 focus:text-white focus:ring-2 focus:ring-teal-900 rounded-3xl px-4 py-2' >viewes</button>
                                        <button name='commentCount' value={queries.commentCount} onClick={sortHandler} className='cursor-pointer hover:opacity-80 hover:bg-teal-600 hover:text-white focus:bg-teal-300 focus:text-white focus:ring-2 focus:ring-teal-900 rounded-3xl px-4 py-2' >comments</button>
                                        <button name='date' value={queries.date} onClick={sortHandler} className='cursor-pointer hover:opacity-80 hover:bg-teal-600 hover:text-white focus:bg-teal-300 focus:text-white focus:ring-2 focus:ring-teal-900 rounded-3xl px-4 py-2' >date</button>
                                    </div>
                                </div>
                                {/* filter */}
                                <div className='flex self-start justify-center w-full bg-white rounded-md border border-solid border-gray-400  p-4 mb-10 dark:bg-teal-900 dark:border-none dark:text-white' >
                                    <div className='flex items-center gap-8 text-lg font-semibold '  >
                                        <label className='flex items-center gap-2' >
                                            <span>Filter By Time :</span> 
                                            <select className='select dark:text-gray-500 outline-none border-none rounded-md w-32 ' name='createdAt' onChange={paginationHandler}>
                                                <option value='' className='' >always</option>
                                                <option value='1weekAgo'>1 week ago</option>
                                                <option value='1monthAgo'>1 month ago</option>
                                                <option value='1yearAgo'>1 year ago</option>
                                            </select>
                                        </label>               
                                    </div>
                                </div>
                            </div>
                            {/* sort and filter <md */}
                            <div className='flex md:hidden flex-col items-center justify-between h-fit w-full gap-6 whitespace-nowrap p-2' >
                                <div className='flex flex-col items-center gap-6 h-fit w-full py-8 ' >
                                    {/* sort */}
                                    <div 
                                        // onBlur={e => document.getElementById('sortDropdown').classList.replace('flex' , 'hidden')}                                    
                                        className='flex flex-col relative  items-center  w-full gap-4 z-20   dark:bg-slate-700/80 dark:text-gray-50'>
                                        <button type='button' id='dropBtn'    className='text-lg text-gray-600 dark:bg-slate-800 dark:text-gray-50 hover:bg-opacity-30 focus:bg-opacity-10 font-semibold h-20 py-6 w-full flex items-center justify-center gap-2 text-center cursor-pointer rounded-md border border-solid border-gray-300' 
                                            // onBlur={e => document.getElementById('sortDropdown').classList.replace('flex' , 'hidden')}
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
                                        // onMouseLeave={e => document.getElementById('sortDropdown').classList.replace('flex' , 'hidden')}
                                        className='hidden absolute top-24  flex-col text-gray-700  dark:bg-slate-700/80 dark:text-gray-50  transition-all w-full h-fit p-4 font-semibold divide-y-2 divide-gray-300 bg-white rounded-md border border-solid border-gray-300 shadow-md' >
                                            
                                            <button name='likeCount' value={queries.likeCount} onClick={sortHandler} className='cursor-pointer hover:opacity-80 hover:bg-teal-400 hover:text-white focus:bg-teal-100 focus:text-white focus:ring-2 focus:ring-teal-900 px-4 py-3' >likes</button >
                                            <button name='saveCount' value={queries.saveCount} onClick={sortHandler} className='cursor-pointer hover:opacity-80 hover:bg-teal-400 hover:text-white focus:bg-teal-100 focus:text-white focus:ring-2 focus:ring-teal-900 px-4 py-3' >saves</button>
                                            <button name='viewCount' value={queries.viewCount} onClick={sortHandler} className='cursor-pointer hover:opacity-80 hover:bg-teal-400 hover:text-white focus:bg-teal-100 focus:text-white focus:ring-2 focus:ring-teal-900 px-4 py-3' >viewes</button>
                                            <button name='commentCount' value={queries.commentCount} onClick={sortHandler} className='cursor-pointer hover:opacity-80 hover:bg-teal-400 hover:text-white focus:bg-teal-100 focus:text-white focus:ring-2 focus:ring-teal-900 px-4 py-3' >comments</button>
                                            <button name='date' value={queries.date} onClick={sortHandler} className='cursor-pointer hover:opacity-80 hover:bg-teal-400 hover:text-white focus:bg-teal-100 focus:text-white focus:ring-2 focus:ring-teal-900 px-4 py-3' >date</button>
                                    
                                        </div>
                                    </div>
                                    {/* filter */}
                                    <div className='text-gray-600 dark:bg-slate-800 flex self-start items-center whitespace-nowrap justify-center w-full  rounded-md border border-solid border-gray-300  p-4 mb-10 dark:bg-slate-700/80 dark:text-gray-50' >
                                        <div className='flex items-center justify-center h-fit gap-8 text-lg font-semibold '  >
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
                            </div>

                            {/* contents */}
                            {
                                ! noContent.state ? 
                                <span className='text-gray-500 font-[600] text-xl dark:text-white' >{noContent.message}</span>
                                :
                                (                
                                <>
                                    <div className='grid justify-items-center grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  grid-rows-2 gap-y-9 gap-x-8 md:w-[400px] lg:w-full w-full p-2 '  >
                                        {/* cards */}
                                        {
                                            articles.map(article => {
                                                return (
                                                // Card
                                                <CardArticle key={article._id} buttonLoading={buttonLoading} article={article} userstate={userstate} saveHandler={saveHandler} likeHandler={likeHandler} />
                                                )
                                            })
                                        }
                                    </div>

                                    {
                                        pagination.totalPages !== 1 ?
                                        (
                                            <PaginationContext.Provider value={{ pagination  , paginationHandler }}>
                                                <Pagination  />
                                            </PaginationContext.Provider>
                                        )
                                        : ''
                                    }

                                </>
                                )
                            }
                        </div>

                    </main>
                    <Footer />
                    <GoTopBtn />
                </div>
            ) : (

                <span className='flex items-center justify-center w-full h-full font-["Vazir"] text-8xl text-gray-500 dark:text-white ' >
                    { success.message }
                    <FontAwesomeIcon icon={faExclamationCircle} />    
                </span>
                
            )
        }
        </div>
    )
}

export default Articles;