import  React , {useContext}  from  'react';
import { Link } from 'react-router-dom';

// import contexts
import AuthenticatedUserContext from 'src/Contexts/authenticatedUserContext';



//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
library.add(faPlus)


function FilterReportRow(props){

    // const queryContext =  useContext(QueryContext);
    const UserContext =  useContext(AuthenticatedUserContext);
    
    let authenticatedUser = UserContext


    return (
        <div className='filter-row'>
            

        <Link className='new-user' to={{ pathname : '/admin/reports/create' , state : authenticatedUser   }}  > 
            <span> افزودن گزارش جدید</span> 
            <FontAwesomeIcon icon='plus' />
        </Link>

    </div>
    )
};

export default FilterReportRow;