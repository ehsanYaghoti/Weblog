import React    from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'



function FormValidatoinComponent(props) {

    const [loading , setLoading ] = useState(false)
    const [ validation , setValidation ] = useState({
        close : true ,
        success : true,
        messages : [],
        fullMessages : []
    }) 

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
                    <div className="w-fit h-fit flex font-[Vazir] peer/validation leading-8   flex-col self-center m-auto items-center z-50 fixed left-1/4 p-4 bg-red-600  border border-solid border-red-300 rounded-md" id="validation" >
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
                )  :
                   ! validation.messages.length === 0  
                   ?  ( 
                    <div className="w-fit h-fit flex font-[Vazir] peer/validation leading-8   flex-col self-center m-auto items-center z-50 fixed left-1/4 p-4 bg-green-600  border border-solid border-green-300 rounded-md" id="validation" >
                        <span className="text-md rtl text-white flex flex-row items-center" >{validation.messages}</span>
                    </div>
                   ) 
                   : ('')
                : 
                (
                    ''
                )
                
            } 
            
            
            

        </div>
    )
    
}


export default FormValidatoinComponent;