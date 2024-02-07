import  React , { useContext }  from  'react';

//import Contexts
import  QueryContext from 'src/Contexts/queryContext';
import  TableContext from 'src/Contexts/tableContext';


//import Components
import TablePermissionRow from  './tablePermissionRow';

//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortAmountDown  , faTable  , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync} from "@fortawesome/free-solid-svg-icons";
library.add(faSortAmountDown  , faTable , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync)

function TablePermission(props){

    const queryContext =  useContext(QueryContext);
    const tableContext =  useContext(TableContext);
    
    let Permissions = tableContext.permissions
    let queries = queryContext.queries
    let sortHandler = tableContext.sortHandler

    return (
    <div className='w-full overflow-x-auto p-6' >
        <table className='table'>            
            <thead className='table-head'>
                <tr className='table-row'>
                    <th className='clicked' > 
                        عنوان مجوز  <FontAwesomeIcon icon='sort' />
                        <input className='toggle-page' type='button' name='sortPermissionName' value={queries.sortPermissionName} onClick={sortHandler} />                        
                    </th>
                    <th className='clicked' > 
                        برچسب مجوز
                    </th>

                                
                    <th className='head-center clicked'><FontAwesomeIcon icon='table' /></th>
                </tr>
            </thead>
            <tbody className='table-body'>
                {
                    Permissions.length === '0'  
                    ? <span>There is no Information</span> 
                    : Permissions.map(permission => {
                        return (
                            <TablePermissionRow key={permission._id}  permission={permission} />
                        )
                    })
                }                           
            </tbody>
        </table>
    </div>
    )
};

export default TablePermission;