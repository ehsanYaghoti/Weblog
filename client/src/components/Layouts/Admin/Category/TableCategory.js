import  React , { useContext }  from  'react';

//import Contexts
import  QueryContext from 'src/Contexts/queryContext';
import  TableContext from 'src/Contexts/tableContext';


//import Components
import TableCategoryRow from  './tableCategoryRow';

//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortAmountDown , faPlus , faTable  , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync} from "@fortawesome/free-solid-svg-icons";
library.add(faSortAmountDown , faPlus , faTable , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync)

function TableCategory(props){

    const queryContext =  useContext(QueryContext);
    const tableContext =  useContext(TableContext);
    
    let categories = tableContext.categories
    let queries = queryContext.queries
    let sortHandler = tableContext.sortHandler
 


    return (
    <div className='w-full overflow-x-auto p-6' >
        <table className='table'>            
            <thead className='table-head'>
                <tr className='table-row'>
                    <th className='clicked'  style={{textAlign : 'center' }} > 
                        نام دسته  <FontAwesomeIcon icon='sort' />
                        <input className='toggle-page' type='button' name='sortCategoryName' value={queries.sortCategoryName} onClick={sortHandler} />                        
                    </th>

                    <th className='clicked' style={{textAlign : 'center' }} > 
                        دسته مربوطه <FontAwesomeIcon icon='sort' />                        
                    </th>
                    <th className='clicked' style={{textAlign : 'center' }} > 
                        دسته های مربوطه                      
                    </th>
                                
                    <th className='head-center clicked'><FontAwesomeIcon icon='table' /></th>
                </tr>
            </thead>
            <tbody className='table-body'>
                {
                    categories.length === '0'  
                    ? <span>There is no Information</span> 
                    : categories.map(category => {
                        return (
                            <TableCategoryRow key={category._id}  category={category} />
                        )
                    })
                }                           
            </tbody>
        </table>
    </div>
    )
};

export default TableCategory;