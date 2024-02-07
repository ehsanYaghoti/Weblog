import  React , { useContext }  from  'react';
import { Link  } from 'react-router-dom';

//import Context
import  QueryContext from 'src/Contexts/queryContext';
import AuthenticatedUserContext from 'src/Contexts/authenticatedUserContext';


//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
library.add(faPlus)


function FilterTagRow(props){
    // const history = useHistory()

    const queryContext =  useContext(QueryContext);

    let queries = queryContext.queries
    let inputHandler = queryContext.inputHandler

    const UserContext =  useContext(AuthenticatedUserContext);
    
    let authenticatedUser = UserContext

    return (
        <div className='filter-row'>
            <input className='input-search' name='name' value={queries.name}  placeholder='جستجو تگ ...' type='text' onChange={inputHandler}/>      


        {/* <button className='new-user' onClick={e => {history.push('/admin/tags/create' , {data :authenticatedUser})}} > */}
            <Link className='new-user' to={{ pathname : '/admin/tags/create' , state : authenticatedUser }}> 
                <span> افزودن تگ جدید</span> 
                <FontAwesomeIcon icon='plus' />
            </Link>
        {/* </button> */}

    </div>
    )
};

export default FilterTagRow;