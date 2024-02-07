import React from 'react';

// styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBlog   } from '@fortawesome/free-solid-svg-icons'
import { faTelegram , faTwitter , faInstagram , faLinkedin , faFacebook , faYoutube } from '@fortawesome/free-brands-svg-icons'



function Footer(props) {
    


    return (
        // Footer
        <>
        <footer className='flex items-center md:items-start flex-col gap-12 md:flex-row justify-between shadow-teal-900 drop-shadow-lg w-full h-fit md:h-[300px] p-10 border-t border-solid border-b-[#0F2027] bg-gradient-to-r from-[#0F2027] via-[#203A43] to-[#2C5364]  text-white dark:border-none font-["Nunito"]' >
            {/* Logo */}
            <div className='flex items-start w-fit text-white text-xl' >
                <FontAwesomeIcon icon={faBlog} className=' drop-shadow-2xl'  />
                <div className='flex flex-col ml-2 w-48    ' >
                    <span className='h-fit text-base font-["PT_Sans"] font-semibold ' >Weblog</span>
                    <p className='text-base font-[300] leading-6 font-[ubuntu] ' >there is a weblog for every one to write articles and ask qustions set posts and listen to podcasts.</p>
                </div>
            </div>
            {/* Follow us */}
            <div className='h-fit flex flex-col gap-4 items-center justify-center font-["Ubuntu"] w-52 md:w-24  '>
                <h4 className='w-fit self-center ' >follow us : </h4>
                <div className='flex items-center justify-center flex-wrap gap-4 w-full'  >
                    <a href="/" className='hover:opacity-70 text-xl' >
                            <FontAwesomeIcon icon={faTelegram} />
                    </a>
                    <a href="/" className='hover:opacity-70 text-xl' >
                            <FontAwesomeIcon icon={faYoutube} />
                    </a>
                    <a href="/" className='hover:opacity-70 text-xl' >
                            <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="/" className='hover:opacity-70 text-xl' >
                            <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="/" className='hover:opacity-70 text-xl' >
                            <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a href="/" className='hover:opacity-70 text-xl' >
                            <FontAwesomeIcon icon={faFacebook} />
                    </a>    
                </div>
            </div>
            {/* News letter */}
            <div className='h-fit relative flex  ' >
                <form className='flex flex-col items-start gap-6 '>
                <h4 className='font-[Ubuntu]' >News letter</h4>
                    <input lang='en' type="text" name='search' className='pl-8 pr-4 py-2 outline-none rounded-md bg-gray-200 text-gray-700 font-["Nunito"]' placeholder='username' style={{textAlign : 'left'}} />
                    <input lang='en' type="text" name='search' className='pl-8 pr-4 py-2 outline-none rounded-md bg-gray-200 text-gray-700 font-["Nunito"]' placeholder='email' style={{textAlign : 'left'}} />
                    <button type='submit' className='px-4 py-3 border border-solid border-gray-400 rounded-md' >submit</button>
                </form>
                {/* <input lang='fa' type="text" className='pl-8 pr-4 py-2 outline-none rounded-md bg-gray-200 text-gray-700 font-["Vazir"]' placeholder='search here' style={{textAlign : 'left'}} /> */}
            </div>
        </footer>
        <div className=' items-center justify-center w-full h-fit p-2 text-white bg-[#0F2027]  ' >
            <h6 className='w-fit' >© 2023 winter all copy right reserverd </h6>
        </div>
        </>
    )
}

export default Footer;