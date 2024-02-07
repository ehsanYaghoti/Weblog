import  React , { useContext }  from  'react';

//import Contexts
import  QueryContext from 'src/Contexts/queryContext';
import  TableContext from 'src/Contexts/tableContext';


//import Components
import TableRoleRow from  './tableRoleRow';

//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortAmountDown  , faTable  , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync} from "@fortawesome/free-solid-svg-icons";
library.add(faSortAmountDown  , faTable , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync)

function TableRole(props){

    const queryContext =  useContext(QueryContext);
    const tableContext =  useContext(TableContext);
    
    let Roles = tableContext.roles
    let queries = queryContext.queries
    let sortHandler = tableContext.sortHandler

    return (
    <div className='w-full overflow-x-auto p-6' >
        <table className='table'>            
            <thead className='table-head'>
                <tr className='table-row'>
                    <th className='clicked' > 
                        عنوان نقش  <FontAwesomeIcon icon='sort' />
                        <input className='toggle-page' type='button' name='sortRoleName' value={queries.sortRoleName} onClick={sortHandler} />                        
                    </th>
                    <th className='clicked' > 
                        برچسب نقش
                    </th>
                    <th className='clicked' > 
                        مجوز ها
                    </th>


                                
                    <th className='head-center clicked'><FontAwesomeIcon icon='table' /></th>
                </tr>
            </thead>
            <tbody className='table-body'>
                {
                    Roles.length === '0'  
                    ? <span>There is no Information</span> 
                    : Roles.map(role => {
                        return (
                            <TableRoleRow key={role._id}  role={role} />
                        )
                    })
                }                           
            </tbody>
        </table>
    </div>
    )
};

export default TableRole;