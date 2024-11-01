import React , {useState , useEffect }  from 'react';

// import Contexts
// import authenticatedUserContext from 'src/Contexts/authenticatedUserContext';

// Layouts
import GoTopBtn from 'src/components/Layouts/Home/General/GoTopBtn';
import SpinnerOnTop from 'src/components/Layouts/Home/Loadings/SpinnerOnTop';

import CardArticle from 'src/components/Layouts/Home/Cards/CardArticle';
import UserPanelHeader from 'src/components/Layouts/Home/User/UserPanelHeader';
import UserPanelNavbar from 'src/components/Layouts/Home/User/UserPanelNavbar';

//import Api
import NodejsApi from 'src/Api/NodejsApi'; 

// import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle  } from '@fortawesome/free-solid-svg-icons';
import isAuthenticated from 'src/Logics/isAuthenticated';


function UserPanelArticles(props){
    
    const [authenticatedUser , setAuthenticatedUser ]  = useState({
        isAuthenticated : false,
        user : {
            username : '',
            avatar : null,
        }
    })

    const [userstate , setUserState ]  = useState({
        user : {
            username : '',
            avatar : null,
            likes : [],
            followers : [],
            followings : [],
            articles : [],
            roles : [],
            createdAt : '',

        }
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
            
            console.log(response.data)
            let data = response.data
            let user = data.user

            setAuthenticatedUser({
                isAuthenticated : data.isAuthenticated,
                user : data.authenticatedUser,
            })

            
            setUserState({
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


    let likeHandler = (e , id , liked , kind , single = 'userDashboard' , moreData = userstate.user._id ) =>{
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

                        if(userstate.user.articles.some(article => article._id === dislikedArticle._id)){

                            let index = userstate.user.articles.findIndex(element => element._id === dislikedArticle._id)

                            userstate.user.articles[index].likedByThisUser = false
                            userstate.user.articles[index].likeCount = dislikedArticle.likeCount -1

                            setUserState(prevState => {
                                return {
                                    user : {
                                        ...prevState.user,
                                        articles : userstate.user.articles
                                    }
                                }
                            } )
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

                        if(userstate.user.articles.some(article => article._id === likedArticle._id)){

                            let index = userstate.user.articles.findIndex(element => element._id === likedArticle._id)

                            userstate.user.articles[index].likedByThisUser = true
                            userstate.user.articles[index].likeCount = likedArticle.likeCount +1

                            setUserState(prevState => {
                                return {
                                    user : {
                                        ...prevState.user,
                                        articles : userstate.user.articles
                                    }
                                }
                            } )
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

    let saveHandler = (e , id , saved , kind , single = 'userDashboard' , moreData = userstate.user._id ) =>{
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

                        if(userstate.user.articles.some(article => article._id === unsavedArticle._id)){

                            let index = userstate.user.articles.findIndex(element => element._id === unsavedArticle._id)

                            userstate.user.articles[index].savedByThisUser = false
                            userstate.user.articles[index].saveCount = unsavedArticle.saveCount -1

                            setUserState(prevState => {
                                return {
                                    user : {
                                        ...prevState.user,
                                        articles : userstate.user.articles
                                    }
                                }
                            } )
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

                        if(userstate.user.articles.some(article => article._id === savedArticle._id)){

                            let index = userstate.user.articles.findIndex(element => element._id === savedArticle._id)

                            userstate.user.articles[index].savedByThisUser = true
                            userstate.user.articles[index].saveCount = savedArticle.saveCount +1

                            setUserState(prevState => {
                                return {
                                    user : {
                                        ...prevState.user,
                                        articles : userstate.user.articles
                                    }
                                }
                            } )
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
        <div className='flex flex-col w-full min-h-screen'  >
        {
            success.state ? (
                <div className='flex flex-col w-full h-fit' >
                    {
                        loading ? 
                        <SpinnerOnTop />
                        : ''
                    }
                    <UserPanelHeader user={authenticatedUser} userNavbar={userstate.user} />
                    <main className='flex flex-row items-center w-full h-fit min-h-screen gap-10 pl-0 font-["Nunito"]  bg-gradient-to-br from-30% from-slate-100 to-70% to-slate-300 dark:bg-gradient-to-t dark:from-10% dark:from-slate-600 dark:to-90% dark:to-slate-800 dark:text-gray-50' >

                        <UserPanelNavbar user={userstate.user} />
                        
                        { ! noContent.state ? <span className='' >{noContent.message}</span> :
                        (
                        <div className='w-full px-4 py-8 lg:w-[80%] lg:pl-8 lg:ml-[25%] xl:ml-[20%] lg:mx-4 ' >
                            
                            <>
                            {/* all Articles */}
                            <h2 className=' h-fit flex items-center self-start my-10  gap-2' >
                                    <span className='text-2xl font-[600] text-gray-900 dark:text-gray-50' >All Articles</span>
                            </h2>
                            {
                            ! noContent.state ? 
                            <span className='' >{noContent.message}</span>
                            : ( 
                            <div className='grid justify-items-center grid-cols-1 lg:grid-cols-2 gap-y-9 gap-x-6 py-6 w-full h-fit  pb-10 '  >
                                {
                                    userstate.user.articles.map(article => {
                                        return (
                                        <CardArticle key={article._id} article={article} buttonLoading={buttonLoading} userstate={authenticatedUser} saveHandler={saveHandler} likeHandler={likeHandler} />
            
                                        )
                                    })
                                }
                            </div>
                            )}
                            </>

                        </div>
                        )}

                    </main>
                    {/* <Footer  />  */}
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

export default isAuthenticated(UserPanelArticles , 'panel'); 