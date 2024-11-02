import  React , { useContext }  from  'react';
import { Link } from 'react-router-dom';

//import Context
import  QueryContext from 'src/Contexts/queryContext';

//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
library.add(faPlus)


function FilterPodcastRow(props){

    const queryContext =  useContext(QueryContext);

    let queries = queryContext.queries
    let inputHandler = queryContext.inputHandler

    return (
        <div className='filter-row'>
            <input className='input-search' name='name' value={queries.name}  placeholder='جستجو پادکست ...' type='text' onChange={inputHandler}/>      


        <Link className='new-user' to={{ pathname : '/admin/podcasts/create' }}  > 
            <span> افزودن پادکست جدید</span> 
            <FontAwesomeIcon icon='plus' />
        </Link>

    </div>
    )
};

export default FilterPodcastRow;