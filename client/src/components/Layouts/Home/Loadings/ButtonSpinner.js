import React from 'react';

// icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';


function ButtonSpinner(props){

    return (
        <FontAwesomeIcon icon={faCircleNotch} className='animate-spin h-5 w-5 '  />
    )
}

export default ButtonSpinner;