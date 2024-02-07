import  React , { useContext }  from  'react';

//import Context
import  QueryContext from 'src/Contexts/queryContext';


// //import icons
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";
// library.add(faPlus)


function FilterCommentRow(props){

    const queryContext =  useContext(QueryContext);

    let queries = queryContext.queries
    let inputHandler = queryContext.inputHandler


    return (
        <div className='filter-row'>
            <input className='input-search' name='name' value={queries.name}  placeholder='جستجو کامنت ...' type='text' onChange={inputHandler}/>      
            {/* <label>
                نوع کامنت  : 
                <select className='select' value={queries.approved } name='approved' onChange={inputHandler}>
                    <option value={true}>تائید شده</option>
                    <option value={false}>تائید نشده</option>
                </select>
            </label> */}

        {/* <Link className='new-user' to={{ pathname : '/books/create' }}  > 
            <span> افزودن کتاب جدید</span> 
            <FontAwesomeIcon icon='plus' />
        </Link> */}

    </div>
    )
};

export default FilterCommentRow;