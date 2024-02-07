import React , {useContext} from 'react';

import PaginationContext from 'src/Contexts/paginationContext'

//import Styles
import 'src/Styles/sass/pagination.scss'

function Number(props){

    const paginationContext = useContext(PaginationContext);

    let inputHandler = paginationContext.inputHandler

    // console.log(props)
    return (
        <li className={ props.number === props.page ? 'active' : ''}>
            <input className='toggle-page' type='button' name='page' value={props.number} onClick={inputHandler} />
            {/* {props.persianNumber} */}
        </li>
    )
};

export default Number;