import React , { useState }   from "react";
import { useNavigate , Link }  from 'react-router-dom'; 


//import Api
import NodejsApi from 'src/Api/NodejsApi'; 


// importing styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faEye , faEyeSlash , faBlog , faSpinner, faClose  } from '@fortawesome/free-solid-svg-icons'
import isAuthenticated from "src/Logics/isAuthenticated";




function LoginComponent({isAuthenticated}) {

    const navigate = useNavigate()
    // console.log(isAuthenticated)

    const  [ userState , setUserState ] = useState({
        email : '',
        password : '',
        rememberme : false
    })

    const [loading , setLoading ] = useState(false)
    const [ validation , setValidation ] = useState({
        close : true ,
        success : true,
        messages : [],
        fullMessages : []
    })

    let formHandler = (e) => {
        setLoading(true)
        e.preventDefault();

        let user = userState

        NodejsApi.post('/auth/login' , user , {
            withCredentials : true ,
            
        })
            .then(response =>  {

                console.log(response)

                if(! response.data.success){

                    setLoading(false)
                    setValidation(prevState => {
                        return {
                            ...prevState,
                            close : false,
                            success : false ,
                            fullMessages : response.data.fullMessages,
                            messages : response.data.messages
                        }
                    })
                    

                } else if(response.data.success){
                    console.log('result = true')
                    if(response.data.messages){
                        setValidation(prevState => {
                            return {
                                ...prevState,
                                close : false,
                                success : true,
                                messages : response.data.messages
                            }
                        })
                    } else {
                        setValidation({
                            success : true,
                            messages : []
                        })
                    }
                    setLoading(false)
                    navigate('/')

                }
            })
            .catch(err => { 
                console.log(err)
                setValidation({
                    success : false,
                    messages : err.message
                })
                setLoading(false)
            })

    }  

    let inputHandler = (e) => {
        e.preventDefault();
        let name = e.target.name
        let value = e.target.value

        setUserState(prevState => {
            return {
                ...prevState,
                [name] : value
            }
        })

    }

    let checkHandler = () => {
        setUserState(prevState => {
            return {
                ...prevState,
                rememberme : !prevState.rememberme
            }
        })
    }

    let showPassHandler = (e) => {

        let eyeIcon =  document.getElementById('openEyeIcon')
        let slashEyeIcon =  document.getElementById('closeEyeIcon')
        let input = document.getElementById('passwordInput')        

        if(input.type === 'password'){

            input.type = 'text'

            eyeIcon.classList.remove('flex')
            eyeIcon.classList.add('hidden')


            slashEyeIcon.classList.remove('hidden')
            slashEyeIcon.classList.add('flex')

        } else {

            input.type = 'password' 

            
            eyeIcon.classList.add('flex')
            eyeIcon.classList.remove('hidden')

            slashEyeIcon.classList.add('hidden')
            slashEyeIcon.classList.remove('flex')

        }
    }

    // console.log(validation)

    return (
        <div className="w-full h-full flex md:py-4 dark:border-none overflow-y-scroll bg-gradient-to-r from-[#3E5151] to-[#DECBA4] " >
            
            {
                loading ?
                (                
                <div className="w-full h-ill flex items-center justify-center  fixed  z-50 bg-slate-400  bg-opacity-20 "  >
                    <FontAwesomeIcon icon={faSpinner} className="text-4xl text-black text-center animate-spin " />
                </div>
                ) :
                <div className="w-full h-ill hidden items-center justify-center    z-50 bg-slate-400  bg-opacity-20 "  >
                    <FontAwesomeIcon icon={faSpinner} className="text-4xl text-black text-center animate-spin " />
                </div>
            }

            {
                !validation.close ?
                !validation.success ?
                ( 
                    <div  className={`h-screen w-screen ${validation.close ? "hidden" : "flex"}  items-center justify-center z-50 fixed top-0 left-0 bg-slate-400 bg-opacity-50  `} onClick={e => setValidation( prevState => {
                            return {
                                ...prevState,
                                close : true
                            }
                        }) }>
                        <div className="w-fit h-fit flex font-[Vazir] peer/validation leading-8   flex-col self-center m-auto items-center p-4 bg-red-600  border border-solid border-red-300 rounded-md" id="validation" >
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
                ! (validation.messages.length === 0)  
                ?  ( 
                    <div onClick={e => setValidation( prevState => {
                        return {
                            ...prevState,
                            close : true
                        }
                    }) } className={`h-screen w-screen ${validation.close ? "hidden" : "flex"}  items-center justify-center z-50 fixed top-0 left-0 bg-slate-400 bg-opacity-50 "`} >
                        <div className="w-fit h-fit flex font-[Vazir] peer/validation leading-8   flex-col self-center m-auto items-center z-50 fixed left-1/4 p-4 bg-green-600  border border-solid border-green-300 rounded-md" id="validation" >
                            <span className="text-md rtl text-white flex flex-row items-center" >{validation.messages}</span>
                        </div>
                    </div>
                ) 
                : ('')
                :(
                    ''
                )
                
            }
            
            
            <div className="w-[500px]   h-fit font-[Vazir] flex flex-col items-center justify-center self-center justify-self-center dark:border-none border  border-solid  border-[#476b7a] drop-shadow-lg   rounded-md bg-white   m-auto">
                
                <a href="/" className="flex items-center justify-center text-center text-white w-full mb-3 text-4xl bg-gradient-to-r from-[#0F2027] via-[#203A43] to-[#2C5364] dark:border-none border-b-2 border-solid border-[#0F2027]  rounded-t-md  h-32" >
                    <FontAwesomeIcon  icon={faBlog} />  
                    <h2 className=' font-[Vazir] h-fit ml-2 ' >Weblog</h2>
                </a>

                <h3 className="item-self-start text-2xl w-full pl-4 font-bold " >login</h3>

                <form method="post" onSubmit={formHandler} className="w-full h-full p-4 border-b border-solid border-gray-200 flex flex-col items-start justify-center " >

                    <label className=" py-2  flex flex-col items-start w-full" >
                        <span className="h-fit text-zinc-500 mb-2 after:content-[':']" >email</span>
                        
                        <input onChange={inputHandler} value={userState.email} type="email" name="email" placeholder="type email here" required={false} autoFocus={true} className="peer/email w-full px-1 py-2 drop-shadow-md text-sm text-zinc-700 outline-none focus:border-blue-500 border border-solid border-black-500 focus:invalid:border-red-500 focus:invalid:text-red-500 invalid:border-red-500 rounded-sm  focus:valid:text-green-500 "  ></input>
                        <span className="mt-2 w-full px-4 py-2  text-red-800 bg-red-300 border border-solid border-red-200 rounded-sm  invisible peer-invalid/email:visible " >email should be valid</span>
                    </label>
                    <label className=" py-2  flex flex-col items-start w-full"  >

                        <div className="flex items-center justify-between h-fit w-full mb-2" >
                            <span className="text-zinc-500  after:content-[':']" >password</span>
                            {/* <a href="/auth/forgotPassword"  >Are you forgot your password? </a> */}
                            <Link  to={`/auth/forgotPassword?email=${userState.email}`}  className="text-blue-600 text-sm  underline">Are you forgot your password? ?</ Link>
                        </div>

                        
                        <div className="relative w-full " >
                            <input onChange={inputHandler} value={userState.password}  type="password" id="passwordInput" name="password" placeholder="type password here" required={false} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" className="peer/password relativetext-zinc-700  drop-shadow-md w-full px-1 py-2 text-sm outline-none focus:border-blue-500 border border-solid border-black-500 rounded-sm invalid:text-red-500 focus:invalid:border-red-500 invalid:border-red-500 focus:valid:text-green-500  "  ></input>
                            <p className="leading-5 mt-2 w-full px-2 py-1 text-sm      text-blue-800 bg-blue-300 border border-solid border-blue-200 rounded-sm invisible  peer-focus/password:visible" >password should be at least 8 character contain at least 1 character small letter , capital letter and number</p>
                            
                            <button type="button" className="absolute right-2 top-2.5 " onClick={showPassHandler} >
                                <FontAwesomeIcon id="openEyeIcon" icon={faEye} className="flex" />
                                <FontAwesomeIcon id="closeEyeIcon" icon={faEyeSlash} className="hidden" />
                            </button>

                        </div>

                    </label>
                    <div className="flex items-center" >
                        
                       <input type="checkbox" name="rememberme" checked={userState.rememberme} onChange={checkHandler}   />
                       <span className="text-sm text-zinc-500" >Remember me</span> 

                    </div>
                    <div className="grid grid-cols-1 divide-y w-full ">
                        <button type="submit" className="w-full hover:opacity-70 mt-2 drop-shadow-lg text-lg text-white bg-cyan-600 border border-solid  border-cyan-500 py-3 px-4 rounded-md self-center" >sign in</button>
                        <button type="button" className="w-full hover:opacity-70 my-6 drop-shadow-lg  bg-red-500 text-white border border-solid border-red-300 py-4 px-4 rounded-md self-center " >
                            <a href="http://localhost:5000/auth/google"> 
                            <FontAwesomeIcon icon={faGoogle} />

                            <span className="ml-2 " >Sign in with Google</span>
                            </a>
                        </button>
                    </div>
                </form>


                <div className="flex flex-col w-full items-center p-4" >
                    <span>Does not have account ?</span>
                    <button type="submit" className="w-full mt-4 hover:opacity-70  text-lg drop-shadow-lg bg-white text-cyan-600 border border-solid  border-cyan-500 py-3 px-4 rounded-md self-center" >
                        <Link to="/auth/register" >sign up</Link>
                    </button>

                </div>



            </div>
        </div>
    )
    
}


export default isAuthenticated(LoginComponent , 'auth' ) ;