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
            <input className='input-search' name='name' value={queries.name}  placeholder='جستجو پاسخ ...' type='text' onChange={inputHandler}/>      
    </div>
    )
};

export default FilterCommentRow;