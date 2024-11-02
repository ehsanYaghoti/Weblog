import React , {useState , useEffect }  from 'react';
import { useParams  } from 'react-router-dom';


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
            roles : [],
            followersCount : 0,
            followingsCount : 0,
            createdAt : '',
            followedByThisuser : false,
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
                                    followers : user.followers,
                                    followings : user.followings,
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
                                    followers : user.followers,
                                    followings : user.followings,
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
                            <CardUserInfo  userstate={userstate}  buttonLoading={buttonLoading}followUserHandler={followUserHandler} authenticatedUser={authenticatedUser} />
                            {/* user works count info */}
                            <div className='relative flex  items-center  w-full h-fit bg-white dark:bg-slate-600/80 dark:text-gray-50 py-6  border border-solid border-gray-300 rounded-md shadow-md' >
                                <i className="flex w-1 h-11 bg-blue-700 absolute left-0 rounded-tr-full rounded-br-full top-1/2 transform -translate-y-1/2 " ></i>
                                <div className='flex flex-col gap-6 lg:flex-row  items-center justify-center w-full h-fit lg:divide-x divide-gray-400' >
                                    <button type='button' className='flex items-center px-6 cursor-text'>
                                        <span className='text-xl font-[500] text-gray-600 dark:text-gray-50' >Articles Count</span>
                                        <span className='ml-2 text-2xl font-[700] font-["Ubuntu"] text-gray-900 dark:text-white' >{userstate.user.articlesCount}</span>
                                    </button>
                                    <button type='button' className='flex items-center px-6 cursor-text'>
                                        <span  className='text-xl font-[500] text-gray-600 dark:text-gray-50' >Podcasts Count</span>
                                        <span className='ml-2 text-2xl font-[700] font-["Ubuntu"] text-gray-900 dark:text-white' >{userstate.user.podcastsCount}</span>
                                    </button>
                                    <button type='button' className='flex items-center px-6 cursor-text'>
                                        <span  className='text-xl font-[500] text-gray-600 dark:text-gray-50' >Posts Count</span>
                                        <span className='ml-2 text-2xl font-[700] font-["Ubuntu"] text-gray-900 dark:text-white' >{userstate.user.postsCount}</span>
                                    </button>
                                    <button type='button' className='flex items-center px-6 cursor-text'>
                                        <span  className='text-xl font-[500] text-gray-600 dark:text-gray-50' >Answers Count</span>
                                        <span className='ml-2 text-2xl font-[700] font-["Ubuntu"] text-gray-900 dark:text-white' >{userstate.user.answersCount}</span>
                                    </button>
                                    <button type='button' className='flex items-center px-6 cursor-text'>
                                        <span  className='text-xl font-[500] text-gray-600 dark:text-gray-50' >Best Answers Count</span>
                                        <span className='ml-2 text-2xl font-[700] font-["Ubuntu"] text-gray-900 dark:text-white' >{userstate.user.bestAnswersCount}</span>
                                    </button>
                                </div>
                                <i className="flex w-1 h-11 bg-blue-700 absolute right-0 rounded-tl-full rounded-bl-full top-1/2 transform -translate-y-1/2 " ></i>
                            </div>
                            {/* user about me or (posts and answers or articles and podcasts if user is a writer admin) */}
                            {
                                userstate.user.about === null ?
                                ''
                                : (
                                <div className='relative flex items-center  w-full h-fit bg-white dark:bg-slate-600/80  py-6  border border-solid border-gray-300 rounded-md shadow-md' >
                                    <i className="flex w-1 h-11 bg-blue-700 absolute left-0 rounded-tr-full rounded-br-full top-1/2 transform -translate-y-1/2 " ></i>
                                    <div className='flex flex-col gap-4 px-6 py-4' >
                                        <h3 className='h-fit flex items-center text-blue-700 dark:text-gray-50 font-[700]' >
                                            {/* <FontAwesomeIcon icon={faCircleDot} className=' stroke-blue-gray-900' /> */}
                                            <span className="ml-2 text-2xl" >• About me</span>
                                        </h3>
                                        
                                        <p className='text-gray-600 dark:text-gray-50 whitespace-normal leading-8 text-lg font-[600] px-2' >
                                            {userstate.user.about}
                                        </p>
                                    </div>
                                    <i className="flex w-1 h-11 bg-blue-700 absolute right-0 rounded-tl-full rounded-bl-full top-1/2 transform -translate-y-1/2 " ></i>
                                </div>
                            )}
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