import React from 'react';

// icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


function SpinnerOnTop(props){

    return (
        <div className='w-screen h-screen bg-fixed fixed z-50 flex items-center justify-center bg-gray-100 bg-opacity-20' >
            <div className="h-fit w-fit" >
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-8xl animate-spin text-red-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg> */}
                <FontAwesomeIcon icon={faSpinner} className='text-red-200 animate-spin text-4xl' />
            </div>
        </div>
    )
}

export default SpinnerOnTop;