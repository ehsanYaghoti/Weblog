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
import CardTag from 'src/components/Layouts/Home/Cards/CardTag';


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
            _id : '',
            username : '',
            avatar : null,
            likes : [],
            followers : [],
            followings : [],
            roles : [],
            createdAt : '',
            tags : []
        }
    })


    const [success , setSuccess] = useState({ state : true ,  message : ''})
    const [noContent , setNocontent] = useState({ state : true ,  message : ''})
    const [loading , setLoading] = useState(false)
    const [buttonLoading  , setButtonLoading] = useState(false)

    const {id} =  useParams()

    useEffect(() => {
        setLoading(true)
        NodejsApi.get(`${process.env.REACT_APP_API_URL}/user/dashboard/${id}`)
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

    let followTagHandler = (e , id , followed , page = 'userDashboard' , moredate = userstate.user._id) =>{
        e.preventDefault()

        setButtonLoading(true)

        let data ={
            id,
            page,
            moredate
        }
        if(followed){
            console.log('unfollow')
            NodejsApi.put(`/tags/unfollow/${id}` , data)
            .then(response =>{
                console.log(response.data)
                if(response.data.success){

                    let data = response.data
                    let tags = data.tags
                    console.log(tags)

                    
                    if(tags){
                        console.log('defined tags')

                        setUserState(prevState => {
                            return {
                                ...prevState,
                                user : {
                                    ...prevState.user,
                                    tags : [
                                        ...tags
                                    ]
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
            NodejsApi.put(`/tags/follow/${id}` , data)
            .then(response =>{
                console.log(response.data)
                if(response.data.success){
                    let data = response.data  
                    let tags = data.tags
                    
                    if(tags){
                        console.log('defined tags')
                        setUserState(prevState => {
                            return {
                                ...prevState,
                                user : {
                                    ...prevState.user,
                                    tags : [
                                        ...tags
                                    ]
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
                            {/* all tags cards */}
                            <div className='grid grid-cols-1 justify-items-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 grid-rows-2 gap-6 w-full mb-8' >
                            {
                            ! noContent.state ? 
                            <span className='' >{noContent.message}</span>
                            : (
                                userstate.user.tags.map(tag => {
                                    return (
                                        // tag card
                                        <CardTag key={tag._id} tag={tag} buttonLoading={buttonLoading} followTagHandler={followTagHandler} singlePage={false} />
                                    )
                                })
                            )
                            }
                            </div>
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