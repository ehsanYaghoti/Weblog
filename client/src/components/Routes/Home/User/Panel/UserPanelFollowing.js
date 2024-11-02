import React , { useState , useEffect   } from 'react';

// Layouts
import UserPanelHeader from 'src/components/Layouts/Home/User/UserPanelHeader';
import GoTopBtn from 'src/components/Layouts/Home/General/GoTopBtn';
import SpinnerOnTop from 'src/components/Layouts/Home/Loadings/SpinnerOnTop';

import UserPanelNavbar from 'src/components/Layouts/Home/User/UserPanelNavbar';
import CardUserFollowing from 'src/components/Layouts/Home/User/CardUserFollowing';

//import Api
import NodejsApi from 'src/Api/NodejsApi'; 

// import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import isAuthenticatedPanel from 'src/Logics/isAuthenticatedPanel';



function UserPanelFollowing(props) {

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

    const [followingUsers , setFollowingUsers] = useState([])

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
            console.log(data)

            setUserState({
                isAuthenticated : data.isAuthenticated ,
                user : {
                    ...user
                }
            });

            setFollowingUsers(user.followings)
            
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
                    
                    let userFollowings = response.data.userFollowings  

                    setFollowingUsers(userFollowings)

                    setButtonLoading(false)
                    // let followedUser = response.data.user  

                    // let followedUserIndex = followingUsers.findIndex(element => element._id === followedUser._id)

                    // setFollowingUsers(prevState => {
                    //     return [
                    //         ...prevState,
                    //         prevState[followedUserIndex] = followedUser
                    //     ]
                    // })
                    // if(author.followedByThisUser){

                    //     setArticle(prevState => {
                    //         return {
                    //             ...prevState,
                    //             author : {
                    //                 ...prevState.author,
                    //                 followedByThisUser : false
                    //             }
                    //         }
                    //     })

                    // }

                }
            })
            .catch(err => {
                console.log(err)
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

                    let userFollowings = response.data.userFollowings  

                    setFollowingUsers(userFollowings)

                    setButtonLoading(false)
                    // let followedUser = response.data.user  

                    // let followedUserIndex = followingUsers.findIndex(element => element._id === followedUser._id)

                    // setFollowingUsers(prevState => {
                    //     return [
                    //         ...prevState,
                    //         prevState[followedUserIndex] = followedUser
                    //     ]
                    // })
                    
                    // if(author.followedByThisUser){

                    //     setArticle(prevState => {
                    //         return {
                    //             ...prevState,
                    //             author : {
                    //                 ...prevState.author,
                    //                 followedByThisUser : true
                    //             }
                    //         }
                    //     })

                    // }

                }
            })
            .catch(err => {
                console.log(err)
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
                    <UserPanelHeader user={userstate} userNavbar={userstate.user} />
                    {/* Main Content */}
                    <main className='flex flex-row items-start w-full h-fit min-h-screen gap-10     pl-0 font-["Nunito"]  bg-gradient-to-br from-30% from-slate-100 to-70% to-slate-300  dark:bg-gradient-to-t dark:from-10% dark:from-slate-600 dark:to-90% dark:to-slate-800 dark:text-gray-50' >
                        <UserPanelNavbar user={userstate.user} />
                        { ! noContent.state ? <span className='' >{noContent.message}</span> :
                        (
                            <div className='w-full px-4 py-8 lg:w-[80%] lg:pl-8 lg:ml-[25%] xl:ml-[20%] lg:mx-4 ' >
                            <>
                                {/* all Followings */}
                                <h2 className=' h-fit flex items-center self-start my-10  gap-2' >
                                    <span className='text-2xl font-[600] text-gray-900 dark:text-gray-50 ' >Following Users</span>
                                </h2>
                                {
                                ! noContent.state ? 
                                <span className='' >{noContent.message}</span>
                                : 
                                    followingUsers.length !== 0 ? (
                                    <div className='grid justify-items-center grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-y-9 gap-x-6 w-full h-fit min-h-screen pb-10 '  >
                                        
                                        {   
                                            followingUsers.map(followingUser => {
                                                return (
                                                    <CardUserFollowing key={followingUser._id}  user={followingUser}  buttonLoading={buttonLoading} followUserHandler={followUserHandler} authenticatedUser={userstate}  />
                                                )
                                            })
                                        }
                                    
                                    </div>)
                                    :  <div className='w-full h-1/2  bg-slate-50 bg-opacity-30 flex items-center justify-center' > <span className='font-[700] text-xl text-white p-6 bg-gray-700 h-fit rounded-md ' >There is no following user</span> </div>
                                }
                            </>
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

export default isAuthenticatedPanel(UserPanelFollowing);