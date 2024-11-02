import  React , { useContext }  from  'react';
import { Link } from 'react-router-dom';

//import Context
import  QueryContext from 'src/Contexts/queryContext';


//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
library.add(faPlus)


function FilterCategoryRow(props){

    const queryContext =  useContext(QueryContext);

    let queries = queryContext.queries
    let inputHandler = queryContext.inputHandler

    let parentNames = []
    queryContext.categories.forEach(category => {
        if(category.parent === null){
            parentNames.push(category.slug)
        }


    })

    return (
        <div className='filter-row'>
            <input className='input-search' name='name' value={queries.name}  placeholder='جستجو دسته ...' type='text' onChange={inputHandler}/>      
            <label>
                <span className='text-gray-50' >نوع دسته  :</span>
                <select className='select' value={queries.parent } name='parent' onChange={inputHandler}>
                    <option value=''>همه</option>
                    <option value='father'>دسته اصلی</option>
                    <option value='child'>دسته فرزند</option>
                </select>
            </label>

        <Link className='new-user' to={{ pathname : '/admin/categories/create'  }}  > 
            <span className='text-gray-50' > افزودن دسته جدید</span> 
            <FontAwesomeIcon icon='plus' />
        </Link>

    </div>
    )
};

export default FilterCategoryRow;