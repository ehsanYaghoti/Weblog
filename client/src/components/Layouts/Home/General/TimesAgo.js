import React from 'react';
// import moment from 'jalali-moment';

// import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faClock } from '@fortawesome/free-regular-svg-icons';


function TimesAgo(props) {
    
    //props
    let date = props.date

    function timeSince(date) {
        
        var seconds = Math.floor((new Date() - date) / 1000);
      
            var interval = seconds / 31536000;
        
            if (interval > 1) {
            return Math.floor(interval) + " years";
            }
            interval = seconds / 2592000;
            if (interval > 1) {
            return Math.floor(interval) + " months";
            }
            interval = seconds / 86400;
            if (interval > 1) {
            return Math.floor(interval) + " days";
            }
            interval = seconds / 3600;
            if (interval > 1) {
            return Math.floor(interval) + " hours";
            }
            interval = seconds / 60;
            if (interval > 1) {
            return Math.floor(interval) + " minutes";
            }
            return Math.floor(seconds) + " seconds";
    }
    
    // console.log(new Date(new Date(date).getTime()))
    //   var aDay = 24*60*60*1000;
    //   console.log(timeSince(new Date(Date.now()-aDay)));
    //   console.log(timeSince(new Date(Date.now()-aDay*2)));
      

    return (
        // TimesAgo
        <div className='flex items-center gap-1 md:gap-2 ml-2 text-sm md:text-lg whitespace-nowrap' >
            {
                props.icon ? 
                    <FontAwesomeIcon icon={faClock} className='text-sm md:text-lg' />
                : ''
            }
            <span className='text-sm md:text-lg font-[500] text-gray-600 gap-2 dark:text-gray-50'>
                <span>
                    {
                        timeSince(new Date(new Date(date).getTime()))
                    }
                </span>
                <span className='ml-1' >ago</span>
            </span>
        </div>
    )
}

export default TimesAgo;