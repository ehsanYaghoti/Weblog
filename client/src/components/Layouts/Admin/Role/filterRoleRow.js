import  React , { useContext }  from  'react';
import { Link } from 'react-router-dom';

//import Context
import  QueryContext from 'src/Contexts/queryContext';
import AuthenticatedUserContext from 'src/Contexts/authenticatedUserContext';


//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
library.add(faPlus)


function FilterRoleRow(props){

    const queryContext =  useContext(QueryContext);

    let queries = queryContext.queries
    let inputHandler = queryContext.inputHandler

    const UserContext =  useContext(AuthenticatedUserContext);
    
    let authenticatedUser = UserContext


    return (
        <div className='filter-row'>
            <input className='input-search' name='name' value={queries.name}  placeholder='جستجو نقش ...' type='text' onChange={inputHandler}/>      


        <Link className='new-user' to={{ pathname : '/admin/roles/create' , state : authenticatedUser   }}  > 
            <span> افزودن نقش جدید</span> 
            <FontAwesomeIcon icon='plus' />
        </Link>

    </div>
    )
};

export default FilterRoleRow;