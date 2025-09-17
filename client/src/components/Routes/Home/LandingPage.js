import React , { useState , useEffect  } from 'react';

// Layouts
import Header from 'src/components/Layouts/Home/General/Header';
import HeroSectoin from 'src/components/Layouts/Home/FirstPage/HeroSection';
import Footer from 'src/components/Layouts/Home/General/Footer';
import GoTopBtn from 'src/components/Layouts/Home/General/GoTopBtn';
// import Template from '../../Layouts/Home/General/Template';
import SpinnerOnTop from 'src/components/Layouts/Home/Loadings/SpinnerOnTop';

import CardArticle from 'src/components/Layouts/Home/Cards/CardArticle';
import CardPodcast from 'src/components/Layouts/Home/Cards/CardPodcast';
import CardPost from 'src/components/Layouts/Home/Cards/CardPost';

//import Api
import NodejsApi from 'src/Api/NodejsApi';


// import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle , faBlog } from '@fortawesome/free-solid-svg-icons';

function LandingPage(props) {

    const [userstate , setUserState ]  = useState({
        isAuthenticated : false,
        user : {
            username : '',
            avatar : '',
            likes : []
        }
    })
    const [articles , setArticles] = useState([])
    const [podcasts , setPodcasts] = useState([])
    const [posts , setPosts] = useState([])

    const [tags , setTags] = useState([])

    // const [noContent , setNocontent] = useState({ state : true ,  message : ''})
    const [success , setSuccess] = useState({ state : true ,  message : ''})

    const [loading , setLoading] = useState(false)
    const [buttonLoading  , setButtonLoading] = useState(false)

    useEffect(() => {

        setLoading(true)

        NodejsApi.get('/')
        .then(response => {
            if(! response.data.success){


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

            let data = response.data
            let user = data.user
            let articles = data.articles
            let podcasts = data.podcasts
            let posts = data.posts
            let tags = data.tags



            setArticles([
                ...articles
            ])

            setPodcasts([
                ...podcasts
            ])

            setPosts([
                ...posts
            ])

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
            setLoading(false)
            setSuccess({
                state : false,
                message : err.message
            })
        })

    } , [])

    useEffect(()=>{
        let parser = new DOMParser();

        posts.map(post =>{
            return document.getElementById(post._id).innerHTML = parser.parseFromString( post.statement , 'text/html').body.innerHTML
        })

    } ,[posts] )

    let likeHandler = (e , id , liked , kind , single = 'home' , moreData = null ) =>{
        e.preventDefault()
        setButtonLoading(true)
        let data ={
            id,
            kind ,
            single,
            moreData
        }
        if(liked){
            NodejsApi.delete(`/like/${id}/${kind}/${single}/${moreData}`)
            .then(response =>{
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

    let saveHandler = (e , id , saved , kind , single = 'home' , moreData = null ) =>{
        e.preventDefault()
        setButtonLoading(true)
        let data ={
            id,
            kind ,
            single,
            moreData
        }
        if(saved){
            NodejsApi.delete(`/save/${id}/${kind}/${single}/${moreData}`)
            .then(response =>{
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

    return (
        <div className='flex flex-col w-full h-screen'  >
        {
            loading ?
            <SpinnerOnTop />
            : ''
        }
        {
            success.state ? (
                <div className='flex flex-col w-full h-fit '>
                    <Header user={userstate} />
                    <main className='flex flex-col w-full h-fit gap-10 font-["Nunito"]  bg-gradient-to-br from-30% from-slate-100 to-70% to-slate-300  dark:bg-gradient-to-t dark:from-10% dark:from-slate-600 dark:to-90% dark:to-slate-800 ' >
                        <HeroSectoin />
                        {/* explain about site */}
                        <div className='relative hidden sm:flex items-center  self-center justify-center w-full md:h-[400px] h-fit bg-gradient-to-r from-[#0F2027] via-[#203A43] to-[#2C5364] bg-opacity-40  text-xl font-semibold text-gray-700 text-center shadow-lgx` align-middle p-4 my-10 mx-5' >
                            <p className=' tracking-wide text-white drop-shadow-md break-words z-20 leading-10 whitespace-pre-wrap w-[800px]  h-fit ' >
                                This is Weblog <br/>

                                where you can read Articles and learn from them and have raction about it<br/>
                                with likes
                                and comment any idea or question about article<br/>
                                and save it to read it later in your user panel <br/>
                                and share it for else to use it.<br/>
                                There is also <br/>
                                Podcasts that you can listen to it and do whatever you do with articles.<br/>
                                And
                                you can ask question or answer questions in forum posts.<br/>
                            </p >
                            {/* Logo */}
                            <div className=' absolute flex items-center w-fit opacity-10 drop-shadow-md text-6xl md:text-7xl lg:text-8xl text-gray-100 ' >
                                <FontAwesomeIcon icon={faBlog} className=' '  />
                                <span className='h-fit ml-2 font-["PT_Sans"] font-semibold  ' >Weblog</span>
                            </div>
                        </div>

                        {/* Top Media */}
                        <div className='flex flex-col items-center  h-fit p-10 px-0   dark:bg-opacity-95 text-gray-800' >

                            {/* Top Articles */}
                            <h2 className='text-2xl h-fit self-center mb-10 font-[600] dark:text-white text-gray-900' >Newst Articles</h2>
                            {/* explain articles  */}
                            <p style={{wordSpacing : '10px'}} className=' w-full flex items-center justify-center text-center tracking-wide text-[#12343b] text-xl font-bold bg-gray-100 px-4 py-10 my-10 border-y border-solid border-gray-100 dark:bg-[#474E68] dark:text-white dark:border-none ' >There is newst articles to Read and comment and Like and Share</p>
                            {/* all articles link */}
                            <a href="/articles" className='self-start text-xl text-blue-700 underline underline-offset-2 ml-20  mb-4 hover:text-blue-500 flex items-center gap-1 ' >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <span className='h-fit' >All articles</span>
                            </a>

                            {/* contents */}
                            <div className='grid justify-items-center grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3   gap-y-9 gap-x-6 xl:gap-x-20 w-full p-4 lg:px-6 '  >
                                {/* cards */}
                                {
                                    articles.length === 0 ?
                                    <span className='dark:text-gray-50 font-[700] w-screen text-2xl  text-center ' >There is no Article</span>
                                    :
                                    articles.map(article => {
                                        return (
                                            // Card
                                            <CardArticle key={article._id} buttonLoading={buttonLoading} article={article} userstate={userstate} saveHandler={saveHandler} likeHandler={likeHandler} />
                                        )
                                    })
                                }
                            </div>



                            {/* Top Podcasts */}
                            <h2 className='text-2xl h-fit self-center font-[600] text-gray-900 my-10 mt-64 dark:text-white' >Newst Podcasts</h2>
                            {/* explain Podcasts  */}
                            <p style={{wordSpacing : '10px'}} className=' w-full flex items-center justify-center text-center tracking-wide text-[#12343b] text-xl font-bold bg-gray-100 px-4 py-10 my-10 border-y border-solid border-gray-100 dark:bg-[#474E68] dark:text-white dark:border-none ' >There is newst podcasts to Read and comment and Like and Share</p>
                            <a href="/podcasts" className='self-start text-xl text-blue-700 underline underline-offset-2 ml-20  mb-4 hover:text-blue-500 flex items-center gap-1 ' >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <span className='h-fit' >All podcasts</span>
                            </a>
                            {/* content */}
                            <div className='grid justify-items-center grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  grid-rows-1 gap-y-9 gap-x-6  w-full p-4 lg:px-6'  >
                            {
                                podcasts.length === 0 ?
                                <span className='dark:text-gray-50 font-[700] w-screen text-2xl  text-center ' >There is no Podcast</span>
                                :
                                podcasts.map(podcast => {
                                    return (
                                    // card
                                    <CardPodcast key={podcast._id} buttonLoading={buttonLoading} podcast={podcast} userstate={userstate} saveHandler={saveHandler} likeHandler={likeHandler} />
                                    )
                                })
                            }
                            </div>

                            {/* Top Tags */}
                            <div className='flex flex-col w-full  h-fit py-10 my-60 text-gray-800 ' >
                                <h2 className='text-2xl h-fit self-center mb-10 font-[600] text-gray-900 dark:text-white  drop-shadow-md ' >Top Tags</h2>
                                <a href="/tags" className='text-blue-500 underline font-[600] hover:text-blue-200 text-xl ml-20 my-10 flex items-center gap-1' >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    <span className='h-fit' >All tags</span>
                                </a>
                                {/* contents */}
                                <div className=' w-full h-fit flex items-center flex-wrap  justify-evenly  '  >

                                    {
                                        tags.length === 0 ?
                                        <span className='dark:text-gray-50 font-[700] w-screen text-2xl  text-center ' >There is no Tag</span>
                                        :
                                        tags.map(tag => {
                                            return (
                                                <a key={tag._id} href={`/tag/${tag.slug}`} className='flex flex-col items-start relative  rounded-md w-72 h-fit cursor-pointer shadow-sm hover:scale-105 transition-all m-10 dark:shadow-lg dark:shadow-slate-400/50' >
                                                    <img src={`${process.env.REACT_APP_API_URL}/public/static/sunrise.jpg`} alt="" className='w-full h-full self-center rounded-md shadow-md object-cover ' />
                                                    <h3 className='text-xl flex items-center justify-center rounded-md font-[600] bg-white bg-opacity-40 dark:bg-opacity-10  w-full h-full text-white absolute ' >#{tag.name}</h3>
                                                </a>
                                            )
                                        })
                                    }
                                </div>
                            </div>


                            {/* Top Posts */}
                            <h2 className='text-2xl h-fit self-center mb-10 font-[600] text-gray-900 my-10 mt-6 dark:text-white' >Newst Posts</h2>
                            {/* explain Podcasts  */}
                            <p style={{wordSpacing : '10px'}} className=' w-full flex items-center justify-center text-center tracking-wide text-[#12343b] text-xl font-bold bg-gray-100 px-4 py-10 my-10 border-y border-solid border-gray-100 dark:bg-[#474E68] dark:text-white dark:border-none ' >There is newst posts to Read and comment and Like and Share</p>
                            <a href="/posts" className='self-start text-xl flex items-center gap-2 text-blue-700 underline underline-offset-2 ml-10  mb-4 dark:hover:text-blue-400 ' >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <span className='font-[700] text-xl' >All posts</span>
                            </a>
                            {/* content */}
                            <div className='grid justify-items-center grid-cols-1 gap-y-6 gap-x-6 w-full p-8 mb-64 '  >
                                {
                                    posts.length === 0 ?
                                    <span className='dark:text-gray-50 font-[700] w-full text-2xl  text-center ' >There is no Post</span>
                                    :
                                    posts.map(post => {
                                        return (
                                        // card
                                        <CardPost key={post._id} buttonLoading={buttonLoading} showReportForm={'showReportForm'} reports={'reports'} isSinglePage={false} post={post} userstate={userstate} saveHandler={saveHandler}  />
                                        )
                                    })
                                }
                            </div>
                            {/* <Template /> */}
                        </div>

                    </main>
                    <Footer />
                    <GoTopBtn />
                </div>
            ) : (
                <span className='flex items-center justify-center w-full h-full font-["Nunito"] text-8xl text-gray-500 ' >
                    <FontAwesomeIcon icon={faExclamationCircle} />
                    <span className='h-fit' >
                        { success.message }
                    </span>

                </span>
            )
        }
        </div>
    )
}

export default LandingPage;
