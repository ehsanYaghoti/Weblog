import React , {useState , useEffect }  from 'react';

// import Contexts
// import authenticatedUserContext from 'src/Contexts/authenticatedUserContext';

// Layouts
import GoTopBtn from 'src/components/Layouts/Home/General/GoTopBtn';
import SpinnerOnTop from 'src/components/Layouts/Home/Loadings/SpinnerOnTop';

import UserPanelHeader from 'src/components/Layouts/Home/User/UserPanelHeader';
import UserPanelNavbar from 'src/components/Layouts/Home/User/UserPanelNavbar';

//import Api
import NodejsApi from 'src/Api/NodejsApi'; 

// import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle  } from '@fortawesome/free-solid-svg-icons';
import CardPodcast from 'src/components/Layouts/Home/Cards/CardPodcast';


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
            followers : [],
            followings : [],
            podcasts : [],
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
        NodejsApi.get(`http://localhost:5000/user/panel`)
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
            
            // console.log(response.data)
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
                    let dislikedPodcast = data.podcast

                    if(dislikedPodcast !== undefined){

                        if(userstate.user.podcasts.some(podcast => podcast._id === dislikedPodcast._id)){

                            let index = userstate.user.podcasts.findIndex(element => element._id === dislikedPodcast._id)

                            userstate.user.podcasts[index].likedByThisUser = false
                            userstate.user.podcasts[index].likeCount = dislikedPodcast.likeCount -1

                            setUserState(prevState => {
                                return {
                                    user : {
                                        ...prevState.user,
                                        podcasts : userstate.user.podcasts
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
                    let likedPodcast = data.podcast

                    if(likedPodcast !== undefined){

                        if(userstate.user.podcasts.some(podcast => podcast._id === likedPodcast._id)){

                            let index = userstate.user.podcasts.findIndex(element => element._id === likedPodcast._id)

                            userstate.user.podcasts[index].likedByThisUser = true
                            userstate.user.podcasts[index].likeCount = likedPodcast.likeCount +1

                            setUserState(prevState => {
                                return {
                                    user : {
                                        ...prevState.user,
                                        podcasts : userstate.user.podcasts
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
                    let unsavedPodcast = data.podcast

                    if(unsavedPodcast !== undefined){

                        if(userstate.user.podcasts.some(podcast => podcast._id === unsavedPodcast._id)){

                            let index = userstate.user.podcasts.findIndex(element => element._id === unsavedPodcast._id)

                            userstate.user.podcasts[index].savedByThisUser = false
                            userstate.user.podcasts[index].saveCount = unsavedPodcast.saveCount -1

                            setUserState(prevState => {
                                return {
                                    user : {
                                        ...prevState.user,
                                        podcasts : userstate.user.podcasts
                                    }
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
            console.log('saving')
            NodejsApi.post('/save' , data)
            .then(response =>{
                console.log(response.data)
                if(response.data.success){
                    let data = response.data
                    let savedPodcast = data.podcast

                    if(savedPodcast !== undefined){

                        if(userstate.user.podcasts.some(podcast => podcast._id === savedPodcast._id)){

                            let index = userstate.user.podcasts.findIndex(element => element._id === savedPodcast._id)

                            userstate.user.podcasts[index].savedByThisUser = true
                            userstate.user.podcasts[index].saveCount = savedPodcast.saveCount +1

                            setUserState(prevState => {
                                return {
                                    user : {
                                        ...prevState.user,
                                        podcasts : userstate.user.podcasts
                                    }
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
                    <main className='flex flex-row items-center w-full h-fit min-h-screen gap-10     pl-0 font-["Nunito"]  bg-gradient-to-br from-30% from-slate-100 to-70% to-slate-300  dark:bg-gradient-to-t dark:from-10% dark:from-slate-600 dark:to-90% dark:to-slate-800 dark:text-gray-50' >

                        <UserPanelNavbar user={userstate.user} />
                        
                        { ! noContent.state ? <span className='' >{noContent.message}</span> :
                        (
                            <div className='w-full px-4 py-8 lg:w-[80%] lg:pl-8 lg:ml-[25%] xl:ml-[20%] lg:mx-4 ' >
                            
                            <>
                            {/* all Podcasts */}
                            <h2 className=' h-fit flex items-center self-start my-10  gap-2' >
                                    <span className='text-2xl font-[600] text-gray-900 dark:text-gray-50' >All Podcasts</span>
                            </h2>
                            {
                            ! noContent.state ? 
                            <span className='' >{noContent.message}</span>
                            : ( 
                                <div className='grid justify-items-center grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-y-9 gap-x-6 py-6 w-full h-fit  pb-10 '  >
                                {
                                    userstate.user.podcasts.map(podcast => {
                                        return (
                                        <CardPodcast key={podcast._id} podcast={podcast} buttonLoading={buttonLoading} userstate={authenticatedUser} saveHandler={saveHandler} likeHandler={likeHandler} />
            
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

export default User; 