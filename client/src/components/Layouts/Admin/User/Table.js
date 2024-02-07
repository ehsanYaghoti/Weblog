import  React , { useContext }  from  'react';

//import Contexts
import  QueryContext from 'src/Contexts/queryContext';
import  TableContext from 'src/Contexts/tableContext';


//import Components
import TableRow from  './tableRow';

//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortAmountDown , faPlus , faTable  , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync} from "@fortawesome/free-solid-svg-icons";
library.add(faSortAmountDown , faPlus , faTable , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync)

function Table(props){

    const queryContext =  useContext(QueryContext);
    const tableContext =  useContext(TableContext);
    
    let users = tableContext.users
    let sortQueries = queryContext.sortQueries
    let sortHandler = tableContext.sortHandler

    return (
    <div className='w-full overflow-x-auto p-6' >
        <table className='table !overflow-x-auto !w-full'>            
            <thead className='table-head'>
                <tr className='table-row'>
                    <th className='clicked' > 
                        <button value={sortQueries.sortUsername} name='sortUsername' onClick={sortHandler} >
                            نام کاربری 
                        </button>
                        <FontAwesomeIcon icon='sort' className='mr-2' />

                        {/* <input className='toggle-page' type='button' name='sortUsername'  />                         */}
                    </th>

                    <th className='clicked' >
                        <button name='sortEmail' value={sortQueries.sortEmail} onClick={sortHandler} >
                           ایمیل
                        </button>
                        <FontAwesomeIcon icon='sort' className='mr-2' />

                        {/* <input className='toggle-page' type='button' name='sortEmail' value={sortQueries.sortEmail} onClick={sortHandler} />                         */}
                    </th>
                    
                    <th className='head-center clicked'>
                        دسترسی ها 
                    </th>
                    <th className='head-center clicked'>
                        نقش ها
                    </th>
                    <th className='clicked'>
                        <button name='sortCreatedAt' value={sortQueries.sortCreatedAt} onClick={sortHandler} >
                            تاریخ عضویت
                        </button>
                        <FontAwesomeIcon icon='sort' className='mr-2' />
                        {/* <input className='toggle-page' type='button' name='sortCreatedAt' value={sortQueries.sortCreatedAt} onClick={sortHandler} />                         */}
                    </th>
                                
                    <th className='head-center clicked'><FontAwesomeIcon icon='table' /></th>
                </tr>
            </thead>
            <tbody className='table-body'>
                {
                    users.length === '0'  
                    ? <span>There is no Information</span> 
                    : users.map(user => {
                        return (
                            <TableRow key={user._id}  user={user} />
                        )
                    })
                }                           
            </tbody>
        </table>
    </div>
    )
};

export default Table;