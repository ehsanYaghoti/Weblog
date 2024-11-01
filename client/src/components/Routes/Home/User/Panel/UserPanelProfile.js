import React , {useState , useEffect , useRef }  from 'react';

// import Contexts
// import authenticatedUserContext from 'src/Contexts/authenticatedUserContext';

// Layouts
// import Footer from 'src/components/Layouts/Home/Footer';
import GoTopBtn from 'src/components/Layouts/Home/General/GoTopBtn';
import SpinnerOnTop from 'src/components/Layouts/Home/Loadings/SpinnerOnTop';
import UserPanelHeader from 'src/components/Layouts/Home/User/UserPanelHeader';
import UserPanelNavbar from 'src/components/Layouts/Home/User/UserPanelNavbar';

//import Api
import NodejsApi from 'src/Api/NodejsApi'; 

// import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faClose, faW } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle  } from '@fortawesome/free-regular-svg-icons';
import { faGithub, faInstagram, faLinkedin, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import isAuthenticated from 'src/Logics/isAuthenticated';

function UserPanelProfile(props){
    
    const [authenticatedUser , setAuthenticatedUser ]  = useState({
        isAuthenticated : false,
        user : {
            username : '',
            avatar : null,
        }
    })

    const [user , setUser ]  = useState({
        username : '',
        avatar : '',
        fullname : '',
        email : '',
        about : '',
        profossional : '',
        birthDate : '',
        contact : [],
        roles : [],
    })

    const [imageInput , setImageInput] = useState({
        previewUrl : ''
    },)

    const [success , setSuccess] = useState({ state : true ,  message : ''})
    const [noContent , setNocontent] = useState({ state : true ,  message : ''})
    const [loading , setLoading] = useState(false)

    const [validation , setValidation] = useState({
        close : true,
        success : false,
        messages : [],
        result : false
    })

    const hiddenFileInput = useRef(null)

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

            
            setUser({
                ...user
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


    let formHandler = (e) => {
        e.preventDefault();
        setLoading(true)


        let formData = new FormData()
        formData.append('avatar' , user.avatar)
        formData.append('username' , user.username )
        formData.append('email' , user.email )
        formData.append('fullname' , user.fullname )
        formData.append('birthDate' , user.birthDate )
        formData.append('profossional' , user.profossional )
        formData.append('about' , user.about )

        formData.append('website' , user.website )
        formData.append('github' , user.github )
        formData.append('linkedin' , user.linkedin )
        formData.append('telegram' , user.telegram )
        formData.append('instagram' , user.instagram )
        formData.append('twitter' , user.twitter )



        console.log(formData)


        NodejsApi.put(`/user/panel/profile/${user._id}/update` , formData  , {headers : {'content-type' : 'multipart/form-data' }  } )
            .then(response =>  {
                
                if(! response.data.success){
                    setLoading(false)
                    return setValidation(prevState => {
                        return {
                            ...prevState,
                            success : false ,
                            close : false,
                            messages : response.data.messages,
                        }
                    })
                } 

                
                setSuccess(prevState => {
                    return {
                        state : response.data.success ,
                        message : ''
                    }
                })

                setValidation({
                    success : true,
                    result : true,
                    close : false,
                    messages : []
                })

                let data = response.data
                console.log(data)
                setLoading(false)

            })
            .catch(err => {  
                console.log(err)
                setSuccess({
                    state : false,
                    message : err.message
                })
                setLoading(false)
            })
    }

    let inputHandler = (e) => {
        e.preventDefault();
        let name = e.target.name
        let value = e.target.value

        setUser(prevState => {
            return {
                ...prevState,
                [name] : value
            }
        })
    }

    let handleFakeButton = (e) => {
        e.preventDefault()
        hiddenFileInput.current.click()
    }

    let imageHandler = (e) => {
        e.preventDefault();

        if (e.target.files && e.target.files[0]) {

            let img = e.target.files[0];

            if(user.avatarpath !== undefined || user.avatarpath !== null ){
                console.log('avatarpath')
                setUser(prevState => {
                    return {
                        ...prevState,
                        avatar : img,
                        avatarpath : null
                    }
                });
                setImageInput({
                    previewUrl : URL.createObjectURL(img)
                })
                return
            }

            console.log('avatar no')

            setUser(prevState => {
                return {
                    ...prevState,
                    avatar : img,
                }
            });
            setImageInput({
                previewUrl : URL.createObjectURL(img)
            })
        }
    }


    console.log(user)

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
                    {
                        !validation.close ?
                        !validation.success ?
                        ( 
                            <div className='h-full w-full bg-gray-400 bg-opacity-30 fixed flex items-center justify-center z-50 ' onClick={e => 
                                setValidation( prevState => {
                                    return {
                                        ...prevState,
                                        close : true
                                    }
                                }) } >
                                <div className="w-fit h-fit flex font-[Vazir] peer/validation leading-8   flex-col self-center m-auto items-center z-50 fixed p-4 bg-red-600  border border-solid border-red-300 rounded-md" id="validation" >
                                    <FontAwesomeIcon icon={faClose} className="hover:text-white text-lg self-end cursor-pointer peer-active/validation:hidden parent  " onClick={e => setValidation( prevState => {
                                        return {
                                            ...prevState,
                                            close : true
                                        }
                                    }) } /> 
                                    {
                                        Array.isArray(validation.messages) ?
                                        
                                        validation.messages.map((message , number = 0) => {
                                            return (
                                                <span className="text-md rtl text-white flex flex-row items-center" style={{direction : "rtl"}} key={number} >{number+=1} - {message}</span>
                                            )
                                        })
                                        : ( <span className="text-md rtl text-white flex flex-row items-center" >{validation.messages}</span> )

                                    }
                                </div>
                            </div>
                        )  :
                        (
                            validation.result ? 
                            (
                                <div className='h-full w-full bg-gray-400 bg-opacity-30 fixed flex items-center justify-center z-50 ' onClick={e => 
                                    setValidation( prevState => {
                                        return {
                                            ...prevState,
                                            close : true
                                        }
                                    }) } >
                                    <div className="w-fit h-fit flex font-[Vazir] peer/validation leading-8   flex-col self-center m-auto items-center z-50 fixed p-4 bg-green-600  border border-solid border-green-300 rounded-md" id="validation" >
                                        <FontAwesomeIcon icon={faClose} className="hover:text-white text-lg self-end cursor-pointer peer-active/validation:hidden parent  " onClick={e => 
                                        setValidation( prevState => {
                                            return {
                                                ...prevState,
                                                close : true
                                            }
                                        }) } /> 
                                        <span className="text-md rtl text-white" >
                                            Editing the user has been successful<br/>
                                            check the <a href={`/user/dashboard/${user._id}`} className=' underline text-blue-400 font-[600]' >Dashboard</a>
                                        </span>
                                    </div>
                                </div>

                            )
                            : ''
                        ) : 
                        ('')
                    }
                    <UserPanelHeader user={authenticatedUser} userNavbar={user} />
                    <main className='flex flex-row items-center w-full h-fit min-h-screen gap-10 pl-0 font-["Nunito"]  bg-gradient-to-br from-30% from-slate-100 to-70% to-slate-300 dark:bg-gradient-to-t dark:from-10% dark:from-slate-600 dark:to-90% dark:to-slate-800 dark:text-gray-50' >

                        <UserPanelNavbar user={user} />
                        
                        { ! noContent.state ? <span className='' >{noContent.message}</span> :
                        (
                            <div className='w-full px-4 py-8 lg:w-[80%] lg:pl-8 lg:ml-[25%] xl:ml-[20%] lg:mx-4 ' >
                                
                            <form onSubmit={formHandler} autoComplete='on' className='flex flex-col items-center lg:items-start w-full gap-8 p-6 my-4 mr-6  border border-solid border-gray-300 rounded-md shadow-md bg-white dark:bg-slate-600/80 ' >
                                
                                <h2 className='h-fit font-[700] self-start text-xl lg:text-2xl text-gray-700 dark:text-gray-50 whitespace-nowrap ' >• Account informations</h2>

                                {/* user avatar edit */}
                                <div className='flex items-center justify-center relative text-gray-600 dark:text-gray-50 w-32 h-32 ring-4 ring-green-300 rounded-full' >
                                    {
                                        user.avatar === null ?
                                        <>
                                        <FontAwesomeIcon icon={faUserCircle} className='text-gray-300 dark:text-gray-400 text-2xl font-[400] h-full w-full '  />
                                        <input  type='file' accept='image/*'  className='hidden'  ref={hiddenFileInput}  onChange={imageHandler} name='image' placeholder='insert your picture here...'/>
                                        <button onClick={handleFakeButton} className='h-full w-full text-white dark:text-gray-50 rounded-full absolute flex items-center overflow-hidden justify-center bg-gray-300 bg-opacity-50' >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 font-light">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                                            </svg>
                                        </button>
                                        </>
                                        : 
                                        <>
                                            <input  type='file' accept='.gif,.jpg,.jpeg,.GIF,.png,.PNG,.JPG,.JPEG,.bmp,.BMP'  className='hidden'  ref={hiddenFileInput}  onChange={imageHandler} name='image' placeholder='insert your picture here...'/>
                                            <div onClick={handleFakeButton}  className='h-full w-full rounded-full overflow-hidden bg-contain' >
                                                <img src={user.avatarpath ? `${process.env.REACT_APP_API_URL}/${user.avatarpath}` : `${imageInput.previewUrl}` }
                                                className='h-32 w-32 rounded-full object-cover hover:scale-110 scale-105 transition-all duration-500 z-50 ' alt='avatar' />
                                            </div>
                                            <button onClick={handleFakeButton} className='h-full w-full rounded-full absolute z-10 hover:scale-110 transition-all duration-300 flex items-center overflow-hidden justify-center bg-gray-300 bg-opacity-0 text-white' >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 font-light">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                                                </svg>
                                            </button>
                                        </>
                                        
                                        // .gif,.jpg,.jpeg,.GIF,.png,.PNG,.JPG,.JPEG,.bmp,.BMP
                                        // <img src={`${process.env.REACT_APP_API_URL}/public/${user.avatar}`} alt={`${user.username}`} />
                                    }
                                </div>
                                    
                            
                                {/* email  and fullname edit */}
                                <div className='w-full flex flex-col lg:flex-row items-center justify-between gap-8' >
                                    <label className='flex flex-col items-start gap-4 w-full lg:w-1/2' >
                                        <span className='h-fit whitespace-nowrap font-[500] text-lg text-gray-800 dark:text-gray-50' >Full name :</span>
                                        <input value={user.fullname}  onChange={inputHandler} name='fullname' className='w-full bg-blue-gray-300 border border-solid border-blue-500 border-opacity-20 focus:border-opacity-100 focus:bg-blue-700 dark:focus:bg-blue-200 dark:focus:text-black focus:bg-opacity-10 bg-opacity-10 px-6 py-3  rounded-md shadow-md outline-none text-gray-800 text-base font-[600] placeholder:text-gray-700 placeholder:font-[600]'  type="text" placeholder='type here...' />
                                    </label>

                                    <label className='flex flex-col items-start gap-4 w-full lg:w-1/2' >
                                        <span className='h-fit whitespace-nowrap font-[500] text-lg text-gray-800 dark:text-gray-50' >Email :</span>
                                        <input value={user.email}  onChange={inputHandler} name='email' className='w-full bg-blue-gray-300 border border-solid border-blue-500 border-opacity-20 focus:border-opacity-100 focus:bg-blue-700  dark:focus:bg-blue-200 dark:focus:text-black focus:bg-opacity-10 bg-opacity-10 px-6 py-3 rounded-md shadow-md outline-none text-gray-800 text-base font-[600] placeholder:text-gray-700 placeholder:font-[600]'  type="text" placeholder='type here...' />
                                    </label>
                                </div>

                                {/* username edit */}
                                <label className='flex flex-col items-start gap-4 w-full lg:w-1/2' >
                                        <span className='h-fit whitespace-nowrap font-[500] text-lg text-gray-800 dark:text-gray-50' >Username :</span>
                                        <input value={user.username}  onChange={inputHandler} name='username' className='w-full bg-blue-gray-300 border border-solid border-blue-500 border-opacity-20 focus:border-opacity-100 focus:bg-blue-700  dark:focus:bg-blue-200 dark:focus:text-black focus:bg-opacity-10 bg-opacity-10 px-6 py-3 rounded-md shadow-md outline-none text-gray-800 text-base font-[600] placeholder:text-gray-700 placeholder:font-[600]'  type="text" placeholder='type here...' />
                                </label>

                                <h2 className='h-fit font-[800] self-start text-xl lg:text-2xl text-gray-700 dark:text-gray-100' >• Personal informations</h2>

                                {/* birthDate  and profossional edit */}
                                <div className='w-full flex flex-col lg:flex-row items-center justify-between gap-8' >
                                    <label className='flex flex-col items-start gap-4 w-full lg:w-1/2' >
                                        <span className='h-fit whitespace-nowrap font-[500] text-lg text-gray-800 dark:text-gray-50' >Birth Date :</span>
                                        <input value={user.birthDate}  onChange={inputHandler} name='birthDate' className='w-full bg-blue-gray-300 border border-solid border-blue-500 border-opacity-20 focus:border-opacity-100 focus:bg-blue-700  dark:focus:bg-blue-200 dark:focus:text-black focus:bg-opacity-10 bg-opacity-10 px-6 py-3 rounded-md shadow-sm outline-none text-gray-700 placeholder:text-gray-700 placeholder:font-[600] text-base font-[500]'  type="Date" placeholder='type here...' />
                                    </label>

                                    <label className='flex flex-col items-start gap-4 w-full lg:w-1/2' >
                                        <span className='h-fit whitespace-nowrap font-[500] text-lg text-gray-800 dark:text-gray-50' >Title of profossional or Job :</span>
                                        <input value={user.profossional}  onChange={inputHandler} name='profossional' className='w-full bg-blue-gray-300 border border-solid border-blue-500 border-opacity-20 focus:border-opacity-100 focus:bg-blue-700  dark:focus:bg-blue-200 dark:focus:text-black focus:bg-opacity-10 bg-opacity-10 px-6 py-3  rounded-md shadow-sm outline-none text-gray-700 placeholder:text-gray-700 placeholder:font-[600] text-base font-[500]'  type="text" placeholder='type here...' />
                                    </label>
                                </div>

                                <label className='flex flex-col items-start gap-4 w-full' >
                                    <span className='h-fit whitespace-nowrap font-[500] text-lg text-gray-800 dark:text-gray-50' >About me : </span>
                                    <textarea cols="30" rows="4" value={user.about} name='about' onChange={inputHandler} placeholder='type here...' className='w-full bg-blue-gray-300 leading-8 border border-solid border-blue-500 border-opacity-20 focus:border-opacity-100 focus:bg-blue-700  dark:focus:bg-blue-200 dark:focus:text-black focus:bg-opacity-10 bg-opacity-10 p-4 text-gray-700 outline-none placeholder:text-gray-700 placeholder:font-[600]  rounded-md shadow-sm '></textarea>
                                </label>

                                <h2 className='h-fit font-[800] self-start text-xl lg:text-2xl text-gray-700 dark:text-gray-100' >• Contact informations</h2>

                                {/* contact ways */}
                                <div className='grid grid-cols-1 lg:grid-cols-2  grid-rows-3 w-full gap-x-10 gap-y-6  ' >

                                    <label className='flex flex-col items-start gap-4' >
                                            <span className='h-fit whitespace-nowrap font-[500] text-lg text-gray-800 dark:text-gray-50' >
                                                <FontAwesomeIcon icon={faW} className='mr-2' />
                                                Personal Website
                                            </span>
                                            <input value={user.website}  onChange={inputHandler} name='website' className='w-full bg-blue-gray-300 border border-solid border-blue-500 border-opacity-20 focus:border-opacity-100 focus:bg-blue-700  dark:focus:bg-blue-200 dark:focus:text-black focus:bg-opacity-10 bg-opacity-10 px-6 py-3  rounded-md shadow-sm outline-none text-gray-700 placeholder:text-gray-700 placeholder:font-[600] text-base font-[500]'  type="text" placeholder='https://weblog.ir/...' />
                                    </label>

                                    <label className='flex flex-col items-start gap-4' >
                                            <span className='h-fit whitespace-nowrap font-[500] text-lg text-gray-800 dark:text-gray-50' >
                                                <FontAwesomeIcon icon={faGithub} className='mr-2'  />
                                                Github
                                            </span>
                                            <input value={user.github}  onChange={inputHandler} name='github' className='w-full bg-blue-gray-300 border border-solid border-blue-500 border-opacity-20 focus:border-opacity-100 focus:bg-blue-700  dark:focus:bg-blue-200 dark:focus:text-black focus:bg-opacity-10 bg-opacity-10 px-6 py-3  rounded-md shadow-sm outline-none text-gray-700 placeholder:text-gray-700 placeholder:font-[600] text-base font-[500]'  type="text" placeholder='https://github.com/...' />
                                    </label>

                                    <label className='flex flex-col items-start gap-4' >
                                            <span className='h-fit whitespace-nowrap font-[500] text-lg text-gray-800 dark:text-gray-50' >
                                                <FontAwesomeIcon icon={faLinkedin} className='mr-2' />
                                                Linkedin
                                            </span>
                                            <input value={user.linkedin}  onChange={inputHandler} name='linkedin' className='w-full bg-blue-gray-300 border border-solid border-blue-500 border-opacity-20 focus:border-opacity-100 focus:bg-blue-700  dark:focus:bg-blue-200 dark:focus:text-black focus:bg-opacity-10 bg-opacity-10 px-6 py-3  rounded-md shadow-sm outline-none text-gray-700 placeholder:text-gray-700 placeholder:font-[600] text-base font-[500]'  type="text" placeholder='https://weblog.ir/...' />
                                    </label>

                                    <label className='flex flex-col items-start gap-4' >
                                            <span className='h-fit whitespace-nowrap font-[500] text-lg text-gray-800 dark:text-gray-50' >
                                                <FontAwesomeIcon icon={faTelegram} className='mr-2' />
                                                Telegram
                                            </span>
                                            <input value={user.telegram}  onChange={inputHandler} name='telegram' className='w-full bg-blue-gray-300 border border-solid border-blue-500 border-opacity-20 focus:border-opacity-100 focus:bg-blue-700  dark:focus:bg-blue-200 dark:focus:text-black focus:bg-opacity-10 bg-opacity-10 px-6 py-3  rounded-md shadow-sm outline-none text-gray-700 placeholder:text-gray-700 placeholder:font-[600] text-base font-[500]'  type="text" placeholder='https://weblog.ir/...' />
                                    </label>

                                    <label className='flex flex-col items-start gap-4' >
                                            <span className='h-fit whitespace-nowrap font-[500] text-lg text-gray-800 dark:text-gray-50' >
                                                <FontAwesomeIcon icon={faInstagram} className='mr-2' />
                                                Instagram
                                            </span>
                                            <input value={user.instagram}  onChange={inputHandler} name='instagram' className='w-full bg-blue-gray-300 border border-solid border-blue-500 border-opacity-20 focus:border-opacity-100 focus:bg-blue-700  dark:focus:bg-blue-200 dark:focus:text-black focus:bg-opacity-10 bg-opacity-10 px-6 py-3  rounded-md shadow-sm outline-none text-gray-700 placeholder:text-gray-700 placeholder:font-[600] text-base font-[500]'  type="text" placeholder='https://weblog.ir/...' />
                                    </label>

                                    <label className='flex flex-col items-start gap-4' >
                                            <span className='h-fit whitespace-nowrap font-[500] text-lg text-gray-800 dark:text-gray-50' >
                                                <FontAwesomeIcon icon={faTwitter} className='mr-2' />
                                                Twitter
                                            </span>
                                            <input value={user.twitter}  onChange={inputHandler} name='twitter' className='w-full bg-blue-gray-300 border border-solid border-blue-500 border-opacity-20 focus:border-opacity-100 focus:bg-blue-700  dark:focus:bg-blue-200 dark:focus:text-black focus:bg-opacity-10 bg-opacity-10 px-6 py-3  rounded-md shadow-sm outline-none text-gray-700 placeholder:text-gray-700 placeholder:font-[600] text-base font-[500]'  type="text" placeholder='https://weblog.ir/...' />
                                    </label>

                                </div>
                                
                                
                                
                                <div className='flex items-center justify-center lg:justify-end w-full gap-4 mt-8' >
                                    <button type='submit' className='px-5 py-2 bg-cyan-400 text-white hover:opacity-80 text-lg font-[600] border border-solid border-gray-300 rounded-md drop-shadow-sm focus:ring-2 focus:ring-cyan-500' >Set changes</button>
                                </div>
                                

                            </form>
                        </div>)}

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

export default isAuthenticated(UserPanelProfile , 'panel'); 