import  React , { useContext }  from  'react';

//import Context
import  QueryContext from 'src/Contexts/queryContext';

function FilterLikeRow(props){

    const queryContext =  useContext(QueryContext);

    let queries = queryContext.queries
    let inputHandler = queryContext.inputHandler


    return (
        <div className='filter-row'>
            <input className='input-search' name='name' value={queries.name}  placeholder='جستجو لایک ...' type='text' onChange={inputHandler}/>      
        </div>
    )
};

export default FilterLikeRow;