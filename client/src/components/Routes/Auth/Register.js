import React , { useState }   from "react";
import { Link, useNavigate }  from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faEye , faEyeSlash , faBlog , faSpinner, faClose } from '@fortawesome/free-solid-svg-icons'
import isAuthenticated from "src/Logics/isAuthenticated";

//import Api
import NodejsApi from 'src/Api/NodejsApi'; 



function RegisterComponent(props) {

    const navigate = useNavigate()

    const  [ userState , setUserState ] = useState({
        username : '',
        email : '',
        password : ''
    })
    const [loading , setLoading ] = useState(false)
    const [ validation , setValidation ] = useState({
        close : true ,
        success : true,
        messages : [],
        fullMessages : []
    })
    // const [formData , setFormData] = useState([])
    // const [swalProps, setSwalProps] = useState({});

    let formHandler = (e) => {

        setLoading(true)

        e.preventDefault();

        let user = userState

        NodejsApi.post('/auth/register' , user)
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
                console.log('result = true')
                setValidation({
                    success : true,
                    messages : []
                })
                setLoading(false)
                navigate('/')

            }
        })
        .catch(err => { 
            console.log(err)
            setLoading(false)
            return setValidation({
                success : false,
                messages : err.message
            })
        })

    }

    // const redirectHandler = () => {
    //     navigate('/')
    // }

    // let validationhandler = () => {
    //     let usernameField = document.getElementById('username')
    //     let emailField = document.getElementById('email')
    //     let passwordField = document.getElementById('passwordInput')

    //     let usernameSpan = document.getElementById('usernameSpan') 
    //     let emailSpan = document.getElementById('emailSpan') 
    //     let passwordSpan = document.getElementById('passwordSpan')
    //     // console.log('valid' + validation)
    //     validation.fullMessages.forEach(message => {
    //         console.log('path' + message.path)
    //         switch (message.path) {
    //             case 'username':
    //                 usernameField.classList.add("border-red-500" , "text-red-500" )
    //                 passwordSpan.classList.remove("peer-invalid/username:visible")
    //                 usernameSpan.classList.replace("invisble" , "visible")
    //                 usernameSpan.classList.add("border-red-500" , "text-red-600" , "bg-red-300" )
    //                 break;
    //             case 'email':
    //                 emailField.classList.add("border-red-500" , "text-red-600")
    //                 passwordSpan.classList.remove("peer-invalid/email:visible")
    //                 emailSpan.classList.replace("invisble" , "visible")
    //                 emailSpan.classList.add( "border-red-500" , "text-red-600")
    //                 break;
                    
    //             case 'password':
    //                 passwordField.classList.add("border-red-500" , "text-red-600" , "bg-transparent")
    //                 passwordSpan.classList.remove("peer-invalid/password:visible")
    //                 passwordSpan.classList.replace("invisble" , "visible")
    //                 passwordSpan.classList.add( "border-red-500" , "text-red-600" , "bg-red-300")
    //                 break;
                    
    //             default:
    //                 break;
    //         }
    //     })
    // }

    // console.log(validation)

    // let closeController = (e) => {
    //     this.setClose(true)
    // }

    // let sweetAlertHandler = () => {
    //     validation.messages.forEach(message => {
    //         console.log(message)
    //     })

    //     setSwalProps({
    //         show: true,
    //         title: 'Basic Usage',
    //         text: 'Hello World',
    //     });
    // }



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
    
    let showPassHandler = (e) => {

        let eyeIcon =  document.getElementById('openEyeIcon')
        let slashEyeIcon =  document.getElementById('closeEyeIcon')
        let input = document.getElementById('passwordInput')

        // console.log(icon.classList[1])
        

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





    

    return (
        <div className="w-full h-full flex relative pb-4 overflow-y-scroll bg-gradient-to-r from-[#3E5151] to-[#DECBA4] " >

            {
                loading ?
                (                
                <div className="w-full h-full flex items-center justify-center  fixed  z-50 bg-slate-400  bg-opacity-20 "  >
                    <FontAwesomeIcon icon={faSpinner} className="text-4xl text-black text-center animate-spin " />
                </div>
                ) :
                <div className="w-full h-full hidden items-center justify-center    z-50 bg-slate-400  bg-opacity-20 "  >
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
                        <div className="w-fit h-fit flex font-[Vazir] peer/validation leading-8   flex-col self-center m-auto items-center z-50 p-4 bg-red-600  border border-solid border-red-300 rounded-md" id="validation" >
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
                    ''
                ) : 
                (
                    ''
                )
                
            }
            


            {/* <button type="button" onClick={redirectHandler} >Home</button> */}

            <div className="w-[500px]   h-fit mt-4 font-[Vazir] flex flex-col items-center justify-center self-center justify-self-center border  border-solid  border-[#476b7a] drop-shadow-lg   rounded-md bg-white   m-auto">
            
                <a href="/" className="flex items-center justify-center text-center text-white w-full mb-3 text-4xl bg-gradient-to-r from-[#0F2027] via-[#203A43] to-[#2C5364] border-b-2 border-solid border-[#0F2027]  rounded-t-md  h-32" >
                    <FontAwesomeIcon  icon={faBlog} />  
                    <h2 className=' font-[Vazir] h-fit ml-2 ' >Weblog</h2>
                </a>

                <h3 className="item-self-start text-2xl w-full pl-4 font-bold " >create account</h3>

                <form method="post"    onSubmit={formHandler} className="w-full h-full p-4 border-b border-solid border-gray-200 flex flex-col items-start justify-center " >
                    <label className=" py-2 flex flex-col items-start justify-normal w-full" >
                        <span className="h-fit text-zinc-500 mb-2 after:content-[':']" >username</span>
                        
                        <input onChange={inputHandler} value={userState.username} type="text" name="username" id="username"  placeholder="type username here" autoFocus={true} min={5} minLength={5} max={15} maxLength={20}  className="peer/username drop-shadow-md invalid:text-red-500 focus:invalid:border-red-500  focus:out-of-range:text-red-500 focus:valid:border-green-500 focus:valid:text-green-500 valid:border-green-500 text-zinc-700 w-full px-1 py-2 text-sm  outline-none focus:border-blue-500 focus:out-of-range:border-red-500 border border-solid border-black-500 rounded-sm "  ></input>
                        <span id="usernameSpan" className="mt-2 w-full px-4 py-2   text-blue-800 bg-blue-300 border border-solid border-blue-200 rounded-sm invisible peer-focus/username:visible" >username should be at least 5 character</span>
                        
                    </label>
                    <label className=" py-2  flex flex-col items-start w-full" >
                        <span className="h-fit text-zinc-500 mb-2 after:content-[':']" >email</span>
                        
                        <input onChange={inputHandler} value={userState.email} type="email" name="email" id="email" placeholder="type email here"  className="peer/email  w-full px-1 py-2 drop-shadow-md text-sm text-zinc-700 outline-none focus:border-blue-500 border border-solid border-black-500 focus:invalid:border-red-500 focus:invalid:text-red-500 invalid:border-red-500 rounded-sm focus:valid:border-green-500 focus:valid:text-green-500 valid:border-green-500"  ></input>
                        <span id="emailSpan" className="mt-2 w-full px-4 py-2  text-red-800 bg-red-300 border border-solid border-red-200 rounded-sm  invisible peer-invalid/email:visible " >email should be valid</span>
                    </label>
                    <label className=" py-2  flex flex-col items-start w-full"  >
                        <span className="h-fit text-zinc-500 mb-2 after:content-[':']" >password</span>
                        
                        <div className="relative w-full " >
                            <input onChange={inputHandler} value={userState.password}  type="password" id="passwordInput" name="password" placeholder="type password here"  minLength={8}  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Eight or more characters"  className="peer/password relative text-zinc-700   drop-shadow-md w-full px-1 py-2 text-sm outline-none  border border-solid border-black-500 rounded-sm focus:border-blue-400 invalid:text-red-500 focus:invalid:border-red-500 focus:valid:text-green-500 focus:valid:border-green-500 valid:border-green-500 "  ></input>
                            <p id="passwordSpan" className="leading-5 mt-2 w-full px-2 py-1 text-sm      text-blue-800 bg-blue-300 border border-solid border-blue-200 rounded-sm invisible  peer-focus/password:visible peer-valid:border-green-500 peer-valid:text-green-500 peer-valid:bg-green-300  " >password should be at least 8 character contain at least 1 character small letter , capital letter and number</p>
                            
                            <button type="button" className="absolute right-2 top-2.5 " onClick={showPassHandler} >
                                <FontAwesomeIcon id="openEyeIcon" icon={faEye} className="flex" />
                                <FontAwesomeIcon id="closeEyeIcon" icon={faEyeSlash} className="hidden" />
                            </button>

                        </div>

                    </label>
                    <div className="grid grid-cols-1 divide-y w-full ">
                        <button type="submit" className="w-full hover:opacity-70 mt-2 drop-shadow-lg text-lg text-white bg-cyan-600 border border-solid  border-cyan-500 py-3 px-4 rounded-md self-center" >signup</button>
                        <button type="button" className="w-full hover:opacity-70 my-6 drop-shadow-lg  bg-red-500 text-white border border-solid border-red-300 py-4 px-4 rounded-md self-center " >
                            <a href="http://api.weblogg.ir/auth/google"> 
                            <FontAwesomeIcon icon={faGoogle} />

                            <span className="ml-2 " >Sign up with Google</span>
                            </a>
                        </button>
                    </div>
                </form>


                <div className="flex flex-col w-full items-center p-4" >
                    <span>Already have account ?</span>
                    <button type="button" className="w-full mt-4 hover:opacity-70  text-lg drop-shadow-lg bg-white text-cyan-600 border border-solid  border-cyan-500 py-3 px-4 rounded-md self-center" >
                        <Link to="/auth/login" >login</Link>
                    </button>

                </div>



            </div>
        
            
        </div>
    )
    
}


export default isAuthenticated(RegisterComponent , 'auth');