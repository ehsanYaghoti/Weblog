import React , {useState , useEffect}   from "react";
import { useNavigate , useLocation }  from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye , faEyeSlash , faBlog , faSpinner, faClose } from '@fortawesome/free-solid-svg-icons'
import isAuthenticatedAuth from "src/Logics/isAuthenticatedAuth";

//import Api
import NodejsApi from 'src/Api/NodejsApi'; 



function ResetPasswordComponent(props) {

    const navigate = useNavigate()

    const  [ userState , setUserState ] = useState({
        email : '',
        password : '',
        confirmpassword : '',
        token : ''
    })

    const [loading , setLoading ] = useState(false)
    const [ validation , setValidation ] = useState({
        close : true ,
        success : true,
        messages : [],
        fullMessages : []
    })

    const search = useLocation().search
    // const searchParams = new URLSearchParams(search)

    useEffect(() => {
        const searchParams = new URLSearchParams(search)
        setUserState( prevState => {
            return {
                ...prevState,
                token : searchParams.get('token'),
                email : searchParams.get('email')
            }
        })
    } , [search])

    let showPassHandler = (e) => {

        let eyeIcon =  document.getElementById('openEyeIcon')
        let slashEyeIcon =  document.getElementById('closeEyeIcon')
        let eyeIcon2 =  document.getElementById('openEyeIcon2')
        let slashEyeIcon2 =  document.getElementById('closeEyeIcon2')
        let input = document.getElementById('passwordInput')
        let input2 = document.getElementById('passwordInput2')        

        if(input.type === 'password'){

            input.type = 'text'
            input2.type = 'text'


            eyeIcon.classList.remove('flex')
            eyeIcon.classList.add('hidden')

            slashEyeIcon.classList.remove('hidden')
            slashEyeIcon.classList.add('flex')

            eyeIcon2.classList.remove('flex')
            eyeIcon2.classList.add('hidden')

            slashEyeIcon2.classList.remove('hidden')
            slashEyeIcon2.classList.add('flex')

        } else {

            input.type = 'password' 
            input2.type = 'password'

            
            eyeIcon.classList.add('flex')
            eyeIcon.classList.remove('hidden')

            slashEyeIcon.classList.add('hidden')
            slashEyeIcon.classList.remove('flex')

            eyeIcon2.classList.add('flex')
            eyeIcon2.classList.remove('hidden')

            slashEyeIcon2.classList.add('hidden')
            slashEyeIcon2.classList.remove('flex')

        }
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

    let formHandler = (e) => {
        setLoading(true)
        e.preventDefault();

        let user = userState
        if(! (user.password === user.confirmpassword) ){
            setValidation( prevState => {
                return{
                ...prevState,
                close : false ,
                success : false,
                messages : 'passwords are not equal'
                }
            })
            return setLoading(false)
        } else if(user.password === user.confirmpassword){

            NodejsApi.post('/auth/password/reset' , user , {
                withCredentials : true ,        
            })
            .then(response =>  {

                console.log(response)

                if(! response.data.success){

                    setLoading(false)
                    setValidation({
                        success : false ,
                        fullMessages : response.data.fullMessages,
                        messages : response.data.messages
                    })
                    

                } else if(response.data.success){
                    if(! (response.data.messages.length  === 0)){
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
                    setTimeout(() => {
                        setLoading(false)
                        navigate('/auth/login')    
                    }, 5000);

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

    } 



    

    return (
        <div className="w-full h-full flex py-4 overflow-y-scroll bg-gradient-to-r from-[#3E5151] to-[#DECBA4] " >
            
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
                    })}
                    >
                        <div className="w-fit h-fit flex font-[Vazir] peer/validation leading-8   flex-col self-center m-auto items-center  p-4 bg-red-600  border border-solid border-red-300 rounded-md" id="validation" >
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
                   ! (validation.messages.length === 0 ) 
                   ?  ( 
                    <div  className={`h-screen w-screen ${validation.close ? "hidden" : "flex"}  items-center justify-center z-50 fixed top-0 left-0 bg-slate-400 bg-opacity-50  `} onClick={e => setValidation( prevState => {
                        return {
                            ...prevState,
                            close : true
                        }
                    })}
                    >
                        <div className="w-fit h-fit flex font-[Vazir] peer/validation leading-8   flex-col self-center m-auto items-center  p-4 bg-green-600  border border-solid border-green-300 rounded-md" id="validation" >
                            <span className="text-md rtl text-white flex flex-row items-center" >{validation.messages}</span>
                        </div>
                    </div>
                   ) 
                   : ('')
                : 
                (
                    ''
                )
                
            } 
            
            
            
            
            <div className="w-[500px]   h-fit font-[Vazir] flex flex-col items-center justify-center self-center justify-self-center border  border-solid  border-[#476b7a] drop-shadow-lg   rounded-md bg-white   m-auto">
            
                <a href="/" className="flex items-center justify-center text-center text-white w-full mb-3 text-4xl bg-gradient-to-r from-[#0F2027] via-[#203A43] to-[#2C5364] border-b-2 border-solid border-[#0F2027]  rounded-t-md  h-32" >
                    <FontAwesomeIcon  icon={faBlog} />  
                    <h2 className=' font-[Vazir] h-fit ml-2 ' >Weblog</h2>
                </a>      

                <h3 className="item-self-start text-2xl w-full pl-4 font-bold " >Enter your new password to change</h3>

                <form method="post" onSubmit={formHandler} className="w-full h-full p-4 border-b border-solid border-gray-200 flex flex-col items-start justify-center " >

                    <label  className=" py-2  flex flex-col items-start w-full" >
                        <span className="h-fit text-zinc-500 mb-2 after:content-[':']" >email</span>
                        
                        <input type="email" name="email" onChange={inputHandler} value={userState.email} autoFocus={true} placeholder="type email here" required={false} className="peer/email w-full px-1 py-2 drop-shadow-md text-sm text-zinc-700 outline-none border border-solid border-black-500 rounded-sm focus:border-blue-500  border-black-500 focus:invalid:border-red-500 focus:invalid:text-red-500 invalid:border-red-500  focus:valid:text-green-500 "  ></input>
                        <span className="mt-2 w-full px-4 py-2  text-red-800 bg-red-300 border border-solid border-red-200 rounded-sm  invisible peer-invalid/email:visible " >email should be valid</span>
                    </label>


                    <label className=" py-2  flex flex-col items-start w-full"  >
                        <span className="h-fit text-zinc-500 mb-2 after:content-[':']" >new password</span>
                        
                        <div className="relative w-full " >
                            <input  type="password" id="passwordInput2" name="password" onChange={inputHandler} placeholder="type new password here" required={false} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" className="peer/password relativetext-zinc-700  drop-shadow-md w-full px-1 py-2 text-sm outline-none focus:border-blue-500 border border-solid border-black-500 rounded-sm invalid:text-red-500 focus:invalid:border-red-500 invalid:border-red-500 focus:valid:text-green-500"  ></input>
                            <p className="leading-5 mt-2 w-full px-2 py-1 text-sm      text-blue-800 bg-blue-300 border border-solid border-blue-200 rounded-sm invisible  peer-focus/password:visible" >password should be at least 8 character contain at least 1 character small letter , capital letter and number</p>
                            <button type="button" className="absolute right-2 top-2.5 " onClick={showPassHandler} >
                                <FontAwesomeIcon id="openEyeIcon" icon={faEye} className="flex" />
                                <FontAwesomeIcon id="closeEyeIcon" icon={faEyeSlash} className="hidden" />
                            </button>

                        </div>

                    </label>
                    <input type="hidden" value={userState.token} />
                    <label className=" py-2  flex flex-col items-start w-full"  >
                        <span className="h-fit text-zinc-500 mb-2 after:content-[':']" >confirm new password</span>
                        
                        <div className="relative w-full " >
                            <input  type="password" id="passwordInput" name="confirmpassword" onChange={inputHandler} placeholder="type new password here" required={false} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" className="peer/password relativetext-zinc-700  drop-shadow-md w-full px-1 py-2 text-sm outline-none focus:border-blue-500 border border-solid border-black-500 rounded-sm invalid:text-red-500 focus:invalid:border-red-500 invalid:border-red-500 focus:valid:text-green-500"  ></input>
                            <p className="leading-5 mt-2 w-full px-2 py-1 text-sm      text-blue-800 bg-blue-300 border border-solid border-blue-200 rounded-sm invisible  peer-focus/password:visible" >password should be at least 8 character contain at least 1 character small letter , capital letter and number</p>
                            
                            <button type="button" className="absolute right-2 top-2.5 " onClick={showPassHandler} >
                                <FontAwesomeIcon id="openEyeIcon2" icon={faEye} className="flex" />
                                <FontAwesomeIcon id="closeEyeIcon2" icon={faEyeSlash} className="hidden" />
                            </button>

                        </div>

                    </label>
                    <div className="grid grid-cols-1 divide-y w-full ">
                        <button type="submit" className="w-full mt-2 drop-shadow-lg hover:bg-opacity-70 text-lg text-white bg-cyan-600 border border-solid  border-cyan-500 py-3 px-4 rounded-md self-center" >Rest password</button>
                    </div>
                </form>


            </div>
        </div>
    )
    
}


export default isAuthenticatedAuth(ResetPasswordComponent);