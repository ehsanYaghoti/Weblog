import React , {useState , useEffect }  from 'react';
import { useParams  } from 'react-router-dom';

// import Contexts
// import authenticatedUserContext from 'src/Contexts/authenticatedUserContext';

// Layouts
import Header from 'src/components/Layouts/Home/General/Header';
import Footer from 'src/components/Layouts/Home/General/Footer';
import CardUserInfo from 'src/components/Layouts/Home/User/CardUserInfo';
import GoTopBtn from 'src/components/Layouts/Home/General/GoTopBtn';
import SpinnerOnTop from 'src/components/Layouts/Home/Loadings/SpinnerOnTop';


//import Api
import NodejsApi from 'src/Api/NodejsApi'; 

// import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle  } from '@fortawesome/free-solid-svg-icons';
import CardArticle from 'src/components/Layouts/Home/Cards/CardArticle';

function User(props){
    
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
            articles : [],
            followers : [],
            followings : [],
            roles : [],
            createdAt : '',

        }
    })

    const [success , setSuccess] = useState({ state : true ,  message : ''})
    const [noContent , setNocontent] = useState({ state : true ,  message : ''})
    const [loading , setLoading] = useState(false)
    const [buttonLoading  , setButtonLoading] = useState(false)

    const {id} =  useParams()

    useEffect(() => {
        setLoading(true)
        NodejsApi.get(`http://localhost:5000/user/dashboard/${id}`)
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

    } , [id])


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

    let saveHandler = (e , id , saved , kind , single = 'userDashboard' , moreData = userstate.user._id  ) =>{
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
                    let  unsavedArticle = data.article

                    if( unsavedArticle !== undefined){

                        if(userstate.user.articles.some(article => article._id ===  unsavedArticle._id)){

                            let index = userstate.user.articles.findIndex(element => element._id ===  unsavedArticle._id)

                            userstate.user.articles[index].savedByThisUser = false
                            userstate.user.articles[index].saveCount =  unsavedArticle.saveCount -1

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
                    let  savedArticle = data.article

                    if( savedArticle !== undefined){

                        if(userstate.user.articles.some(article => article._id ===  savedArticle._id)){

                            let index = userstate.user.articles.findIndex(element => element._id ===  savedArticle._id)

                            userstate.user.articles[index].savedByThisUser = true
                            userstate.user.articles[index].saveCount =  savedArticle.saveCount +1

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

    let followUserHandler = (e , followed , followingUserId) =>{
        e.preventDefault()
        setButtonLoading(true)

        let data = {
            id : followingUserId
        }

        if(followed){
            console.log('unfollowing')
            NodejsApi.put(`/user/unfollow/${followingUserId}` , data )
            .then(response =>{
                console.log(response.data)
                if(response.data.success){
                    let user = response.data.user  

                    if(! user.followedByThisUser){

                        setUserState(prevState => {
                            return {
                                user : {
                                    ...prevState.user,
                                    followedByThisUser : false,
                                    followersCount : user.followersCount,
                                    followingsCount : user.followingsCount
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
            console.log('following')
            NodejsApi.put(`/user/follow/${followingUserId}` , data)
            .then(response =>{
                console.log(response.data)
                if(response.data.success){
                    let user = response.data.user  

                    if(user.followedByThisUser){

                        setUserState(prevState => {
                            return {
                                user : {
                                    ...prevState.user,
                                    followedByThisUser : true,
                                    followersCount : user.followersCount,
                                    followingsCount : user.followingsCount
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
                    <Header user={authenticatedUser} />
                    <main className='flex flex-col items-center w-full h-fit min-h-screen gap-10 py-6 px-2 md:p-6 font-["Nunito"] bg-gradient-to-br from-30% from-slate-100 to-70% to-slate-300 dark:bg-gradient-to-t dark:from-10% dark:from-slate-600 dark:to-90% dark:to-slate-800 dark:text-gray-50' >
                    {
                        ! noContent.state ? 
                        <span className='' >{noContent.message}</span>
                        :
                        (                
                        <div className='flex flex-col items-center gap-8 w-full xl:w-[85%]' >
                            <CardUserInfo followUserHandler={followUserHandler} buttonLoading={buttonLoading} userstate={userstate} authenticatedUser={authenticatedUser} />
                            {/* contents */}
                        {
                            !(userstate.user.articles === undefined) ? 
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
                                <div className='grid justify-items-center grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 grid-rows-1 gap-y-9 gap-x-6 w-full '  >
                                    {
                                        userstate.user.articles.map(article => {
                                            return (
                                            <CardArticle key={article._id} buttonLoading={buttonLoading} article={article} userstate={authenticatedUser} saveHandler={saveHandler} likeHandler={likeHandler} />
                
                                            )
                                        })
                                    }
                                </div>
                                )}
                                </>
                            )
                            : ''
                        }
                        </div>
                        )
                    }
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

export default User; 