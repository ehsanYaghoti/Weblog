import React from "react";


// import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy  } from '@fortawesome/free-regular-svg-icons'
import { faTelegram, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";


function ShareLinkBtn(props){

    // props
    // let title = props.title

    return (
        <div className="flex items-center gap-2 md:gap-4">
            {/* share link Button */}
            <button onClick={e => {

                let url = window.location.href.toString()
                navigator.clipboard.writeText(decodeURIComponent(url));

                }} className={`flex items-center gap-1 p-2 md:py-3 md:px-3 text-xl text-gray-600 dark:text-gray-50 rounded-md  border border-solid border-gray-200  focus:bg-gray-700 focus:border-gray-500 focus:shadow-md focus:shadow-gray-700 focus:text-white hover:bg-gray-700 hover:text-white cursor-pointer`} >
                <FontAwesomeIcon icon={faCopy}  />
            </button>
            {/* share link to twitter Button */}
            <button onClick={e => {
                e.preventDefault();
                let url = window.location.href.toString()
                
                window.open('http://twitter.com/share?text=WeblogSite&url=' + decodeURIComponent(url) )

                // alert('http://twitter.com/share?text=Check%20out%20this%20page#tfa&url=' + decodeURIComponent(url) );
                }} className={`flex items-center gap-1 p-2 md:py-3 md:px-3 text-xl text-blue-500 rounded-md  border border-solid border-blue-100  focus:bg-blue-400 focus:border-blue-300 focus:shadow-md focus:shadow-blue-500 focus:text-white hover:bg-blue-500 hover:text-white cursor-pointer`} >
                <FontAwesomeIcon icon={faTwitter}  />
            </button>
            {/* share link to telegram Button */}
            <button onClick={(e , title = props.title) => {
                e.preventDefault()
                let url = window.location.href.toString()
                
                window.open(`https://telegram.me/share/url?url=${decodeURIComponent(url)}&text=${title}`)
                }} className={`flex items-center gap-1 p-2 md:py-3 md:px-3 text-xl text-blue-500 rounded-md  border border-solid border-blue-100  focus:bg-blue-400 focus:border-blue-300 focus:shadow-md focus:shadow-blue-500 focus:text-white hover:bg-blue-500 hover:text-white cursor-pointer`} >
                <FontAwesomeIcon icon={faTelegram}  />
            </button>
            {/* share link to whats app Button */}
            <button onClick={e => {

                let url = window.location.href.toString()
                
                window.open(`whatsapp://send?text=${decodeURIComponent(url)}`)
                }} className={`flex items-center gap-1 p-2 md:py-3 md:px-3 text-xl text-green-500 rounded-md  border border-solid border-green-100  focus:bg-green-400 focus:border-green-300 focus:shadow-md focus:shadow-green-500 focus:text-white hover:bg-green-500 hover:text-white cursor-pointer`} >
                <FontAwesomeIcon icon={faWhatsapp}  />
            </button>
        </div>
        
    ) 
}

export default ShareLinkBtn;