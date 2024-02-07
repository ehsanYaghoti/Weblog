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


function FilterRow(props){

    const queryContext =  useContext(QueryContext);

    let queries = queryContext.queries
    let inputHandler = queryContext.inputHandler

    const UserContext =  useContext(AuthenticatedUserContext);
    
    let authenticatedUser = UserContext

    return (
        <div className='filter-row'>
            
            <div className='filter-row__search-filter' >
                <input className='input-search' name='search' value={queries.search}  placeholder='جستجو کاربر ...' type='text' onChange={inputHandler}/>
                <label>
                    <span className='dark:text-gray-50' >تاریخ عضویت : </span> 
                    <select className='select' value={queries.createdAt } name='createdAt' onChange={inputHandler}>
                        <option value='' >همیشه</option>
                        <option value='1yearAgo'>۱ سال پیش</option>
                        <option value='1monthAgo'>۱ ماه پیش</option>
                        <option value='2monthAgo'>۲ ماه  پیش</option>
                    </select>
                </label>                    
                <label>
                    <span className='dark:text-gray-50' >دسترسی  :</span>  
                    <select className='select' defaultValue={'all'} value={queries.premission } name='premission' onChange={inputHandler}>
                        <option value='all'>همه</option>
                        <option value='viewer'>کاربر عادی</option>
                        <option value='admin'>ادمین</option>
                    </select>
                </label>
            </div>

            <Link className='new-user' to={{ pathname : '/admin/users/create' , state : authenticatedUser  }}  > 
                <span className='!whitespace-nowrap' > افزودن کاربر جدید</span> 
                <FontAwesomeIcon icon='plus' />
            </Link>
    </div>
    )
};

export default FilterRow;