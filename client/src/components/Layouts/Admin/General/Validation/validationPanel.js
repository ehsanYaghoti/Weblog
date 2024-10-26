import { library } from "@fortawesome/fontawesome-svg-core";
import {faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
library.add(faTimes)

const ValidationPanel = (props) => {

    const [close , setClose] = useState(false)

    let closeController = (e) => {
        setClose(true)
    }

    let messages = props?.messages

    return (
        <div className={` ${ close && 'hidden'} fixed w-screen h-screen bg-slate-50 text-white bg-opacity-20 flex items-center justify-center z-50`} onClick={closeController} >
            <div className={` ${ close ? 'closed' : "validErrors"}  h-fit rounded-lg  !pt-8 ` }   >
                <button type="button" id="close" onClick={closeController} className="close"><FontAwesomeIcon icon='times'  /> </button>
                {   
                    messages.map((error)=>{
                        return (<span>{error}</span>)   
                    })
                }
            </div>      
        </div>
    )
}

export default ValidationPanel;