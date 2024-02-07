import  React , { useContext }  from  'react';

//import Context
import  QueryContext from 'src/Contexts/queryContext';

function FilterSaveRow(props){

    const queryContext =  useContext(QueryContext);

    let queries = queryContext.queries
    let inputHandler = queryContext.inputHandler


    return (
        <div className='filter-row'>
            <input className='input-search' name='name' value={queries.name}  placeholder='جستجو ذخیره ...' type='text' onChange={inputHandler}/>      
        </div>
    )
};

export default FilterSaveRow;