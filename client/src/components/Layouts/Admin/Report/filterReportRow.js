import  React  from  'react';
import { Link } from 'react-router-dom';

//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
library.add(faPlus)


function FilterReportRow(props){

    return (
        <div className='filter-row'>
            

        <Link className='new-user' to={{ pathname : '/admin/reports/create' }}  > 
            <span> افزودن گزارش جدید</span> 
            <FontAwesomeIcon icon='plus' />
        </Link>

    </div>
    )
};

export default FilterReportRow;